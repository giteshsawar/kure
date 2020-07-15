import React from "react";

import MessageList from "../MessageList";
import ChatInput from "../ChatInput";
import OptionWindow from "../OptionWindow";

import "./style.css";

export default class ChatWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openOptions: false,
      activeOption: "",
      chatMessages: [],
    };
    this.messageListRef = React.createRef();
  }

  setActiveOption = (option) => {
    this.setState({ activeOption: option });
  };

  setChatMessages = (messages) => {
    this.setState({ chatMessages: messages });
  };

  setOptionsState = () => {
    this.setState((prevState) => ({ openOptions: !prevState.openOptions }));
  };

  enterChannel = () => {
    const { chatChannel } = this.props;
    chatChannel.enter(function (response, error) {
      if (error) return console.log("error entereing channel");

      console.log("got response from entering channel", response);
    });
  };

  createDefaultMessage = (messageObj) => {
    const { message, messageId, _sender, createdAt } = messageObj;
    const { userId } = this.props;
    const chatMessage = {};
    chatMessage.message = message;
    chatMessage.messageId = messageId;
    chatMessage.senderName =
      userId !== _sender.userId ? _sender.nickname : null;
    chatMessage.receiverName =
      userId === _sender.userId ? _sender.nickname : null;
    chatMessage.time = createdAt;

    return chatMessage;
  };

  constructMessage = (messageObj) => {
    const message = this.createDefaultMessage(messageObj);
    return message;
  };

  constructDistanceMessage = (messageObj) => {
    const { data, customType } = messageObj;
    const message = this.createDefaultMessage(messageObj);
    const addressData = JSON.parse(data);
    message.data = addressData;
    message.customType = customType;
    return message;
  };

  addNewMessage = (messageObj) => {
    const { chatMessages } = this.state;
    const chatMessage =
      messageObj.customType === "DISTANCE"
        ? this.constructDistanceMessage(messageObj)
        : this.constructMessage(messageObj);
    this.setChatMessages([...chatMessages, chatMessage]);
    this.scrollMessageListToBottom();
  };

  scrollMessageListToBottom = () => {
    this.messageListRef.current.scrollTop = this.messageListRef.current.scrollHeight;
  };

  sendMessage = (chat_message) => {
    const { chatChannel, messageParams } = this.props;
    messageParams.message = chat_message;
    messageParams.customType = "";
    messageParams.data = "";
    console.log("send use rmessge", messageParams);
    chatChannel.sendUserMessage(messageParams, (message, error) => {
      if (error) return console.log("message sent success", message);

      console.log("message sent success", message);
      this.addNewMessage(message);
    });
  };

  sendMileageMessage = (params) => {
    const { chatChannel, messageParams } = this.props;
    messageParams.message = params.message;
    messageParams.customType = params.customType;
    messageParams.data = JSON.stringify(params.data);

    console.log("send message params", messageParams);

    chatChannel.sendUserMessage(messageParams, (message, error) => {
      if (error) return console.log("message sent success", message);

      console.log("message sent success", message);
      this.addNewMessage(message);
    });
  };

  receiveChannelMessage = () => {
    const { channelHandler } = this.props;
    console.log("channel handler run", channelHandler);

    channelHandler.onMessageReceived = (channel, message) => {
      console.log("channel handler received message", channel, message);
      this.addNewMessage(message);
    };
    this.props.addChannelHandler();
    this.loadHistory();
  };

  loadHistory = () => {
    const { chatChannel } = this.props;
    let messageListQuery = chatChannel.createPreviousMessageListQuery();

    messageListQuery.load(30, true, (messageList, error) => {
      if (error) {
        console.error(error);
      } else {
        this.setState({
          chatMessages: messageList.map((item) => this.constructMessage(item)),
        });
      }
    });
  };

  componentDidMount() {
    this.enterChannel();
    this.receiveChannelMessage();
  }

  render() {
    const { activeOption, openOptions, chatMessages } = this.state;
    return (
      <div className="chat_window">
        <OptionWindow
          activeOption={activeOption}
          setActiveOption={this.setActiveOption}
          sendMileageMessage={this.sendMileageMessage}
          setOptionsState={this.setOptionsState}
        />
        <MessageList
          openOptions={openOptions}
          activeOption={activeOption}
          setActiveOption={this.setActiveOption}
          chatMessages={chatMessages}
          messageListRef={this.messageListRef}
        />
        <ChatInput
          setOptionsState={this.setOptionsState}
          sendMessage={this.sendMessage}
        />
      </div>
    );
  }
}

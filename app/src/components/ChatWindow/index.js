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

  constructMessage = (messageObj) => {
    const { message, messageId, _sender, createdAt } = messageObj;
    const { chatMessages } = this.state;
    const { userId } = this.props;
    console.log("chat maesages new", chatMessages);

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

  addNewMessage = (messageObj) => {
    const { chatMessages } = this.state;
    const chatMessage = this.constructMessage(messageObj);
    this.setChatMessages([...chatMessages, chatMessage]);
  };

  sendMessage = (chat_message) => {
    const { chatChannel, messageParams } = this.props;
    messageParams.message = chat_message;
    console.log("send use rmessge", messageParams);
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
        />
        <MessageList
          openOptions={openOptions}
          activeOption={activeOption}
          setActiveOption={this.setActiveOption}
          chatMessages={chatMessages}
        />
        <ChatInput
          setOptionsState={this.setOptionsState}
          sendMessage={this.sendMessage}
        />
      </div>
    );
  }
}

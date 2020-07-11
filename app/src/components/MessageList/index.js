import React from "react";

import Message from "./Message";
import ChatOptions from "../ChatInput/ChatOptions";

import "./style.css";

export default function MessageList(props) {
  const { openOptions, setActiveOption, activeOption, chatMessages } = props;
  console.log('chatMessages', chatMessages);
  return (
    <div className="messages">
      {openOptions && !activeOption.length ? (
        <ChatOptions setActiveOption={setActiveOption} />
      ) : null}
      <div className="message_list">
        {chatMessages.length ? chatMessages.map((message) => <Message messageObj={message} key={message.messageId} />) : null}
      </div>
    </div>
  );
}

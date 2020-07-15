import React from "react";

import Message from "./Message";
import DistanceMessage from "./DistanceMessage";
import ChatOptions from "../ChatOptions";

import "./style.css";

export default function MessageList(props) {
  const { openOptions, setActiveOption, activeOption, chatMessages, messageListRef } = props;

  return (
    <div className="messages">
      {openOptions && !activeOption.length ? (
        <ChatOptions setActiveOption={setActiveOption} />
      ) : null}
      <div className="message_list" ref={messageListRef}>
        {chatMessages.length
          ? chatMessages.map((message) => {
              if (message.customType === "DISTANCE")
                return <DistanceMessage messageObj={message} key={message.messageId} />;

              return <Message messageObj={message} key={message.messageId} />;
            })
          : null}
      </div>
    </div>
  );
}

import React from "react";

import "./style.css";

export default function ChatInput(props) {
  const { setOptionsState, sendMessage } = props;

  const getInputValue = (e) => {
    const { value } = e.target;
    if (e.keyCode === 13 && value.length) {
      sendMessage(value);
      e.target.value = "";
    }
  };

  return (
    <div className="chat_input">
      <div className="options">
        <div className="open_btn" onClick={setOptionsState}>+</div>
      </div>
      <div className="text_input">
        <input type="text" placeholder="Type message" onKeyDown={getInputValue} />
      </div>
    </div>
  );
}

import React from "react";

export default function Message(props) {
  const { messageObj } = props;
  console.log("new message in th list", messageObj);
  const { message, senderName, time, receiverName } = messageObj;
  const name = senderName || receiverName;

  let h = new Date(time).getHours();
  let m = new Date(time).getMinutes();

  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  const messageTime = `${h}:${m}`;

  return (
    <div className="message_box">
      <div className={`message_content ${senderName ? "received" : "sent"}`}>
        <div className="content">
          <div className="user_name">{senderName || "You"}</div>
          <div className="message">
            <div className="message_text">{message}</div>
            <div className="time">{messageTime}</div>
          </div>
          {!senderName && <div className="status">Sent</div>}
        </div>
        <div className="user_pic">{name[0]}</div>
      </div>
    </div>
  );
}

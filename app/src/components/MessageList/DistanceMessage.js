import React from "react";
import PlacesIcon from "../../assets/images/places-icon.png";

export default function DistanceMessage(props) {
  const { messageObj } = props;
  console.log("new message in th list", messageObj);
  const { message, senderName, time, receiverName, data } = messageObj;
  const { name, start, end, distance } = data;
  const username = senderName || receiverName;

  let h = new Date(time).getHours();
  let m = new Date(time).getMinutes();

  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  const messageTime = `${h}:${m}`;

  console.log("message data", data);

  return (
    <div className="message_box distance_message_box">
      <div className={`message_content ${senderName ? "received" : "sent"}`}>
        <div className="content">
          <div className="user_name">{senderName || "You"}</div>
          <div className="message distance_message">
            <div className="message_text">
              <div className="icon">
                <img src={PlacesIcon} alt="place" />
              </div>
              <div className="text">{message}</div>
            </div>
            <div className="data">
              <div className="data_row">
                <div className="label">Name</div>
                <div className="value">{name}</div>
              </div>

              <div className="data_row">
                <div className="label">start location</div>
                <div className="value">{start}</div>
              </div>

              <div className="data_row">
                <div className="label">end location</div>
                <div className="value">{end}</div>
              </div>

              <div className="data_row distance_row">
                <div className="distance_num">
                  <div className="label">mileage</div>
                  <div className="value">{distance} miles</div>
                </div>
                <div className="time">{messageTime}</div>
              </div>
            </div>
          </div>
          {!senderName && <div className="status">Sent</div>}
        </div>
        <div className="user_pic">{username[0]}</div>
      </div>
    </div>
  );
}

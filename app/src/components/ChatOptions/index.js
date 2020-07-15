import React from "react";

import PlacesIcon from "../../assets/images/places-icon.png";

import "./style.css";

export default function ChatOptions(props) {
  const { setActiveOption } = props;

  return (
    <div className="chat_options">
      <div className="options_list">
        <div className="option_item" onClick={() => setActiveOption("mileage")}>
          <div className="icon">
            <img src={PlacesIcon} alt="place" />
          </div>
          <div className="item_name">Mileage</div>
        </div>
      </div>
    </div>
  );
}

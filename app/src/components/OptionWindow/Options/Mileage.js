import React, { useState } from "react";

import GoogleMap from "../../GoogleMap";
import PlacesIcon from "../../../assets/images/places-icon.png";

import "./style.css";

export default function OptionWindow(props) {
  const { setActiveOption } = props;
  // const [openMap, setMapCompState] = useState(false);
  const [myLocation, setMyLocation] = useState();
  const [currentPosition, SetCurrentPosition] = useState();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    const myPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    console.log('got my position', myPosition);
    SetCurrentPosition(myPosition);
  };

  const onMarkerClick = (position) => {
    console.log("position", position);
    // setMyLocation(position);
  };
  const onMarkerDragEnd = (position) => {
    console.log("position end", position);
  };
  const onInfoWindowClose = () => {
    console.log("map window closed");
    // setMapCompState(false);
  };

  return (
    <div className="option_template">
      {currentPosition && (
        <div className="google_map_comp">
        <GoogleMap
          onMarkerClick={onMarkerClick}
          onMarkerDragEnd={onMarkerDragEnd}
          onInfoWindowClose={onInfoWindowClose}
          center={currentPosition}
          height="300px"
          zoom={15}
        />
        </div>
      )}
      <div className="option">
        <div className="option_heading">
          <div className="icon">
            <img src={PlacesIcon} alt="place" />
          </div>
          <div className="item_name">Mileage</div>
          {myLocation && (
            <div>
              {myLocation.lat} == {myLocation.long}
            </div>
          )}
        </div>
        <div className="option_form">
          <div className="option_form_col">
            <div className="option_label">Name</div>
            <div className="option_input">
              <input type="text" placeholder="Enter your name" />
            </div>
          </div>

          <div className="option_form_col">
            <div className="option_label">start location</div>
            <div className="option_input">
              <button className="get_location" onClick={getLocation}>
                Select start location
              </button>
              <span className="right_icon">{`>`}</span>
            </div>
          </div>

          <div className="option_form_col">
            <div className="option_label">end location</div>
            <div className="option_input">
              <button className="get_location">Select end location</button>
              <span className="right_icon">{`>`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="option_btn">
        <div className="button_group">
          <button className="btn btn_cancel" onClick={() => setActiveOption('')}>cancel</button>
          <button className="btn btn_send">send</button>
        </div>
      </div>
    </div>
  );
}

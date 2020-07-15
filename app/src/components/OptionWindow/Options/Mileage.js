import React, { useState, useEffect } from "react";
import getDistance from 'geolib/es/getDistance';

import GoogleMap from "../../GoogleMap";
import PlacesIcon from "../../../assets/images/places-icon.png";

import "./style.css";

export default function OptionWindow(props) {
  const { setActiveOption, sendMileageMessage, setOptionsState } = props;
  const [name, setName] = useState("");
  const [startLocation, setStartLocation] = useState();
  const [endLocation, setEndLocation] = useState();
  const [distance, setDistance] = useState();
  const [currentPosition, SetCurrentPosition] = useState();
  const [trip, setTrip] = useState("");

  const getLocation = (trip) => {
    if (navigator.geolocation) {
      setTrip(trip);
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
    console.log("got my position", myPosition);
    SetCurrentPosition(myPosition);
  };

  const onInfoWindowClose = () => {
    console.log("map window closed");
    SetCurrentPosition(null);
  };

  const setLocationAfterDrag = (location) => {
    if (trip === "start") {
      setStartLocation(location);
    } else {
      setEndLocation(location);
    }
    SetCurrentPosition(null);
  };

  const rad = function (x) {
    return (x * Math.PI) / 180;
  };

  const calculateDistance = () => {
    // var R = 6378137; // Earth’s mean radius in meter
    // var dLat = rad(endLocation.lat - startLocation.lat);
    // var dLong = rad(endLocation.lng - startLocation.lng);
    // var a =
    //   Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //   Math.cos(
    //     rad(startLocation.lat) *
    //       Math.cos(rad(endLocation.lat)) *
    //       Math.sin(dLong / 2) *
    //       Math.sin(dLong / 2)
    //   );
    // var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // var d = R * c;
    // console.log("dot distance in miles", d, d * 0.000621371192);
    const distance = getDistance(
      { latitude: startLocation.lat, longitude: startLocation.lng },
      { latitude: endLocation.lat, longitude: endLocation.lng }
  );
    console.log("dot distance in miles", distance * 0.000621371192);
    const miles = Math.floor(distance * 0.000621371192);
    setDistance(miles);
  };

  const sendDistance = () => {
    const params = {};
    params.customType = 'DISTANCE';
    params.message = 'mileage';
    params.data = {
      name,
      start: startLocation.address,
      end: endLocation.address,
      distance
    }
    sendMileageMessage(params);
    setActiveOption("");
    setOptionsState(false);
  }

  const getInputValue = e => {
    const { value } = e.target;
    setName(value);
  }

  useEffect(() => {
    if (startLocation && endLocation) calculateDistance();
    return () => {};
  }, [startLocation, endLocation]);

  console.log("got addresses from map", startLocation, endLocation);

  return (
    <div className="option_template">
      {currentPosition && (
        <div className="google_map_comp">
          <GoogleMap
            onInfoWindowClose={onInfoWindowClose}
            setLocationAfterDrag={setLocationAfterDrag}
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
        </div>
        <div className="option_form">
          <div className="option_form_col">
            <div className="option_label">Name</div>
            <div className="option_input">
              <input type="text" placeholder="Enter your name" value={name} onChange={getInputValue} />
            </div>
          </div>

          <div className="option_form_col">
            <div className="option_label">start location</div>
            <div className="option_input">
              <button
                className="get_location"
                onClick={() => getLocation("start")}
              >
                {startLocation
                  ? startLocation.address
                  : "Select start location"}
              </button>
              <span className="right_icon">{`>`}</span>
            </div>
          </div>

          <div className="option_form_col">
            <div className="option_label">end location</div>
            <div className="option_input">
              <button
                className="get_location"
                onClick={() => getLocation("end")}
              >
                {endLocation ? endLocation.address : "Select end location"}
              </button>
              <span className="right_icon">{`>`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="option_btn">
        <div className="button_group">
          <button
            className="btn btn_cancel"
            onClick={() => setActiveOption("")}
          >
            cancel
          </button>
          <button
            className={`btn btn_send ${!distance && !name.length ? "disable_btn" : ""}`}
            disabled={!distance && !name.length}
            onClick={sendDistance}
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
}

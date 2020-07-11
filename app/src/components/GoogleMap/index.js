import React, { useState, useEffect } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Geocode from "react-geocode";

import "./style.css";

Geocode.setApiKey("AIzaSyCKQPPm1BSj0HHpfeg7_7x-gWNKs4t03t4");
// Geocode.enableDebug();

function GoogleMap(props) {
  const { onMarkerClick, onInfoWindowClose, onMarkerDragEnd, center } = props;

  return (
    <div className="google_map">
      <Map
        google={props.google}
        zoom={14}
        initialCenter={center}
        center={center}
      >
        <Marker
          onClick={onMarkerClick}
          name={"Current location"}
          draggable={true}
          onDragEnd={onMarkerDragEnd}
          position={{
            lat: center.lat,
            lng: center.lng,
          }}
        />

        <InfoWindow onClose={onInfoWindowClose}>
          <div>{/* <h1>{state.selectedPlace.name}</h1> */}</div>
        </InfoWindow>
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDnCvxvRwpH67zf_On3TCD1gjjswu4Be6c",
})(GoogleMap);

import React, { useState, useEffect } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Geocode from "react-geocode";
import Autocomplete from "react-google-autocomplete";

import "./style.css";

Geocode.setApiKey("");
// Geocode.enableDebug();

function GoogleMap(props) {
  const { onInfoWindowClose, center, setLocationAfterDrag } = props;
  const [currentPosition, setCurrentPosition] = useState(center);

  const onMarkerClick = (coord) => {
    console.log("coord", coord);
    const { lat, lng } = coord.mapCenter;
    const position = { lat, lng };
    getAddressFromLatLang(position);
    // setMyLocation(position);
  };

  const getAddressFromSearch = (place) => {
    console.log('autoselect place selected', place);
    // Get latidude & longitude from address.
    Geocode.fromAddress(place.formatted_address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setCurrentPosition({ lat, lng });
      },
      (error) => {
        console.error(error);
        window.alert("error searching address");
      }
    );
  };

  const onMarkerDragEnd = (coord) => {
    const position = { lat: coord.latLng.lat(), lng: coord.latLng.lng() };
    getAddressFromLatLang(position);
  };

  const getAddressFromLatLang = (position) => {
    Geocode.fromLatLng(position.lat, position.lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        console.log(address);
        position.address = address;
        setLocationAfterDrag(position);
      },
      (error) => {
        console.error(error);
        window.alert("error retrieving address");
      }
    );
  };

  return (
    <div className="google_map">
      <Autocomplete
        style={{ width: "90%" }}
        onPlaceSelected={(place) => {
          getAddressFromSearch(place);
        }}
        types={["(regions)"]}
      />
      <Map
        google={props.google}
        zoom={14}
        initialCenter={currentPosition}
        center={currentPosition}
      >
        <Marker
          onClick={onMarkerClick}
          name={"Current location"}
          draggable={true}
          onDragend={(t, map, coord) => onMarkerDragEnd(coord)}
          position={{
            lat: currentPosition.lat,
            lng: currentPosition.lng,
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
  apiKey: "",
})(GoogleMap);

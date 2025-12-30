
import React from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "350px",
  marginTop: "10px",
};

const RestaurantMap = ({ latitude, longitude, name }) => {
  const center = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <Marker position={center} title={name} />
      </GoogleMap>
    </LoadScript>
  );
};

export default RestaurantMap;

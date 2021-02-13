import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

function ProviderLocationMap(props) {
  const { latitude, longitude, onLocationChange } = props;

  const center = { lat: latitude, lng: longitude };

  const movedHandler = (event) => {
    const { latLng } = event;
    onLocationChange(latLng.lat(), latLng.lng());
  };

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      <Marker
        draggable={true}
        position={center}
        title={"Current Location"}
        onDragEnd={movedHandler}
      />
    </GoogleMap>
  );
}

export default ProviderLocationMap;

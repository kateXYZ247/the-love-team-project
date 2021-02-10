import React from "react";
import { GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "300px",
  height: "300px",
};

function GoogleMapSample(props) {
  const { center } = props;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  );
}

export default GoogleMapSample;

import React from "react";
import { GoogleMap, Circle, Marker } from "@react-google-maps/api";
import { useTheme } from "@material-ui/core/styles";

const containerStyle = {
  width: "300px",
  height: "300px",
};

function GoogleMapSample(props) {
  const { center, circleCenter, markerCenter } = props;
  const theme = useTheme();

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {/* Child components, such as markers, info windows, etc. */}
      {circleCenter && (
        <Circle
          center={circleCenter}
          radius={5000}
          options={{
            fillColor: theme.palette.secondary.main,
            strokeColor: theme.palette.secondary.dark,
          }}
        />
      )}
      {markerCenter && <Marker position={markerCenter} />}
    </GoogleMap>
  );
}

export default GoogleMapSample;

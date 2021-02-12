import React, { useState } from "react";
import {
  GoogleMap,
  Circle,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useTheme } from "@material-ui/core/styles";

const containerStyle = {
  width: "300px",
  height: "300px",
};

function SmallGoogleMap(props) {
  const {
    center,
    circleCenter,
    markerCenter,
    markerTitle,
    origin,
    destination,
  } = props;
  const theme = useTheme();

  const [directionResponse, setDirectionResponse] = useState(null);

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        setDirectionResponse(response);
      } else {
        console.log("response: ", response);
      }
    }
  };

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
      {markerCenter && <Marker position={markerCenter} title={markerTitle} />}
      {origin && destination && (
        <DirectionsService
          options={{
            destination: destination,
            origin: origin,
            travelMode: "DRIVING",
          }}
          callback={directionsCallback}
        />
      )}
      {directionResponse !== null && (
        <DirectionsRenderer
          options={{
            directions: directionResponse,
          }}
        />
      )}
    </GoogleMap>
  );
}

export default SmallGoogleMap;

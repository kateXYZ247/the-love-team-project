import React, { useMemo, useState } from "react";
import {
  GoogleMap,
  Circle,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useTheme } from "@material-ui/core/styles";
import * as actions from "../../store/actions";
import { MESSAGE_TYPE } from "../../constant/message";
import { connect } from "react-redux";

const containerStyle = {
  width: "300px",
  height: "300px",
};

function SmallGoogleMap(props) {
  const {
    center,
    circleCenters,
    markerCenter,
    markerTitle,
    origin,
    destination,
    onClickCircle,
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

  const directionService = useMemo(() => {
    if (origin && destination) {
      return (
        <DirectionsService
          options={{
            destination: destination,
            origin: origin,
            travelMode: "DRIVING",
          }}
          callback={directionsCallback}
        />
      );
    } else {
      setDirectionResponse(null);
    }
  }, [origin, destination]);

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {/* Child components, such as markers, info windows, etc. */}
      {circleCenters &&
        circleCenters.map((c, i) => (
          <Circle
            key={i}
            center={{ lat: c.lat, lng: c.lng }}
            radius={5000}
            options={{
              fillColor: theme.palette.secondary.main,
              strokeColor: theme.palette.secondary.dark,
            }}
            onClick={() => onClickCircle(c.productName)}
          />
        ))}
      {markerCenter && <Marker position={markerCenter} title={markerTitle} />}
      {directionService}
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

const mapDispatchToProps = (dispatch) => {
  return {
    onClickCircle: (text) =>
      dispatch(actions.setMessage(MESSAGE_TYPE.info, text)),
  };
};

export default connect(null, mapDispatchToProps)(SmallGoogleMap);

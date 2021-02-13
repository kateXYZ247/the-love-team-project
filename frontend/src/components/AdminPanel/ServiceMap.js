import React, { useEffect }from "react";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { GoogleMap, Circle, Marker } from "@react-google-maps/api";
// import { useTheme } from "@material-ui/core/styles";

function ServiceMap(props) {
    const containerStyle = {
        minWidth: "300px",
        minHeight: "600px",
    };
    const{
        center,
        markerCenter,
        onFetchGeo,
        loading,
        userId,
    } = props;

    useEffect(() => {
        onFetchGeo(userId)
    }, []);

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={4}>
            {/* Child components, such as markers, info windows, etc. */}
            {markerCenter &&
                markerCenter.map((c, i) => (
                    <Marker
                        key={i}
                        opacity={0.8}
                        position={{lat: c.latitude, lng: c.longitude}}
                    />
                ))}
        </GoogleMap>
    );
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        loading: state.admin.loading,
        markerCenter: state.admin.geoList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchGeo: (userId) => {
            dispatch(
                actions.fetchGeo(userId)
            )
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (ServiceMap);
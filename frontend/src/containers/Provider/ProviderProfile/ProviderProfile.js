import React, { useEffect } from "react";
import ProviderInfo from "../../../components/ProviderProfile/ProviderInfo";
import ProviderPhoto from "../../../components/ProviderProfile/ProviderPhoto";
import { Box, Grid } from "@material-ui/core";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import ProviderLocationMap from "../../../components/ProviderLocationMap/ProviderLocationMap";
import { PATH_PROVIDER_PROFILE } from '../../../constant/path'

function ProviderProfile(props) {
  const {
    userId,
    firstName,
    lastName,
    phone,
    address,
    productName,
    onSwitch,
    avail,
    latitude,
    longitude,
    onLocationUpdate,
    onSetRedirectPath
  } = props;

  useEffect(() => {
    onSetRedirectPath(PATH_PROVIDER_PROFILE);
  }, [onSetRedirectPath]);

  function handleSwitch(availability) {
    onSwitch(userId, availability);
  }

  const locationUpdatedHandler = (latitude, longitude) => {
    onLocationUpdate(userId, latitude, longitude);
  };

  return (
    <Box mx={5}>
      <Grid container justify="center" alignItems="center">
        <Grid item container justify="center" spacing={5} alignItems="center">
          <Grid item xs={12} md={3}>
            <Box display="flex" p={2} mt={3} align="flex-end">
              <ProviderPhoto avail={avail} handleSwitch={handleSwitch} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} container justify="center">
            <ProviderLocationMap
              latitude={latitude}
              longitude={longitude}
              onLocationChange={locationUpdatedHandler}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ProviderInfo
            firstName={firstName}
            lastName={lastName}
            phone={phone}
            address={address}
            productName={productName}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    firstName: state.auth.userDetail.firstName,
    lastName: state.auth.userDetail.lastName,
    phone: state.auth.userDetail.phone,
    address: state.auth.userDetail.address,
    userId: state.auth.userId,
    productName: state.auth.userDetail.productName,
    avail: state.providerProfile.avail,
    latitude: state.auth.userDetail.latitude,
    longitude: state.auth.userDetail.longitude,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSetRedirectPath: (path) => dispatch(actions.setRedirectPath(path)),
    // providerProfile: (userId) => dispatch(actions.providerProfile(userId)),
    onSwitch: (userId, availability) =>
      dispatch(actions.onSwitch(userId, availability)),
    onLocationUpdate: (providerId, latitude, longitude) =>
      dispatch(actions.providerUpdateLocation(providerId, latitude, longitude)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProviderProfile);

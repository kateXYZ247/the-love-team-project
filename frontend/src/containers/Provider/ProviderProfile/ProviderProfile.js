import React, { useEffect } from "react";
import ProviderInfo from "../../../components/ProviderProfile/ProviderInfo";
import ProviderPhoto from "../../../components/ProviderProfile/ProviderPhoto";
import { Box, Grid } from "@material-ui/core";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";

function ProviderProfile(props) {
  const {
    userId,
    firstName,
    lastName,
    phone,
    address,
    productName,
    providerProfile,
    onSwitch,
    avail,
  } = props;

  // useEffect(() => {
  //   providerProfile(userId);
  // }, [userId, providerProfile]);

  function handleSwitch(availability) {
    onSwitch(userId, availability);
  }

  return (
    <React.Fragment>
      <Grid container justify="center">
        <Box display="flex" mt={3} align="flex-start">
          <ProviderPhoto avail={avail} handleSwitch={handleSwitch} />
        </Box>

        <Box mt={3}>
          <ProviderInfo
            firstName={firstName}
            lastName={lastName}
            phone={phone}
            address={address}
            productName={productName}
          />
        </Box>
      </Grid>
    </React.Fragment>
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // providerProfile: (userId) => dispatch(actions.providerProfile(userId)),
    onSwitch: (userId, availability) =>
      dispatch(actions.onSwitch(userId, availability)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProviderProfile);

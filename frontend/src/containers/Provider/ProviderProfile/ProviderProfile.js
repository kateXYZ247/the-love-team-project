import React, {useEffect, useState} from "react";
import ProviderInfo from "../../../components/ProviderProfile/ProviderInfo";
import ProviderPhoto from "../../../components/ProviderProfile/ProviderPhoto";
import {Box, Grid} from "@material-ui/core";
import * as actions from "../../../store/actions";
import {connect} from "react-redux";


function ProviderProfile(props) {
    const { userId, token, firstName, lastName, phone, address, productName, providerProfile, onSwitch} = props;

    useEffect(() => {
        providerProfile(userId, token);
    }, [userId, token, providerProfile]);



    function handleSwitch(availability) {
        console.log(availability);
        onSwitch(userId, token, availability);

    }

  return (
      <React.Fragment>
          <Grid container justify="center">
              <Box display="flex" mt={3} align="flex-start">
                  <ProviderPhoto
                      handleSwitch={handleSwitch}
                  />
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
        firstName: state.providerProfile.firstName,
        lastName: state.providerProfile.lastName,
        phone: state.providerProfile.phone,
        address: state.providerProfile.address,
        userId: state.auth.userId,
        token: state.auth.token,
        productName: state.providerProfile.productName,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        providerProfile: (userId, token) => dispatch(actions.providerProfile(userId, token)),
        onSwitch: (userId, token, availability) => dispatch(actions.onSwitch(userId, token, availability)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProviderProfile);


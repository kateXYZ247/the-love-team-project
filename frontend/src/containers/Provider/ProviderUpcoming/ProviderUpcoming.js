import React, { useEffect } from "react";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import { PROVIDER_FETCH_SERVICES_TYPE } from "../../../constant/provider";
import BackdropProgressCircle from "../../../components/UI/BackdropProgressCircle/BackdropProgressCircle";
import { Box, Typography } from "@material-ui/core";

function ProviderUpcoming(props) {
  const { userId, loading, services, onFetchUpcomingServices } = props;

  useEffect(() => {
    onFetchUpcomingServices(userId);
  }, [userId, onFetchUpcomingServices]);
  console.log(services);

  return (
    <React.Fragment>
      <BackdropProgressCircle open={loading} />
      <Box mb={2}>
        <Typography variant="h5" align="center" color="primary">
          Upcoming Services
        </Typography>
      </Box>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    loading: state.provider.loading,
    services: state.provider.services,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUpcomingServices: (userId) =>
      dispatch(
        actions.fetchServices(
          PROVIDER_FETCH_SERVICES_TYPE.upcomingServices,
          userId
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProviderUpcoming);

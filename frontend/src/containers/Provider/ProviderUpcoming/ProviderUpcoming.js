import React, { useEffect } from "react";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import { PROVIDER_FETCH_SERVICES_TYPE } from "../../../constant/provider";
import BackdropProgressCircle from "../../../components/UI/BackdropProgressCircle/BackdropProgressCircle";
import { Box, Typography } from "@material-ui/core";
import ProviderUpcomingServiceCard from "../../../components/ProviderUpcomingServiceCard/ProviderUpcomingServiceCard";
import Grid from "@material-ui/core/Grid";

function ProviderUpcoming(props) {
  const { userId, loading, services, onFetchUpcomingServices } = props;

  useEffect(() => {
    onFetchUpcomingServices(userId);
  }, [userId, onFetchUpcomingServices]);

  const contactHandler = (customerUserId) => {
    console.log(customerUserId);
  };

  const actionHandler = (serviceId) => {
    console.log(serviceId);
  };

  return (
    <React.Fragment>
      <BackdropProgressCircle open={loading} />
      <Box mb={2}>
        <Typography variant="h5" align="center" color="primary">
          Upcoming Services
        </Typography>
      </Box>
      <Box p={3}>
        <Grid container spacing={2} justify="space-around">
          {services.map((service, index) => (
            <ProviderUpcomingServiceCard
              service={service}
              key={index}
              onContact={() => contactHandler(service.userId)}
              onAction={() => actionHandler(service.serviceId)}
              actionButtonText="Cancel"
            />
          ))}
        </Grid>
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

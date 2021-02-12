import React, { useEffect } from "react";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import { PROVIDER_FETCH_SERVICES_TYPE } from "../../../constant/provider";
import BackdropProgressCircle from "../../../components/UI/BackdropProgressCircle/BackdropProgressCircle";
import { Box, Typography } from "@material-ui/core";
import ProviderUpcomingServiceCard from "../../../components/ProviderUpcomingServiceCard/ProviderUpcomingServiceCard";
import Grid from "@material-ui/core/Grid";
import { SERVICE_UPDATE_SOURCE } from "../../../constant/service";

function ProviderUpcoming(props) {
  const {
    userId,
    loading,
    services,
    providerLatitude,
    providerLongitude,
    onFetchUpcomingServices,
    onUpdateServiceStatus,
  } = props;

  useEffect(() => {
    onFetchUpcomingServices(userId);
  }, [userId, onFetchUpcomingServices]);

  const contactHandler = (customerUserId) => {
    console.log(customerUserId);
  };

  return (
    <React.Fragment>
      <BackdropProgressCircle open={loading} />
      <Box mb={2}>
        <Typography variant="h5" align="center" color="primary">
          Upcoming Services
        </Typography>
      </Box>
      <Box p={5}>
        <Grid container justify="center" spacing={5}>
          {services.map((service, index) => (
            <ProviderUpcomingServiceCard
              service={service}
              providerLocation={{
                latitude: providerLatitude,
                longitude: providerLongitude,
              }}
              key={index}
              onContact={() => contactHandler(service.userId)}
              onAction={(updatedStatus) =>
                onUpdateServiceStatus(
                  index,
                  service.serviceId,
                  userId,
                  updatedStatus
                )
              }
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
    providerLatitude: state.auth.userDetail.latitude,
    providerLongitude: state.auth.userDetail.longitude,
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
    onUpdateServiceStatus: (
      serviceIndex,
      serviceId,
      providerId,
      updatedStatus
    ) =>
      dispatch(
        actions.updateServiceStatus(
          serviceIndex,
          serviceId,
          providerId,
          updatedStatus,
          SERVICE_UPDATE_SOURCE.fetchedRequests
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProviderUpcoming);

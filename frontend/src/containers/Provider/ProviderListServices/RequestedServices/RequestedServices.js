import React, { useEffect, useState } from "react";
import * as actions from "../../../../store/actions";
import { connect } from "react-redux";
import { Box, Grid, Typography } from "@material-ui/core";
import BackdropProgressCircle from "../../../../components/UI/BackdropProgressCircle/BackdropProgressCircle";
import { PROVIDER_FETCH_SERVICES_TYPE } from "../../../../constant/provider";
import {
  SERVICE_STATUS,
  SERVICE_UPDATE_SOURCE,
} from "../../../../constant/service";
import ProviderListRequestCard from "../../../../components/ProviderListRequestCard/ProviderListRequestCard";

function RequestedServices(props) {
  const {
    userId,
    loading,
    requests,
    onFetchRequests,
    onAcceptRequest,
    onDeclineRequest,
  } = props;
  const [deleted, setDeleted] = useState(requests.map(() => false));

  useEffect(() => {
    onFetchRequests(userId);
  }, [userId, onFetchRequests]);

  useEffect(() => setDeleted(requests.map(() => false)), [requests]);

  const declineButtonClickedHandler = (index) => {
    setDeleted(deleted.map((e, i) => (i === index ? true : e)));
    setTimeout(() => onDeclineRequest(index), 500);
  };

  const requestAcceptedHandler = (serviceIndex, serviceId) =>
    onAcceptRequest(serviceIndex, serviceId, userId, SERVICE_STATUS.accepted);

  return (
    <React.Fragment>
      <BackdropProgressCircle open={loading} />
      <Box mb={2}>
        <Typography variant="h5" align="center" color="primary">
          New Customer Requests
        </Typography>
      </Box>
      <Box p={5}>
        <Grid container justify="center" spacing={5}>
          {requests.map((request, index) => (
            <ProviderListRequestCard
              key={index}
              request={request}
              onAccept={() => requestAcceptedHandler(index, request.serviceId)}
              onDecline={() => declineButtonClickedHandler(index)}
              onDelete={deleted[index]}
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
    requests: state.provider.requests,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchRequests: (userId) =>
      dispatch(
        actions.fetchServices(PROVIDER_FETCH_SERVICES_TYPE.requests, userId)
      ),
    onDeclineRequest: (index) =>
      dispatch(
        actions.declineRequest(index, SERVICE_UPDATE_SOURCE.fetchedRequests)
      ),
    onAcceptRequest: (serviceIndex, serviceId, providerId, updatedStatus) =>
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

export default connect(mapStateToProps, mapDispatchToProps)(RequestedServices);

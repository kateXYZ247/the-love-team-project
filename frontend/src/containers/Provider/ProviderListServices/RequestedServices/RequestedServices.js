import React, { useEffect, useState } from "react";
import * as actions from "../../../../store/actions";
import { connect } from "react-redux";
import {
  Box,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from "@material-ui/core";
import ProviderListServicesTableRow from "../../../../components/ProviderListServicesTableRow/ProviderListServicesTableRow";
import BackdropProgressCircle from "../../../../components/UI/BackdropProgressCircle/BackdropProgressCircle";
import { PROVIDER_FETCH_SERVICES_TYPE } from "../../../../constant/provider";
import {
  SERVICE_STATUS,
  SERVICE_UPDATE_SOURCE,
} from "../../../../constant/service";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TableTitleCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    fontSize: 20,
  },
  body: {},
}))(TableCell);

function RequestedServices(props) {
  const {
    userId,
    loading,
    requests,
    onFetchRequests,
    onAcceptRequest,
    onDeclineRequest,
  } = props;
  const classes = useStyles();
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
      <Grid container justify="center">
        <Grid item xs={11}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableTitleCell>Date</TableTitleCell>
                  <TableTitleCell>Location</TableTitleCell>
                  <TableTitleCell>Service</TableTitleCell>
                  <TableTitleCell>Pets</TableTitleCell>
                  <TableTitleCell align="center">Actions</TableTitleCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request, index) => (
                  <ProviderListServicesTableRow
                    key={index}
                    request={request}
                    onAccept={() =>
                      requestAcceptedHandler(index, request.serviceId)
                    }
                    onDecline={() => declineButtonClickedHandler(index)}
                    onDelete={deleted[index]}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
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

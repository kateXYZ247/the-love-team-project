import React, { useEffect } from "react";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { FETCH_ORDERS_TYPE } from "../../constant/order";
import { Box, Typography } from "@material-ui/core";
import BackdropProgressCircle from "../../components/UI/BackdropProgressCircle/BackdropProgressCircle";
import UpcommingAppointmentCard from "../../components/Order/UpcomingAppintmentCard/UpcommingAppointmentCard";
import Grid from "@material-ui/core/Grid";

function Appointments(props) {
  const {
    userId,
    loading,
    onFetchOrders,
    upcomingServices,
    onUpdateServiceStatus,
  } = props;

  useEffect(() => {
    onFetchOrders(userId);
  }, [userId, onFetchOrders]);

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
      <Box p={3}>
        <Grid container spacing={2} justify="space-around">
          {upcomingServices
            .map((service, index) => (
              <UpcommingAppointmentCard
                service={service}
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
    loading: state.order.loading,
    upcomingServices: state.order.upcomingServices,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (userId) => dispatch(actions.fetchOrders(
      FETCH_ORDERS_TYPE.upcomingAppointments,
      userId)),
    onUpdateServiceStatus: (
      serviceIndex,
      serviceId,
      userId,
      updatedStatus
    ) =>
      dispatch(
        actions.userUpdateServiceStatus(
          serviceIndex,
          serviceId,
          userId,
          updatedStatus
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);

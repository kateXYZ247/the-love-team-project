import React, { useEffect } from "react";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { FETCH_ORDERS_TYPE } from "../../constant/order";
import { Box, Typography } from "@material-ui/core";
import BackdropProgressCircle from "../../components/UI/BackdropProgressCircle/BackdropProgressCircle";
import UpcomingAppointmentCard from "../../components/UpcomingAppointmentCard/UpcomingAppointmentCard";
import Grid from "@material-ui/core/Grid";

function Appointments(props) {
  const {
    userId,
    loading,
    onFetchOrders,
    upcomingOrders,
    onUpdateOrderStatus,
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
          Upcoming Appointments
        </Typography>
      </Box>
      <Box p={5}>
        <Grid container spacing={5} justify="center">
          {upcomingOrders.map((order, index) => (
            <UpcomingAppointmentCard
              order={order}
              key={index}
              onContact={() => contactHandler(order.userId)}
              onAction={(updatedStatus) =>
                onUpdateOrderStatus(index, order.orderId, userId, updatedStatus)
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
    upcomingOrders: state.order.upcomingOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (userId) =>
      dispatch(
        actions.fetchOrders(FETCH_ORDERS_TYPE.upcomingAppointments, userId)
      ),
    onUpdateOrderStatus: (orderIndex, orderId, userId, updatedStatus) =>
      dispatch(
        actions.userUpdateOrderStatus(
          orderIndex,
          orderId,
          userId,
          updatedStatus
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);

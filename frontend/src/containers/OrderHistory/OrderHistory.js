import React, { useEffect, useState } from "react";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import ProgressCircle from "../../components/UI/ProgressCircle/ProgressCircle";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import OrderHistoryTableRow from "../../components/Order/OrderHistoryTableRow/OrderHistoryTableRow";

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

function OrderHistory(props) {
  const {
    loading,
    onFetchOrders,
    onMessageClose,
    orders,
  } = props;

  const classes = useStyles();

  useEffect(() => {
    onFetchOrders();
  }, [onFetchOrders]);

  return loading ? (
    <ProgressCircle label={"Loading Order History ..."} />
  ) : (
      <Grid container justify="center">
        <Grid item xs={11}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableTitleCell />
                  <TableTitleCell>Order Date</TableTitleCell>
                  <TableTitleCell>Service Date</TableTitleCell>
                  <TableTitleCell>Services</TableTitleCell>
                  <TableTitleCell align="right">Total Price ($)</TableTitleCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {console.log(orders)}
                {orders.map((order) => (
                  // eslint-disable-next-line react/jsx-no-undef
                  <OrderHistoryTableRow key={order.orderId} order={order} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
}


const mapStateToProps = (state) => {
  return {
    loading: state.order.loading,
    orders: state.order.orderHistory
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);

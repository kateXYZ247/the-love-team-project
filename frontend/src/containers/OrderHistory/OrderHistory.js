import React from "react";
import { sampleOrderHistory } from "../../constant/order";
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
  const classes = useStyles();

  return (
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
              {sampleOrderHistory.map((order) => (
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

export default OrderHistory;

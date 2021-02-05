import React, { useState } from "react";
import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { lighten } from "@material-ui/core";
import { LOCAL_TIME_OPTIONS } from "../../../constant/constant";

const MainTableRow = withStyles((theme) => ({
  hover: {
    "&$hover:hover": {
      backgroundColor: lighten(theme.palette.primary.light, 0.3),
    },
  },
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: lighten(theme.palette.secondary.light, 0.8),
    },
  },
}))(TableRow);

const SubTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: lighten(theme.palette.secondary.light, 0.7),
    },
  },
}))(TableRow);

const TableTitleCell = withStyles((theme) => ({
  head: {
    color: theme.palette.secondary.dark,
    fontSize: 16,
  },
  body: {},
}))(TableCell);

function OrderHistoryTableRow(props) {
  const [open, setOpen] = useState(false);
  const { order } = props;
  const { totalPrice, servs, createdAt } = order;
  const orderDate = new Date(createdAt);
  const serviceDate =
    servs.length === 0 ? new Date(0) : new Date(servs[0].startTime);
  const serviceEndDate =
    servs.length === 0 ? new Date(0) : new Date(servs[0].endTime);
  const diff = serviceEndDate - serviceDate; // milliseconds
  const durationInMintues = diff / 1000 / 60;
  let orderStatus = order.status;
  const numberOfService = servs.length;
  const acceptedService = servs.filter((serv) => serv.status === "accepted");
  // const servicesNames = [
  //   ...servs.reduce((acc, s) => acc.add(s.name), new Set()).values(),
  // ].join(", ");
  const servicesNames = [
    ...servs.reduce((acc, s) => acc.add(s.productName), new Set()).values(),
  ].join(", ");

  if (orderStatus === "requested" || orderStatus === "accepted") {
    orderStatus =
      "(" + acceptedService.length + "/" + numberOfService + ") accepted";
  }

  const rowClickedHandler = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment key={order.orderId}>
      <MainTableRow hover onClick={rowClickedHandler}>
        <TableCell>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </TableCell>
        <TableCell component="th" scope="row">
          {orderDate.toDateString()}
        </TableCell>
        <TableCell>{serviceDate.toDateString()}</TableCell>
        <TableCell>{servicesNames}</TableCell>
        <TableCell>{orderStatus}</TableCell>
        <TableCell align="right">{totalPrice.toFixed(2)}</TableCell>
      </MainTableRow>
      <MainTableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Services
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableTitleCell>Name</TableTitleCell>
                    <TableTitleCell>Time</TableTitleCell>
                    <TableTitleCell>Duration (min)</TableTitleCell>
                    <TableTitleCell>Status</TableTitleCell>
                    <TableTitleCell align="right">price ($)</TableTitleCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {servs.map((service) => (
                    <SubTableRow key={service.serviceId}>
                      <TableCell component="th" scope="row">
                        {service.productName}
                      </TableCell>
                      <TableCell>
                        {new Date(service.startTime).toLocaleTimeString(
                          [],
                          LOCAL_TIME_OPTIONS
                        )}
                      </TableCell>
                      <TableCell>
                        {Math.round(durationInMintues / 5) * 5}
                      </TableCell>
                      <TableCell>{service.status}</TableCell>
                      <TableCell align="right">
                        {service.productPrice &&
                          service.productPrice.toFixed(2)}
                      </TableCell>
                    </SubTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </MainTableRow>
    </React.Fragment>
  );
}

export default OrderHistoryTableRow;

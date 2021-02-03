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
  const { total_price, servs } = order;
  const orderDate = (servs.length === 0) ? new Date(0) : new Date(servs[0].created_at);
  const serviceDate = (servs.length === 0) ? new Date(0) : new Date(servs[0].startTime);
  const servicesNames = [
    ...servs.reduce((acc, s) => acc.add(s.name), new Set()).values(),
  ].join(", ");

  const rowClickedHandler = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <MainTableRow hover onClick={rowClickedHandler}>
        <TableCell>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </TableCell>
        <TableCell component="th" scope="row">
          {orderDate.toDateString()}
        </TableCell>
        <TableCell>{serviceDate.toDateString()}</TableCell>
        <TableCell>{servicesNames}</TableCell>
        <TableCell align="right">{total_price}</TableCell>
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
                    <TableTitleCell align="right">price ($)</TableTitleCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {servs.map((service, idx) => (
                    <SubTableRow key={idx}>
                      <TableCell component="th" scope="row">
                        {service.name}
                      </TableCell>
                      <TableCell>
                        {new Date(service.startTime).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>{service.duration}</TableCell>
                      <TableCell align="right">{service.price}</TableCell>
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

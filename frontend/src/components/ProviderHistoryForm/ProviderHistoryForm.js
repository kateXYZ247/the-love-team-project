import React from "react";
import {
  Fade,
  lighten,
  TableCell,
  TableRow,
  withStyles,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const MainTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: lighten(theme.palette.secondary.light, 0.8),
    },
  },
}))(TableRow);

function ProviderHistoryForm(props) {
  const { request } = props;

  return (
    <Fade>
      <MainTableRow hover>
        <TableCell component="th" scope="row">
          {request.startTime.toLocaleString()}
        </TableCell>
        <TableCell>{request.orderId}</TableCell>
        <TableCell>{request.address}</TableCell>
        <TableCell>{request.serviceId}</TableCell>
        <TableCell>{request.status}</TableCell>
        <TableCell>{request.subprice}</TableCell>
      </MainTableRow>
    </Fade>
  );
}

export default ProviderHistoryForm;

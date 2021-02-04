import React from "react";
import { lighten, TableCell, TableRow, withStyles } from "@material-ui/core";

const MainTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: lighten(theme.palette.secondary.light, 0.8),
    },
  },
}))(TableRow);

function ProviderHistoryForm(props) {
  const { service } = props;

  return (
    <MainTableRow hover>
      <TableCell component="th" scope="row" align="center">
        {service.startTime.toLocaleString()}
      </TableCell>
      <TableCell align="center">{service.orderId}</TableCell>
      <TableCell align="center">{service.address}</TableCell>
      <TableCell align="center">{service.serviceId}</TableCell>
      <TableCell align="center">{service.status}</TableCell>
      <TableCell align="center">{service.subprice}</TableCell>
    </MainTableRow>
  );
}

export default ProviderHistoryForm;

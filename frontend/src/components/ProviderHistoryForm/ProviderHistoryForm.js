import React from "react";
import { lighten, TableCell, TableRow, withStyles } from "@material-ui/core";
import {
  LOCAL_DATETIME_OPTIONS,
  LOCAL_TIME_OPTIONS,
} from "../../constant/constant";

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
        {service.startTime.toLocaleString([], LOCAL_DATETIME_OPTIONS)} -{" "}
        {service.endTime.toLocaleString([], LOCAL_TIME_OPTIONS)}
      </TableCell>
      <TableCell align="center">{service.serviceId}</TableCell>
      <TableCell align="center">{service.address}</TableCell>
      <TableCell align="center">{service.productName}</TableCell>
      <TableCell align="center">{service.status}</TableCell>
      <TableCell align="center">
        {service.productPrice && service.productPrice.toFixed(2)}
      </TableCell>
    </MainTableRow>
  );
}

export default ProviderHistoryForm;

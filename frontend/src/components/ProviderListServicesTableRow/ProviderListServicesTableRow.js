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
import Box from "@material-ui/core/Box";
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

function ProviderListServicesTableRow(props) {
  const { request, onAccept, onDecline, onDelete } = props;

  return (
    <Fade in={!onDelete}>
      <MainTableRow hover>
        <TableCell component="th" scope="row">
          {request.startTime.toLocaleString([], LOCAL_DATETIME_OPTIONS) +
            " - " +
            request.endTime.toLocaleString([], LOCAL_TIME_OPTIONS)}
        </TableCell>
        <TableCell>{request.address}</TableCell>
        <TableCell>{request.productName}</TableCell>
        <TableCell>{request.pets}</TableCell>
        <TableCell style={{ minWidth: "200px" }}>
          <Grid container spacing={2} justify="space-around">
            <Grid item xs={5}>
              <Box mx={1}>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={onAccept}
                >
                  Accept
                </Button>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box mx={1}>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={onDecline}
                >
                  Decline
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TableCell>
      </MainTableRow>
    </Fade>
  );
}

export default ProviderListServicesTableRow;

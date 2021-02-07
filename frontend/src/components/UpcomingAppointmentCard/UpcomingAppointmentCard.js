import React from "react";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import UpcomingAppointmentItem from "./UpcomingAppointmentItem/UpcomingAppointmentItem";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import { lighten } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { LOCAL_DATETIME_OPTIONS } from "../../constant/constant";
import {
  SERVICE_CANCELABLE_MIN_DAYS,
  SERVICE_STATUS,
} from "../../constant/service";
import { ORDER_STATUS } from "../../constant/order";

const SubTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: lighten(theme.palette.secondary.light, 0.7),
    },
  },
}))(TableRow);

function UpcommingServiceCard(props) {
  const { order, onAction } = props;
  const services = order.servs;
  const service = services[0];
  const startTime = new Date(service.startTime);
  const currentTime = new Date();
  const isStarted = !services.every((service) => service.status === SERVICE_STATUS.accepted);
  const serviceDate =
    services.length === 0 ? new Date(0) : new Date(services[0].startTime);
  const serviceEndDate =
    services.length === 0 ? new Date(0) : new Date(services[0].endTime);
  const diff = serviceEndDate - serviceDate; // milliseconds
  const durationInMintues = diff / 1000 / 60;  // cancel button
  const cancelButton =
    startTime - currentTime > SERVICE_CANCELABLE_MIN_DAYS
      &&
      !isStarted
      ? (
        <Box component={"span"} mx={1}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onAction(ORDER_STATUS.canceled)}
          >
            Cancel
        </Button>
        </Box >
      ) : null;

  return (
    <Grid item xs={11} sm={8}>
      <Box mt={2}>
        <Paper elevation={5}>
          <Box p={2}>
            <Grid container spacing={0}>
              <UpcomingAppointmentItem
                fontSize="h6"
                label="Date"
                value={
                  startTime.toLocaleString([], LOCAL_DATETIME_OPTIONS)
                }
              />
              <UpcomingAppointmentItem
                fontSize="h6"
                label="Status"
                // value={isStarted ? "Started" : order.status}
                value={order.status}
              />
              <UpcomingAppointmentItem
                labelLgWidth={1}
                valueLgWidth={11}
                label="Location"
                value={service.address}
              />
              <UpcomingAppointmentItem
                label="Direction"
                value={service.direction ? service.direction : "None"}
              />
              <UpcomingAppointmentItem
                label="Pets"
                value={service.pets ? service.pets : "None"}
              />
              <UpcomingAppointmentItem
                labelLgWidth={1}
                valueLgWidth={11}
                label="Note"
                value={service.note ? service.note : "None"}
              />

              <UpcomingAppointmentItem
                labelLgWidth={1}
                valueLgWidth={11}
                label="Services"
                value={" "}
              />

              <Grid item xs={12}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Duration (min)</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {services.map((service) => (
                      <SubTableRow key={service.serviceId}>
                        <TableCell component="th" scope="row">
                          {service.productName}
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
              </Grid>

              <Grid item xs={12} lg={6}>
                <Box mt={3}>
                  {cancelButton}
                </Box>
              </Grid>

            </Grid>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}

export default UpcommingServiceCard;
import React from "react";
import "date-fns";
import { Card, CardContent, Grid } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import classes from "./DateTimePicker.module.css";
import CardTitle from "../CardTitle/CardTitle";

function DateTimePicker(props) {
  const { date, dateChangedHandler } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <CardTitle>When do you want to book?</CardTitle>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Pick Service Date"
              format="MM/dd/yyyy"
              value={date}
              onChange={dateChangedHandler}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Pick Service Time"
              minutesStep={5}
              value={date}
              onChange={dateChangedHandler}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </CardContent>
    </Card>
  );
}

export default DateTimePicker;

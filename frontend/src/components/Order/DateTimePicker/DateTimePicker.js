import React from "react";
import "date-fns";
import { Box, Card, CardContent, Grid } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import CardTitle from "../CardTitle/CardTitle";

function DateTimePicker(props) {
  const { date, dateChangedHandler } = props;
  return (
    <Grid container justify="center">
      <Grid item xs={10} lg={6} justify="center">
        <Card>
          <CardContent>
            <CardTitle>When do you want to book?</CardTitle>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Box p={5}>
                <Grid container justify="space-around" spacing={3}>
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
              </Box>
            </MuiPickersUtilsProvider>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default DateTimePicker;

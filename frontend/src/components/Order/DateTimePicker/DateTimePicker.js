import React from 'react';
import 'date-fns';
import {Card, CardContent, Grid} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import classes from "./DateTimePicker.module.css"

function DateTimePicker(props) {
  const {date, DateChangeHandler} = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.title}>When do you want to book?</div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Pick Service Date"
              format="MM/dd/yyyy"
              value={date}
              onChange={DateChangeHandler}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Pick Service Time"
              value={date}
              onChange={DateChangeHandler}
              KeyboardButtonProps={{
                'aria-label': 'change time'
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </CardContent>
    </Card>
  );
}

export default DateTimePicker;
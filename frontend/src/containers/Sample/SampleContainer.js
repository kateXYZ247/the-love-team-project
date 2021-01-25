import React, {useState} from "react";
import Sample from "../../components/Sample/Sample";
import {Chip} from "@material-ui/core";
import DateTimePicker from "../../components/Order/DateTimePicker/DateTimePicker";

function SampleContainer(props) {
  const [date, setDate] = useState(new Date());
  console.log(date);
  const onDateChanged = (updatedDate) => {
    setDate(updatedDate);
  }

  return (
    <div>
      <Chip color="primary" label="This is a Sample Container"/>
      <Sample clicked={props.clicked}/>
      <DateTimePicker date={date} DateChangeHandler={onDateChanged}/>
    </div>
  );
}

export default SampleContainer;

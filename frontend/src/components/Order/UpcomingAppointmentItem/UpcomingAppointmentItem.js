import React from 'react';
import TextGrid from "../../UI/TextGrid/TextGrid";


function UpcomingAppointmentItem(props) {
  let { fontSize, textColor, labelLgWidth, valueLgWidth } = props;
  const { label, value } = props;
  if (fontSize === undefined) {
    fontSize = "body1";
  }
  if (textColor === undefined) {
    textColor = "textPrimary";
  }
  if (labelLgWidth === undefined) {
    labelLgWidth = 1;
  }
  if (valueLgWidth === undefined) {
    valueLgWidth = 5;
  }
  return (
    <React.Fragment>
      <TextGrid
        xs={3}
        sm={2}
        lg={labelLgWidth}
        fontSize={fontSize}
        textColor={textColor}
        text={label}
      />
      <TextGrid
        xs={9}
        sm={10}
        lg={valueLgWidth}
        fontSize={fontSize}
        textColor={textColor}
        text={": " + value}
      />
    </React.Fragment>
  );
}

export default UpcomingAppointmentItem;
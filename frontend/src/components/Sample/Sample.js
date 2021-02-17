import React from "react";
import { Chip } from "@material-ui/core";
import ColorButton from "../UI/Buttons/ColorButton";

function Sample(props) {
  return (
    <div>
      <ColorButton color="primary" onClick={props.clicked}>
        Button OK
      </ColorButton>
      <Chip color="primary" label="Chip OK" onClick={props.clicked} />
      <div>REACT_APP_SAMPLE: {process.env.REACT_APP_SAMPLE}</div>
    </div>
  );
}

export default Sample;

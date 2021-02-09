import React from "react";
import { Button, Chip } from "@material-ui/core";

function Sample(props) {
  return (
    <div>
      <Button color="primary" onClick={props.clicked}>
        Button OK
      </Button>
      <Chip color="primary" label="Chip OK" onClick={props.clicked} />
      <span>REACT_APP_SAMPLE: {process.env.REACT_APP_SAMPLE}</span>
    </div>
  );
}

export default Sample;

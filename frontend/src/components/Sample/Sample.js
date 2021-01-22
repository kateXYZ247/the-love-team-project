import React from "react";
import { Button } from "@material-ui/core";

function Sample(props) {
  return (
    <div>
      <Button color="primary" onClick={props.clicked}>
        OK
      </Button>
    </div>
  );
}

export default Sample;

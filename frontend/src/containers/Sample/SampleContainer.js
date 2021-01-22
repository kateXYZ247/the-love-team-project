import React from "react";
import Sample from "../../components/Sample/Sample";
import { Chip } from "@material-ui/core";

function SampleContainer(props) {
  return (
    <div>
      <Chip color="primary" label="This is a Sample Container" />
      <Sample clicked={props.clicked} />
    </div>
  );
}

export default SampleContainer;

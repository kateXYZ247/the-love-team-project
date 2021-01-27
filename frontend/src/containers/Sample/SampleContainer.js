import React from "react";
import Sample from "../../components/Sample/Sample";
import { Chip } from "@material-ui/core";
import OrderInfo from "../Order/OrderInfo/OrderInfo";
import Register from "../Register/Register";
function SampleContainer(props) {
  return (
    <div>
      {/*<Chip color="primary" label="This is a Sample Container" />*/}
      {/*<Sample clicked={props.clicked} />*/}
      <Register />
      <OrderInfo />

    </div>
  );
}

export default SampleContainer;

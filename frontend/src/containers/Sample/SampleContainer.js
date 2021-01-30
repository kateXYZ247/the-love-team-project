import React from "react";
import Sample from "../../components/Sample/Sample";
import { Chip } from "@material-ui/core";

import OrderInfo from "../Order/OrderInfo/OrderInfo";
import Register from "../Register/Register";

import * as actions from "../../store/actions/index";
import { connect } from "react-redux";


function SampleContainer(props) {
  return (
    <div>

      {/*<Chip color="primary" label="This is a Sample Container" />*/}
      {/*<Sample clicked={props.clicked} />*/}
      {/*<Register />*/}
      {/*<OrderInfo />*/}


      <Chip color="primary" label="This is a Sample Container" />
      <Sample clicked={props.clicked} />
<<<<<<< HEAD

      {/*<PaymentInfo />*/}



=======
>>>>>>> refs/remotes/origin/XH_frontend_order
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(actions.fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SampleContainer);

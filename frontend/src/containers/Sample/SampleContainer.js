import React, { useEffect } from "react";
import Sample from "../../components/Sample/Sample";
import { Chip } from "@material-ui/core";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import PaymentInfo from "../Order/PaymentInfo/PaymentInfo";

function SampleContainer(props) {
  const { onFetchProducts } = props;

  useEffect(() => {
    onFetchProducts();
  }, []);

  return (
    <div>
      <Chip color="primary" label="This is a Sample Container" />
      <Sample clicked={props.clicked} />
      <PaymentInfo />
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

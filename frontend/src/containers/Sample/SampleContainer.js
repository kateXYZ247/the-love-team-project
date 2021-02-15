import React from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Sample from "../../components/Sample/Sample";

function SampleContainer(props) {
  return <Sample />;
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    products: state.products.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(actions.fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SampleContainer);

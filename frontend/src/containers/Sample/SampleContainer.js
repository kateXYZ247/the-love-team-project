import React from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import StatusPieChart from "../../components/AdminPanel/StatusPieChart";

function SampleContainer(props) {
  return <StatusPieChart />;
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

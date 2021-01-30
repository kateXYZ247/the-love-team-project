import React from "react";
import Sample from "../../components/Sample/Sample";
import { Chip } from "@material-ui/core";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

function SampleContainer(props) {
  return (
    <div>
      <Chip color="primary" label="This is a Sample Container" />
      <Sample clicked={props.clicked} />
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

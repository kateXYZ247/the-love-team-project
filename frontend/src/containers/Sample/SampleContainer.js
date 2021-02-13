import React, { useEffect } from "react";
import Sample from "../../components/Sample/Sample";
import { Chip } from "@material-ui/core";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { TOKEN_PREFIX } from "../../constant/auth";
import {
  WS_PATH_PROVIDERS,
  WS_PATH_REPLY,
  WS_PATH_USER,
} from "../../constant/api";

import AdminLoginForm from "../../components/AdminLogin/AdminLoginForm";
import StatusPieChart from "../../components/AdminPanel/StatusPieChart";
import GoogleMapSample from "../../components/Sample/GoogleMapSample";

function SampleContainer(props) {
  return <StatusPieChart/>;
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

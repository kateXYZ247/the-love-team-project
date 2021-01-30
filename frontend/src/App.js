import React, { Suspense } from "react";

import "./App.css";
import Layout from "./hoc/Layout/Layout";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import Order from "./containers/Order/Order";
import CustomerLogin from "./containers/CustomerLogin/CustomerLogin";
import SampleContainer from "./containers/Sample/SampleContainer";
import OrderHistory from "./containers/OrderHistory/OrderHistory";
import {
  PATH_HISTORY,
  PATH_HOME,
  PATH_LOGIN,
  PATH_ORDER,
  PATH_TEST,
} from "./constant/path";

function App(props) {
  let routes = (
    <Switch>
      <Route path={PATH_ORDER} exact component={Order} />
      <Route
        path={PATH_LOGIN}
        render={(props) => <CustomerLogin {...props} />}
      />
      <Route
        path={PATH_TEST}
        render={(props) => <SampleContainer {...props} />}
      />
      <Route path={PATH_HOME} exact component={Home} />
      <Redirect to={PATH_HOME} />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path={PATH_ORDER} exact component={Order} />
        <Route path={PATH_HISTORY} exact component={OrderHistory} />
        <Route path={PATH_HOME} exact component={Home} />
        <Route path={PATH_LOGIN} exact component={CustomerLogin} />
        <Route
          path={PATH_TEST}
          render={(props) => <SampleContainer {...props} />}
        />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Layout>
      <Suspense fallback={<p>loading ...</p>}>{routes}</Suspense>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(App);

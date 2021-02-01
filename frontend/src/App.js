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
  PATH_PROVIDER_HOME,
  PATH_PROVIDER_LOGIN,
  PATH_TEST,
} from "./constant/path";
import { AUTH_ROLE } from "./constant/auth";
import ProviderLogin from "./containers/ProviderLogin/ProviderLogin";

function App(props) {
  const { isAuthenticated, role } = props;
  let routes = (
    <Switch>
      <Route path={PATH_ORDER} exact component={Order} />
      <Route
        path={PATH_LOGIN}
        exact
        render={(props) => <CustomerLogin {...props} />}
      />
      <Route
        path={PATH_PROVIDER_LOGIN}
        exact
        render={(props) => <ProviderLogin {...props} />}
      />
      <Route
        path={PATH_TEST}
        render={(props) => <SampleContainer {...props} />}
      />
      <Route path={PATH_HOME} exact component={Home} />
      <Redirect to={PATH_HOME} />
    </Switch>
  );
  if (isAuthenticated) {
    if (role === AUTH_ROLE.user) {
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
          <Redirect to={PATH_HOME} />
        </Switch>
      );
    } else if (role === AUTH_ROLE.provider) {
      routes = (
        <Switch>
          <Route path={PATH_HOME} exact component={Home} />
          <Route path={PATH_PROVIDER_LOGIN} exact component={ProviderLogin} />
          <Route
            path={PATH_TEST}
            render={(props) => <SampleContainer {...props} />}
          />
          <Redirect to={PATH_PROVIDER_HOME} />
        </Switch>
      );
    }
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
    role: state.auth.userDetail.role,
  };
};

export default connect(mapStateToProps)(App);

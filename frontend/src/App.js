import React, { Suspense } from "react";

import "./App.css";
import Layout from "./hoc/Layout/Layout";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import Order from "./containers/Order/Order";
import Login from "./containers/Login/Login";
import SampleContainer from "./containers/Sample/SampleContainer";

import Register from "./containers/Register/Register";

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
import ProviderListServices from "./containers/ProviderListServices/ProviderListServices";

function App(props) {
  const { isAuthenticated, role } = props;
  let routes = (
    <Switch>
      <Route path="/register" render={(props) => <Register {...props} />} />
      <Route path={PATH_ORDER} exact component={Order} />
      <Route
        path={PATH_LOGIN}
        exact
        render={(props) => <Login loginType={AUTH_ROLE.user} {...props} />}
      />
      <Route
        path={PATH_PROVIDER_LOGIN}
        exact
        render={(props) => <Login loginType={AUTH_ROLE.provider} {...props} />}
      />
      <Route
        path={PATH_TEST}
        render={(props) => <SampleContainer {...props} />}
      />
      <Route path={PATH_HOME} exact component={Home} />
      <Route
        path={PATH_PROVIDER_HOME}
        exact
        render={(props) => <ProviderListServices {...props} />}
      />
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
          <Route
            path={PATH_LOGIN}
            exact
            render={(props) => <Login loginType={AUTH_ROLE.user} {...props} />}
          />
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
          <Route
            path={PATH_PROVIDER_HOME}
            exact
            component={ProviderListServices}
          />
          <Route
            path={PATH_PROVIDER_LOGIN}
            exact
            render={(props) => (
              <Login loginType={AUTH_ROLE.provider} {...props} />
            )}
          />
          <Route
            path={PATH_TEST}
            render={(props) => <SampleContainer {...props} />}
          />
          <Redirect render={(props) => <PATH_PROVIDER_HOME {...props} />} />
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

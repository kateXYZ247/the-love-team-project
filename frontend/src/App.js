import React, { Suspense, useEffect } from "react";
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
  PATH_APPOINTMENTS,
  PATH_HISTORY,
  PATH_HOME,
  PATH_LOGIN,
  PATH_ORDER,
  PATH_PROVIDER_HISTORY,
  PATH_PROVIDER_HOME,
  PATH_PROVIDER_LOGIN,
  PATH_PROVIDER_PROFILE,
  PATH_PROVIDER_UPCOMING_SERVICES,
  PATH_REGISTER,
  PATH_TEST,
  PATH_ADMIN_LOGIN,
} from "./constant/path";
import { AUTH_ROLE } from "./constant/auth";
import ProviderListServices from "./containers/Provider/ProviderListServices/ProviderListServices";
import ProviderUpcoming from "./containers/Provider/ProviderUpcoming/ProviderUpcoming";
import ProviderProfile from "./containers/Provider/ProviderProfile/ProviderProfile";
import ProviderHistory from "./containers/Provider/ProviderHistory/ProviderHistory";
import Appointments from "./containers/Appointments/Appointments";
import * as actions from "./store/actions";
import LabeledRoute from "./hoc/LabeledRoute/LabeledRoute";
import RouteComponent from "./hoc/RouteComponent/RouteComponent";
import useScript from "./hooks/useScript";
import { GOOGLE_MAP_SCRIPT_URL } from "./constant/api";

function App(props) {
  const { isAuthenticated, role, stompClient, onDisconnectWebSocket } = props;

  // disconnect websocket on close
  useEffect(() => {
    return () => {
      onDisconnectWebSocket(stompClient);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useScript(GOOGLE_MAP_SCRIPT_URL);

  // default route before login
  // NOTE: order matters
  let routes = (
    <Switch>
      <LabeledRoute path={PATH_REGISTER} exact>
        <Register />
      </LabeledRoute>
      <LabeledRoute path={PATH_ORDER} exact>
        <Order />
      </LabeledRoute>
      <LabeledRoute path={PATH_LOGIN} exact>
        <Login loginType={AUTH_ROLE.user} />
      </LabeledRoute>
      <LabeledRoute path={PATH_PROVIDER_LOGIN} exact>
        <Login loginType={AUTH_ROLE.provider} />
      </LabeledRoute>
      <LabeledRoute path = {PATH_ADMIN_LOGIN} exact>
        <Login loginType={AUTH_ROLE.admin} />
      </LabeledRoute>
      <LabeledRoute path={PATH_TEST} exact>
        <SampleContainer />
      </LabeledRoute>
      <LabeledRoute path={PATH_PROVIDER_HOME} exact>
        <ProviderListServices />
      </LabeledRoute>
      <Route
        path={PATH_HOME}
        exact
        render={() => (
          <RouteComponent path={PATH_HOME}>
            <Home />
          </RouteComponent>
        )}
      />
      <Redirect to={PATH_HOME} />
    </Switch>
  );
  if (isAuthenticated) {
    if (role === AUTH_ROLE.user) {
      routes = (
        <Switch>
          <LabeledRoute path={PATH_ORDER}>
            <Order />
          </LabeledRoute>
          <LabeledRoute path={PATH_HISTORY}>
            <OrderHistory />
          </LabeledRoute>
          <LabeledRoute path={PATH_APPOINTMENTS}>
            <Appointments />
          </LabeledRoute>
          <LabeledRoute path={PATH_LOGIN}>
            <Login loginType={AUTH_ROLE.user} />
          </LabeledRoute>
          <LabeledRoute path={PATH_TEST}>
            <SampleContainer />
          </LabeledRoute>
          <Route
            path={PATH_HOME}
            exact
            render={() => (
              <RouteComponent path={PATH_HOME}>
                <Home />
              </RouteComponent>
            )}
          />
          <Redirect to={PATH_HOME} />
        </Switch>
      );
    } else if (role === AUTH_ROLE.provider) {
      routes = (
        <Switch>
          <LabeledRoute path={PATH_PROVIDER_UPCOMING_SERVICES}>
            <ProviderUpcoming />
          </LabeledRoute>
          <LabeledRoute path={PATH_PROVIDER_PROFILE}>
            <ProviderProfile />
          </LabeledRoute>
          <LabeledRoute path={PATH_PROVIDER_HISTORY}>
            <ProviderHistory />
          </LabeledRoute>
          <LabeledRoute path={PATH_PROVIDER_LOGIN}>
            <Login loginType={AUTH_ROLE.provider} />
          </LabeledRoute>
          <LabeledRoute path={PATH_TEST}>
            <SampleContainer />
          </LabeledRoute>
          <Route
            path={PATH_HOME}
            exact
            render={() => (
              <RouteComponent path={PATH_HOME}>
                <ProviderListServices />
              </RouteComponent>
            )}
          />
          <Redirect to={PATH_HOME} />
        </Switch>
      );
    }
  } else {
    if (role === AUTH_ROLE.user) {
      routes = (
        <Switch>
          <LabeledRoute path={PATH_REGISTER}>
            <Register />
          </LabeledRoute>
          <LabeledRoute path={PATH_ORDER}>
            <Order />
          </LabeledRoute>
          <LabeledRoute path={PATH_LOGIN}>
            <Login loginType={AUTH_ROLE.user} />
          </LabeledRoute>
          <LabeledRoute path={PATH_PROVIDER_LOGIN}>
            <Login loginType={AUTH_ROLE.provider} />
          </LabeledRoute>
          <LabeledRoute path={PATH_ADMIN_LOGIN}>
            <Login loginType={AUTH_ROLE.admin} />
          </LabeledRoute>
          <LabeledRoute path={PATH_TEST}>
            <SampleContainer />
          </LabeledRoute>
          <LabeledRoute path={PATH_PROVIDER_HOME}>
            <ProviderListServices />
          </LabeledRoute>
          <Route
            path={PATH_HOME}
            exact
            render={() => (
              <RouteComponent path={PATH_HOME}>
                <Home />
              </RouteComponent>
            )}
          />
          <Redirect to={PATH_HOME} />
        </Switch>
      );
    } else if (role === AUTH_ROLE.provider) {
      routes = (
        <Switch>

          <LabeledRoute path={PATH_TEST}>
            <SampleContainer />
          </LabeledRoute>
          <Redirect to={PATH_PROVIDER_LOGIN} />
        </Switch>
      );
    } else if (role === AUTH_ROLE.admin){
        routes = (
            <Switch>
                <LabeledRoute path = {PATH_ADMIN_LOGIN} exact>
                    <Login loginType={AUTH_ROLE.admin} />
                </LabeledRoute>
                <Redirect to={PATH_PROVIDER_LOGIN}/>
            </Switch>
        )
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
    stompClient: state.auth.stompClient,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDisconnectWebSocket: (stompClient) =>
      dispatch(actions.disconnectWebSocket(stompClient)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

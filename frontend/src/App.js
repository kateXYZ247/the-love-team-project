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

function App(props) {
  let routes = (
    <Switch>
      <Route path="/order" exact component={Order} />
      <Route path="/login" render={(props) => <CustomerLogin {...props} />} />
      <Route path="/test" render={(props) => <SampleContainer {...props} />} />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/order" exact component={Order} />
        <Route path="/history" exact component={OrderHistory} />
        <Route path="/" exact component={Home} />
        <Route
          path="/test"
          render={(props) => <SampleContainer {...props} />}
        />
        <Route path="/login" render={(props) => <CustomerLogin {...props} />} />
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

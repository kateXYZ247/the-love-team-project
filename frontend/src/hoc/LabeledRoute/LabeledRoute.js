import React from "react";
import { Route } from "react-router-dom";
import RouteComponent from "../RouteComponent/RouteComponent";

function LabeledRoute(props) {
  const { path } = props;
  return (
    <Route
      path={path}
      exact
      render={() => (
        <RouteComponent path={path}>{props.children}</RouteComponent>
      )}
    />
  );
}

export default LabeledRoute;

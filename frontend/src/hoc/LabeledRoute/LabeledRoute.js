import React from "react";
import { Route } from "react-router-dom";
import RouteComponent from "../RouteComponent/RouteComponent";

function LabeledRoute(props) {
  const { path } = props;
  return (
    <Route
      path={path}
      exact
      render={(routerProps) => (
        <RouteComponent path={path}>
          {React.cloneElement(props.children, { ...routerProps })}
        </RouteComponent>
      )}
    />
  );
}

export default LabeledRoute;

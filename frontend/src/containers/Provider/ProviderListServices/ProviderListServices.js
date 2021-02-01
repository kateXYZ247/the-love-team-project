import React from "react";
import { PATH_PROVIDER_LOGIN } from "../../../constant/path";
import { AUTH_ROLE } from "../../../constant/auth";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

function ProviderListServices(props) {
  const { role } = props;
  return role === null || role !== AUTH_ROLE.provider ? (
    <Redirect to={PATH_PROVIDER_LOGIN} />
  ) : (
    <div>All requested services</div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    role: state.auth.userDetail.role,
  };
};

export default connect(mapStateToProps)(ProviderListServices);

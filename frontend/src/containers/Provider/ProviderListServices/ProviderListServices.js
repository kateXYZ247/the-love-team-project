import React from "react";
import { PATH_PROVIDER_LOGIN } from "../../../constant/path";
import { AUTH_ROLE } from "../../../constant/auth";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import RequestedServices from "./RequestedServices/RequestedServices";

function ProviderListServices(props) {
  const { role } = props;
  return role === null || role !== AUTH_ROLE.provider ? (
    <Redirect to={PATH_PROVIDER_LOGIN} />
  ) : (
    <RequestedServices />
  );
}

const mapStateToProps = (state) => {
  return {
    role: state.auth.userDetail.role,
  };
};

export default connect(mapStateToProps)(ProviderListServices);

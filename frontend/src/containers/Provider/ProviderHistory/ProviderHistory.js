import React from "react";
import { PATH_PROVIDER_LOGIN } from "../../../constant/path";
import { AUTH_ROLE } from "../../../constant/auth";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ProviderHistoryService from "./ProviderHistoryService/ProviderHistoryService";

function ProviderHistory(props) {
  const { role } = props;
  return role === null || role !== AUTH_ROLE.provider ? (
    <Redirect to={PATH_PROVIDER_LOGIN} />
  ) : (
    <ProviderHistoryService />
  );
}

const mapStateToProps = (state) => {
  return {
    role: state.auth.userDetail.role,
  };
};

export default connect(mapStateToProps)(ProviderHistory);

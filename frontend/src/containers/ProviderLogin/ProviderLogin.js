import React from "react";
import * as actions from "../../store/actions";
import { connect } from "react-redux";

function ProviderLogin(props) {
  return <div>Provider Login</div>;
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    redirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password) =>
      dispatch(actions.login(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProviderLogin);

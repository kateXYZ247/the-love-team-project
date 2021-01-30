import React, { useState } from "react";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CustomerLoginForm from "../../components/CustomerLoginForm/CustomerLoginForm";

function CustomerLogin(props) {
  const { onLogin, isAuthenticated, redirectPath } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const submittedHandler = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return isAuthenticated ? (
    <Redirect to={redirectPath} />
  ) : (
    <CustomerLoginForm
      onSubmit={submittedHandler}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      keepSignedIn={keepSignedIn}
      setKeepSignedIn={setKeepSignedIn}
    />
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerLogin);

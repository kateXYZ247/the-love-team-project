import React, { useState } from "react";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CustomerLoginForm from "../../components/CustomerLoginForm/CustomerLoginForm";
import BackdropProgressCircle from "../../components/UI/BackdropProgressCircle/BackdropProgressCircle";
import ProviderLoginForm from "../../components/ProviderLogin/ProviderLoginForm";
import { AUTH_ROLE } from "../../constant/auth";
import {checkValidity} from "../../shared/utility";
import RegisterForm from "../../components/Register/RegisterForm/RegisterForm";

function Login(props) {
  const { loading, onLogin, isAuthenticated, redirectPath, loginType } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [validUsername, setValidUsername] = useState("initial");
  const [validPW, setValidPW] = useState("initial");

  const submittedHandler = (e) => {
    e.preventDefault();
    if (!validUsername && !validPW ) {
      onLogin(username, password, loginType);
    } else {
      setValidUsername(checkValidity("email", username));
      setValidPW(checkValidity("password", password));
    }
  };

  function validateUsername(e) {
    const value = e.target.value;
    setValidUsername(checkValidity("email", value));
  }
  function validatePW(e) {
    const value = e.target.value;
    setValidPW(checkValidity("password", value));
  }

  return isAuthenticated ? (
    <Redirect to={redirectPath} />
  ) : (
    <React.Fragment>
      <BackdropProgressCircle open={loading} />
      {loginType === AUTH_ROLE.user ? (
        <CustomerLoginForm
          onSubmit={submittedHandler}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          keepSignedIn={keepSignedIn}
          setKeepSignedIn={setKeepSignedIn}
          validUsername={validUsername}
          checkUsername={validateUsername}
          validPW={validPW}
          checkPW={validatePW}
        />
      ) : (
        <ProviderLoginForm
          onSubmit={submittedHandler}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          keepSignedIn={keepSignedIn}
          setKeepSignedIn={setKeepSignedIn}
          validUsername={validUsername}
          checkUsername={validateUsername}
          validPW={validPW}
          checkPW={validatePW}
        />
      )}
    </React.Fragment>
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
    onLogin: (username, password, role) =>
      dispatch(actions.login(username, password, role)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

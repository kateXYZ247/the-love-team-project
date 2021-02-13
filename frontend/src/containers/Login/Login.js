import React, { useState } from "react";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CustomerLoginForm from "../../components/CustomerLoginForm/CustomerLoginForm";
import BackdropProgressCircle from "../../components/UI/BackdropProgressCircle/BackdropProgressCircle";
import ProviderLoginForm from "../../components/ProviderLogin/ProviderLoginForm";
import AdminLoginForm from "../../components/AdminLogin/AdminLoginForm";
import { AUTH_ROLE } from "../../constant/auth";

function Login(props) {
  const { loading, onLogin, isAuthenticated, redirectPath, loginType } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const submittedHandler = (e) => {
    e.preventDefault();
    onLogin(username, password, loginType);
  };

  let customerLoginForm = <CustomerLoginForm
      onSubmit={submittedHandler}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      keepSignedIn={keepSignedIn}
      setKeepSignedIn={setKeepSignedIn}
  />;

  let providerLoginForm = <ProviderLoginForm
      onSubmit={submittedHandler}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      keepSignedIn={keepSignedIn}
      setKeepSignedIn={setKeepSignedIn}
  />;

  let adminLoginForm = <AdminLoginForm
      onSubmit={submittedHandler}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      keepSignedIn={keepSignedIn}
      setKeepSignedIn={setKeepSignedIn}
  />

  return isAuthenticated ? (
    <Redirect to={redirectPath} />
  ) : (
      <React.Fragment>
        <BackdropProgressCircle open={loading} />
        {
          loginType === AUTH_ROLE.user ? customerLoginForm
              :
              loginType === AUTH_ROLE.provider ? providerLoginForm
                  :
                  adminLoginForm
        }
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

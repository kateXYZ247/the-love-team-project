import React, { useState } from "react";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CustomerLoginForm from "../../components/CustomerLoginForm/CustomerLoginForm";
import BackdropProgressCircle from "../../components/UI/BackdropProgressCircle/BackdropProgressCircle";
import SnackbarMessage from "../../components/UI/SnackbarMessage/SnackbarMessage";

function CustomerLogin(props) {
  const { loading,
    onLogin,
    isAuthenticated,
    redirectPath ,
    message,
    messageType,
    onMessageClose,} = props;
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
    <React.Fragment>
      <BackdropProgressCircle open={loading} />
      <CustomerLoginForm
        onSubmit={submittedHandler}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        keepSignedIn={keepSignedIn}
        setKeepSignedIn={setKeepSignedIn}
      />
      {message !== null ? (
          <SnackbarMessage
              type={messageType}
              message={message}
              onClose={onMessageClose}
          />
      ) : null}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    redirectPath: state.auth.authRedirectPath,
    message: state.message.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password) =>
      dispatch(actions.login(username, password)),
    onMessageClose: () => dispatch(actions.clearMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerLogin);

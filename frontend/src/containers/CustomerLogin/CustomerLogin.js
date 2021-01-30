import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Button, TextField } from "@material-ui/core";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function CustomerLogin(props) {
  const { onLogin, isAuthenticated, redirectPath } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submittedHandler = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };
  console.log(redirectPath);
  return isAuthenticated ? (
    <Redirect to={redirectPath} />
  ) : (
    <React.Fragment>
      <Grid container alignItems="center">
        <form noValidate autoComplete="off" onSubmit={submittedHandler}>
          <TextField
            label="Username"
            defaultValue={username}
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            defaultValue={password}
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button color="primary" type="submit" variant="contained">
            Login
          </Button>
        </form>
      </Grid>
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
    onLogin: (username, password) =>
      dispatch(actions.login(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerLogin);

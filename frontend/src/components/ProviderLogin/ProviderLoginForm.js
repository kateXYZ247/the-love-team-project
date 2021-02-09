import React from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import CardTitle from "../UI/CardTitle/CardTitle";
import LoginForm from "../LoginForm/LoginForm";

function ProviderLoginForm(props) {
  const {
    onSubmit,
    username,
    setUsername,
    password,
    setPassword,
    keepSignedIn,
    setKeepSignedIn,
  } = props;
  return (
    <Grid container justify="center">
      <Grid item xs={10} md={7} lg={4}>
        <Card>
          <CardTitle title="Sign in to access your provider account" />
          <CardContent>
            <Grid container justify="space-around">
              <Grid item xs={11}>
                <LoginForm
                  onSubmit={onSubmit}
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  keepSignedIn={keepSignedIn}
                  setKeepSignedIn={setKeepSignedIn}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ProviderLoginForm;

import React from "react";
import { Box, Button, Card, CardContent, Grid } from "@material-ui/core";
import CardTitle from "../UI/CardTitle/CardTitle";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Link } from "react-router-dom";
import { PATH_REGISTER } from "../../constant/path";
import { grey, blue } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import LoginForm from "../LoginForm/LoginForm";

const ColorButtonBlack = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    "&:hover": {
      backgroundColor: grey[900],
    },
  },
}))(Button);
const ColorButtonDarkBlue = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[900]),
    backgroundColor: blue[900],
    "&:hover": {
      backgroundColor: blue[900],
    },
  },
}))(Button);

function CustomerLoginForm(props) {
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
      <Grid item xs={10} lg={7}>
        <Card>
          <CardTitle title="Sign in to access your account" />
          <CardContent>
            <Grid container justify="space-around">
              <Grid item xs={11} md={5}>
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
              <Grid item xs={11} md={5}>
                <Box p={2} height="20px" align="center" fontSize={18}>
                  Click the button below to register now
                </Box>
                <Box p={2} height="40px">
                  <ColorButtonBlack
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    component={Link}
                    to={PATH_REGISTER}
                  >
                    Create Account
                  </ColorButtonBlack>
                </Box>
                <Box p={2} height="30px" align="center" fontSize={18}>
                  OR
                </Box>
                <Box p={2} height="30px">
                  <ColorButtonDarkBlue
                    variant="contained"
                    fullWidth
                    size="large"
                    endIcon={<FacebookIcon />}
                  >
                    Sign in with Facebook
                  </ColorButtonDarkBlue>
                </Box>
                <Box p={2} height="30px">
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    size="large"
                  >
                    Sign in with Google
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default CustomerLoginForm;

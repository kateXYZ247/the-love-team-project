import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CardTitle from "../UI/CardTitle/CardTitle";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Link } from "react-router-dom";
import { PATH_REGISTER } from "../../constant/path";

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
      <Grid item xs={10} lg={6}>
        <Card>
          <CardTitle title="Sign in to access your account" />
          <CardContent>
            <Grid container justify="space-around">
              <Grid item xs={11} md={5}>
                <form noValidate autoComplete="off" onSubmit={onSubmit}>
                  <Grid container justify="center">
                    <Grid item xs={12}>
                      <Box
                        p={2}
                        ml={1}
                        height="20px"
                        fontWeight="fontWeightBold"
                        fontSize={24}
                      >
                        Login
                      </Box>
                      <Box p={2} height="40px">
                        <TextField
                          id="userName"
                          label="UserName"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          fullWidth
                          variant="outlined"
                        />
                      </Box>
                      <Box p={2} height="40px">
                        <TextField
                          id="Password"
                          label="Password"
                          type="password"
                          autoComplete="on"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          fullWidth
                          variant="outlined"
                        />
                      </Box>
                      <Box p={2} height="20px">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={keepSignedIn}
                              onChange={(e) =>
                                setKeepSignedIn(e.target.checked)
                              }
                              name="check"
                            />
                          }
                          label="Keep me signed in"
                        />
                      </Box>
                      <Box p={2} height="30px">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          fullWidth
                          size="large"
                        >
                          LOG IN
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item xs={11} md={5}>
                <Box p={2} height="20px" align="center" fontSize={18}>
                  Click the button below to register now
                </Box>
                <Box p={2} height="40px">
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    component={Link}
                    to={PATH_REGISTER}
                  >
                    Create Account
                  </Button>
                </Box>
                <Box p={2} height="30px" align="center" fontSize={18}>
                  OR
                </Box>
                <Box p={2} height="30px">
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    size="large"
                    endIcon={<FacebookIcon />}
                  >
                    Sign in with Facebook
                  </Button>
                </Box>
                <Box p={2} height="30px">
                  <Button
                    variant="outlined"
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

import React, { useEffect } from "react";
import { Box, Card, CardContent, Grid, TextField } from "@material-ui/core";
import RegisterFormTitle from "../RegisterFormTitle/RegisterFormTitle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import classes from "./RegisterForm.module.css";
import Divider from "../Divider/DividerText.js";
import Button from "@material-ui/core/Button";
import FacebookIcon from "@material-ui/icons/Facebook";
import CheckboxLabels from "../CheckBox/CheckBox.js";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import { FormHelperText } from '@material-ui/core';
import {blue} from "@material-ui/core/colors";


const ColorButtonDarkBlue = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[900]),
    backgroundColor: blue[900],
    "&:hover": {
      backgroundColor: blue[900],
    },
  },
}))(Button);
function RegisterForm(props) {
  const { user,
    handleChange,
    checkedBoxHandleChange,
    handleSubmit,
    onUnmount,
    checkEmail,
    validEmail,
    validFName,
    checkFName,
    validLName,
    checkLName,
    validPhone,
    checkPhone,
    validPW,
    checkPW,
    confirmPW,
    checkConfirmPW,
  } = props;

  useEffect(() => {
    return () => {
      onUnmount();
    };
  }, [onUnmount]);
  return (
    <div>
      <form name="form">
        <Grid container justify="center">
          <Grid className="form-group" item xs={10} lg={6}>
            <Card>
              <CardContent>
                <RegisterFormTitle>
                  Finish setting up your account
                </RegisterFormTitle>

                <Box p={5}>
                  <Grid container justify="space-around" spacing={3}>
                    <Grid item xs={2} sm={2}>
                      <AccountCircleIcon
                        color={"primary"}
                        style={{ fontSize: 50 }}
                      />
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <TextField
                        id="First-Name"
                        label="First Name"
                        defaultValue={user.firstName}
                        name="firstName"
                        onChange={(event) => handleChange(event)}
                        onBlur={checkFName}
                        FormHelperTextProps={{
                          error: true,
                        }}
                        helperText={validFName === "invalid" ? 'Please enter a valid firstName' :
                            validFName === "null" ? 'FirstName is required' : ''
                        }
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <TextField
                        id="Last-Name"
                        label="Last Name"
                        name="lastName"
                        defaultValue={user.lastName}
                        onChange={handleChange}
                        onBlur={checkLName}
                        FormHelperTextProps={{
                          error: true,
                        }}
                        helperText={validLName === "invalid" ? 'Please enter a valid lastName' :
                            validLName === "null" ? 'LastName is required' : ''
                        }
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={2} sm={2}>
                      <PhoneIphoneIcon
                        color={"primary"}
                        style={{ fontSize: 50 }}
                      />
                    </Grid>
                    <Grid item xs={10} sm={10}>
                      <TextField
                        id="Phone-Number"
                        label="Phone Number"
                        name="phone"
                        defaultValue={user.phone}
                        onChange={handleChange}
                        onBlur={checkPhone}
                        FormHelperTextProps={{
                          error: true,
                        }}
                        helperText={validPhone === "invalid" ? 'Please enter a valid phone number' :
                            validPhone === "null" ? 'Phone number is required' : ''
                        }
                        fullWidth
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={2} sm={2}>
                      <MailOutlineIcon
                        color={"primary"}
                        style={{ fontSize: 50 }}
                      />
                    </Grid>
                    <Grid item xs={10} sm={10}>
                      <TextField
                        id="Email-Address"
                        label="Email Address"
                        name="email"
                        defaultValue={user.email}
                        onChange={handleChange}
                        FormHelperTextProps={{
                          error: true,
                        }}
                        onBlur={checkEmail}
                        helperText={validEmail === "invalid" ? 'Please enter a valid email' :
                            validEmail === "null" ? 'Email is required' : ''
                        }

                        fullWidth
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={2} sm={2}>
                      <LockOutlinedIcon
                        color={"primary"}
                        style={{ fontSize: 50 }}
                      />
                    </Grid>
                    <Grid item xs={10} sm={10}>
                          <TextField
                            type="password"
                            id="Password"
                            label="Create a Password"
                            name="password"
                            defaultValue={user.password}
                            FormHelperTextProps={{
                              error: true,
                            }}
                            onChange={handleChange}
                            onBlur={checkPW}
                            helperText={validPW === "invalid" ? 'Please enter a valid password' :
                                validPW === "null" ? 'Password is required' : ''
                            }
                            fullWidth
                            variant="outlined"
                          />
                          <div className={classes.password}>
                            Password must be at least 3 characters long
                          </div>

                    </Grid>
                    <Grid item xs={2} sm={2}>
                      <LockOutlinedIcon
                          color={"primary"}
                          style={{ fontSize: 50 }}
                      />
                    </Grid>
                    <Grid item xs={10} sm={10}>
                      <TextField
                          type="password"
                          id="confirmPassword"
                          label="Confirm your Password"
                          name="confirmPW"
                          defaultValue={user.password}
                          onChange={handleChange}
                          FormHelperTextProps={{
                            error: true,
                          }}
                          onBlur={checkConfirmPW}
                          helperText={confirmPW === "invalid" ? 'Your passwords don\'t match ':
                              confirmPW === "null" ? 'Please reconfirm your password' : ''
                          }
                          fullWidth
                          variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Divider spacing={1}>OR</Divider>
                    </Grid>
                    <Box textAlign="center">
                      {/*<Button*/}
                      {/*  variant="contained"*/}
                      {/*  // color="primary"*/}
                      {/*  fullWidth*/}
                      {/*  size="large"*/}
                      {/*  className={classes.facebook}*/}
                      {/*  endIcon={<FacebookIcon />}*/}
                      {/*>*/}
                      {/*  Continue with Facebook*/}
                      {/*</Button>*/}
                      <ColorButtonDarkBlue
                          variant="contained"
                          fullWidth
                          size="large"
                          endIcon={<FacebookIcon />}
                      >
                        Continue with Facebook
                      </ColorButtonDarkBlue>
                    </Box>
                  </Grid>
                  <Box p={2} textAlign="center">
                    <Grid container justify="center">
                      <Grid item xs={12} sm={12}>
                        <CheckboxLabels
                          user={user.isAgree}
                          name="isAgree"
                          checkedBoxHandleChange={checkedBoxHandleChange}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box textAlign="center">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Continue
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default RegisterForm;

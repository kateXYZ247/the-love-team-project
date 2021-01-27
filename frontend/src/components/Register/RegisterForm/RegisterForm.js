import React from "react";
import {
    Box,
    Card,
    CardContent,
    Grid,
    TextField,
} from "@material-ui/core";
import RegisterFormTitle from "../RegisterFormTitle/RegisterFormTitle";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import classes from "./RegisterForm.module.css";
import Divider from "../Divider/DividerText.js";
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import CheckboxLabels from "../CheckBox/CheckBox.js";

function RegisterForm(props) {

    return (
        <Grid container justify="center">

            <Grid item xs={10} lg={6} justify="center">
                <Card>
                    <CardContent>
                        <RegisterFormTitle>Finish setting up your account</RegisterFormTitle>
                        <Box p={5}>
                            <Grid container justify="space-around" spacing={3}>
                                <Grid item xs={2} sm={2}>
                                    <AccountCircleIcon color={"primary"} style={{ fontSize: 50 }} />
                                </Grid>
                                <Grid item xs={5} sm={5}>
                                    <TextField
                                        id="First-Name"
                                        label="First Name"
                                        // defaultValue={"First Name"}

                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={5} sm={5}>
                                    <TextField
                                        id="Last-Name"
                                        label="Last Name"
                                        // defaultValue={"Last Name"}

                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={2} sm={2}>
                                    <PhoneIphoneIcon color={"primary"} style={{ fontSize: 50 }} />
                                </Grid>
                                <Grid item xs={10} sm={10}>
                                    <TextField
                                        id="Phone-Number"
                                        label="Phone Number"


                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={2} sm={2}>
                                    <MailOutlineIcon color={"primary"} style={{ fontSize: 50 }} />
                                </Grid>
                                <Grid item xs={10} sm={10}>
                                    <TextField
                                        id="Email-Address"
                                        label="Email Address"


                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={2} sm={2}>
                                    <LockOutlinedIcon color={"primary"} style={{ fontSize: 50 }} />
                                </Grid>
                                <Grid item xs={10} sm={10}>
                                    <TextField
                                        id="Password"
                                        label="Create a Password"


                                        fullWidth
                                        variant="outlined"
                                    />
                                    <div className={classes.password}>Password must be at least 6 characters long</div>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Divider  spacing={1}>OR</Divider>
                                </Grid>
                                <Box textAlign='center'>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        className={classes.button}
                                        endIcon={<FacebookIcon/>}
                                    >
                                        Continue with Facebook
                                    </Button>
                                </Box>
                            </Grid>
                            <Box p={2} textAlign='center'>
                                <Grid container justify="center" >
                                    <Grid item xs={12} sm={12}>
                                         <CheckboxLabels />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box textAlign='center'>
                                <Button variant="contained" color="primary">
                                    Continue
                                </Button>
                            </Box>

                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
export default RegisterForm;

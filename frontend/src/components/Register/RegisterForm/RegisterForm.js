import React, {useState} from "react";
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
// import {register} from '../../../store/actions/register';
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect, useHistory } from "react-router-dom";


function RegisterForm(props) {
    const {
        user,
        handleChange,
        handleSubmit
    } = props;
    // const [user, setUser] = useState({
    //     firstName: '',
    //     lastName: '',
    //     phone: '',
    //     email: '',
    //     password: ''
    // });
    // const [firstName, setFirstName] = useState("");
    // const firstNameChangedHandler = (updatedFirstName) => {
    //     setFirstName(updatedFirstName);
    // };
    // const [submitted, setSubmitted] = useState(false);

    // const dispatch = useDispatch();
    // const history = useHistory();
    // function handleChange(e) {
    //     const { name, value } = e.target;
    //     setUser(user => ({ ...user, [name]: value }));
    // }
    // function handleSubmit(e) {
    //     e.preventDefault();
    //     setSubmitted(true);
    //     if (user.firstName && user.lastName && user.phone && user.email && user.password) {
    //         dispatch(register(user));
    //
    //     }
    //     history.push('/login')
    //
    // }
    return (
        <div>
        <form name="form" >
        <Grid container justify="center">

            <Grid className="form-group" item xs={10} lg={6}>
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
                                        defaultValue={user.firstName}
                                        name="firstName"
                                        onChange={(event) => handleChange(event)}
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
                                        name="phone"
                                        defaultValue={user.phone}
                                        onChange={handleChange}

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
                                        name="email"
                                        defaultValue={user.email}
                                        onChange={handleChange}

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
                                        name="password"
                                        defaultValue={user.password}
                                        onChange={handleChange}
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
                                        color = "primary"
                                        className={classes.button}
                                        endIcon={<FacebookIcon color={"secondary"}/> }
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
                                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>

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

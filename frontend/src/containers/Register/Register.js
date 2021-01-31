import React, { useState, useEffect} from "react";
import { Box, Grid } from "@material-ui/core";
import SignIn from "../../components/Register/SignIn/SignIn";
import RegisterForm from "../../components/Register/RegisterForm/RegisterForm";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import {register} from '../../store/actions/register';
function Register(props) {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: ''
    });
    const dispatch = useDispatch();
    const history = useHistory();
    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }
    function handleSubmit(e) {
        e.preventDefault();
        // setSubmitted(true);
        if (user.firstName && user.lastName && user.phone && user.email && user.password) {
            dispatch(register(user));
        }
        history.push('/login')
    }
    return(
        <React.Fragment>
            <Grid container justify="center">
            <Box component="span" mt={1}>
               <SignIn />
            </Box>
            <Box mt={3}>
                <RegisterForm
                    user={user}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </Box>
            </Grid>
        </React.Fragment>
    );
}

export default Register;
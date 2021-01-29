import React, { useState, useEffect} from "react";
import { Box, Grid } from "@material-ui/core";
import SignIn from "../../components/Register/SignIn/SignIn";
import RegisterForm from "../../components/Register/RegisterForm/RegisterForm";

function Register(props) {

    return(
        <React.Fragment>
            <Grid container justify="center">
            <Box component="span" mt={1}>
               <SignIn />
            </Box>
            <Box mt={3}>
                <RegisterForm />
            </Box>
            </Grid>
        </React.Fragment>
    );
}

export default Register;
import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import SignIn from "../../components/Register/SignIn/SignIn";

import RegisterForm from "../../components/Register/RegisterForm/RegisterForm";

function Register(props) {
    return(
        <Grid direction="column" spacing={8}>
            <Box component="span" m={1}>
               <SignIn />
            </Box>
            <Box mt={8}>
                <RegisterForm />
            </Box>
        </Grid>
    );
}

export default Register;
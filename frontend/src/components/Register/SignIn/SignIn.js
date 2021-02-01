import React from 'react';
import classes from "./SignIn.module.css";
import Link from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';

function SignIn(props) {
    // return <div className={classes.member}> Already a member ? <Link href="/login" color="primary" >
    //     Sign in
    // </Link></div>;
    return (
        <div>
            <Typography align='center'>
                Already a member ? <Link href="/login" color="primary" >
                    Sign in
                </Link>
            </Typography>

        </div>
    );
}

export default SignIn;
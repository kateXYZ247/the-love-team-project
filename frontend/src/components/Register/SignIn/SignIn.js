import React from 'react';
import classes from "./SignIn.module.css";
import Link from '@material-ui/core/Link';

function SignIn(props) {
    return <div className={classes.member}> Already a member ? <Link href="/login" color="primary" >
        Sign in
    </Link></div>;
}

export default SignIn;
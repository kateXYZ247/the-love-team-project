import React from 'react';
import classes from "./SignIn.module.css";
import Link from '@material-ui/core/Link';

function SignIn(props) {
    const preventDefault = (event) => event.preventDefault();
    return <div className={classes.member}> Already a member ? <Link href="http://localhost:3000/login" color="primary" >
        Sign in
    </Link></div>;
}

export default SignIn;
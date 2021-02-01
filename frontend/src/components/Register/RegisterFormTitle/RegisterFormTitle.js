import React from 'react';
import classes from "./RegisterFormTitle.module.css";

function RegisterFormTitle(props) {
    return (
        <div>
        <div className={classes.title}>{props.children}</div>
        <div className={classes.subtitle}>
            We will text you when your pro is arriving
        </div>
        </div>
    );
}

export default RegisterFormTitle;
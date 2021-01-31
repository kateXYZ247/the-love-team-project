import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Link from '@material-ui/core/Link';
import classes from "./CheckBox.module.css";

function CheckboxLabels() {
    const preventDefault = (event) => event.preventDefault();
    const [state, setState] = React.useState({
        checkedA: false
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    return (
        <FormControlLabel control={<Checkbox name="checkedA" />} label={
            <div className={classes.content}>
                <span>I agree to LoveTeam's </span>
                <Link href="#" onClick={preventDefault} color="primary" >
                     Terms of Service
                </Link>
                <span> and </span>
                <Link href="#" onClick={preventDefault} color="primary" >
                      Privacy Policy
                </Link>
            </div>
        } />
    );
}
export default CheckboxLabels;
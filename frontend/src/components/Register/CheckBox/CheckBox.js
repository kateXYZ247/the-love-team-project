import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { TextField } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import classes from "./CheckBox.module.css";

function CheckboxLabels(props) {
  const { user, checkedBoxHandleChange,} = props;
  const preventDefault = (event) => event.preventDefault();

  return (
    <FormControlLabel
      control={<Checkbox name="isAgree" checked={user.isAgree} onChange={
        checkedBoxHandleChange}
      />}
      label={
        < div className={classes.content} >
          <span>I agree to LoveTeam's </span>
          <Link href="#" onClick={preventDefault} color="primary">
            Terms of Service
          </Link>
          <span> and </span>
          <Link href="#" onClick={preventDefault} color="primary">
            Privacy Policy
          </Link>
        </div >
      }
    />



  );
}

export default CheckboxLabels;

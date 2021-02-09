import React from "react";
import { Grid, Divider as MuiDivider } from "@material-ui/core";
import classes from "./DividerText.module.css";


const Divider = ({ children, ...props }) => {

    return (
        <Grid container alignItems="center" spacing={3} {...props}>
            <Grid item xs>
                <MuiDivider/>
            </Grid>
            <Grid item className={classes.content}>{children}</Grid>
            <Grid item xs>
                <MuiDivider/>
            </Grid>
        </Grid>
    );
};

export default Divider;
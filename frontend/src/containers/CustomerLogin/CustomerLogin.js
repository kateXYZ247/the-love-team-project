import React, { useState } from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { Box,
    Card,
    CardContent,
    Grid,
    Button,
    TextField,} from "@material-ui/core";
import classes from "./CustomerLogin.module.css";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { grey, blue } from '@material-ui/core/colors';

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(grey[900]),
        backgroundColor: grey[900],
        '&:hover': {
            backgroundColor: grey[900],
        },
    },
}))(Button);
const ColorButton2 = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(blue[900]),
        backgroundColor: blue[900],
        '&:hover': {
            backgroundColor: blue[900],
        },
    },
}))(Button);

function CustomerLogin(props) {
    const {
        userName,
        userNameChangedHandler,
        password,
        passwordChangedHandler,
    } = props;


    const [state, setState] = React.useState({
        checked: true,

    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };



    return (
        <Grid container  justify= "center" >
                    <Grid item xs={10} lg={6} justify="center">
                        <Card>
                            <CardContent>
                                <form noValidate autoComplete="off">
                                    <Box p={5}>
                                        <Grid container justify="space-around" spacing={3}>

                                            <Grid item xs={12}>
                                                <div className={classes.pageTitle}>Sign in to access your account</div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <span className={classes.subtitle}>Login </span>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                      <span className={classes.subLetter}>
                                           If you don't have an account click
                                          the button below to create your account
                                      </span>

                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    className={classes.textBox}
                                                    id="userName"
                                                    label="UserName"
                                                    defaultValue={userName}
                                                    onChange={(event) =>
                                                        userNameChangedHandler(event.target.value)
                                                    }

                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>

                                                <ColorButton variant="contained" color="primary" className={classes.margin1}>
                                                    CREATE ACCOUNT
                                                </ColorButton>


                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    className={classes.textBox}
                                                    id="Password"
                                                    label="Password"
                                                    defaultValue={password}
                                                    onChange={(event) =>
                                                        passwordChangedHandler(event.target.value)
                                                    }
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <span className={classes.orLetter}>OR </span>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={state.check}
                                                            onChange={handleChange}
                                                            name="check"

                                                        />
                                                    }
                                                    label="Keep me signed in"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <ColorButton2 variant="contained" color="primary" className={classes.margin2}>
                                                    SIGN IN WITH FACEBOOK
                                                </ColorButton2>

                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Button variant="contained" color="primary" component="span" className={classes.LoginButton}>
                                                    LOG IN
                                                </Button>
                                            </Grid>


                                            <Grid item xs={12} sm={6}>
                                                <Button variant="contained" color="secondary" className={classes.margin3}>
                                                    SIGN IN WITH GOOGLE
                                                </Button>

                                            </Grid>

                                        </Grid>
                                    </Box>
                                </form>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

    );
}

export default CustomerLogin;

import React from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import CardTitle from "../UI/CardTitle/CardTitle";
import LoginForm from "../LoginForm/LoginForm";

function AdminLoginForm(props) {
    const {
        onSubmit,
        username,
        setUsername,
        password,
        setPassword,
        keepSignedIn,
        setKeepSignedIn,
        validUsername,
        checkUsername,
        validPW,
        checkPW,
    } = props;
    return (
        <Grid container justify="center">
            <Grid item xs={10} md={7} lg={4}>
                <Card>
                    <CardTitle title="The Love Team Management" />
                    <CardContent>
                        <Grid container justify="space-around">
                            <Grid item xs={11}>
                                <LoginForm
                                    onSubmit={onSubmit}
                                    username={username}
                                    setUsername={setUsername}
                                    password={password}
                                    setPassword={setPassword}
                                    keepSignedIn={keepSignedIn}
                                    setKeepSignedIn={setKeepSignedIn}
                                    validUsername={validUsername}
                                    checkUsername={checkUsername}
                                    validPW={validPW}
                                    checkPW={checkPW}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default AdminLoginForm;
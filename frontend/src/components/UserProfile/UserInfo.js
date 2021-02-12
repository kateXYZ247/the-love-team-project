import React from "react";
import { Box, Card, CardContent, Grid, TextField } from "@material-ui/core";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import Button from "@material-ui/core/Button";

function UserInfo(props) {
    // receive the states from UserProfile (the container)
    const { user, handleChange, handleUpdate } = props;
    console.log(user);
    return (
        <Grid container justify="center">
            <Grid className="form-group" item xs={10} lg={6}>
                <Card variant={"outlined"}>
                    <CardContent style={{ backgroundColor: "rgba(134,134,134,0.13)"}}>
                        <Box p={5}>
                            <Grid container justify= "space-around" spacing={3}>

                                <Grid item xs={2} sm={2}>
                                    <AccountCircleIcon
                                        color={"primary"}
                                        style={{ fontSize: 50 }}
                                    />
                                </Grid>
                                <Grid  item xs={5} sm={5}>
                                    <TextField
                                        id="First-Name"
                                        label="First Name"
                                        defaultValue={user.firstName}
                                        name="firstName"
                                        fullWidth
                                        variant="outlined"
                                        onChange={(event) => handleChange(event)}
                                    />
                                </Grid>
                                <Grid item xs={5} sm={5}>
                                    <TextField
                                        id="Last-Name"
                                        label="Last Name"
                                        defaultValue={user.lastName}
                                        name="lastName"
                                        fullWidth
                                        variant="outlined"
                                        onChange={(event) => handleChange(event)}
                                    />
                                </Grid>

                                <Grid item xs={2} sm={2}>
                                      <HomeWorkIcon color={"primary"} style={{ fontSize: 50}} />
                                </Grid>
                                <Grid item xs={10} sm={10}>
                                    <TextField
                                        id="Address"
                                        label="Address"
                                        defaultValue={user.address}
                                        name="address"
                                        fullWidth
                                        variant="outlined"
                                        helperText="Follow this format: street name, apt number (if applicable), city, state zip"
                                        onChange={(event) => handleChange(event)}
                                    />
                                </Grid>

                                <Grid item xs={2} sm={2}>
                                    <PhoneIphoneIcon color={"primary"} style={{ fontSize: 50}} />
                                </Grid>
                                <Grid item xs={10} sm={10}>
                                    <TextField
                                        id="Phone-Number"
                                        label="Phone Number"
                                        defaultValue={user.phone}
                                        name="phone"
                                        fullWidth
                                        variant="outlined"
                                        onChange={(event) => handleChange(event)}
                                    />
                                </Grid>

                                <Box textAlign="center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleUpdate}
                                    >
                                        Update
                                    </Button>
                                </Box>

                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default UserInfo

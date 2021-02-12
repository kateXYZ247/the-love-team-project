import React from "react";
import { Box, Card, CardContent, Grid, TextField } from "@material-ui/core";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import Button from "@material-ui/core/Button";

function UserInfo(props) {
    const { firstName, lastName, address, zip, phone, handleUpdate} = props;

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
                                        defaultValue={firstName}
                                        name="firstName"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={5} sm={5}>
                                    <TextField
                                        id="Last-Name"
                                        label="Last Name"
                                        defaultValue={lastName}
                                        name="lastName"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={2} sm={2}>
                                      <HomeWorkIcon color={"primary"} style={{ fontSize: 50}} />
                                </Grid>
                                <Grid item xs={10} sm={10}>
                                    <TextField
                                        id="Address"
                                        label="Address"
                                        defaultValue={address}
                                        name="address"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={2} sm={2}>
                                    <DeveloperModeIcon color={"primary"} style={{ fontSize: 50}} />
                                </Grid>
                                <Grid item xs={10} sm={10}>
                                    <TextField
                                        id="Zip"
                                        label="Zip"
                                        defaultValue={zip}
                                        name="zip"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={2} sm={2}>
                                    <PhoneIphoneIcon color={"primary"} style={{ fontSize: 50}} />
                                </Grid>
                                <Grid item xs={10} sm={10}>
                                    <TextField
                                        id="Phone-Number"
                                        label="Phone Number"
                                        defaultValue={phone}
                                        name="phone"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>

                                <Box textAlign="center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onChange={handleUpdate}
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

import React from "react";
import { Box, Card, CardContent, Grid, TextField } from "@material-ui/core";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import LanguageIcon from '@material-ui/icons/Language';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import FaceIcon from '@material-ui/icons/Face';
import Button from "@material-ui/core/Button";


function ProviderInfo(props) {
    const {  firstName, lastName, phone, address, productName} = props;

    return (
        <Grid container justify="center">
            <Grid className="form-group" item xs={10} lg={6}>
                <Card variant={"outlined"}>
                    <CardContent style={{backgroundColor: "rgba(134,134,134,0.13)"}}>
                        <Box p={5}>
                            <Grid container justify="space-around" spacing={3}>
                                <Grid item xs={2} sm={2}>
                                    <AccountCircleIcon
                                        color={"primary"}
                                        style={{ fontSize: 50 }}
                                    />
                                </Grid>
                                <Grid item xs={5} sm={5}>
                                    <TextField
                                        id="First-Name"
                                        // label="First Name"
                                        value= {firstName}
                                        name="firstName"
                                        // onChange={(event) => handleChange(event)}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={5} sm={5}>
                                    <TextField
                                        id="Last-Name"
                                        // label="Last Name"
                                        value= {lastName}
                                        name="lastName"
                                        // defaultValue={user.lastName}
                                        // onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={2} sm={2}>
                                    <PhoneIphoneIcon
                                        color={"primary"}
                                        style={{ fontSize: 50 }}
                                    />
                                </Grid>
                                <Grid item xs={10} sm={10}>
                                    <TextField
                                        id="Phone-Number"
                                        // label="Phone Number"
                                        value={phone}
                                        name="phone"
                                        // defaultValue={user.phone}
                                        // onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={2} sm={2}>
                                    <BusinessOutlinedIcon
                                        color={"primary"}
                                        style={{ fontSize: 50 }}
                                    />
                                </Grid>
                                <Grid item xs={10} sm={10}>
                                    <TextField
                                        id="Address"
                                        // label="Address"
                                        value={address}
                                        name="address"
                                        // defaultValue={user.email}
                                        // onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2}>
                                    <LanguageIcon
                                        color={"primary"}
                                        style={{ fontSize: 50 }}
                                    />
                                </Grid>
                                <Grid item xs={10} sm={10}>
                                    <TextField
                                        id="Language"
                                        label="Language"
                                        name="language"
                                        defaultValue= "English"
                                        // onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2}>
                                    <FaceIcon
                                        color={"primary"}
                                        style={{ fontSize: 50 }}
                                    />
                                </Grid>
                                <Grid item xs={10} sm={10}>
                                    <TextField
                                        id="Service"
                                        // label="Service"
                                        value={productName}
                                        name="service"
                                        // defaultValue={user.email}
                                        // onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>

                                {/*<Grid item xs={12} sm={12}>*/}
                                {/*    <Divider spacing={1}>OR</Divider>*/}
                                {/*</Grid>*/}

                                <Box textAlign="center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        // onClick={handleSubmit}
                                    >
                                       Request Update
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

export default ProviderInfo;
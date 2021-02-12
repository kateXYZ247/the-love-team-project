import React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  TextField,
} from "@material-ui/core";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import LanguageIcon from "@material-ui/icons/Language";
import BusinessOutlinedIcon from "@material-ui/icons/BusinessOutlined";
import FaceIcon from "@material-ui/icons/Face";
import ColorButton from "../UI/Buttons/ColorButton";

function ProviderInfo(props) {
  const { firstName, lastName, phone, address, productName } = props;
  return (
    <Box p={5}>
      <Grid container justify="center">
        <Grid className="form-group" item xs={12} lg={8}>
          <Card variant={"outlined"}>
            <CardContent style={{ backgroundColor: "rgba(134,134,134,0.13)" }}>
              <Box p={5}>
                <Grid container justify="space-around" spacing={3}>
                  <Grid item xs={2}>
                    <AccountCircleIcon
                      color={"primary"}
                      style={{ fontSize: 50 }}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      id="First-Name"
                      // label="First Name"
                      name="firstName"
                      defaultValue={firstName}
                      // onChange={(event) => handleChange(event)}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      id="Last-Name"
                      // label="Last Name"
                      name="lastName"
                      defaultValue={lastName}
                      // onChange={handleChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <PhoneIphoneIcon
                      color={"primary"}
                      style={{ fontSize: 50 }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      id="Phone-Number"
                      // label="Phone Number"
                      name="phone"
                      defaultValue={phone}
                      // onChange={handleChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <BusinessOutlinedIcon
                      color={"primary"}
                      style={{ fontSize: 50 }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      id="Address"
                      // label="Address"
                      name="address"
                      defaultValue={address}
                      // onChange={handleChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <LanguageIcon color={"primary"} style={{ fontSize: 50 }} />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      id="Language"
                      // label="Language"
                      name="language"
                      defaultValue="English"
                      // onChange={handleChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <FaceIcon color={"primary"} style={{ fontSize: 50 }} />
                  </Grid>
                  <Grid item xs={10} container justify="space-around">
                    {productName.map((p, index) => (
                      <Box key={index} p={1} component={"span"}>
                        <Grid container>
                          <Chip label={p} color="primary" />
                        </Grid>
                      </Box>
                    ))}
                  </Grid>

                  <Box textAlign="center">
                    <ColorButton
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      // onClick={handleSubmit}
                    >
                      Request Update
                    </ColorButton>
                  </Box>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProviderInfo;

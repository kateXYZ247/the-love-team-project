import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
} from "@material-ui/core";
import CardTitle from "../CardTitle/CardTitle";
import { locationTypes } from "../../../constant/order";

function AddressCard(props) {
  const {
    address,
    addressChangedHandler,
    apartment,
    apartmentChangedHandler,
    pet,
    petChangedHandler,
    direction,
    directionChangedHandler,
    locationType,
    locationTypeChangedHandler,
  } = props;
  return (
    <Grid container justify="center">
      <Grid item xs={10} lg={6} justify="center">
        <Card>
          <CardContent>
            <CardTitle>Finish some details on your address</CardTitle>
            <form noValidate autoComplete="off">
              <Box p={5}>
                <Grid container justify="space-around" spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      id="main-address"
                      label="Your Address"
                      defaultValue={address}
                      onChange={(event) =>
                        addressChangedHandler(event.target.value)
                      }
                      fullWidth
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="apartment-input"
                      label="Apartment, unit, room #"
                      defaultValue={apartment}
                      onChange={(event) =>
                        apartmentChangedHandler(event.target.value)
                      }
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="pet-input"
                      label="Any pets? (dog or cat?)"
                      defaultValue={pet}
                      onChange={(event) =>
                        petChangedHandler(event.target.value)
                      }
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="direction-input"
                      label="Any special directions?"
                      defaultValue={direction}
                      onChange={(event) =>
                        directionChangedHandler(event.target.value)
                      }
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="type-input"
                      select
                      label="Type of location"
                      value={locationType}
                      onChange={(event) =>
                        locationTypeChangedHandler(event.target.value)
                      }
                      variant="outlined"
                      fullWidth
                    >
                      {locationTypes.map((op) => (
                        <MenuItem key={op.value} value={op.value}>
                          {op.label}
                        </MenuItem>
                      ))}
                    </TextField>
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

export default AddressCard;

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
import { addressTypes } from "../../../constant/order";

function AddressCard(props) {
  const {
    address,
    onAddressChange,
    apartment,
    onApartmentChange,
    pet,
    onPetChange,
    direction,
    onDirectionChange,
    addressType,
    onAddressTypeChange,
  } = props;
  return (
    <Grid container justify="center">
      <Grid item xs={10} lg={6}>
        <Card>
          <CardContent>
            <CardTitle>Finish some details on your address</CardTitle>
            <form noValidate autoComplete="off">
              <Box p={5}>
                <Grid container justify="space-around" spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      id="main-address"
                      label="Your Full Address"
                      defaultValue={address}
                      onChange={(event) => onAddressChange(event.target.value)}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="apartment-input"
                      label="Apartment, Unit, Room #"
                      defaultValue={apartment}
                      onChange={(event) =>
                        onApartmentChange(event.target.value)
                      }
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="pet-input"
                      label="Any Pets? (Dog or Cat?)"
                      defaultValue={pet}
                      onChange={(event) => onPetChange(event.target.value)}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="direction-input"
                      label="Any Special Directions?"
                      defaultValue={direction}
                      onChange={(event) =>
                        onDirectionChange(event.target.value)
                      }
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="type-input"
                      select
                      label="Type of Address"
                      value={addressType}
                      onChange={(event) =>
                        onAddressTypeChange(event.target.value)
                      }
                      variant="outlined"
                      fullWidth
                    >
                      {addressTypes.map((op) => (
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

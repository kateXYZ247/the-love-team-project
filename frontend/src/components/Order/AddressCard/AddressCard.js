import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
} from "@material-ui/core";
import CardTitle from "../../UI/CardTitle/CardTitle";
import { addressTypes } from "../../../constant/order";
import AddressInput from "../AddressInput/AddressInput";

function AddressCard(props) {
  const {
    address,
    onAddressChange,
    onLatLngChange,
    apartment,
    onApartmentChange,
    pets,
    onPetsChange,
    direction,
    onDirectionChange,
    addressType,
    onAddressTypeChange,
    validAddress,
    checkAddress,
  } = props;
  return (
    <Grid container justify="center">
      <Grid item xs={10} lg={6}>
        <Card>
          <CardTitle title="Finish some details on your address" />
          <CardContent>
            <form noValidate autoComplete="off">
              <Box p={3}>
                <Grid container justify="space-around" spacing={3}>
                  <Grid item xs={12}>
                    <AddressInput
                      initAddress={address}
                      onAddressChange={onAddressChange}
                      validAddress={validAddress}
                      checkAddress={checkAddress}
                      onLatLngChange={onLatLngChange}
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
                      id="pets-input"
                      label="Any Pets? (Dog or Cat?)"
                      defaultValue={pets}
                      onChange={(event) => onPetsChange(event.target.value)}
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

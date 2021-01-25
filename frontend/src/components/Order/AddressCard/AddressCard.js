import React from "react";
import { Card, CardContent, MenuItem, TextField } from "@material-ui/core";
import classes from "./AddressCard.module.css";
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
    <Card className={classes.card}>
      <CardContent>
        <CardTitle>Finish some details on your address</CardTitle>
        <form noValidate autoComplete="off">
          <div className={classes.addressForm}>
            <TextField
              style={{ margin: "20px 25px", width: "600px" }}
              id="main-address"
              label="Your Address"
              defaultValue={address}
              onChange={(event) => addressChangedHandler(event.target.value)}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ margin: "20px 25px", width: "275px" }}
              id="apartment-input"
              label="Apartment, unit, room #"
              defaultValue={apartment}
              onChange={(event) => apartmentChangedHandler(event.target.value)}
              variant="outlined"
            />
            <TextField
              style={{ margin: "20px 25px", width: "275px" }}
              id="pet-input"
              label="Any pets? (dog or cat?)"
              defaultValue={pet}
              onChange={(event) => petChangedHandler(event.target.value)}
              variant="outlined"
            />
            <TextField
              style={{ margin: "20px 25px", width: "275px" }}
              id="direction-input"
              label="Any special directions?"
              defaultValue={direction}
              onChange={(event) => directionChangedHandler(event.target.value)}
              variant="outlined"
            />
            <TextField
              style={{ margin: "20px 25px", width: "275px" }}
              id="type-input"
              select
              label="Type of location"
              value={locationType}
              onChange={(event) =>
                locationTypeChangedHandler(event.target.value)
              }
              variant="outlined"
            >
              {locationTypes.map((op) => (
                <MenuItem key={op.value} value={op.value}>
                  {op.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default AddressCard;

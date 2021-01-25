import React, { useState } from "react";
import { locationTypes } from "../../../constant/order";
import DateTimePicker from "../../../components/Order/DateTimePicker/DateTimePicker";
import AddressCard from "../../../components/Order/AddressCard/AddressCard";
import { Box, Grid } from "@material-ui/core";

function OrderInfo(props) {
  const [date, setDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [pet, setPet] = useState("");
  const [direction, setDirection] = useState("");
  const [locationType, setLocationType] = useState(locationTypes[0].value);

  const dateChangedHandler = (updatedDate) => {
    setDate(updatedDate);
  };

  const addressChangedHandler = (updatedAddress) => {
    setAddress(updatedAddress);
  };

  const apartmentChangedHandler = (updatedApartment) => {
    setApartment(updatedApartment);
  };

  const petChangedHandler = (updatedPet) => {
    setPet(updatedPet);
  };

  const directionChangedHandler = (updatedDirection) => {
    setDirection(updatedDirection);
  };

  const locationTypeChangedHandler = (updatedType) => {
    setLocationType(updatedType);
  };

  return (
    <Grid direction="column" spacing={8}>
      <Box mt={8}>
        <DateTimePicker date={date} dateChangedHandler={dateChangedHandler} />
      </Box>
      <Box mt={8}>
        <AddressCard
          address={address}
          addressChangedHandler={addressChangedHandler}
          apartment={apartment}
          apartmentChangedHandler={apartmentChangedHandler}
          pet={pet}
          petChangedHandler={petChangedHandler}
          direction={direction}
          directionChangedHandler={directionChangedHandler}
          locationType={locationType}
          locationTypeChangedHandler={locationTypeChangedHandler}
        />
      </Box>
    </Grid>
  );
}

export default OrderInfo;

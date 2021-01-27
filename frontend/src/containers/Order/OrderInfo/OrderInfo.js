import React, { useState } from "react";
import {
  addressTypes,
  orderTimeAddressPageButtonText,
} from "../../../constant/order";
import DateTimePicker from "../../../components/Order/DateTimePicker/DateTimePicker";
import AddressCard from "../../../components/Order/AddressCard/AddressCard";
import { Box } from "@material-ui/core";
import BottomAction from "../../../components/Order/BottomAction/BottomAction";
import TopAction from "../../../components/Order/TopAction/TopAction";

function OrderInfo(props) {
  const { orderServicesCount, onUpdateServiceInfo } = props;

  const [date, setDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [pet, setPet] = useState("");
  const [direction, setDirection] = useState("");
  const [addressType, setAddressType] = useState(addressTypes[0].value);

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

  const addressTypeChangedHandler = (updatedType) => {
    setAddressType(updatedType);
  };

  const nextButtonClickedHandler = () => {
    const addressObject = {
      address: address,
      apartment: apartment,
      pet: pet,
      direction: direction,
      addressType: addressType,
    };
    onUpdateServiceInfo(date, addressObject);
  };

  return (
    <React.Fragment>
      <Box mt={2}>
        <TopAction />
      </Box>
      <Box mt={3}>
        <DateTimePicker date={date} dateChangedHandler={dateChangedHandler} />
      </Box>
      <Box mt={5}>
        <AddressCard
          address={address}
          onAddressChange={addressChangedHandler}
          apartment={apartment}
          onApartmentChange={apartmentChangedHandler}
          pet={pet}
          onPetChange={petChangedHandler}
          direction={direction}
          onDirectionChange={directionChangedHandler}
          addressType={addressType}
          onAddressTypeChange={addressTypeChangedHandler}
        />
      </Box>
      <BottomAction
        buttonText={orderTimeAddressPageButtonText}
        numServices={orderServicesCount}
        onEditCart={nextButtonClickedHandler}
        onClickNext={nextButtonClickedHandler}
      />
    </React.Fragment>
  );
}

export default OrderInfo;

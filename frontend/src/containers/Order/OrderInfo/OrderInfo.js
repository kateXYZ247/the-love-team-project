import React, { useState } from "react";
import { orderTimeAddressPageButtonText } from "../../../constant/order";
import DateTimePicker from "../../../components/Order/DateTimePicker/DateTimePicker";
import AddressCard from "../../../components/Order/AddressCard/AddressCard";
import { Box } from "@material-ui/core";
import BottomAction from "../../../components/Order/BottomAction/BottomAction";
import TopAction from "../../../components/Order/TopAction/TopAction";

function OrderInfo(props) {
  const {
    oldOrderDate,
    oldAddress,
    oldApartment,
    oldPets,
    oldDirection,
    oldAddressType,
    orderServicesCount,
    onUpdateServiceInfo,
    onAppointmentModalOpen,
    onSetBackStatus,
    onResetStatus,
  } = props;

  const [date, setDate] = useState(oldOrderDate);
  const [address, setAddress] = useState(oldAddress);
  const [apartment, setApartment] = useState(oldApartment);
  const [pets, setPets] = useState(oldPets);
  const [direction, setDirection] = useState(oldDirection);
  const [addressType, setAddressType] = useState(oldAddressType);

  const dateChangedHandler = (updatedDate) => {
    setDate(updatedDate);
  };

  const addressChangedHandler = (updatedAddress) => {
    setAddress(updatedAddress);
  };

  const apartmentChangedHandler = (updatedApartment) => {
    setApartment(updatedApartment);
  };

  const petsChangedHandler = (updatedPets) => {
    setPets(updatedPets);
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
      pets: pets,
      direction: direction,
      addressType: addressType,
    };
    onUpdateServiceInfo(date, addressObject);
  };

  return (
    <React.Fragment>
      <Box mt={2}>
        <TopAction
          onClickBack={onSetBackStatus}
          onClickCancel={onResetStatus}
        />
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
          pets={pets}
          onPetsChange={petsChangedHandler}
          direction={direction}
          onDirectionChange={directionChangedHandler}
          addressType={addressType}
          onAddressTypeChange={addressTypeChangedHandler}
        />
      </Box>
      <BottomAction
        buttonText={orderTimeAddressPageButtonText}
        numServices={orderServicesCount}
        onEditCart={onAppointmentModalOpen}
        onClickNext={nextButtonClickedHandler}
      />
    </React.Fragment>
  );
}

export default OrderInfo;

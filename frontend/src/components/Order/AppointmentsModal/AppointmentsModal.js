import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import AppointmentsItem from "./AppointmentsItem/AppointmentsItem";
import DialogButton from "../../UI/Buttons/DialogButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AppointmentsModal(props) {
  const { order, open, onClose, onDeleteItem, onAddServices } = props;

  let items = "You haven't add any services";
  if (order.services.length > 0) {
    items = order.services.map((item, idx) => (
      <AppointmentsItem
        key={idx}
        label={item.productName}
        onDelete={() => {
          onDeleteItem(idx);
        }}
      />
    ));
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      fullWidth={true}
      maxWidth={"xs"}
    >
      <DialogTitle style={{ textAlign: "center" }}>My Appointments</DialogTitle>
      <DialogContent>{items}</DialogContent>
      <DialogActions>
        <DialogButton autoFocus onClick={onAddServices} color="primary">
          Add Services
        </DialogButton>
        <DialogButton onClick={onClose} color="primary">
          OK
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
}

export default AppointmentsModal;

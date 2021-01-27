import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import AppointmentsItem from "./AppointmentsItem/AppointmentsItem";

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
        label={item.name}
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
        <Button autoFocus onClick={onAddServices} color="primary">
          Add Services
        </Button>
        <Button onClick={onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AppointmentsModal;

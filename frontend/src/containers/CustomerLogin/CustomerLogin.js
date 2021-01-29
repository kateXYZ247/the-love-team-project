import React, { useState } from "react";
import SampleContainer from "../Sample/SampleContainer";
import Modal from "../../components/UI/Modal/Modal";

function CustomerLogin(props) {
  const [sampleState, setSampleState] = useState(true);
  const modalClosedHandler = () => {
    setSampleState(!sampleState);
  };

  return (
    <React.Fragment>
      <div>Customer Login</div>
      {sampleState ? (
        <Modal show={true} modalClosed={modalClosedHandler}>
          {<SampleContainer clicked={modalClosedHandler} />}
        </Modal>
      ) : null}
    </React.Fragment>
  );
}

export default CustomerLogin;

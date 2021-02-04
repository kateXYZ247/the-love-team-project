import React, { useEffect } from "react";
import Sample from "../../components/Sample/Sample";
import { Chip } from "@material-ui/core";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

function SampleContainer(props) {
  let stompClient = null;

  const connect = () => {
    let socket = new SockJS(`${process.env.REACT_APP_BACKEND_URL}/ws`);
    stompClient = Stomp.over(socket);
    stompClient.connect(
      {
        Authorization: "Bearer ttttookkeen",
      },
      () => {
        stompClient.subscribe("/topic/greetings", (message) => {
          console.log(message);
        });
      }
    );
  };

  const disconnect = () => {
    if (stompClient !== null) {
      stompClient.disconnect();
    }
    console.log("Disconnected");
  };

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  return (
    <div>
      <Chip color="primary" label="This is a Sample Container" />
      <Sample clicked={props.clicked} />
      <div>aaa</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(actions.fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SampleContainer);

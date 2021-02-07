import React, { useEffect } from "react";
import Sample from "../../components/Sample/Sample";
import { Chip } from "@material-ui/core";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { TOKEN_PREFIX } from "../../constant/auth";
import {
  WS_PATH_PROVIDERS,
  WS_PATH_REPLY,
  WS_PATH_USER,
} from "../../constant/api";

function SampleContainer(props) {
  const { userId, token } = props;
  let stompClient = null;

  const connect = () => {
    let socket = new SockJS(`${process.env.REACT_APP_BACKEND_URL}/ws`);
    stompClient = Stomp.over(socket);
    stompClient.connect(
      {
        Authorization: TOKEN_PREFIX + token,
      },
      () => {
        stompClient.subscribe(WS_PATH_PROVIDERS, (message) => {
          console.log("received from public : ", message.body);
        });
        stompClient.subscribe(
          WS_PATH_USER + userId + WS_PATH_REPLY,
          (message) => {
            console.log("received from private: ", message.body);
          }
        );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    userId: state.auth.userId,
    token: state.auth.token,
    products: state.products.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(actions.fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SampleContainer);

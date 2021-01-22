import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { combineReducers, compose, createStore } from "redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";

import authReducer from "./store/reducers/auth";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E64398",
    },
    secondary: {
      main: "#F0EBF4",
    },
  },
});

const composeEnhancers =
  (process.env.REACT_APP_NODE_ENVX === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;

const rootReducer = combineReducers({ authReducer });

const store = createStore(rootReducer, composeEnhancers());

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

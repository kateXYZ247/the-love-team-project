import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import authReducer from "./store/reducers/auth";
import productsReducer from "./store/reducers/products";
import orderReducer from "./store/reducers/order";

import registerReducer from "./store/reducers/register";

import messageReducer from "./store/reducers/message";

import { BrowserRouter } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#B57AD2",
    },
    secondary: {
      main: "#3490cf",
    },
  },
});

const composeEnhancers =
  (process.env.REACT_APP_NODE_ENVX === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  order: orderReducer,

  register: registerReducer,

  message: messageReducer,

});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { createStore, applyMiddleware } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import reducer from './redux/reducers/index';
import { NotificationsProvider } from "./components/NotificationsProvider";

const logger = createLogger({
  collapsed: true,
  timestamp: false,
  duration: true,
});

export const store = createStore(reducer, applyMiddleware(logger, thunk));

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
      <NotificationsProvider />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

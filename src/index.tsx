import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { App } from "./App";
import { persistor, store } from "./store/store";
import { GlobalStyles } from "./ui";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <HashRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles />
        <App />
      </PersistGate>
    </Provider>
  </HashRouter>,
);

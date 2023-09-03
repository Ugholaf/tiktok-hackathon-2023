import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

import { client } from "./apollo/client.ts";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ApolloProvider client={client}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <PayPalScriptProvider
              options={{
                currency: "SGD",
                intent: "capture",
                clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
              }}
            >
              <BrowserRouter>
                <App />
                <Toaster
                  toastOptions={{
                    duration: 3000,
                  }}
                />
              </BrowserRouter>
            </PayPalScriptProvider>
          </LocalizationProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

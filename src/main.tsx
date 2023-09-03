import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

import { client } from "./apollo/client.ts";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <App />
          <Toaster
            toastOptions={{
              duration: 3000,
            }}
          />
        </BrowserRouter>
      </LocalizationProvider>
    </ApolloProvider>
  </React.StrictMode>
);

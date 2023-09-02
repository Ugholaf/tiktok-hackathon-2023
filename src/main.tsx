import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

import { client } from "./apollo/client.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
        <Toaster
          toastOptions={{
            duration: 3000,
          }}
        />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

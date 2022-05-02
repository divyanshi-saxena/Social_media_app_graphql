// import React from "react";
import ReactDOM from "react-dom/client";
// import { createRoot } from "react-dom/client";
// import App from "./App";
import ApolloProvider from "./ApolloProvider";

// const container = document.getElementById("root");
// const root = createRoot(container);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  ApolloProvider
  // <React.StrictMode>
  //   <ApolloProvider />
  // </React.StrictMode>
);

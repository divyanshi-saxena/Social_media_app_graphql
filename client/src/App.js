import React from "react";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

// import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <AuthRoute />
    </AuthProvider>
  );
}

export default App;

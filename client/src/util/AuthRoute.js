import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Container } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import MenuBar from "../components/MenuBar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SinglePost from "../pages/SinglePost";

function AuthRoute() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Container>
        {/* <div className="ui container"> //ui is always mentioned for semantic */}
        <MenuBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            exact
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route exact path="/posts/:postId" element={<SinglePost />} />
        </Routes>
        {/* </div> */}
      </Container>
    </Router>
  );
}

export default AuthRoute;

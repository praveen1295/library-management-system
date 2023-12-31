import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate, // Import the Routes component
} from "react-router-dom";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import MemberDashboard from "./Pages/Dashboard/MemberDashboard/MemberDashboard.js";
import Allbooks from "./Pages/Allbooks";
import Header from "./Components/Header";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard/AdminDashboard.js";
import { AuthContext } from "./Context/AuthContext.js";
import SignUp from "./Pages/SignUp.jsx";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={
              user ? (
                user.isAdmin ? (
                  <Navigate to="/dashboard@admin" />
                ) : (
                  <Navigate to="/dashboard@member" />
                )
              ) : (
                <SignUp />
              )
            }
          />
          <Route
            path="/signin"
            element={
              user ? (
                user.isAdmin ? (
                  <Navigate to="/dashboard@admin" />
                ) : (
                  <Navigate to="/dashboard@member" />
                )
              ) : (
                <Signin />
              )
            }
          />
          <Route
            path="/dashboard@member"
            element={
              user ? (
                user.isAdmin === false ? (
                  <MemberDashboard />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/dashboard@admin"
            element={
              user ? (
                user.isAdmin === true ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/books" element={<Allbooks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

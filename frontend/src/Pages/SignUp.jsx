import React, { useContext, useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext.js";
import Switch from "@material-ui/core/Switch";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  // const [isStudent, setIsStudent] = useState(true);
  const [name, setName] = useState();
  // const [employeeId, setEmployeeId] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [isAdmin, setIsAdmin] = useState(false); // New state for isAdmin
  const [error, setError] = useState("");
  const { dispatch } = useContext(AuthContext);

  const API_URL = process.env.REACT_APP_API_URL;

  const registerApiCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        API_URL + "api/auth/register",
        userCredential
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
      setError("Wrong Password Or Username");
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    registerApiCall({ name, email, password, mobileNumber, isAdmin }, dispatch);
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <form onSubmit={handleForm}>
          <h2 className="signin-title">Sign Up</h2>
          <p className="line"></p>
          <div className="persontype-question">
            <p>Are you a Staff member ?</p>
            {/* <Switch onChange={() => setIsStudent(!isStudent)} color="primary" /> */}
          </div>
          <div className="error-message">
            <p>{error}</p>
          </div>
          <div className="signin-fields">
            <label htmlFor="name">
              <b>Name</b>
            </label>
            <input
              className="signin-textbox"
              type="text"
              placeholder="Enter Name"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              className="signin-textbox"
              type="email"
              placeholder="Enter Email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <label htmlFor="employeeId">
              <b>Employee ID</b>
            </label>
            <input
              className="signin-textbox"
              type="text"
              placeholder="Enter Employee ID"
              name="employeeId"
              required
              onChange={(e) => setEmployeeId(e.target.value)}
            /> */}
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              className="signin-textbox"
              type="password"
              minLength="6"
              placeholder="Enter Password"
              name="psw"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="confirmPassword">
              <b>Confirm Password</b>
            </label>
            <input
              className="signin-textbox"
              type="password"
              minLength="6"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="mobileNumber">
              <b>Mobile Number</b>
            </label>
            <input
              className="signin-textbox"
              type="text"
              placeholder="Enter Mobile Number"
              name="mobileNumber"
              required
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <div className="isAdmin-field">
              <label htmlFor="isAdmin">
                <b>Are you an Admin?</b>
              </label>
              <Switch onChange={() => setIsAdmin(!isAdmin)} color="primary" />
            </div>
          </div>
          <button className="signin-button">Log In</button>
          <a className="forget-pass" href="#home">
            Forgot password?
          </a>
        </form>
        <div className="signup-option">
          <p className="signup-question">
            Already have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => {
                navigate("/signin");
              }}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

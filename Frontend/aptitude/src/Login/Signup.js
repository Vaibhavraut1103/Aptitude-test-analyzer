import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import Navbar from "../Index/Navbar";
import axios from "axios";
import "./Signup.css";
import Swal from 'sweetalert2';

export default function Signup() {
  const navigate=useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    branch: "",
  });
  const [inlineError, setInlineError] = useState({
    name_error: "",
    email_error: "",
    password_error: "",
    confirmPassword_error: "",
    branch_error: "",
    department_error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      name_error: "",
      email_error: "",
      password_error: "",
      confirmPassword_error: "",
      branch_error: "",
      department_error: "",
    };

    if (!signupData.name) {
      errors.name_error = "Please enter your name!";
      isValid = false;
    }

    if (!signupData.email) {
      errors.email_error = "Please enter your email!";
      isValid = false;
    }

    if (!signupData.password) {
      errors.password_error = "Please enter a password!";
      isValid = false;
    }
    if (!signupData.confirmPassword) {
      errors.confirmPassword_error = "Please enter a password!";
      isValid = false;
    }

    if (signupData.password !== signupData.confirmPassword) {
      errors.confirmPassword_error = "Passwords do not match!";
      isValid = false;
    }

    if (!signupData.branch) {
      errors.branch_error = "Please select a branch!";
      isValid = false;
    }

    if (!signupData.department) {
      errors.department_error = "Please select a department!";
      isValid = false;
    }

    setInlineError(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5500/api/v1/auth/signup",
          signupData
        );
        Swal.fire({
          icon: 'success',
          title: 'Signup Successful!',
          text: 'You have successfully signed up.',
          timer: 3000, // Close the alert after 3 seconds
          timerProgressBar: true
        }).then(() => {
          // Redirect to login page after closing the SweetAlert
          navigate("/login");
        });
      } catch (error) {
        console.error("Signup failed:", error.message);

      }

    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={signupData.name}
              onChange={handleChange}
            />
            <div className="error-message">{inlineError.name_error}</div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={signupData.email}
              onChange={handleChange}
            />
            <div className="error-message">{inlineError.email_error}</div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={signupData.password}
              onChange={handleChange}
            />
            <div className="error-message">{inlineError.password_error}</div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={signupData.confirmPassword}
              onChange={handleChange}
            />
            <div className="error-message">
              {inlineError.confirmPassword_error}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={signupData.department}
              onChange={handleChange}
              className="custom-select"
            >
              <option value="">Select Department</option>
              <option value="CS">Computer Engineering</option>
              <option value="IT">Info. Technology</option>
            </select>
            <div className="error-message">
              {inlineError.department_error}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="branch">Branch</label>
            <select
              id="branch"
              name="branch"
              value={signupData.branch}
              onChange={handleChange}
              className="custom-select"
            >
              <option value="">Select Branch</option>
              <option value="FE">FE</option>
              <option value="SE">SE</option>
              <option value="TE">TE</option>
              <option value="BE">BE</option>
            </select>
            <div className="error-message">{inlineError.branch_error}</div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Sign Up
            </button>
          </div>
        </form>
        <div className="signup-btn">
          Already have an account? <NavLink to="/login">Sign In</NavLink>
        </div>
        <div className="signup-btn">
          Forgotten your password? <NavLink to="/forgotpwd">Reset Here</NavLink>
        </div>
        <div className="signup-btn">
          <NavLink to="/">Go Back to Home</NavLink>
        </div>
      </div>
    </>
  );
}

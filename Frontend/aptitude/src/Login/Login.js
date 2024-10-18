import React, { useState,useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../Index/Navbar";
import "./Login.css";
import axios from "axios";
import Swal from 'sweetalert2';

export default function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });
  const [inlineError, setInlineError] = useState({
    email_error: "",
    password_error: ""
  });

  function checkEmail() {
    if (!login.email) {
      setInlineError((inlineError) => ({
        ...inlineError,
        email_error: "Please enter your Email Address!"
      }));
      return false;
    } else {
      setInlineError((inlineError) => ({
        ...inlineError,
        email_error: "" // Clear the error message if email is filled
      }));
      return true;
    }
  }
  useEffect(() => {
    // Extract CSRF token from cookies
    const csrfToken = getCookie('csrftoken');
    console.log(csrfToken);

    axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
  }, []);

  function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }
  function checkPassword() {
    if (!login.password) {
      setInlineError((inlineError) => ({
        ...inlineError,
        password_error: "Please enter password !"
      }));
      return false;
    } else {
      setInlineError((inlineError) => ({
        ...inlineError,
        password_error: "" // Clear the error message if password is valid
      }));
      return true;
    }
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (checkEmail() && checkPassword()) {
      // Submit login data
      const url ="http://127.0.0.1:5500/api/v1/auth/login";

      console.log("Submitting login data:", login);
      try {
        const res = await axios.post(url, login);
        console.log('Success!', res.data);
        Swal.fire({
          icon: 'success',
          title: 'Signup Successful!',
          text: 'Login SuccessFull Redirecting to Dashboard.....',
          timer: 3000, // Close the alert after 3 seconds
          timerProgressBar: true
        }).then(() => {
          // Redirect to  page after closing the SweetAlert
          navigate("/dashboard");
        });
         
      } catch (error) {
        console.error('Failed to submit:', error.message);
        alert(`Failed to submit : ${error.message}`);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Your Username"  onChange={(e) => setLogin({ ...login, email: e.target.value })} />
            <div className="error-message">{inlineError.email_error}</div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter Password"  onChange={(e) => setLogin({ ...login, password: e.target.value })} />
            <div className="error-message">{inlineError.password_error}</div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-success">Sign In</button>
          </div>
        </form>
        <div className="signup-btn">Don't have an account? <NavLink to="/signup">Sign Up</NavLink></div>
        <div className="signup-btn">Forgotten your password? <NavLink to="/forgotpwd">Reset Here</NavLink></div>
        <div className="signup-btn"><NavLink to="/">Go Back to Home</NavLink></div>
      </div>
    </>
  );
}

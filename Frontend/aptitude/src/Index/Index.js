import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CContainer, CNavbar, CNavbarBrand } from '@coreui/react';
import CoreUISignetImg from './coreui-signet.svg'; // Assuming you have the image imported or defined somewhere
import "./Index.css"; // Import CSS file for custom styling
import Navbar from "./Navbar";

export default function Index() {
  const navigate = useNavigate();

  const startTest = () => {
    // Navigate to the test page when the Start Test button is clicked
    navigate("/test");
  };

  return (
    <>
      <Navbar />
      <div className="index-container">
        <h1 className="heading">Welcome to Aptitude Practice Test</h1>
        <p className="description">
          Practice and improve your aptitude skills for assessments and
          interviews.
        </p>
        <button className="start-button" onClick={startTest}>
          Start Test
        </button>
        <nav className="navigation">
          <ul className="nav-links">
            <li>
              <NavLink to="/about" className="nav-link" activeClassName="active-link">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-link" activeClassName="active-link">Contact</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

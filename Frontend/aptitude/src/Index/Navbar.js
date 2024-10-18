import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"
export default function Navbar(){
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <ul className="nav">
        <li className="nav-item slam-left"><a href="#">SkillSphere Analyzer</a></li>
        <li className="nav-item"><a href="/">Home</a></li>
        <li className="nav-item"><a href="#">About</a></li>
        <li className="nav-item"><a href="#">Contact</a></li>
      </ul>
    </div>
    
  );
};

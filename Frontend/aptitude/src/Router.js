import React from "react";
import Index from "./Index/Index"
import Login from "./Login/Login"
import Signup from "./Login/Signup"
import Dashboard from "./Dashboard/dashboard";
import Test from "./Dashboard/test";
import Result from "./Dashboard/Result";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
export default function OndcRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />}/>
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />}/>
      </Routes>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
      <Routes>
      <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
      <Routes>
        <Route path="/test" element={<Test />}/>
      </Routes>
      <Routes>
      <Route path="/result" element={<Result />}/>
      </Routes>
      


    </Router>
  );
}
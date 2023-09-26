import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import SeekerDashboard from "../pages/SeekerDashboard";
import CompanyDashbord from "../pages/CompanyDashbord";
import history from "./history";
import JobDetails from "../components/JobDetails";

export default function AllRoutes() {
  return (
    <Router history={history}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/company-dashboard/*" element={<CompanyDashbord />} />
        <Route path="/login" element={<Login />} />
        <Route path="/seeker-dashboard/*" element={<SeekerDashboard />} />
        <Route path="/details" element={<JobDetails />} />
      </Routes>
    </Router>
  );
}

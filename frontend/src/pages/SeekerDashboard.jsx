import React from "react";
import SidebarSeeker from "../components/SidebarSeeker";
import { Route, Routes } from "react-router-dom";
import DetailsSeeker from "../components/DetailsSeeker";
import SeekOpInDash from "../components/SeekOpInDashboard";
import SeekerHistory from "../components/SeekerHistory";
import { useLocation } from "react-router-dom";
import JobDetailsInDashboard from "../components/JobDetailsInDashboard";

export default function SeekerDashboard() {
  const location = useLocation();
  const { user } = location.state || {};
  return (
    <>
      <SidebarSeeker />
      <div className="pl-64 w-full">
        <div className="pl-16 w-full">
          <Routes>
            <Route path="/" element={<DetailsSeeker />}></Route>
            <Route path="/seek" element={<SeekOpInDash />}></Route>
            <Route
              path="/history"
              element={<SeekerHistory user={user} />}
            ></Route>

            <Route path="/details" element={<JobDetailsInDashboard />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

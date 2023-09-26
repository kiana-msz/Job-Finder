import React from "react";
import SidebarCompany from "../components/SidebarCompany";
import { Route, Routes } from "react-router-dom";
import DetailsCompany from "../components/DetailsCompany";
import CompanyHistory from "../components/CompanyHistory";
import AddJob from "../components/AddJob";
import ViewApplications from "../components/ViewApplications";
import PersonDetails from "../components/PersonDetails";
import JobDetailsInDashboard from "../components/JobDetailsInDashboard";

export default function CompanyDashbord() {
  return (
    <>
      <SidebarCompany />
      <div className="pl-64 w-full">
        <div className="pl-16 w-full">
          <Routes>
            <Route path="/" element={<DetailsCompany />}></Route>
            <Route path="/history" element={<CompanyHistory />}></Route>
            <Route path="/new-position" element={<AddJob />}></Route>
            <Route path="/applicants" element={<ViewApplications />}></Route>
            <Route path="/person-detail" element={<PersonDetails />}></Route>
            <Route path="/details" element={<JobDetailsInDashboard />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

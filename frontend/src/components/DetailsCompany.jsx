import React from "react";
import { Typography } from "@material-tailwind/react";
import DetailFormCompany from "./DetailFormCompany";
import { useLocation } from "react-router-dom";
export default function DetailsCompany() {
  const location = useLocation();
  const { email, password } = location.state || {};
  return (
    <div className="space-y-10 pt-8 pb-8 pl-16 pr-16 text-blue-700">
      <Typography variant="h3" className="text-blue-700">
        Account Details
      </Typography>
      <DetailFormCompany email={email} password={password} />
    </div>
  );
}

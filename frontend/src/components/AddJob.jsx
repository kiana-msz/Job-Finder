import React from "react";
import { Typography } from "@material-tailwind/react";
import AddJobForm from "./AddJobForm";

export default function DetailsCompany() {
  return (
    <div className="space-y-10 pt-8 pb-8 pl-16 pr-16 text-blue-700">
      <Typography variant="h3" className="text-blue-700">
        Create New Job Position
      </Typography>
      <AddJobForm />
    </div>
  );
}

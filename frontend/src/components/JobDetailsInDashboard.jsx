import { Typography } from "@material-tailwind/react";
import * as Unicons from "@iconscout/react-unicons";
import { Link, useNavigate } from "react-router-dom";
import JobDetailCard from "./JobDetailCard";
import { useLocation } from "react-router-dom";

export default function JobDetailsInDashboard() {
  const navigate = useNavigate();
  const location1 = useLocation();
  const {
    Title,
    Company,
    Field,
    Salary,
    Location,
    Logosrc,
    Time,
    Remote,
    Detail,
    CompField,
    CompFounded,
    CompEmployees,
    CompDetails,
    ID,
    CompEmail,
    Status,
  } = location1.state || {};
  return (
    <>
      <div className="space-y-10 pt-8 pb-8 pl-16 pr-16 text-blue-700">
        <div className="flex items-center -ml-4">
          <Link
            onClick={() => {
              navigate(-1);
            }}
          >
            <Typography style={{ display: "inline-block" }}>
              <Unicons.UilAngleLeftB className="w-10 h-10" />
            </Typography>
          </Link>
          <Typography
            variant="h3"
            style={{ display: "inline-block" }}
            className="whitespace-break-spaces ml-6 text-blue-700"
          >
            Job Details
          </Typography>
        </div>
        <div className="flex items-center ml-10">
          <JobDetailCard
            job={{
              Title,
              Company,
              Field,
              Salary,
              Location,
              Logosrc,
              Time,
              Remote,
              Detail,
              CompField,
              CompFounded,
              CompEmployees,
              CompDetails,
              ID,
              CompEmail,
              Status,
            }}
          />
        </div>
      </div>
    </>
  );
}

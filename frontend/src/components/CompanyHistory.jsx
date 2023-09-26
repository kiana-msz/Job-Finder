import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import ViewApplicationsJobCard from "./ViewApplicationsJobCard";
import * as Unicons from "@iconscout/react-unicons";

export default function CompanyHistory() {
  const state = JSON.parse(localStorage.state);
  const company = state.company;

  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    let response = await fetch("http://localhost:8080/jobs", {
      headers: { Authorization: localStorage.token },
    });
    let primaryJobs = await response.json();
    const newJobs = await Promise.all(
      primaryJobs.map(async (job) => {
        if (job.company_id === company.id) {
          const newJob = {
            Title: job.title,
            Field: job.field,
            Salary: job.salary,
            Location: company.location,
            Company: company.name,
            Logosrc: company.img,
            Time: job.time,
            Remote: job.remoteStatus,
            Detail: job.details,
            CompField: company.field,
            CompFounded: company.founded,
            CompEmployees: company.employees,
            CompDetails: company.details,
            ID: job.id,
            CompEmail: company.email,
            Status: job.status,
          };
          return newJob;
        } else return null;
      })
    );
    setJobs(
      newJobs.filter((element) => {
        return element !== null;
      })
    );
  };

  return (
    <>
      <div className="pt-8 pb-8 pl-16 pr-16 ">
        <div className="flex items-center pb-4 text-blue-700">
          <Typography style={{ display: "inline-block" }}>
            <Unicons.UilHistory className="h-8 w-8" />
          </Typography>

          <Typography
            variant="h3"
            style={{ display: "inline-block" }}
            className="whitespace-break-spaces "
          >
            {" "}
            History
          </Typography>
        </div>
        <Typography variant="paragraph" className="pb-6">
          History of positions posted by your company and their status
        </Typography>
        {jobs.map((card) =>
          card.Status === "open" ? (
            <Card
              className="p-0 m-4 max-w-[48rem]"
              style={{ backgroundColor: "rgb(8 145 178)" }}
            >
              <div className="flex flex-row items-center">
                <Typography
                  variant="h6"
                  className="[writing-mode:vertical-lr] rotate-180 pl-4 pr-4"
                  color="white"
                >
                  Open
                </Typography>
                <ViewApplicationsJobCard
                  job={card}
                  colorIn={"rgb(236 254 255)"}
                />
              </div>
            </Card>
          ) : (
            <Card
              className="p-0 m-4 max-w-[48rem]"
              style={{ backgroundColor: "rgb(71 85 105)" }}
            >
              <div className="flex flex-row items-center">
                <Typography
                  variant="h6"
                  className="[writing-mode:vertical-lr] rotate-180 pl-4 pr-4"
                  color="white"
                >
                  Closed
                </Typography>
                <ViewApplicationsJobCard
                  job={card}
                  colorIn={"rgb(226 232 240)"}
                />
              </div>
            </Card>
          )
        )}
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import {
  Typography,
  Input,
  Select,
  IconButton,
  Option,
} from "@material-tailwind/react";
import * as Unicons from "@iconscout/react-unicons";
import HorizContainer from "./HorizContainer";
import PrimaryJobCard from "./PrimaryJobCard";
import { getCategoryById, jobCategories } from "../constants/Categories";

export default function SeekOpInDash() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [category, setCategory] = useState(null);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      refresh();
    }
  };

  const handleChange = (e) => {
    setCategoryId(e);
    setCategory(getCategoryById(e));
  };
  const [jobs, setJobs] = useState([]);
  const [initialJobs, setInitialJobs] = useState([]);
  useEffect(() => {
    getJobs();
  }, []);
  const filter = (list) => {
    if (list === undefined) {
      return undefined;
    }
    const filtered = list.filter((job) => {
      return (
        (job.Title == jobTitle || jobTitle == "") &&
        (job.Field == category ||
          category == "" ||
          category == null ||
          category == "All") &&
        (job.Location == location || location == "")
      );
    });
    return filtered;
  };

  const refresh = async () => {
    const newJobs = filter(initialJobs);
    setJobs(newJobs);
  };

  const getJobs = async () => {
    let response = await fetch("http://localhost:8080/jobs", {
      headers: { Authorization: localStorage.token },
    });
    let primaryJobs = await response.json();
    const newJobs = await Promise.all(
      primaryJobs.map(async (job) => {
        let params = {
          "company-id": job.company_id,
        };

        let query = Object.keys(params)
          .map(
            (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
          )
          .join("&");

        let url = "http://localhost:8080/company?" + query;
        let response2 = await fetch(url, {
          headers: { Authorization: localStorage.token },
        });
        let company = await response2.json();
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
      })
    );
    setJobs(
      newJobs.filter((element) => {
        return element.Status === "open";
      })
    );
    setInitialJobs(
      newJobs.filter((element) => {
        return element.Status === "open";
      })
    );
  };
  return (
    <>
      <div className="pt-8 pb-8 pl-16 pr-16 text-blue-700">
        <div className="flex items-center pb-4">
          <Typography style={{ display: "inline-block" }}>
            <Unicons.UilCrosshair className="h-8 w-8" />
          </Typography>

          <Typography
            variant="h3"
            style={{ display: "inline-block" }}
            className="whitespace-break-spaces"
          >
            {" "}
            Seek Opportunities
          </Typography>
        </div>
        <Typography variant="paragraph" className="pb-6">
          Find jobs that best suit you
        </Typography>
        <div className="-ml-20">
          <div className="flex items-center justify-center">
            <div className="flex bg-blue-50 flex-row gap-2 w-5/6 rounded-lg border-blue-300 border p-4">
              <Input
                onKeyDown={handleKeyDown}
                variant="outlined"
                label="Job Title"
                type="search"
                className="bg-white"
                value={jobTitle}
                onChange={(e) => {
                  e.preventDefault();
                  setJobTitle(e.target.value);
                }}
              />
              <Input
                onKeyDown={handleKeyDown}
                variant="outlined"
                label="Location"
                type="search"
                className="bg-white"
                value={location}
                onChange={(e) => {
                  e.preventDefault();
                  setLocation(e.target.value);
                }}
              />
              <Select
                label="Category"
                value={categoryId}
                onChange={handleChange}
                className="bg-white"
              >
                {jobCategories.map((job) => (
                  <Option key={job.value} value={job.value}>
                    {job.label}
                  </Option>
                ))}
              </Select>
              <IconButton onClick={refresh} className="w-24 h-24 flex-none">
                <Unicons.UilSearch />
              </IconButton>
            </div>
          </div>
          {jobs?.length > 0 ? (
            <HorizContainer>
              {jobs.map((myJob) => (
                <PrimaryJobCard job={myJob} />
              ))}
            </HorizContainer>
          ) : (
            <Typography variant="lead" className="ml-24 mt-12 text-gray-500">
              No jobs found
            </Typography>
          )}
        </div>
      </div>
    </>
  );
}

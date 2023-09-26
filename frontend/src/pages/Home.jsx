import MyNavbar from "../components/MyNavBar";
import PrimaryJobCard from "../components/PrimaryJobCard";
import Container from "../components/Container";
import HorizContainer from "../components/HorizContainer";
import {
  Typography,
  Input,
  Select,
  IconButton,
  Option,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import * as Unicons from "@iconscout/react-unicons";
import { getCategoryById, jobCategories } from "../constants/Categories";
import office from "../images/office.png";

const SampleImgUrl = office;
// const SampleImgUrl =
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcMGuOzi8xiMxTHT0Oj1UQygOfwvkENepvfov3kZ45RQ&s";
export default function Home() {
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
      <MyNavbar />

      <Container>
        <div className="w-full flex flex-col p-0 m-0 items-center justify-center">
          <img class="w-2/3 h-auto" src={SampleImgUrl} alt="sample" />
        </div>
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
          <Typography variant="lead" className="ml-28 mt-12 text-gray-500">
            No jobs found
          </Typography>
        )}
      </Container>
    </>
  );
}

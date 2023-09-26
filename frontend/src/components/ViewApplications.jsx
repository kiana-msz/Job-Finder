import React, { useState, useEffect } from "react";
import {
  Typography,
  Input,
  IconButton,
  Button,
  Card,
  Alert,
} from "@material-tailwind/react";
import PersonCard from "../components/PersonCard";
import * as Unicons from "@iconscout/react-unicons";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
export default function ViewApplications() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const location = useLocation();
  const { Title, ID, Status } = location.state || {};

  const [applications, setApplications] = useState([]);
  const [initialApplications, setInitialApplications] = useState([]);
  useEffect(() => {
    getApplications();
  }, []);

  const getApplications = async () => {
    let params = {
      "job-id": ID,
    };

    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    let url = "http://localhost:8080/applications/job?" + query;
    let response2 = await fetch(url, {
      headers: { Authorization: localStorage.token },
    });
    let applications = await response2.json();
    const newApplications = await Promise.all(
      applications.map(async (application) => {
        let params = {
          "user-id": application.user_id,
        };

        let query = Object.keys(params)
          .map(
            (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
          )
          .join("&");

        let url = "http://localhost:8080/user?" + query;
        let response2 = await fetch(url, {
          headers: { Authorization: localStorage.token },
        });
        let user = await response2.json();
        const newApplication = {
          Name: user.firstname,
          Lastname: user.lastname,
          Email: user.email,
          Profession: user.profession,
          Degree: user.degree,
          AvatarSrc: user.img,
          Location: user.location,
          Languages: user.languages,
          Detail: user.details,
          Id: application.id,
          Status: application.status,
        };
        return newApplication;
      })
    );
    setApplications(newApplications);
    setInitialApplications(newApplications);
  };
  const [changesApplied, setChangesApplied] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      doSearch();
    }
  };

  const doSearch = () => {
    const newApplications = filter(initialApplications);
    setApplications(newApplications);
  };

  const closePosition = async () => {
    let params = {
      "job-id": ID,
    };

    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    let url = "http://localhost:8080/job/close?" + query;
    await fetch(url, {
      headers: { Authorization: localStorage.token },
      method: "POST",
    });
    setChangesApplied(true);
    setTimeout(() => {
      setChangesApplied(false);
    }, 3000);
  };

  const filter = (list) => {
    if (list === undefined) {
      return undefined;
    }
    const filtered = list.filter((applicant) => {
      const fullname = applicant.Name + " " + applicant.Lastname;
      return fullname.includes(searchValue) || searchValue === "";
    });
    return filtered;
  };
  return (
    <>
      <div className="pt-8 pb-8 pl-16 pr-16 ">
        <div className="flex flex-col  space-y-12 ">
          <div className="flex items-center -ml-6 ">
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
              Applicants for position {Title}
            </Typography>
          </div>
          <div className="flex w-5/6 flex-row items-center">
            <div className="flex w-72  ml-12  bg-blue-50	flex-row gap-2 rounded-lg border-blue-300 border p-3">
              {" "}
              <div className="w-72">
                <Input
                  label="search"
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  value={searchValue}
                  className="bg-white"
                  type="search"
                />
              </div>
              <IconButton onClick={doSearch} className="w-24 h-24 flex-none">
                <Unicons.UilSearch />
              </IconButton>
            </div>
            {Status === "open" && (
              <Button
                className="w-auto h-12 ml-auto mr-11"
                variant="outlined"
                color="red"
                onClick={closePosition}
              >
                Close position
              </Button>
            )}
          </div>
        </div>
        {applications?.length > 0 ? (
          <div className="flex flex-col mt-8">
            {applications.map((application) =>
              application.Status === "pending" ? (
                <Card
                  className="p-0 m-4 max-w-[48rem]"
                  style={{ backgroundColor: "rgb(148 163 184)" }}
                >
                  <div className="flex flex-row items-center">
                    <Typography
                      variant="h6"
                      className="[writing-mode:vertical-lr] rotate-180 pl-4 pr-4"
                      color="white"
                    >
                      Pending
                    </Typography>
                    <PersonCard
                      person={application}
                      colorIn={"rgb(241 245 249)"}
                    />
                  </div>
                </Card>
              ) : application.Status === "accepted" ? (
                <Card
                  className="p-0 m-4 max-w-[48rem]"
                  style={{ backgroundColor: "rgb(13 148 136)" }}
                >
                  <div className="flex flex-row items-center">
                    <Typography
                      variant="h6"
                      className="[writing-mode:vertical-lr] rotate-180 pl-4 pr-4"
                      color="white"
                    >
                      Accepted
                    </Typography>
                    <PersonCard
                      person={application}
                      colorIn={"rgb(240 253 250)"}
                    />
                  </div>
                </Card>
              ) : (
                <Card
                  className="p-0 m-4 max-w-[48rem]"
                  style={{ backgroundColor: "rgb(153 27 27)" }}
                >
                  <div className="flex flex-row items-center">
                    <Typography
                      variant="h6"
                      className="[writing-mode:vertical-lr] rotate-180 pl-4 pr-4"
                      color="white"
                    >
                      Rejected
                    </Typography>
                    <PersonCard
                      person={application}
                      colorIn={"rgb(254 242 242)"}
                    />
                  </div>
                </Card>
              )
            )}
          </div>
        ) : (
          <Typography variant="lead" className="ml-16 mt-12 text-gray-500">
            No applicants found
          </Typography>
        )}
      </div>
      {changesApplied && (
        <Alert
          color="green"
          className="fixed right-16 w-auto h-auto top-8"
          icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
          onClose={() => {
            setChangesApplied(false);
          }}
        >
          <Typography variant="h5" color="white">
            Success
          </Typography>
          <Typography color="white" className="mt-2 font-normal">
            Position closed succesfully
          </Typography>
        </Alert>
      )}
    </>
  );
}

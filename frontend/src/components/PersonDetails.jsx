import React, { useState } from "react";
import { Typography, Button, Alert } from "@material-tailwind/react";
import * as Unicons from "@iconscout/react-unicons";
import { Link, useNavigate } from "react-router-dom";
import PersonDetailCard from "./PersonDetailCard";
import { useLocation } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function DetailsCompany() {
  const [changesApplied, setChangesApplied] = useState(false);

  const [acceptOpen, setAcceptOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const navigate = useNavigate();
  const location1 = useLocation();
  const {
    Name,
    Lastname,
    Email,
    Profession,
    Degree,
    AvatarSrc,
    Location,
    Languages,
    Detail,
    Id,
  } = location1.state || {};
  const person = {
    Name,
    Lastname,
    Email,
    Profession,
    Degree,
    AvatarSrc,
    Location,
    Languages,
    Detail,
    Id,
  };
  const accept = async (e) => {
    const formData = { "application-id": Id, status: "accepted" };
    const formDataForm = new FormData();

    for (var key in formData) {
      formDataForm.append(key, formData[key]);
    }
    e.preventDefault();

    let response = await fetch("http://localhost:8080/application/status", {
      method: "POST",
      body: formDataForm,
      headers: { Authorization: localStorage.token },
    });
    let result = await response.json();
    if (response.ok) {
      console.log(result.message);
    } else {
      console.log(result.error);
    }
    setAcceptOpen(true);
    setChangesApplied(true);
    // disapear after 3 seconds
    setTimeout(() => {
      setChangesApplied(false);
      setAcceptOpen(false);
    }, 3000);
  };
  const reject = async (e) => {
    const formData = { "application-id": Id, status: "rejected" };
    const formDataForm = new FormData();

    for (var key in formData) {
      formDataForm.append(key, formData[key]);
    }
    e.preventDefault();

    let response = await fetch("http://localhost:8080/application/status", {
      method: "POST",
      body: formDataForm,
      headers: { Authorization: localStorage.token },
    });
    let result = await response.json();
    if (response.ok) {
      console.log(result.message);
    } else {
      console.log(result.error);
    }
    setRejectOpen(true);
    setChangesApplied(true);
    // disapear after 3 seconds
    setTimeout(() => {
      setChangesApplied(false);
      setRejectOpen(false);
    }, 3000);
  };
  return (
    <>
      <div className="pt-8 pb-8 pl-16 pr-16 ">
        <div className="flex flex-col  space-y-8 ">
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
              Applicant Details
            </Typography>
          </div>
          <div className="flex-col ml-10 space-y-4 justify-center">
            <PersonDetailCard person={person} />
          </div>
          <div className="flex w-5/6 flex-row items-center">
            <Button
              className="w-auto h-12 ml-auto"
              color="green"
              onClick={accept}
            >
              Accept
            </Button>
            <Button
              className="w-auto h-12 ml-3 mr-10"
              variant="outlined"
              color="red"
              onClick={reject}
            >
              Reject
            </Button>
          </div>
          {changesApplied && (
            <Alert
              open={acceptOpen || rejectOpen}
              color="green"
              className="fixed right-16 w-auto h-auto"
              icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
              onClose={() => {
                setAcceptOpen(false);
                setRejectOpen(false);
              }}
            >
              <Typography variant="h5" color="white">
                Success
              </Typography>
              <Typography color="white" className="mt-2 font-normal">
                {acceptOpen
                  ? "Application accepted succesfully!"
                  : "Application rejected succesfully!"}
              </Typography>
            </Alert>
          )}
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";
import * as Unicons from "@iconscout/react-unicons";
import sampleAvatar from "../images/sample.png";

export default function SignUpSeekerForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstname, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const jsonData = {
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname,
    img: sampleAvatar,
  };
  const [error, setError] = useState("");
  useEffect(() => {
    let timer;
    if (error) {
      // Set a timeout to close the alert after 3 seconds
      timer = setTimeout(() => {
        closeAlert();
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [error]);
  const closeAlert = () => {
    setError("");
  };
  async function handleClick(e) {
    const formData = new FormData();

    for (var key in jsonData) {
      formData.append(key, jsonData[key]);
    }
    e.preventDefault();

    let response = await fetch("http://localhost:8080/register/user", {
      method: "POST",
      body: formData,
    });
    let result = await response.json();
    if (response.ok) {
      navigate("/login");
    } else {
      setError(result.error);
    }
  }
  return (
    <>
      {error && (
        <Alert
          color="red"
          className="fixed right-32 w-auto h-auto top-40 max-w-[350px]"
          icon={<XCircleIcon className="mt-px h-6 w-6" />}
          onClose={closeAlert}
        >
          <Typography variant="h5" color="white">
            Error
          </Typography>
          <Typography color="white" className="mt-2 font-normal">
            {error}
          </Typography>
        </Alert>
      )}
      <Card color="transparent" shadow={false} className="w-96">
        <Typography variant="h4" color="blue-gray">
          Sign Up as a Job Seeker
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Create a job seeker account.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" id="formElem">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              value={firstname}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              size="lg"
              label="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <Input
              type="email"
              size="lg"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Typography
              variant="small"
              className="-mt-6 p-2 text-xs text-blue-600 flex items-center gap-1"
            >
              <Unicons.UilInfoCircle
                className="w-4 h-4 -mt-px"
                style={{ display: "inline-block" }}
              />
              Use at least 8 characters, one uppercase, one lowercase and one
              number.
            </Typography>
          </div>
          <Button className="mt-6" fullWidth onClick={handleClick}>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a
              href="/Login"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </>
  );
}

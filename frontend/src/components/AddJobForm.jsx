import React, { useState } from "react";
import {
  Input,
  Button,
  Textarea,
  Alert,
  Typography,
} from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function AddJobForm() {
  const [formData, setFormData] = useState({
    title: "",
    field: "",
    time: "",
    remote: "",
    salary: "",
    details: "",
  });

  const [changesApplied, setChangesApplied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setChangesApplied(false);
  };

  const handleSubmit = async (e) => {
    const formDataForm = new FormData();

    for (var key in formData) {
      formDataForm.append(key, formData[key]);
    }
    e.preventDefault();

    let response = await fetch("http://localhost:8080/job", {
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
    setChangesApplied(true);
    // disapear after 3 seconds
    setTimeout(() => {
      setChangesApplied(false);
    }, 3000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Input
          variant="static"
          placeholder="Job Title"
          label="Job Title"
          size="lg"
          required
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <Input
          placeholder="Field"
          variant="static"
          label="Field"
          size="lg"
          required
          name="field"
          value={formData.field}
          onChange={handleChange}
        />
        <Input
          placeholder="Time"
          size="lg"
          variant="static"
          label="Is the job part-time or full-time?"
          required
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
        <Input
          placeholder="In-person or remote"
          size="lg"
          variant="static"
          label="Is the position remote or in-person?"
          required
          name="remote"
          value={formData.remote}
          onChange={handleChange}
        />
        <Input
          placeholder="Salary"
          size="lg"
          variant="static"
          label="Salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
        />
        <Textarea
          placeholder="Details"
          size="lg"
          variant="static"
          label="Add Any more details here"
          name="details"
          value={formData.details}
          onChange={handleChange}
        />
        <Button font-size="xl" variant="gradient" onClick={handleSubmit}>
          Create Position
        </Button>
      </form>

      {changesApplied && (
        <Alert
          color="green"
          className="fixed right-16 w-auto h-auto top-0"
          icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
          onClose={() => {
            setChangesApplied(false);
          }}
        >
          <Typography variant="h5" color="white">
            Success
          </Typography>
          <Typography color="white" className="mt-2 font-normal">
            Position created succesfully
          </Typography>
        </Alert>
      )}
    </>
  );
}

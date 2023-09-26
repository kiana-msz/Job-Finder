import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import * as Unicons from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";

export default function ViewApplicationsJobCard({
  job: {
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
    YourStatus,
    AppId,
  },
  colorIn,
}) {
  const navigate = useNavigate();
  const handleWithdraw = async (e) => {
    const formData = { "application-id": AppId };
    const formDataForm = new FormData();

    for (var key in formData) {
      formDataForm.append(key, formData[key]);
    }
    e.preventDefault();

    let response = await fetch("http://localhost:8080/application", {
      method: "DELETE",
      body: formDataForm,
      headers: { Authorization: localStorage.token },
    });
    let result = await response.json();
    if (response.ok) {
      console.log(result.message);
    } else {
      console.log(result.error);
    }
    window.location.reload(false);
  };
  const handleDetails = () => {
    navigate("/seeker-dashboard/details", {
      state: {
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
      },
    });
  };
  return (
    <>
      <Card
        className="h-40 flex-row max-w-[48rem] w-full"
        style={{ backgroundColor: colorIn }}
      >
        <CardHeader
          style={{ backgroundColor: colorIn }}
          shadow={false}
          floated={false}
          className="w-40 shrink-0 m-0 rounded-r-none flex items-center justify-center"
        >
          <img
            style={{ backgroundColor: "rgb(255 255 255)" }}
            className="p-3 h-32 w-32 rounded-lg border-blue-300 border"
            src={Logosrc}
            alt="logo"
          />
        </CardHeader>
        <CardBody className="pl-0 flex flex-col justify-center">
          <Typography variant="h4" color="blue-gray" className="mb-2 pl-0">
            {Title}
          </Typography>
          <Typography variant="lead" className="text-base font-light">
            {Company}
          </Typography>
          <div className="pt-7 flex items-center justify-center">
            <Typography style={{ display: "inline-block" }}>
              <Unicons.UilBox className="w-4" />
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              className="whitespace-break-spaces text-sm"
            >
              {Field}
              {"    "}
            </Typography>
            <Typography style={{ display: "inline-block" }}>
              <Unicons.UilLocationPoint className="w-4" />
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              className="whitespace-break-spaces text-sm"
            >
              {Location}
              {"    "}
            </Typography>
            <Typography style={{ display: "inline-block" }}>
              <Unicons.UilClock className="w-4" />
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              className="whitespace-break-spaces text-sm"
            >
              {Time}
              {"    "}
            </Typography>
            <Typography style={{ display: "inline-block" }}>
              <Unicons.UilMap className="w-4" />
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              className="whitespace-break-spaces text-sm"
            >
              {Remote}
              {"    "}
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="absolute right-0 pt-4 space-y-2 pl-0 pr-0 mr-6 ml-6">
          <div className="flex flex-col space-y-2">
            {YourStatus === "pending" ? (
              <>
                <Button className="w-48 pr-0 pl-0" onClick={handleWithdraw}>
                  Withdraw Application
                </Button>
                <Button
                  variant="outlined"
                  className="w-48"
                  onClick={handleDetails}
                >
                  Details
                </Button>
              </>
            ) : (
              <>
                {" "}
                <Button
                  variant="outlined"
                  className="w-48"
                  onClick={handleDetails}
                >
                  Details
                </Button>
                <div className="h-10" />
              </>
            )}
          </div>
          <div className="flex items-center justify-center absolute left-0">
            <Typography style={{ display: "inline-block" }}>
              <Unicons.UilUsdCircle className="w-4" />{" "}
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              className="whitespace-break-spaces text-sm"
            >
              {" "}
              {Salary}
            </Typography>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

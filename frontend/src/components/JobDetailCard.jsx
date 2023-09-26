import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import * as Unicons from "@iconscout/react-unicons";

export default function JobDetailCard({
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
    Status,
  },
}) {
  return (
    <>
      <div className="w-96">
        <Card
          color="transparent"
          shadow={false}
          className="w-full max-w-[26rem]"
        >
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-8"
          >
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                  {Title}
                </Typography>
              </div>
              <Typography color="blue-gray">{Company}</Typography>
            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0">
            <List>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilBox className="h-5 w-5" />
                </ListItemPrefix>
                {Field}
              </ListItem>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilDollarSignAlt className="h-5 w-5" />
                </ListItemPrefix>
                {Salary}
              </ListItem>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilLocationPoint className="h-5 w-5" />
                </ListItemPrefix>
                {Location}
              </ListItem>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilHourglass className="h-5 w-5" />
                </ListItemPrefix>
                {Time}
              </ListItem>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilMap className="h-5 w-5" />
                </ListItemPrefix>
                {Remote}
              </ListItem>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilNotes className="h-5 w-5" />
                </ListItemPrefix>
                <div>{Detail}</div>
              </ListItem>
            </List>
          </CardBody>
        </Card>
        <hr className="my-2 border-blue-gray-100" />
        <Card
          color="transparent"
          shadow={false}
          className="w-full max-w-[26rem]"
        >
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-8"
          >
            <Avatar size="lg" variant="circular" src={Logosrc} alt="avatar" />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                  {Company}
                </Typography>
              </div>
              <Typography color="blue-gray">{CompEmail}</Typography>
            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0">
            <List>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilBox className="h-5 w-5" />
                </ListItemPrefix>
                {CompField}
              </ListItem>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilCalender className="h-5 w-5" />
                </ListItemPrefix>
                {CompFounded}
              </ListItem>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilUsersAlt className="h-5 w-5" />
                </ListItemPrefix>
                {CompEmployees}
              </ListItem>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilLocationPoint className="h-5 w-5" />
                </ListItemPrefix>
                {Location}
              </ListItem>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilNotes className="h-5 w-5" />
                </ListItemPrefix>
                <div>{CompDetails}</div>
              </ListItem>
            </List>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

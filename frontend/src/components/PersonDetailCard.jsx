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

export default function PersonDetailCard({
  person: {
    Name,
    Lastname,
    Email,
    Profession,
    Degree,
    AvatarSrc,
    Location,
    Languages,
    Detail,
  },
}) {
  return (
    <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8"
      >
        <Avatar size="lg" variant="circular" src={AvatarSrc} alt="avatar" />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              {Name} {Lastname}
            </Typography>
          </div>
          <Typography color="blue-gray">{Email}</Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0">
        <List>
          <ListItem className="pointer-events-none">
            <ListItemPrefix>
              <Unicons.UilUserMd className="h-5 w-5" />
            </ListItemPrefix>
            {Profession}
          </ListItem>
          <ListItem className="pointer-events-none">
            <ListItemPrefix>
              <Unicons.UilGraduationCap className="h-5 w-5" />
            </ListItemPrefix>
            {Degree}
          </ListItem>
          <ListItem className="pointer-events-none">
            <ListItemPrefix>
              <Unicons.UilLocationPoint className="h-5 w-5" />
            </ListItemPrefix>
            {Location}
          </ListItem>
          <ListItem className="pointer-events-none">
            <ListItemPrefix>
              <Unicons.UilGlobe className="h-5 w-5" />
            </ListItemPrefix>
            {Languages}
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
  );
}

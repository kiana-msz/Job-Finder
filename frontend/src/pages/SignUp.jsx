import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Container from "../components/Container";
import MyNavbar from "../components/MyNavBar";
import * as Unicons from "@iconscout/react-unicons";
import SignUpSeekerForm from "../components/SignUpSeekerForm";
import SignUpManagerForm from "../components/SignUpManagerForm";

export default function SignUp() {
  const [activeTab, setActiveTab] = React.useState("jobSeeker");
  const data = [
    {
      label: "As Job Seeker",
      value: "jobSeeker",
      icon: Unicons.UilUser,
      desc: <SignUpSeekerForm />,
    },
    {
      label: "As Company",
      value: "company",
      icon: Unicons.UilBuilding,
      desc: <SignUpManagerForm />,
    },
  ];
  return (
    <>
      <MyNavbar />
      <Container>
        <Tabs value={activeTab}>
          <TabsHeader>
            {data.map(({ label, value, icon }) => (
              <Tab key={value} value={value}>
                <div className="flex items-center gap-2">
                  {React.createElement(icon, { className: "w-5 h-5" })}
                  {label}
                </div>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, desc }) => (
              <div>
                <TabPanel
                  key={value}
                  value={value}
                  className="flex items-center justify-center"
                >
                  {desc}
                </TabPanel>
              </div>
            ))}
          </TabsBody>
        </Tabs>
      </Container>
    </>
  );
}

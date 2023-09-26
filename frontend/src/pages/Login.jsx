import React from "react";
import MyNavbar from "../components/MyNavBar";
import LoginCard from "../components/LoginCard";

export default function Login() {
  return (
    <>
      <MyNavbar />
      <div className="flex items-center justify-center mt-32">
        <LoginCard />
      </div>
    </>
  );
}

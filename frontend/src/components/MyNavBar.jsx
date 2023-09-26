import { Navbar, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

export default function MyNavbar() {
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/login");
  };
  const handleSignUp = () => {
    navigate("/SignUp");
  };

  return (
    <Navbar className="sticky top z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to="/" className="ml-10 mr-4 cursor-pointer py-1.5 font-bold">
          Job Finder
        </Link>
        <div className="flex mr-10 gap-10 lg:inline-block space-x-4">
          <Button
            variant="outlined"
            size="sm"
            color="blue-gray"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <Button variant="gradient" size="sm" onClick={handleSignUp}>
            Sign Up
          </Button>
        </div>
      </div>
    </Navbar>
  );
}

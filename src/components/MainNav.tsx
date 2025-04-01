import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import UserNameMenu from "./UserNameMenu";

const MainNav = () => {

  // const { loginWithRedirect,isAuthenticated } = useAuth0();

  // console.log(isAuthenticated)
  
  const handleLogin = async() => {
    console.log(1)
  }

  return (
    <>
      <Button
        // variant={"ghost"}
        className="text-2xl font-bold text-white bg-orange-400 hover:bg-blue-500 hover:text-white"
        onClick={handleLogin}
      >
        Log in
      </Button>
    </>
  );
};

export default MainNav;

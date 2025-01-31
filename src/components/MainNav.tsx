import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import UserNameMenu from "./UserNameMenu";

const MainNav = () => {
  const { loginWithRedirect,isAuthenticated } = useAuth0();

  // console.log(isAuthenticated)
  
  return (
    <>
      {isAuthenticated ? (
        <> 
            <UserNameMenu />
        </>
      ) : (
        <>
          <Button
            variant={"ghost"}
            className="text-2xl font-bold hover:text-orange-500 hover:bg-white"
            onClick={async () => await loginWithRedirect()}
          >
            Log in
          </Button>
        </>
      )}
    </>
  );
};

export default MainNav;

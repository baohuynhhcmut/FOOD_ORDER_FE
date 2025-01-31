import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CircleUserRound, Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLink from "./MobileNavLink";

const MobileNav = () => {

  const { isAuthenticated, user ,loginWithRedirect} = useAuth0()


  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>

      <SheetContent className="space-y-3">

        {isAuthenticated ?(
          <span className="flex items-center font-bold gap-2">
              <CircleUserRound />
              {user?.name}
          </span>
        ):(
            <SheetTitle>Welcome to Uniservice.com !</SheetTitle>
        )}  

        <Separator/>

        <SheetDescription className="flex flex-col gap-4">
            {isAuthenticated ?(
                <MobileNavLink />
            ):(
                <Button className="flex-1 font-bold bg-orange-500" onClick={ async() => await loginWithRedirect()}>Login</Button>
            )}
        </SheetDescription>
        
      </SheetContent>

    </Sheet>
  );
};

export default MobileNav;

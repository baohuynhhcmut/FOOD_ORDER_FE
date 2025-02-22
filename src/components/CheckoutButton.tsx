import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogHeader,DialogContent, DialogTrigger } from "./ui/dialog";
import UserFormProfile, { userFormData } from "@/form/UserFormProfile";
import { useGetCurrentUser } from "@/api/UserApi";

type Props = {
    onCheckout: (userData:userFormData) => void;
    disabled : boolean;
    loadingSession: boolean;
}

const CheckoutButton = ({onCheckout,disabled,loadingSession}: Props) => {

    const { isAuthenticated,isLoading,loginWithRedirect,} = useAuth0()
    
    const { currentUser,isLoading:isLoadingGetCurUser } = useGetCurrentUser()
    

    const { pathname }  = useLocation()

    const onLogin =  async() => {
        await loginWithRedirect({
            appState:{
                returnTo:  pathname
            }
        })
    }

    if(!isAuthenticated){
        return(
            <Button  className="w-full bg-orange-500" onClick={onLogin}>
                Login to checkout
            </Button>
        )
    }

    if(isLoading){
        return(
            <LoadingButton />
        )
    }   
    

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled}  className="w-full bg-orange-500">
                    Checkout
                </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-[450px] md:min-w-[820px] bg-gray-50">
                <UserFormProfile user={currentUser} isLoading={isLoadingGetCurUser || loadingSession} onSave={onCheckout} title="Confirm delivery Detail" buttonText="Continue to payment"/>
            </DialogContent>
        </Dialog>
    );
}

export default CheckoutButton;

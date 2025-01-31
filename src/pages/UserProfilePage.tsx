import { useGetCurrentUser, useUpdateMyUser } from "@/api/UserApi";
import UserFormProfile from "@/form/UserFormProfile";


const UserProfilePage = () => {

    const { updateUser ,isLoading:isLoadingUpdate } = useUpdateMyUser()

    const { currentUser,isLoading:isLoadingGetCurUser } = useGetCurrentUser()

    // console.log(currentUser)

    if(isLoadingGetCurUser){
        return(
            <span className="text-3xl text-orange-500 font-bold text-center">Loading data user ...</span>
        )
    }

    return (
        <UserFormProfile user={currentUser} onSave={updateUser} isLoading={isLoadingUpdate} />
    );
}

export default UserProfilePage;

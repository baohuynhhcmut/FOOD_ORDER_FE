import { useGetCurrentUser, useUpdateMyUser } from "@/api/UserApi";
import UserFormProfile, { userFormData } from "@/form/UserFormProfile";
import { loadUser } from "@/store/slice/AuthSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";


const UserProfilePage = () => {

    const { updateUser ,isLoading:isLoadingUpdate } = useUpdateMyUser()

    // const { currentUser,isLoading:isLoadingGetCurUser } = useGetCurrentUser()

    const data = useSelector((state:RootState) => state.user.user)

    const dispatch = useDispatch()

    const onSave = async(data: userFormData) => { 
        const updated = await updateUser(data)
        dispatch(loadUser({user:updated.data}))
    }

    // const isLoadingUpdate = false

    // if(isLoadingGetCurUser){
    //     return(
    //         <span className="text-3xl text-orange-500 font-bold text-center">Loading data user ...</span>
    //     )
    // }


    return (
        <UserFormProfile user={data}  onSave={onSave} isLoading={isLoadingUpdate} />
    );
}

export default UserProfilePage;

import { userLoginType } from "@/components/Login";
import { regiserRequest, userRegisterType } from "@/components/Register";
import { userFormData } from "@/form/UserFormProfile";
import { getToken } from "@/utils/token";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0ID: string;
  email: string;
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const respone = await fetch(`${BASE_API_URL}/api/my/user`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(user),
    });
    if (!respone.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

type formUpdateUserData = {
  name: string;
  addressLine1: string;
  city: string;
  phoneNumber:string;
};

export const useUpdateMyUser = () => {

  const updateMyUserRequest = async (formData: userFormData) => {
    const accessToken = getToken()

    // const dataUpdate = formData

    const respone = await fetch(`${BASE_API_URL}/api/my/user/update`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({dataUpdate:formData}),
    });

    if (!respone.ok) {
      throw new Error("Faild to update user");
    }

    return await respone.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isError,
    isSuccess,
    error,
    reset,
    data
  } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    toast.success("Update user success");
  }

  if (isError) {
    toast.error("Faild to update user");
    reset();
  }

  return {
    updateUser,
    isLoading,
    isError,
    isSuccess,
    error,
    reset,
    data
  };
};

export const useGetCurrentUser = () => {

  const getMyUserRequest = async () => {
    const accessToken = getToken()

    const respone = await fetch(`${BASE_API_URL}/api/my/user/info`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!respone.ok) {
      throw new Error("Faild to get user");
    }

    return respone.json();
  };

  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery("fetchingCurrentUser", getMyUserRequest);

  if (isError) {
    toast.error("Faild to get user information");
  }

  return {
    currentUser,
    isLoading,
  };
};

export const useloginWithForm = () => {
  const requestLogin = async (dataUser: userLoginType) => {
    const respone = await fetch(`${BASE_API_URL}/api/my/user/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataUser),
    });
    if (!respone.ok) {
      throw new Error("Fail to login");
    }

    return respone.json();
  };

  const { mutateAsync: Login, isLoading } = useMutation(requestLogin,{
    onSuccess: () => {
        toast.success('Đăng nhập thành công',{
          duration:4000,
          action:{
            label: "Đóng",
            onClick: () => toast.dismiss(),
          }
        })
    }
  });

  // console.log(Login)

  return {
    Login,
    isLoading,
  };
};

// type register = Omit<userRegisterType,"confirmPassword">

export const useRegisterForm = () => {
  const requestRegister = async (dataUser: regiserRequest) => {
    const respone = await fetch(`${BASE_API_URL}/api/my/user/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataUser),
    });

    // console.log(respone.ok)
    
    if (!respone.ok) {
      const result = await respone.json()
      throw new Error(result.message);
    }

    return await respone.json();
  };

  const { mutateAsync: RegisterRequest, isLoading,error } = useMutation(requestRegister,{
    onSuccess: () => {
      toast.success("Tạo tài khoản mới thành công, vui lòng đăng nhập lại",{
        duration:4000,
        action:{
          label: "Đóng",
          onClick: () => toast.dismiss(),
        }
      });
    },

    onError:(error) => {
      const err = error as Error;
      toast.error(err.message,{
        duration:4000,
        action:{
          label: "Đóng",
          onClick: () => toast.dismiss(),
        }
      })
    }
  });


  return {
    RegisterRequest,
    isLoading,
    error
  };
};


export const useResetPassword = () => {
  const resetPasswordRequest = async (email: string) => {
    const respone = await fetch(`${BASE_API_URL}/api/my/user/reset-password`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!respone.ok) {
      throw new Error("Faild to reset password");
    }
  }

  const { mutateAsync: ResetPassword, isLoading } = useMutation(resetPasswordRequest,{
    onSuccess: () => {
      toast.success("Vui lòng kiểm tra email để đổi mật khẩu",{
        duration:4000,
        action:{
          label: "Đóng",
          onClick: () => toast.dismiss(),
        }
      })
    },
    onError: () => {
      toast.error("Email không tồn tại",{
        duration:4000,
        action:{
          label: "Đóng",
          onClick: () => toast.dismiss(),
        }
      })
    }
  });

  return {
    ResetPassword,
    isLoading
  }
}

export const loginWithGoogleAuthen = async (data:any) => {
  try {
    const respone = await fetch(`${BASE_API_URL}/api/my/user/login-google`,{
      method:'POST',
      headers:{
        "Content-type": "application/json",
      },
      body: JSON.stringify({data})
    })
    const result = await respone.json()
    return result 
  } catch (error) {
    console.log(error)
  }
}
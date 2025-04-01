import { query } from "@/pages/Restaurant/RestaurantDefault/RestaurantDefault";
import { searchRestauntType } from "@/pages/RestaurantClient/RestaurantClient";
import { setRestaurant } from "@/store/slice/RestaurantSlice";
import { paginationObj, restaurant, searchRespone, SearchState } from "@/type";
import { getToken } from "@/utils/token";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateRestaurant = () => {
  const createRestaurantRequest = async (formData: FormData) => {
    const accessToken = getToken();
    const respone = await fetch(`${BASE_API_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    if (!respone.ok) {
      throw new Error("Faild to create restaurant");
    }
    return respone.json();
  };

  const {
    mutateAsync: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createRestaurantRequest);

  if (isSuccess) {
    toast.success("Create restaurant success");
  }

  if (error) {
    toast.error("Fail to create restaurant");
  }

  return {
    createRestaurant,
    isLoading,
  };
};

export const useGetRestaurant = () => {
  const dispatch = useDispatch();

  const getRestaurantRequest = async () => {
    const accessToken = getToken();

    // console.log(accessToken)

    const respone = await fetch(`${BASE_API_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!respone.ok) {
      throw new Error("Faild to create restaurant");
    }
    return respone.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getRestaurantRequest,
    {
      onSuccess: (data) => {
        const result = data.data;
        // console.log(result)
        dispatch(setRestaurant({ restaurant: result }));
      },
    }
  );

  return {
    restaurant,
    isLoading,
  };
};

export const refetchRestaurant = async () => {
    console.log('Go here')
    const dispatch = useDispatch();
    const accessToken = getToken();
    try {
      const respone = await fetch(`${BASE_API_URL}/api/my/restaurant`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const result = await respone.json()
      dispatch(setRestaurant({ restaurant: result.data }));

    } catch (error) {
      console.log(error)
    }
}


export const useUpdateMyRestaurant = (id:string) => {

  const updateMyRestaurantRequest = async (formData: FormData) => {
    const accessToken = getToken()
    const respone = await fetch(`${BASE_API_URL}/api/my/restaurant/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    if (!respone.ok) {
      throw new Error("Faild to create restaurant");
    }
    return respone.json();
  };

  const {
    mutateAsync: updateRestaurant,
    isLoading,
    error,
  } = useMutation(updateMyRestaurantRequest,{
    onSuccess:() => {
      toast.success('Cập nhật thành công')
    }
  });

  // if (isSuccess) {
  //   toast.success("Update restaurant success");
  // }

  if (error) {
    toast.error("Fail to Update restaurant");
  }

  return {
    updateRestaurant,
    isLoading,
  };
};

export const useSearchRestaurant = (searchQuery: SearchState, city: string) => {
  const searchRestaurant = async (): Promise<searchRespone> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchQuery.searchQuery);
    params.set("page", searchQuery.page.toString());
    params.set("selectedCuisines", searchQuery.cuisines.join(","));
    params.set("sortOption", searchQuery.sortOption);

    const respone = await fetch(
      `${BASE_API_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!respone.ok) {
      throw new Error("Faild to get restaurant");
    }
    return respone.json();
  };

  const { data, isError, isLoading } = useQuery(
    ["restaurant", searchQuery],
    searchRestaurant,
    { enabled: !!city }
  );

  return {
    data,
    isLoading,
    isError,
  };
};

export const useGetRestaurantDetail = (id: string) => {
  const getRestaurantDetail = async (): Promise<restaurant> => {
    const respone = await fetch(
      `${BASE_API_URL}/api/restaurant/search/restaurant/${id}`
    );

    if (!respone.ok) {
      throw new Error("Faild to get restaurant");
    }
    return respone.json();
  };

  const { data, isError, isLoading } = useQuery(
    ["restaurantDetail"],
    getRestaurantDetail
  );

  return {
    data,
    isLoading,
    isError,
  };
};

export const useGetMyOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyOrdersRequest = async () => {
    const token = getAccessTokenSilently();
    const respone = await fetch(`${BASE_API_URL}/api/my/restaurant/orders`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (!respone.ok) {
      throw new Error();
    }

    return respone.json();
  };

  const { data, isLoading, isError } = useQuery("getOrder", getMyOrdersRequest);
  if (!isError) {
    toast.error("Fail to get orders");
  }

  return {
    data,
    isLoading,
  };
};

export const removeRestaurant = async (id: string) => {
  try {
    // console.log(id);
    const token = getToken();
    const respone = await fetch(`${BASE_API_URL}/api/my/restaurant`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    const result = await respone.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const removeMultiRestaurant = async (data: string) => {
  try {
    console.log(data);
    const token = getToken();
    const respone = await fetch(`${BASE_API_URL}/api/my/restaurant/multi`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data }),
    });
    const result = await respone.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const searchRestaurant = async (searchText: query) => {
  try {
    const token = getToken();
    const respone = await fetch(`${BASE_API_URL}/api/my/restaurant/search`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ searchText }),
    });
    const result = await respone.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getResCity = async () => {
  try {
    const respone = await fetch("https://provinces.open-api.vn/api/?depth=2");
    const result = await respone.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRestaurantById = async (id: string) => {
  try {
    const token = getToken();
    const respone = await fetch(`${BASE_API_URL}/api/my/restaurant/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const result = await respone.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};



export const getRestaurant = async (searchObj:searchRestauntType,paginateObj:paginationObj) => {
  try {
    const token = getToken();
    const respone = await fetch(`${BASE_API_URL}/api/res/all?page=${paginateObj.page}&limit=${paginateObj.limit}&search=${searchObj.searchText}&sort=${searchObj.sort.join(',')}&city=${searchObj.city}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const result = await respone.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};


const BASE_API_URL = import.meta.env.VITE_API_BASE_URL 

const api = `${BASE_API_URL}/api/noti`

export type typeNoti = {
    email:  string;
}

export const createNotiRequest = async (notification:typeNoti) => {
    try {   
        const respone = await fetch(api,{
            method:'POST',
            headers:{
                "Content-type": 'application/json',
            },
            body: JSON.stringify({notification})
        })
        const result = await respone.json()
        return result
    } catch (error) {
        console.log(error)
    }
}

export const getNotiRequest = async (email:string) => {
    try {   
        const respone = await fetch(`${api}?email=${email}`,{
            method:'GET',
            headers:{
                "Content-type": 'application/json',
            },
        })
        const result = await respone.json()
        return result
    } catch (error) {
        console.log(error)
    }
}



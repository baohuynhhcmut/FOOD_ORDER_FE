import {Auth0Provider } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"

type Props = {
    children: React.ReactNode
}

const Auth0ProviderWrapper = ({children} : Props) => {

    const navigate = useNavigate()
    // console.log(createUser)

    const domain = import.meta.env.VITE_DOMAIN as string
    const clientId = import.meta.env.VITE_CLIENT_ID as string
    const redirectURI = import.meta.env.VITE_REDIRECT_URI as string

    const audience = import.meta.env.VITE_AUDIENCE

    if(!domain || !clientId || !redirectURI || !audience){
        throw new Error('Unable to initialise auth')
    }

    const onRedirectCallback = () => {
        navigate('/auth-callback')
    }
    
    return (
       <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectURI,
                audience:audience
            }}
            onRedirectCallback={onRedirectCallback}
       >
            {children}
       </Auth0Provider>
    );
}

export default Auth0ProviderWrapper;

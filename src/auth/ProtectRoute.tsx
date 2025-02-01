

import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute = () => {

    const { isAuthenticated ,isLoading } = useAuth0()

    if(isLoading){
        return(
            <>
                <h2 className='text-orange-500 text-3xl text-center'>Loading data...</h2>
            </>
        )
    }
    
    return isAuthenticated ? <Outlet /> :(<Navigate to={'/'} replace />)
}

export default ProtectRoute;

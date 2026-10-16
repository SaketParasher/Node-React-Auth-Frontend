import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    return (
        <div>
            {isLoading && <h3>Loading......</h3>}
            {!isLoading && !isAuthenticated && <Navigate to='/login' replace />}
            {!isLoading && isAuthenticated && <Outlet />}
        </div>
    )
}

export default ProtectedRoute
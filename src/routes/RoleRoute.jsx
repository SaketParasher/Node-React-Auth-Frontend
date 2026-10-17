import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const RoleRoute = ({ role }) => {
    const { isAuthenticated, isLoading, user } = useAuth()

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (user?.role !== role) {
        return <Navigate to="/unauthorized" replace />
    }

    return <Outlet />
}

export default RoleRoute
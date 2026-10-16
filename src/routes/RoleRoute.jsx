import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const RoleRoute = ({ role }) => {
    const { isAuthenticated, isLoading, user } = useAuth()
    const isAccessAllowed = user?.role === role

    return (
        <div>
            {isLoading && <p>Loading....</p>}
            {!isLoading && !isAuthenticated && <Navigate to='/login' replace />}
            {!isLoading && isAuthenticated && !isAccessAllowed && <Navigate to="/unauthorized" replace />}
            {!isLoading && isAuthenticated && isAccessAllowed && <Outlet />}
        </div>
    )
}

export default RoleRoute
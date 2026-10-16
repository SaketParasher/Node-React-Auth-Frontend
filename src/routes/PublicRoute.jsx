import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
    const { isAuthenticated, isLoading } = useAuth()

    return (
        <div>
            {isLoading && <h3>Loading...</h3>}
            {!isLoading && isAuthenticated && <Navigate to='/' replace />}
            {!isLoading && !isAuthenticated && <Outlet />}
        </div>
    )
}

export default PublicRoute
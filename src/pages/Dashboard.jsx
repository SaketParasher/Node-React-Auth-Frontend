import React from 'react'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
    const { isAuthenticated, isLoading, user } = useAuth()

    console.log(isAuthenticated, isLoading, user)

    return (
        <div>
            Dashboard Info :
            <p>isLoading : {`${isLoading}`}</p>
            <p>isAuthenticated : {`${isAuthenticated}`}</p>
            {user ? (
                <div>
                    <p>User: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                </div>
            ) : 'Not Logged In'}
        </div>
    )
}

export default Dashboard
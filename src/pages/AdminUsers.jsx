import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const users = [
    {
        id: 101,
        name: 'Sarah'
    },
    {
        id: 201,
        name: 'John'
    },
    {
        id: 234,
        name: 'Marie'
    },
    {
        id: 404,
        name: 'Winder'
    }
]

const AdminUsers = () => {
    return (
        <div>
            <ul>
                {users.map(user => (
                    <li key={user.id}><Link to={`${user.id}`} state={{ source: 'admin-users' }}>{user.id} : {user.name}</Link></li>
                ))}
            </ul>
            <hr />
            <Outlet />
        </div>
    )
}

export default AdminUsers
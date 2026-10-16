import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './AppLayout.css'
import { useAuth } from '../context/AuthContext'

const AppLayout = () => {
    const { isAuthenticated, logout, user } = useAuth()
    const isAdmin = user?.role === 'admin'

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/"
                                className={({ isActive }) => isActive ? 'active' : 'nav-link'}>
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile"
                                className={({ isActive }) => isActive ? 'active' : 'nav-link'}>
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/api-playground"
                                className={({ isActive }) => isActive ? 'active' : 'nav-link'}>
                                Api Playground
                            </NavLink>
                        </li>
                        {/* {isAdmin && */}
                        <li>
                            <NavLink to="/admin"
                                end
                                className={({ isActive }) => isActive ? 'active' : 'nav-link'}>
                                Admin
                            </NavLink>
                        </li>
                        {/* } */}
                        {isAuthenticated &&
                            <li>
                                <button onClick={logout}>Logout</button>
                            </li>
                        }
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer> 🚀🚀 React Node Auth App -  @Copyright 2026</footer>
        </>
    )
}

export default AppLayout
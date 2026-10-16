import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <>
            <header>
                <nav>
                    <ul style={{ display: 'flex' }}>
                        <li>
                            <NavLink to='/admin'
                                end
                                className={({ isActive }) => isActive ? 'active' : 'nav-link'}>
                                Admin Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='users'
                                className={({ isActive }) => isActive ? 'active' : 'nav-link'}>
                                Users
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default AdminLayout
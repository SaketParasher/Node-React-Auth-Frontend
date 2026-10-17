import { NavLink, Outlet } from 'react-router-dom'
import './AppLayout.css'

const AdminLayout = () => {
    return (
        <>
            <header className="admin-header">
                <nav className="admin-nav">
                    <span className="admin-nav-title">
                        Admin
                    </span>

                    <ul className="admin-nav-list">
                        <li>
                            <NavLink
                                to="/admin"
                                end
                                className={({ isActive }) =>
                                    isActive
                                        ? 'admin-nav-link active'
                                        : 'admin-nav-link'
                                }
                            >
                                Dashboard
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="users"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'admin-nav-link active'
                                        : 'admin-nav-link'
                                }
                            >
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
import { NavLink, Outlet } from 'react-router-dom'
import './AppLayout.css'
import { useAuth } from '../context/AuthContext'

const AppLayout = () => {
    const { isAuthenticated, logout } = useAuth()

    return (
        <div className="app-shell">
            <header className="main-header">
                <nav className="main-nav">
                    <div className="brand">
                        React Node Auth
                    </div>

                    <ul className="nav-list">
                        <li>
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    isActive ? 'nav-link active' : 'nav-link'
                                }
                            >
                                Dashboard
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    isActive ? 'nav-link active' : 'nav-link'
                                }
                            >
                                Profile
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/api-playground"
                                className={({ isActive }) =>
                                    isActive ? 'nav-link active' : 'nav-link'
                                }
                            >
                                API Playground
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/admin"
                                className={({ isActive }) =>
                                    isActive ? 'nav-link active' : 'nav-link'
                                }
                            >
                                Admin
                            </NavLink>
                        </li>

                        {isAuthenticated && (
                            <li>
                                <button
                                    className="logout-btn"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>

            <main className="main-content">
                <Outlet />
            </main>

            <footer className="app-footer">
                🚀 React Node Auth App · © 2026
            </footer>
        </div>
    )
}

export default AppLayout
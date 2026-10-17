
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
    const { isAuthenticated, isLoading, user } = useAuth()

    console.log(isAuthenticated, isLoading, user)

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Dashboard</h1>
                <p className="page-subtitle">
                    Authentication / user information.
                </p>
            </div>

            <div className="dashboard-grid">
                <div className="card">
                    <h2 className="card-title">Session Status</h2>

                    <div className="info-row">
                        <span className="info-label">Loading</span>
                        <span className="info-value">{String(isLoading)}</span>
                    </div>

                    <div className="info-row">
                        <span className="info-label">Authentication</span>

                        {isAuthenticated ? (
                            <span className="status-badge status-authenticated">
                                Authenticated
                            </span>
                        ) : (
                            <span className="status-badge status-guest">
                                Guest
                            </span>
                        )}
                    </div>
                </div>

                <div className="card">
                    <h2 className="card-title">User</h2>

                    {user ? (
                        <>
                            <div className="info-row">
                                <span className="info-label">Name</span>
                                <span className="info-value">{user.name}</span>
                            </div>

                            <div className="info-row">
                                <span className="info-label">Email</span>
                                <span className="info-value">{user.email}</span>
                            </div>

                            <div className="info-row">
                                <span className="info-label">Role</span>
                                <span className="info-value">{user.role}</span>
                            </div>
                        </>
                    ) : (
                        <p className="text-muted">No authenticated user.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
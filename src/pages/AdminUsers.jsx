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
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Admin Users</h1>
                <p className="page-subtitle">
                    Select a user to view route parameter details.
                </p>
            </div>

            <div className="card">
                <ul className="user-list">
                    {users.map((user) => (
                        <li key={user.id}>
                            <Link
                                className="user-link"
                                to={`${user.id}`}
                                state={{ source: 'admin-users' }}
                            >
                                <span>{user.name}</span>
                                <span className="text-muted">ID: {user.id}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="section-gap">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminUsers
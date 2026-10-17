const Admin = () => {
    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Admin Dashboard</h1>
                <p className="page-subtitle">
                    This section requires the admin role.
                </p>
            </div>

            <div className="card">
                <h2 className="card-title">Administration</h2>
                <p className="text-muted">
                    Use the admin navigation to manage application resources.
                </p>
            </div>
        </div>
    )
}

export default Admin
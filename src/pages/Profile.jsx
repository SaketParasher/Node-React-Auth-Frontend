const Profile = () => {
    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">Profile</h1>
                <p className="page-subtitle">
                    This route is available only to authenticated users.
                </p>
            </div>

            <div className="card">
                <h2 className="card-title">Protected Profile</h2>
                <p className="text-muted">
                    Your protected profile content can go here.
                </p>
            </div>
        </div>
    )
}

export default Profile
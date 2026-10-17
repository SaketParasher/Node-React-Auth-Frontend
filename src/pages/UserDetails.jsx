import { useParams, useNavigate, useLocation } from 'react-router-dom'


const UserDetails = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { userId } = useParams();

    return (
        <div className="card">
            <h3 className="card-title">User Details</h3>

            <div className="info-row">
                <span className="info-label">User ID</span>
                <span className="info-value">{userId}</span>
            </div>

            <div className="info-row">
                <span className="info-label">Navigation source</span>
                <span className="info-value">
                    {state?.source ?? 'Direct URL'}
                </span>
            </div>

            <div className="button-row">
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate('/admin/users')}
                >
                    Back to Users
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                >
                    Browser Back
                </button>
            </div>
        </div>
    )
}

export default UserDetails
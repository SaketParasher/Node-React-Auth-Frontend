import { Link } from 'react-router-dom'

const Unauthorized = () => {
    return (
        <div className="status-page">
            <div className="status-card">
                <div className="status-code">403</div>

                <h1>Access Denied</h1>

                <p>
                    You are authenticated, but you do not have permission
                    to access this page.
                </p>

                <Link
                    to="/"
                    className="btn btn-primary status-action"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    )
}

export default Unauthorized
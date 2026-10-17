import { useState } from 'react'
import API_BASE_URL from '../config/api'

const PROFILE_URL = `${API_BASE_URL}/api/profile`

const ApiPlayground = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)

    const getProfile = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await fetch(PROFILE_URL, {
                method: 'GET',
                credentials: 'include'
            })
            const json = await response.json()
            console.log(json)
            if (!response.ok) {
                setError(json.message)
            } else {
                console.log(json)
                setUser(json.user)
            }
        } catch (error) {
            console.log("error in ApiPlayground ", error)
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="page">
            <div className="page-header">
                <h1 className="page-title">API Playground</h1>
                <p className="page-subtitle">
                    Test the authenticated profile API.
                </p>
            </div>

            <div className="card api-playground">
                <button
                    className="btn btn-primary"
                    onClick={getProfile}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'GET /api/profile'}
                </button>

                {error && (
                    <div className="message message-error">
                        {error}
                    </div>
                )}

                {user && (
                    <pre className="api-result">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                )}
            </div>
        </div>
    )
}

export default ApiPlayground
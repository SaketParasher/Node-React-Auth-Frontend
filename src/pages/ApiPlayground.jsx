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
        <div style={{ textAlign: 'center' }}>
            <h2>API PLAYGROUND</h2>

            <button onClick={getProfile}>GET PROFILE</button>

            {isLoading && <div>Loading...</div>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {user && <div>
                {JSON.stringify(user)}
            </div>}


        </div>
    )
}

export default ApiPlayground
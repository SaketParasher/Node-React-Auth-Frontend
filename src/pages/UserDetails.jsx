import React from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'


const UserDetails = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { userId } = useParams();

    return (
        <div>
            <h3>UserDetails</h3>
            <p>USER ID : {userId}</p>
            <p>Source : {state?.source ? state.source : 'Direct Url'}</p>
            <div>
                <button onClick={e => navigate('/admin/users')}>Go Back to Users</button>
                <button onClick={e => navigate(-1)}> Browser Back</button>
            </div>
        </div>
    )
}

export default UserDetails
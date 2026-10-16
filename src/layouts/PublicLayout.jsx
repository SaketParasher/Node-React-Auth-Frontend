import React from 'react'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
    return (
        <>
            <header>Public Layout</header>
            <main>
                <Outlet />
            </main>
            <footer> 🚀🚀 React Node Auth App -  @Copyright 2026</footer>
        </>
    )
}

export default PublicLayout
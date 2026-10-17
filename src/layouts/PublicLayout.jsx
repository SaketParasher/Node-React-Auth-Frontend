import { Outlet } from 'react-router-dom'
import './AppLayout.css'

const PublicLayout = () => {
    return (
        <div className="public-shell">
            <header className="public-header">
                <div className="public-brand">
                    React Node Auth
                </div>
            </header>

            <main className="public-main">
                <Outlet />
            </main>

            <footer className="app-footer">
                🚀 React Node Auth App · © 2026
            </footer>
        </div>
    )
}

export default PublicLayout
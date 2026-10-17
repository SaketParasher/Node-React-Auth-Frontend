import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
    MemoryRouter,
    Route,
    Routes
} from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'
import { useAuth } from '../context/AuthContext'

vi.mock('../context/AuthContext', () => ({
    useAuth: vi.fn(),
}))

describe('ProtectedRoute', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('shows loading state while authentication is being checked', () => {
        vi.mocked(useAuth).mockReturnValue({
            isLoading: true,
            isAuthenticated: false,
        })

        render(
            <MemoryRouter initialEntries={['/profile']}>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<h1>Profile Page</h1>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })

    it('redirects unauthenticated user to login', () => {
        vi.mocked(useAuth).mockReturnValue({
            isLoading: false,
            isAuthenticated: false,
        })

        render(
            <MemoryRouter initialEntries={['/profile']}>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<h1>Profile Page</h1>} />
                    </Route>

                    <Route path="/login" element={<h1>Login Page</h1>} />
                </Routes>
            </MemoryRouter>
        )

        expect(
            screen.getByRole('heading', { name: /login page/i })
        ).toBeInTheDocument()
    })

    it('renders protected content for authenticated user', () => {
        vi.mocked(useAuth).mockReturnValue({
            isLoading: false,
            isAuthenticated: true,
        })

        render(
            <MemoryRouter initialEntries={['/profile']}>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<h1>Profile Page</h1>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        )

        expect(
            screen.getByRole('heading', { name: /profile page/i })
        ).toBeInTheDocument()
    })
})
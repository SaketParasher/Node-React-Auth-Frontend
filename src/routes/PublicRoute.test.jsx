import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
    MemoryRouter,
    Route,
    Routes
} from 'react-router-dom'

import PublicRoute from './PublicRoute'
import { useAuth } from '../context/AuthContext'

vi.mock('../context/AuthContext', () => ({
    useAuth: vi.fn(),
}))

describe('PublicRoute', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('allows unauthenticated user to access login page', () => {
        vi.mocked(useAuth).mockReturnValue({
            isLoading: false,
            isAuthenticated: false,
        })

        render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<h1>Login Page</h1>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        )

        expect(
            screen.getByRole('heading', { name: /login page/i })
        ).toBeInTheDocument()
    })

    it('redirects authenticated user away from login page', () => {
        vi.mocked(useAuth).mockReturnValue({
            isLoading: false,
            isAuthenticated: true,
        })

        render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<h1>Login Page</h1>} />
                    </Route>

                    <Route path="/" element={<h1>Dashboard</h1>} />
                </Routes>
            </MemoryRouter>
        )

        expect(
            screen.getByRole('heading', { name: /dashboard/i })
        ).toBeInTheDocument()
    })
})
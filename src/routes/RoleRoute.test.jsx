import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
    MemoryRouter,
    Route,
    Routes
} from 'react-router-dom'

import RoleRoute from './RoleRoute'
import { useAuth } from '../context/AuthContext'

vi.mock('../context/AuthContext', () => ({
    useAuth: vi.fn(),
}))

describe('RoleRoute', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('allows admin user to access admin route', () => {
        vi.mocked(useAuth).mockReturnValue({
            isLoading: false,
            isAuthenticated: true,
            user: {
                name: 'Admin',
                role: 'admin',
            },
        })

        render(
            <MemoryRouter initialEntries={['/admin']}>
                <Routes>
                    <Route element={<RoleRoute role="admin" />}>
                        <Route
                            path="/admin"
                            element={<h1>Admin Dashboard</h1>}
                        />
                    </Route>
                </Routes>
            </MemoryRouter>
        )

        expect(
            screen.getByRole('heading', {
                name: /admin dashboard/i,
            })
        ).toBeInTheDocument()
    })

    it('redirects non-admin user to unauthorized page', () => {
        vi.mocked(useAuth).mockReturnValue({
            isLoading: false,
            isAuthenticated: true,
            user: {
                name: 'Normal User',
                role: 'user',
            },
        })

        render(
            <MemoryRouter initialEntries={['/admin']}>
                <Routes>
                    <Route element={<RoleRoute role="admin" />}>
                        <Route
                            path="/admin"
                            element={<h1>Admin Dashboard</h1>}
                        />
                    </Route>

                    <Route
                        path="/unauthorized"
                        element={<h1>Unauthorized</h1>}
                    />
                </Routes>
            </MemoryRouter>
        )

        expect(
            screen.getByRole('heading', { name: /unauthorized/i })
        ).toBeInTheDocument()
    })

    it('redirects unauthenticated user to login', () => {
        vi.mocked(useAuth).mockReturnValue({
            isLoading: false,
            isAuthenticated: false,
            user: null,
        })

        render(
            <MemoryRouter initialEntries={['/admin']}>
                <Routes>
                    <Route element={<RoleRoute role="admin" />}>
                        <Route
                            path="/admin"
                            element={<h1>Admin Dashboard</h1>}
                        />
                    </Route>

                    <Route path="/login" element={<h1>Login Page</h1>} />
                </Routes>
            </MemoryRouter>
        )

        expect(
            screen.getByRole('heading', { name: /login page/i })
        ).toBeInTheDocument()
    })
})
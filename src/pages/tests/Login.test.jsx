import { describe, expect, it, vi } from 'vitest'
import {
    render,
    screen,
    waitFor
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import Login from '../Login'
import { useAuth } from '../../context/AuthContext'

vi.mock('../../context/AuthContext', () => ({
    useAuth: vi.fn(),
}))

describe('Login', () => {
    it('submits email and password', async () => {
        const user = userEvent.setup()

        const login = vi.fn().mockResolvedValue({
            success: true,
        })

        vi.mocked(useAuth).mockReturnValue({
            login,
        })

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        await user.type(
            screen.getByLabelText(/email/i),
            'user@example.com'
        )

        await user.type(
            screen.getByLabelText(/password/i),
            'password123'
        )

        await user.click(
            screen.getByRole('button', { name: /Login/i })
        )

        await waitFor(() => {
            expect(login).toHaveBeenCalledWith(
                'user@example.com',
                'password123'
            )
        })
    })

    it('shows login error returned by backend', async () => {
        const user = userEvent.setup()

        const login = vi.fn().mockResolvedValue({
            success: false,
            message: 'Invalid email or password',
        })

        vi.mocked(useAuth).mockReturnValue({
            login,
        })

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        await user.type(
            screen.getByLabelText(/email/i),
            'wrong@example.com'
        )

        await user.type(
            screen.getByLabelText(/password/i),
            'wrong-password'
        )

        await user.click(
            screen.getByRole('button', { name: /Login/i })
        )

        expect(
            await screen.findByText(/invalid email or password/i)
        ).toBeInTheDocument()
    })
})
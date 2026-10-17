import { useActionState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom';

const initialState = {
    error: null
}

const Login = () => {
    const { login } = useAuth();
    const [state, formAction, isPending] = useActionState(formSubmitHandler, initialState)

    async function formSubmitHandler(prevState, formData) {
        try {
            const email = formData.get('email');
            const password = formData.get('password');

            const loginResponse = await login(email, password)

            if (loginResponse.success) {
                return {
                    ...prevState,
                    error: false
                }
            }

            return {
                ...prevState,
                error: loginResponse.message
            }
        } catch (error) {
            console.log('Error in Login : ', error)
            return {
                ...prevState,
                error: error.message
            }
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Welcome back</h2>
                <p className="auth-description">
                    Login to continue to your account.
                </p>

                <form action={formAction}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="you@example.com"
                            disabled={isPending}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            disabled={isPending}
                        />
                    </div>

                    {state?.error && (
                        <div className="message message-error">{state.error}</div>
                    )}

                    {isPending && (
                        <p className="loading-text">Signing in...</p>
                    )}

                    <div className="form-actions">
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? 'Signing in...' : 'Login'}
                        </button>

                        <Link to="/signup">New user? Create account</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
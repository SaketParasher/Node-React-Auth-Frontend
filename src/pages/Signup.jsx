import { useActionState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom';

const initialState = {
    error: null,
    success: null
}

const Signup = () => {
    const { signup } = useAuth();
    const [state, formAction, isPending] = useActionState(formSubmitHandler, initialState)

    async function formSubmitHandler(prevState, formData) {
        try {
            const name = formData.get('name')
            const email = formData.get('email');
            const password = formData.get('password');

            const signupResponse = await signup(name, email, password)

            if (signupResponse.success) {
                return {
                    ...prevState,
                    error: null,
                    success: true
                }
            }

            return {
                ...prevState,
                error: signupResponse.message,
                success: false
            }
        } catch (error) {
            console.log('Error in Signup : ', error)
            return {
                ...prevState,
                error: error.message,
                success: false
            }
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Create account</h2>
                <p className="auth-description">
                    Enter your details to create a new account.
                </p>

                <form action={formAction}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            required
                            name="name"
                            id="name"
                            placeholder="Your name"
                            disabled={isPending}
                        />
                    </div>

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
                            placeholder="Create a password"
                            disabled={isPending}
                        />
                    </div>

                    {state?.error && (
                        <div className="message message-error">{state.error}</div>
                    )}

                    {state?.success && (
                        <div className="message message-success">
                            Signup successful. <Link to="/login">Go to Login</Link>
                        </div>
                    )}

                    {isPending && (
                        <p className="loading-text">Creating account...</p>
                    )}

                    <div className="form-actions">
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? 'Creating...' : 'Sign up'}
                        </button>

                        <Link to="/login">Already have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
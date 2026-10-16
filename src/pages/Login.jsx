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
        <div className='login' style={{ textAlign: 'center' }}>
            <h2>Login Form</h2>
            <form action={formAction}>
                <div>
                    <p><label htmlFor='email'>Email: </label></p>
                    <input type='email' required name='email'
                        id='email' placeholder='Email...' disabled={isPending} />
                </div>
                <div>
                    <p><label htmlFor='password'>Password: </label></p>
                    <input type='password' required name='password'
                        id='password' placeholder='Password...' disabled={isPending} />
                </div>
                {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
                {isPending && <p>Loading...</p>}
                <div style={{ marginTop: '10px' }}>
                    <button type='submit' disabled={isPending}>Submit</button>
                    <Link to="/signup">New User? Signup</Link>
                </div>
            </form>

        </div>
    )
}

export default Login
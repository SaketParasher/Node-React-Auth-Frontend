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
                    error: false,
                    success: true
                }
            }

            return {
                ...prevState,
                error: signupResponse.message
            }
        } catch (error) {
            console.log('Error in Signup : ', error)
            return {
                ...prevState,
                error: error.message
            }
        }
    }

    return (
        <div className='signup' style={{ textAlign: 'center' }}>
            <h2>Signup Form</h2>
            <form action={formAction}>
                <div>
                    <p><label htmlFor='name'>Name: </label></p>
                    <input type='text' required name='name'
                        id='name' placeholder='User name...' disabled={isPending} />
                </div>
                <div>
                    <p><label htmlFor='email'>Email: </label></p>
                    <input type='email' required name='email'
                        id='email' placeholder='Login Email...' disabled={isPending} />
                </div>
                <div>
                    <p><label htmlFor='password'>Password: </label></p>
                    <input type='password' required name='password'
                        id='password' placeholder='Login Password...' disabled={isPending} />
                </div>
                {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
                {isPending && <p>Loading...</p>}
                {state?.success && <p style={{ color: 'green' }}>
                    <span>Signup Success. Please Login</span>
                    <Link to="/login">Go to Login</Link>
                </p>}
                <button type='submit' disabled={isPending}>Submit</button>
            </form>

        </div>
    )
}

export default Signup
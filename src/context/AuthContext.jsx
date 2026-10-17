import { createContext, useContext, useState, useEffect } from 'react'
import API_BASE_URL from '../config/api';

const AUTH_URL = `${API_BASE_URL}/api/auth`


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function checkAuth() {
            try {
                setIsLoading(true)
                const response = await fetch(`${AUTH_URL}/me`, {
                    credentials: "include"
                })
                const json = await response.json()
                if (response.ok) {
                    const { user } = json;
                    setIsAuthenticated(true);
                    setUser(user)
                } else {
                    console.log(`${json.message}`)
                    setUser(null)
                    setIsAuthenticated(false)
                }

            } catch (error) {
                console.log('Error in Auth Provider useEffet ', error)
                setUser(null)
                setIsAuthenticated(false)
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()

    }, [])

    const login = async (email, password) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${AUTH_URL}/login`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ email, password })
            })
            const json = await response.json();

            if (response.ok) {
                const { user } = json
                setIsAuthenticated(true)
                setUser(user)
                return {
                    success: true,
                    message: 'Login Success :)',
                }
            }

            return {
                success: false,
                message: json.message,
                status: response.status
            }
        } catch (error) {
            console.log("Error in Login ", error)
            throw new Error(`Unexpected Error at Server!`, { cause: error })
        } finally {
            setIsLoading(false)
        }
    }

    const signup = async (name, email, password) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${AUTH_URL}/signup`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ name, email, password })
            })
            const json = await response.json();

            if (response.ok) {
                return {
                    success: true,
                    message: 'Signup Success :)',
                }
            }

            return {
                success: false,
                message: json.message,
                status: response.status
            }
        } catch (error) {
            console.log("Error in Signup ", error)
            throw new Error(`Unexpected Error at Server!`, { cause: error })
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {

        try {
            setIsLoading(true)
            const response = await fetch(`${AUTH_URL}/logout`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                credentials: 'include'
            })
            if (response.ok) {
                setIsAuthenticated(false)
                setUser(null)
            } else {
                alert('UnExpected Error in Logout')
            }
        } catch (error) {
            console.log("Error in Logout ", error)
            alert('UnExpected Error in Logout')
        } finally {
            setIsLoading(false)
        }

    }

    return <AuthContext.Provider value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        signup
    }}>
        {children}
    </AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("You are not Provided with AuthContext. Please Wrap your Parent with Context")
    }

    const {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        signup
    } = authContext;

    return {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        signup
    }
}
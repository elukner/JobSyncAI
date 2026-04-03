import { UserAuth } from '../contexts/AuthContext'
import { Navigate, Link } from 'react-router-dom'
import AuthForm from '../components/auth/AuthForm'
import { useState } from 'react'

/**
 * Login component for user authentication.
 * 
 * Provides a login form interface that allows users to sign in with their credentials.
 * Manages loading state during the authentication process and handles any sign-in errors.
 * 
 * @returns {JSX.Element} The rendered login page with authentication form
 */
export default function Login() {

    const { signIn } = UserAuth()
    const [loading, setLoading] = useState(false)

    const handleSignInAction = async (email: string, password: string) => {
        setLoading(true)
        try {
            await signIn(email, password)
        } catch (error) {
            console.error("Login failed", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthForm
            title="Welcome Back"
            buttonText="Sign In"
            onSubmitAction={handleSignInAction}
            loading={loading}
            footerLink={
                <p>Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-500 underline">Sign Up</Link></p>
            }
        />
    )
}

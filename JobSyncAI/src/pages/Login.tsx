import { UserAuth } from '../contexts/AuthContext'
import { Navigate, Link } from 'react-router-dom'
import AuthForm from '../components/auth/AuthForm'
import { useState } from 'react'

/**
 * 
 * @returns 
 */
export default function Login() {

    const { signIn } = UserAuth()
    const [loading, setLoading] = useState(false)

    /**
     * 
     * @param email 
     * @param password 
     */
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
                <p>Don't have an account?
                    <Link to="/signup" className="text-blue-500 underline">Sign Up</Link></p>
            }
        />
    )
}

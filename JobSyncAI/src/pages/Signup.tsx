import { UserAuth } from '../contexts/AuthContext'
import { Navigate, Link } from 'react-router-dom'
import AuthForm from '../components/auth/AuthForm'
import { useState } from 'react'

/**
 * 
 * @returns 
 */
export default function SignUp() {
  const { signUp } = UserAuth()
  const [loading, setLoading] = useState(false)

  /**
   * 
   * @param email 
   * @param password 
   */
const handleSignUpAction = async (email: string, password: string) => {
    setLoading(true)
    try {
      await signUp(email, password)
    } catch (error) {
      console.error("Signup failed", error)
    } finally {
      setLoading(false)
    }
  }
return (
    <AuthForm 
      title="Create Account" 
      buttonText="Sign Up" 
      onSubmitAction={handleSignUpAction}
      loading={loading}
      footerLink={
        <p>Already have an account? 
            <Link to="/login" className="text-blue-500 underline">Sign In</Link></p>
      }
    />
  )
}

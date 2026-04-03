import { UserAuth } from '../contexts/AuthContext'
import { Navigate, Link } from 'react-router-dom'
import AuthForm from '../components/auth/AuthForm'
import { useState } from 'react'

/**
 * SignUp component that renders the user registration form.
 * 
 * Handles the sign-up process by collecting email and password from the user,
 * submitting the credentials to the authentication service, and managing the
 * loading state during the async operation.
 * 
 * @returns {JSX.Element} The rendered sign-up form with title, input fields,
 * and a link to navigate to the sign-in page for existing users.
 */
export default function SignUp() {
  const { signUp } = UserAuth()
  const [loading, setLoading] = useState(false)

/**
 * Handles the sign-up action for a new user.
 * @param email - The email address of the user signing up
 * @param password - The password for the new account
 * @returns A promise that resolves when the sign-up process completes
 * @throws Logs an error to the console if the sign-up fails
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
        <p>Already have an account?{' '} 
            <Link to="/login" className="text-blue-500 underline">Sign In</Link></p>
      }
    />
  )
}
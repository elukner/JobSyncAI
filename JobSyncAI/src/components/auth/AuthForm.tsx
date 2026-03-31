//The Login UI Component
//file to globally track if you're logged in
//When you are ready to type, your goal for this ticket is to build a simple form that has:

// An Email input field.

// A Password input field.

// A Sign In button.

// A Sign Up button.

import { useState, type ChangeEvent } from 'react'
import { UserAuth } from '../../contexts/AuthContext'


export default function AuthForm() {
  // This is the switch for true = Login mode, false = Sign Up mode
  const [isLogin, setIsLogin] = useState(true)
  // Use state to manage the email value
  const [email, setEmail] = useState('')
  // Use state to manage the password value
  const [password, setPassword] = useState('')
  // Use state to manage the error value
  const [error, setError] = useState('')
  // Use state to manage the loading value
  const [loading, setLoading] = useState(false)


  const { session, signUp, signIn, signOut } = UserAuth()
  console.log(session)

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting:", { email, password, isLogin })
    
    if (isLogin) { 
      await signIn(email, password) 
    }
    else { 
      await signUp(email, password) 
    }
  }

  /**
   * Handles the change event for the email input.
   * @param e 
   */
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  /**
 * Handles the change event for the password input.
 * @param e 
 */
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <div>
        {session && (
        <div className="max-w-md mx-auto pt-10 text-center pb-8 border-b mb-8">
          <h2 className="font-bold text-xl mb-4">You are logged in!</h2>
          <button 
            onClick={signOut} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Log Out
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto pt-10">
        <h2 className="font-bold pb-2">Sign up today!</h2>
        <p>

          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 underline ml-1"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}

          </button>
        </p>
        <div>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder='Email'
            className='block w-full p-2 mb-4 border rounded text-black'
          />

          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder='Password'
            className='block w-full p-2 mb-4 border rounded text-black'
          />
          <button
            type="submit"
            disabled={loading} //Todo does this need to be a !email| !password? 
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </form>

    </div>
  )
  
}

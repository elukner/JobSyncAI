//The Login UI Component
//file to globally track if you're logged in
//When you are ready to type, your goal for this ticket is to build a simple form that has:

// An Email input field.

// A Password input field.

// A Sign In button.

// A Sign Up button.

import { useState, type ChangeEvent } from 'react'


export default function AuthForm() {
  // This is the switch for true = Login mode, false = Sign Up mode
  const [isLogin, setIsLogin] = useState(true)
  // Use state to manage the email value
  const [email, setEmail] = useState('')
  // Use state to manage the password value
  const [password, setPassword] = useState('')
  /**
 * 
 * @param e 
 */
  const handleSubmit = (e: React.FormEvent) => {
    //stop the page from refreshing
    e.preventDefault()
    //prove it works by printing the state to the console
    console.log("Submitting:", { email, password, isLogin })
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
      <form onSubmit={handleSubmit} className='max-w-md m-auto pt-24'>
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
            type="email" name="" id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder='Email'
            className='block w-full p-2 mb-4 border rounded text-black'
          />

          <input
            type="password" name="" id=""
            value={password}
            onChange={handlePasswordChange}
            placeholder='Password'
            className='block w-full p-2 mb-4 border rounded text-black'
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </form>

    </div>
  )
}

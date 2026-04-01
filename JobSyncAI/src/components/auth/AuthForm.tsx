//The Login UI Component
//file to globally track if you're logged in
//When you are ready to type, your goal for this ticket is to build a simple form that has:

// An Email input field.

// A Password input field.

// A Sign In button.

// A Sign Up button.

import { useState, type ChangeEvent, type ReactNode } from 'react'

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmitAction: (email: string, password: string) => Promise<void>;
  footerLink: ReactNode;
  loading?: boolean;
}


export default function AuthForm({ title, buttonText, onSubmitAction, footerLink, loading }: AuthFormProps) {
  // Use state to manage the email value
  const [email, setEmail] = useState('')
  // Use state to manage the password value
  const [password, setPassword] = useState('')
  /**
   * Handles the change event for the email input.
   * @param e 
   */
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  /**
 * Handles the change event for the password input.
 * @param e 
 */
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  /**
   * 
   */
  const clearTextBox = () => {
    setEmail('')
    setPassword('')
  };

  /**
   * 
   * @param e 
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await onSubmitAction(email, password)
    clearTextBox()


  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto pt-10">
        <h2 className="font-bold pb-2 text-2xl">{title}</h2>
        {footerLink}
        <div className="mt-4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder='Email'
            className='block w-full p-2 mb-4 border rounded text-black'
            required
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder='Password'
            className='block w-full p-2 mb-4 border rounded text-black'
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : buttonText}
          </button>
        </div>
      </form>
    </div>
  )
}


import { useState, type ChangeEvent, type ReactNode } from 'react'

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmitAction: (email: string, password: string) => Promise<void>;
  footerLink: ReactNode;
  loading?: boolean;
}

/**
 * Reusable UI component for authentication screens (Login / Sign Up).
 * Manages local form state and delegates the actual API logic to the parent via onSubmitAction.
 */
export default function AuthForm({ title, buttonText, onSubmitAction, footerLink, loading }: AuthFormProps) {

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const clearTextBox = () => {
    setEmail('')
    setPassword('')
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Pass local state up to the parent component's auth handler
    await onSubmitAction(email, password)
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


import { UserAuth } from '../contexts/AuthContext'
import { Navigate, Link } from 'react-router-dom'
import AuthForm from '../components/auth/AuthForm'
import { useState } from 'react'
export default function Login() {
  // This is the switch for true = Login mode, false = Sign Up mode
  const [isLogin, setIsLogin] = useState(true)
return (
       <div>
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

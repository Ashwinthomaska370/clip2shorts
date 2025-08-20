import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const { signUp } = useAuth()
  const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  setError('')
  setMessage('')

  try {
    const { error } = await signUp(email, password)
    if (error) {
      setError(error.message)
    } else {
      // ✅ Instantly log in & navigate
      navigate('/dashboard') // or wherever you want to send them
    }
  } catch (err) {
    setError('An unexpected error occurred')
  } finally {
    setLoading(false)
  }
}

 

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <h1 className="font-display text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-zinc-300">Start free — no card required</p>
        
        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="mt-4 p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-zinc-300">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 outline-none ring-0 focus:border-fuchsia-500" 
              placeholder="you@example.com" 
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-300">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 outline-none ring-0 focus:border-fuchsia-500" 
              placeholder="••••••••" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-4 py-2 font-semibold text-white shadow-glow transition hover:brightness-110 active:scale-[.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
         
        </form>
        <p className="mt-4 text-center text-sm text-zinc-300">
          Already have an account? <Link to="/login" className="text-white underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup



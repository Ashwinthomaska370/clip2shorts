import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext.jsx'

const navLinkClass = ({ isActive }) =>
  `text-sm md:text-base transition-colors hover:text-white ${isActive ? 'text-white' : 'text-zinc-300'}`

function Navbar() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="h-8 w-8 rounded-lg bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-cyan-400 shadow-glow"
            />
            <span className="font-display text-xl font-extrabold tracking-tight">Clip2Shorts</span>
          </Link>

          {/* ✅ Only show marketing links when logged OUT */}
          <nav className="hidden md:flex items-center gap-8">
            {!user && (
              <>
                <NavLink to="/" className={navLinkClass}>Home</NavLink>
                <a href="#features" className="text-zinc-300 hover:text-white text-sm md:text-base">Features</a>
                <a href="#pricing" className="text-zinc-300 hover:text-white text-sm md:text-base">Pricing</a>
              </>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
                <NavLink to="/projects" className={navLinkClass}>Projects</NavLink>
                <span className="text-sm text-zinc-300">Welcome, {user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>Login</NavLink>
                <NavLink
                  to="/signup"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:brightness-110 active:scale-[.98]"
                >
                  Get Started
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-cyan-400" />
            <span className="font-display text-lg font-bold">Clip2Shorts</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-zinc-300">
            <Link to="/">Home</Link>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <Link to="/login">Login</Link>
          </nav>
        </div>
        <div className="mt-6 text-center md:text-left text-xs text-zinc-400">© {new Date().getFullYear()} Clip2Shorts. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default Footer



import { useAuth } from '../contexts/AuthContext.jsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VideoUpload from '../components/VideoUpload.jsx'

function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showUpload, setShowUpload] = useState(false)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mx-auto w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
          <p className="text-xl text-zinc-300">You're successfully signed in as {user?.email}</p>
        </div>
        
        {!showUpload ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="text-lg font-semibold mb-2">AI Video Shorts Generator</h3>
                <p className="text-zinc-300 text-sm mb-4">Upload your long videos and let AI automatically cut them into engaging shorts</p>
                <button 
                  onClick={() => setShowUpload(true)}
                  className="w-full rounded-lg bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-4 py-2 font-semibold text-white shadow-glow transition hover:brightness-110"
                >
                  Generate Shorts
                </button>
              </div>
              
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="text-lg font-semibold mb-2">My Projects</h3>
                <p className="text-zinc-300 text-sm mb-4">View and manage your video projects</p>
                <button 
                  onClick={() => navigate('/projects')}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2 font-semibold text-white hover:bg-white/10 transition hover:bg-white/10"
                >
                  View Projects
                </button>
              </div>
              
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="text-lg font-semibold mb-2">Analytics</h3>
                <p className="text-zinc-300 text-sm mb-4">Track your video performance</p>
                <button className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2 font-semibold text-white hover:bg-white/10 transition">
                  View Analytics
                </button>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-zinc-400">
                Upload your videos and let our AI automatically generate engaging short-form content with optimized captions and hashtags.
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowUpload(false)}
                className="inline-flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white transition-colors"
              >
                ← Back to Dashboard
              </button>
            </div>
            {showUpload && <VideoUpload />}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

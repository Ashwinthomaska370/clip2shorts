import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Projects from './pages/Projects.jsx'
import TestConnection from './pages/TestConnection.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { VideoProvider } from './contexts/VideoContext.jsx'

function App() {
  return (
    <AuthProvider>
      <VideoProvider>
        <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-indigo-950 text-white">
          <Navbar />
          <main className="relative">
            <Routes>
              <Route path="/" element={<Home />} />
                          <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/test" element={<TestConnection />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/projects" 
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
        </BrowserRouter>
      </VideoProvider>
    </AuthProvider>
  )
}

export default App

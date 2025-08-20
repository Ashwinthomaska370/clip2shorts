import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

function Hero() {
  const { user } = useAuth()
  
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-fuchsia-500 blur-[140px]" />
        <div className="absolute -bottom-40 left-10 h-[400px] w-[400px] rounded-full bg-cyan-400 blur-[140px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
        >
          Turn Long Videos Into <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">Viral Shorts</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-6 text-center text-base md:text-lg text-zinc-300 max-w-3xl mx-auto"
        >
          Clip2Shorts finds your best moments, adds captions, and exports ready-to-post clips for TikTok, YouTube Shorts, and Reels — in seconds.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          {user ? (
            <Link to="/dashboard" className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-6 py-3 text-base font-semibold text-white shadow-glow transition hover:brightness-110 active:scale-[.98]">
              Go to Dashboard
            </Link>
          ) : (
            <Link to="/signup" className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-6 py-3 text-base font-semibold text-white shadow-glow transition hover:brightness-110 active:scale-[.98]">
              Get Started Free
            </Link>
          )}
          <a href="#features" className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition">
            See Features
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-14 rounded-2xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 via-purple-900/20 to-zinc-800">
            {/* Simple How It Works Container */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-4xl">
                <h3 className="text-2xl font-bold text-white mb-8">How It Works</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  
                  {/* Step 1: Upload */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-col items-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 shadow-lg"
                    >
                      <span className="text-2xl">📁</span>
                    </motion.div>
                    <h4 className="text-white font-semibold mb-2">Upload Video</h4>
                    <p className="text-white/70 text-sm">Drag & drop your video file</p>
                  </motion.div>

                  {/* Step 2: AI Analysis */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex flex-col items-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-500 rounded-full flex items-center justify-center mb-4 shadow-lg"
                    >
                      <span className="text-2xl">🤖</span>
                    </motion.div>
                    <h4 className="text-white font-semibold mb-2">AI Analysis</h4>
                    <p className="text-white/70 text-sm">Smart content detection</p>
                  </motion.div>

                  {/* Step 3: Create Shorts */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="flex flex-col items-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-lg"
                    >
                      <span className="text-2xl">✂️</span>
                    </motion.div>
                    <h4 className="text-white font-semibold mb-2">Create Shorts</h4>
                    <p className="text-white/70 text-sm">Auto-generate clips</p>
                  </motion.div>

                  {/* Step 4: Download/Share */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="flex flex-col items-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg"
                    >
                      <span className="text-2xl">📤</span>
                    </motion.div>
                    <h4 className="text-white font-semibold mb-2">Download/Share</h4>
                    <p className="text-white/70 text-sm">Ready to use anywhere</p>
                  </motion.div>
                </div>

                {/* Simple Progress Bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
                  className="mt-8 mx-auto w-64 h-1 bg-white/10 rounded-full overflow-hidden"
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 via-fuchsia-500 via-green-500 to-orange-500 rounded-full"
                  ></motion.div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="mt-6"
                >
                  <p className="text-white/80 text-lg mb-4">Ready to transform your videos?</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Get Started Now
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* Simple Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 left-6 w-2 h-2 bg-blue-400 rounded-full opacity-60"
            ></motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-6 right-6 w-2 h-2 bg-fuchsia-400 rounded-full opacity-60"
            ></motion.div>

            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/3 right-8 w-2 h-2 bg-green-400 rounded-full opacity-60"
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero





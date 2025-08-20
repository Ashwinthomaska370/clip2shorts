import { motion } from 'framer-motion'
import { Sparkles, Captions, Scissors, Rocket } from 'lucide-react'

const features = [
  {
    title: 'AI Finds Your Best Moments',
    desc: 'Detects hooks, punchlines, and peak engagement segments automatically.',
    icon: Sparkles,
    color: 'from-fuchsia-500 to-purple-500',
  },
  {
    title: 'Auto Captions',
    desc: 'Bold, animated captions with on-brand colors and emojis.',
    icon: Captions,
    color: 'from-cyan-400 to-blue-500',
  },
  {
    title: 'Ready-to-Post Clips',
    desc: 'Export vertical clips for TikTok, Shorts, and Reels with safe margins.',
    icon: Rocket,
    color: 'from-purple-500 to-fuchsia-500',
  },
  {
    title: 'Smart Editing',
    desc: 'Auto reframing, jump cut cleanup, and filler removal in one click.',
    icon: Scissors,
    color: 'from-emerald-400 to-cyan-400',
  },
]

function Features() {
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center font-display text-3xl md:text-4xl font-bold"
        >
          Built For Creators
        </motion.h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:bg-white/10 transition"
            >
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${f.color} flex items-center justify-center mb-4 shadow-glow`}>
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features



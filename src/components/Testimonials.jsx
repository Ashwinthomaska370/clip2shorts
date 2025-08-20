import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Alex Rivera',
    handle: '@alexstreams',
    quote:
      'Went from 1 video a week to 10 clips a day. My Shorts channel exploded in 30 days.',
    avatar: 'https://i.pravatar.cc/80?img=12',
  },
  {
    name: 'Maya Chen',
    handle: '@mayatalks',
    quote: 'Captions + AI hooks = higher retention. This paid for itself the first week.',
    avatar: 'https://i.pravatar.cc/80?img=32',
  },
  {
    name: 'Jamal Ortiz',
    handle: '@jamalpod',
    quote: 'My podcast clips finally look pro. Auto-reframe is crazy good.',
    avatar: 'https://i.pravatar.cc/80?img=45',
  },
]

function Testimonials() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center font-display text-3xl md:text-4xl font-bold"
        >
          Loved by Creators
        </motion.h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.handle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-zinc-400">{t.handle}</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-zinc-300">“{t.quote}”</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials



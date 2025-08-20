import { Link } from 'react-router-dom'

function CTASection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-fuchsia-600/30 via-purple-600/30 to-cyan-600/30 p-8 md:p-10">
          <div className="absolute -top-20 -right-10 h-56 w-56 rounded-full bg-fuchsia-500/40 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-cyan-400/40 blur-3xl" />
          <div className="relative">
            <h3 className="font-display text-2xl md:text-3xl font-bold">Turn your content into viral gold.</h3>
            <p className="mt-2 text-zinc-300">Start free today — create 3 clips on us.</p>
            <div className="mt-6">
              <Link to="/signup" className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-6 py-3 text-base font-semibold text-white shadow-glow transition hover:brightness-110 active:scale-[.98]">
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection



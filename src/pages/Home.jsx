import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CTASection from '../components/CTASection.jsx'

function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <section id="pricing" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h2 className="font-display text-2xl md:text-3xl font-bold">Simple Pricing</h2>
            <p className="mt-2 text-zinc-300">Start free, upgrade when you’re ready.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl border border-white/10 bg-black/40 p-6">
                <h3 className="font-semibold">Free</h3>
                <p className="mt-1 text-sm text-zinc-300">3 clips / month</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/40 p-6">
                <h3 className="font-semibold">Creator</h3>
                <p className="mt-1 text-sm text-zinc-300">Unlimited clips, HD exports</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/40 p-6">
                <h3 className="font-semibold">Pro</h3>
                <p className="mt-1 text-sm text-zinc-300">Brand kits, team access</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
      <CTASection />
    </div>
  )
}

export default Home



import { Link } from 'react-router-dom'
import { categories, settings } from '../data/menu'

const steps = [
  ['1', 'Pick', 'Choose your favourites'],
  ['2', 'Add to cart', 'Set quantities'],
  ['3', 'Send on WhatsApp', 'One tap to order'],
  ['4', 'We deliver in Ife', 'Or walk in to our store'],
]

export default function Home() {
  return (
    <main>
      <section className="bg-gradient-to-b from-brand-orange to-[#f68a47] px-4 pb-12 pt-10 text-center text-white">
        <h1 className="text-5xl font-bold">Fruitful Day</h1>
        <p className="mt-2 text-lg font-medium">Fresh. Crisp. Enjoy</p>
        <p className="mt-1 text-sm opacity-90">Fresh • Healthy • Delicious</p>
        <Link
          to="/menu"
          className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-heading text-xl font-semibold text-brand-orange shadow-lg"
        >
          Order Now
        </Link>
      </section>

      <section className="px-4 py-8">
        <h2 className="text-2xl font-semibold text-brand-green">What are you craving?</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/menu?c=${c.slug}`}
              className="flex items-center gap-2 rounded-2xl border border-brand-leaf/30 bg-white p-3 font-semibold shadow-sm"
            >
              <span className="text-2xl" aria-hidden>{c.icon}</span>
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-brand-green/5 px-4 py-8">
        <h2 className="text-2xl font-semibold text-brand-green">How ordering works</h2>
        <ol className="mt-4 grid grid-cols-2 gap-3">
          {steps.map(([n, title, sub]) => (
            <li key={n} className="rounded-2xl bg-white p-3 shadow-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange text-sm font-bold text-white">
                {n}
              </span>
              <p className="mt-2 font-semibold">{title}</p>
              <p className="text-sm text-brand-text/70">{sub}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-4 py-8 text-center">
        <p className="font-semibold">We deliver anywhere within Ile-Ife, or walk in to order.</p>
        <div className="mt-4 flex justify-center gap-3">
          <a
            href={`https://wa.me/${settings.whatsapp_number}`}
            className="rounded-full bg-brand-leaf px-5 py-2.5 font-semibold text-white"
          >
            Chat on WhatsApp
          </a>
          <a
            href="https://instagram.com/fruitfulday__"
            className="rounded-full border-2 border-brand-orange px-5 py-2.5 font-semibold text-brand-orange"
          >
            Instagram
          </a>
        </div>
      </section>
    </main>
  )
}

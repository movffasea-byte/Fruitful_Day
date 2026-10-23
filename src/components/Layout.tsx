import { Link, Outlet } from 'react-router-dom'
import { settings } from '../data/menu'

const wa = `https://wa.me/${settings.whatsapp_number}`
const ig = 'https://instagram.com/fruitfulday__'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between bg-brand-orange px-4 py-3 text-white">
        <Link to="/" className="font-heading text-xl font-bold">
          🍊 Fruitful Day
        </Link>
        <Link to="/menu" className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-brand-orange">
          Menu
        </Link>
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
      <footer className="bg-brand-green px-4 py-8 text-sm text-white">
        <p className="font-heading text-lg font-semibold">Fruitful Day</p>
        <p className="opacity-90">Good Food Brings Good Vibes</p>
        <p className="mt-3 opacity-90">{settings.store_address}</p>
        <p className="opacity-90">{settings.opening_hours}</p>
        <div className="mt-4 flex flex-wrap gap-4 font-semibold">
          <a href={wa} className="underline">WhatsApp 0812 225 4443</a>
          <a href={ig} className="underline">@fruitfulday__</a>
        </div>
      </footer>
    </div>
  )
}

import { useSearchParams } from 'react-router-dom'
import { categories, formatNaira, menuItems } from '../data/menu'
import { useCart } from '../cart'

function Stepper({ id, name }: { id: string; name: string }) {
  const { qty, setQty } = useCart()
  const q = qty(id)
  if (q === 0) {
    return (
      <button
        onClick={() => setQty(id, 1)}
        aria-label={`Add ${name}`}
        className="rounded-full bg-brand-orange px-5 py-1.5 text-sm font-semibold text-white"
      >
        Add
      </button>
    )
  }
  const btn = 'flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange text-lg font-bold text-white'
  return (
    <div className="flex items-center gap-2">
      <button className={btn} onClick={() => setQty(id, q - 1)} aria-label={`Remove one ${name}`}>−</button>
      <span className="w-5 text-center font-semibold" aria-live="polite">{q}</span>
      <button className={btn} onClick={() => setQty(id, q + 1)} aria-label={`Add one more ${name}`}>+</button>
    </div>
  )
}

export default function Menu() {
  const [params, setParams] = useSearchParams()
  const active = categories.find((c) => c.slug === params.get('c')) ?? categories[0]
  const items = menuItems.filter((m) => m.category_id === active.id)

  return (
    <main>
      <nav
        aria-label="Menu categories"
        className="sticky top-0 z-10 flex gap-2 overflow-x-auto bg-brand-bg px-4 py-3 shadow-sm"
      >
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setParams({ c: c.slug }, { replace: true })}
            aria-current={c.id === active.id}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold ${
              c.id === active.id ? 'bg-brand-orange text-white' : 'bg-white text-brand-green ring-1 ring-brand-leaf/40'
            }`}
          >
            {c.icon} {c.name}
          </button>
        ))}
      </nav>

      <h1 className="px-4 pt-4 text-2xl font-semibold text-brand-green">{active.name}</h1>
      <ul className="grid gap-3 p-4">
        {items.map((m) => (
          <li key={m.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
            <img
              src={m.image_url}
              alt=""
              loading="lazy"
              width={72}
              height={72}
              className="h-[72px] w-[72px] shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="font-semibold leading-tight">{m.name}</p>
              {m.description && <p className="text-sm text-brand-text/70">{m.description}</p>}
              <p className="mt-1 font-semibold text-brand-orange">{formatNaira(m.price)}</p>
            </div>
            {m.is_available ? <Stepper id={m.id} name={m.name} /> : <span className="text-sm text-brand-text/60">Sold out</span>}
          </li>
        ))}
      </ul>
    </main>
  )
}

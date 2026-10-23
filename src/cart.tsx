import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { menuItems } from './data/menu'

type Lines = Record<string, number> // item id -> quantity

interface CartValue {
  lines: Lines
  qty: (id: string) => number
  setQty: (id: string, qty: number) => void
  count: number
  subtotal: number
}

const KEY = 'fruitful-day-cart'
const CartContext = createContext<CartValue | null>(null)

const load = (): Lines => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}')
  } catch {
    return {}
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Lines>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines))
    } catch {
      /* storage unavailable */
    }
  }, [lines])

  const value = useMemo<CartValue>(() => {
    const price = new Map(menuItems.map((m) => [m.id, m.price]))
    let count = 0
    let subtotal = 0
    for (const [id, q] of Object.entries(lines)) {
      count += q
      subtotal += q * (price.get(id) ?? 0)
    }
    return {
      lines,
      qty: (id) => lines[id] ?? 0,
      setQty: (id, qty) =>
        setLines((prev) => {
          const next = { ...prev }
          if (qty <= 0) delete next[id]
          else next[id] = qty
          return next
        }),
      count,
      subtotal,
    }
  }, [lines])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}

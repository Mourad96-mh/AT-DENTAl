import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('atdental-cart')
      const parsed = saved ? JSON.parse(saved) : []
      // Drop stale items that were saved before price was added
      return parsed.filter((i) => i.price != null)
    } catch {
      return []
    }
  })
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('atdental-cart', JSON.stringify(items))
  }, [items])

  const addItem = useCallback((product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { id: product.id, name: product.name, brand: product.brand, image: product.image, price: product.price, qty: 1 }]
    })
    setPanelOpen(true)
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const setQty = useCallback((id, qty) => {
    if (qty < 1) return
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, totalItems, panelOpen, setPanelOpen, addItem, removeItem, setQty, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './cart'
import Layout from './components/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

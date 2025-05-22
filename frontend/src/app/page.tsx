import Dashboard from '@/components/Dashboard'
import { config } from '@/services/config'

async function getOrders() {
  console.log('API URL:', config.apiUrl) // Debug log
  const res = await fetch(`${config.apiUrl}/api/orders`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch orders')
  return res.json()
}

async function getProducts() {
  const res = await fetch(`${config.apiUrl}/api/products`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  return res.json()
}

export default async function Home() {
  const [orders, products] = await Promise.all([
    getOrders(),
    getProducts()
  ])

  return <Dashboard orders={orders} products={products} />
} 
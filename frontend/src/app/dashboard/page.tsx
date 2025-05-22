import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Dashboard from '@/components/client/dashboard'
import { LoadingFallback } from '@/components/ui/loading-fallback'
import { api } from '@/services/api-client'
import { endpoints } from '@/services/api-endpoints'
import { Order } from '@/types/order'
import { Product } from '@/types/product'

async function getDashboardData() {
  const [orders, products] = await Promise.all([
    api.get<Order[]>(endpoints.orders.list),
    api.get<Product[]>(endpoints.products.list),
  ])

  return { orders, products }
}

// Server Component
async function DashboardContent() {
  const { orders, products } = await getDashboardData()
  return <Dashboard orders={orders} products={products} />
}

// Page Component
export default function DashboardPage() {
  return (
    <ErrorBoundary fallback={<div className="p-4 bg-red-50 text-red-700 rounded">Something went wrong</div>}>
      <Suspense fallback={<LoadingFallback />}>
        <DashboardContent />
      </Suspense>
    </ErrorBoundary>
  )
} 
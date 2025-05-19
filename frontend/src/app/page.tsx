import { Suspense } from 'react'
import ProductGrid from '@/components/ProductGrid'
import Loading from '@/components/Loading'
import { Product } from '@/lib/types'
import { config } from '@/lib/config'

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${config.apiUrl}/api/products`, { 
      next: { revalidate: 60 },
      headers: {
        'Accept': 'application/json',
      },
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`)
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export default async function Home() {
  const products = await getProducts()
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary-600 mb-8">
        Welcome to Next.js + ASP.NET Core Aspire Template
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>
          <Suspense fallback={<Loading />}>
            <ProductGrid products={products} />
          </Suspense>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Users</h2>
          <p className="text-gray-600">
            Handle user accounts and permissions efficiently.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Orders</h2>
          <p className="text-gray-600">
            Track and manage orders with real-time status updates.
          </p>
        </div>
      </div>
    </div>
  )
} 
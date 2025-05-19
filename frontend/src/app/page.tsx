export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary-600 mb-8">
        Welcome to Next.js + ASP.NET Core Aspire Template
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>
          <p className="text-gray-600">
            Manage your product inventory with our easy-to-use interface.
          </p>
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
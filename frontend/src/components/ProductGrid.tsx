'use client';
import { DataGrid } from '@mui/x-data-grid'
import { Container, Paper, Typography } from '@mui/material'
import { Product } from '@/lib/types'
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert" className="p-4 bg-red-50 text-red-700 rounded">
      <p>Something went wrong:</p>
      <pre className="mt-2 text-sm">{error.message}</pre>
    </div>
  )
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { 
      field: 'price', 
      headerName: 'Price', 
      width: 130,
      valueFormatter: (params: { value: number }) => `$${params.value.toFixed(2)}`
    },
    { field: 'stockLevel', headerName: 'Stock', width: 130 },
    { field: 'reorderThreshold', headerName: 'Reorder Level', width: 130 },
    { 
      field: 'createdAt', 
      headerName: 'Created', 
      width: 180,
      valueFormatter: (params: { value: string }) => new Date(params.value).toLocaleDateString()
    }
  ]

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Products
          </Typography>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={products}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </div>
        </Paper>
      </Container>
    </ErrorBoundary>
  )
} 
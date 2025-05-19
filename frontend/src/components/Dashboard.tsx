'use client'

import { Container, Grid, Paper, Typography } from '@mui/material'
import { PieChart, LineChart } from '@mui/x-charts'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

interface DashboardProps {
  orders: any[]
  products: any[]
}

export default function Dashboard({ orders, products }: DashboardProps) {
  // Process data for charts
  const orderStateData = orders.reduce((acc: any[], order: any) => {
    const state = order.state || 'Pending'
    const existing = acc.find(item => item.state === state)
    if (existing) {
      existing.count++
    } else {
      acc.push({ state, count: 1 })
    }
    return acc
  }, [])

  const orderVolumeData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    const dateStr = date.toISOString().split('T')[0]
    const count = orders.filter((order: any) => 
      new Date(order.createdAt).toISOString().split('T')[0] === dateStr
    ).length
    return { date: dateStr, orders: count }
  })

  const inventoryData = products.map((product: any) => ({
    product: product.name,
    stock: product.stockLevel
  }))

  return (
    <Container maxWidth="xl" className="p-4">
      <Typography variant="h4" component="h1" className="mb-6">
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={4}>
        {/* Top Row: Charts */}
        <Grid container item spacing={4}>
          {/* Order State Distribution */}
          <Grid item xs={12} md={4}>
            <Paper className="p-4 h-full">
              <Typography variant="h6" className="mb-4">Order Distribution by State</Typography>
              <div className="h-[300px]">
                <PieChart
                  series={[
                    {
                      data: orderStateData.map(item => ({
                        id: item.state,
                        value: item.count,
                        label: item.state
                      })),
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                  ]}
                  height={300}
                />
              </div>
            </Paper>
          </Grid>

          {/* Order Volume */}
          <Grid item xs={12} md={4}>
            <Paper className="p-4 h-full">
              <Typography variant="h6" className="mb-4">Order Volume (Last 30 Days)</Typography>
              <div className="h-[300px]">
                <LineChart
                  xAxis={[{ 
                    data: orderVolumeData.map(d => d.date),
                    scaleType: 'band',
                  }]}
                  series={[
                    {
                      data: orderVolumeData.map(d => d.orders),
                      area: true,
                    },
                  ]}
                  height={300}
                />
              </div>
            </Paper>
          </Grid>

          {/* Inventory Levels */}
          <Grid item xs={12} md={4}>
            <Paper className="p-4 h-full">
              <Typography variant="h6" className="mb-4">Product Inventory Levels</Typography>
              <div className="h-[300px]">
                <PieChart
                  series={[
                    {
                      data: inventoryData.map(item => ({
                        id: item.product,
                        value: item.stock,
                        label: item.product
                      })),
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                  ]}
                  height={300}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>

        {/* Bottom Row: Order History */}
        <Grid item xs={12}>
          <Paper className="p-4">
            <Typography variant="h6" className="mb-4">Recent Orders</Typography>
            <div className="overflow-x-auto">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Date & Time</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell>State</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders
                    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 20)
                    .map((order: any) => (
                      <TableRow 
                        key={order.id} 
                        hover 
                        className="cursor-pointer"
                        onClick={() => window.location.href = `/orders/${order.id}`}
                      >
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                        <TableCell>{order.userId}</TableCell>
                        <TableCell align="right">${order.totalAmount.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            order.state === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.state === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            order.state === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.state}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
} 
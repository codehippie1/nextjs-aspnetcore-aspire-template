'use client'

import { Container, Grid, Paper, Typography } from '@mui/material'
import { PieChart, LineChart } from '@mui/x-charts'
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Collapse, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

interface DashboardProps {
  orders: any[]
  products: any[]
}

interface OrderRowProps {
  order: any
  products: any[]
}

function OrderRow({ order, products }: OrderRowProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow 
        hover 
        className="cursor-pointer"
        onClick={() => window.location.href = `/orders/${order.id}`}
      >
        <TableCell>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              setOpen(!open)
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{order.id}</TableCell>
        <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
        <TableCell>{order.userId}</TableCell>
        <TableCell>{`${order.userId} - Customer ${order.userId}`}</TableCell>
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
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="p-4">
              <Typography variant="h6" gutterBottom component="div">
                Products in Order
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product ID</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items?.map((item: any) => {
                    const product = products.find(p => p.id === item.productId)
                    return (
                      <TableRow key={item.id}>
                        <TableCell>{item.productId}</TableCell>
                        <TableCell>{product?.name || 'Unknown Product'}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell align="right">${item.unitPrice.toFixed(2)}</TableCell>
                        <TableCell align="right">${(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default function Dashboard({ orders, products }: DashboardProps) {
  const [mounted, setMounted] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage] = useState(20)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  if (!mounted) {
    return null
  }

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
            <div className="overflow-x-auto" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox" />
                    <TableCell>Order ID</TableCell>
                    <TableCell>Date & Time</TableCell>
                    <TableCell>Customer ID</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell>State</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders
                    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order: any) => (
                      <OrderRow key={order.id} order={order} products={products} />
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={orders.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[20]}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
} 
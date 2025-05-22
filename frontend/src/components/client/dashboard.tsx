'use client'

import { Container, Grid, Paper, Typography } from '@mui/material'
import { PieChart, LineChart } from '@mui/x-charts'
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Collapse, IconButton } from '@mui/material'
import { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Order } from '@/types/order'
import { Product } from '@/types/product'

interface DashboardProps {
  orders: Order[]
  products: Product[]
}

export default function Dashboard({ orders, products }: DashboardProps) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openOrder, setOpenOrder] = useState<string | null>(null)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const toggleOrder = (orderId: string) => {
    setOpenOrder(openOrder === orderId ? null : orderId)
  }

  // Helper function to format date consistently
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0] // YYYY-MM-DD format
  }

  // Process data for charts
  const orderStates = orders.reduce((acc, order) => {
    acc[order.state] = (acc[order.state] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Sort dates and get last 30 days
  const sortedDates = Object.entries(
    orders.reduce((acc, order) => {
      const date = formatDate(order.createdAt)
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  ).sort(([a], [b]) => a.localeCompare(b))

  const last30Days = sortedDates.slice(-30)
  const orderDates = Object.fromEntries(last30Days)

  const stockLevels = products.reduce((acc, product) => {
    const level = product.stockLevel < product.reorderThreshold ? 'Low' : 'Good'
    acc[level] = (acc[level] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Helper function to format price
  const formatPrice = (price: number | undefined) => {
    return price ? `$${price.toFixed(2)}` : '$0.00'
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Order States Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Order States
            </Typography>
            <PieChart
              series={[
                {
                  data: Object.entries(orderStates).map(([label, value]) => ({
                    id: label,
                    value,
                    label,
                  })),
                },
              ]}
              width={400}
              height={300}
            />
          </Paper>
        </Grid>

        {/* Order Volume Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Order Volume (Last 30 Days)
            </Typography>
            <LineChart
              xAxis={[{ 
                data: Object.keys(orderDates),
                scaleType: 'band',
                valueFormatter: (value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                }
              }]}
              series={[
                {
                  data: Object.values(orderDates),
                },
              ]}
              width={400}
              height={300}
              margin={{ left: 60, right: 30, top: 20, bottom: 60 }}
            />
          </Paper>
        </Grid>

        {/* Inventory Levels Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 400 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Inventory Levels
            </Typography>
            <PieChart
              series={[
                {
                  data: Object.entries(stockLevels).map(([label, value]) => ({
                    id: label,
                    value,
                    label,
                  })),
                },
              ]}
              width={400}
              height={300}
            />
          </Paper>
        </Grid>

        {/* Orders Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Recent Orders
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Order ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>State</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                    <>
                      <TableRow key={order.id}>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => toggleOrder(order.id)}
                          >
                            {openOrder === order.id ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{formatPrice(order.totalAmount)}</TableCell>
                        <TableCell>{order.state}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={6}
                        >
                          <Collapse
                            in={openOrder === order.id}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Product</TableCell>
                                  <TableCell>Quantity</TableCell>
                                  <TableCell>Price</TableCell>
                                  <TableCell>Total</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {order.items.map((item) => (
                                  <TableRow key={item.id}>
                                    <TableCell>{item.productName}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{formatPrice(item.price)}</TableCell>
                                    <TableCell>
                                      {formatPrice(item.price && item.quantity ? item.price * item.quantity : 0)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
} 
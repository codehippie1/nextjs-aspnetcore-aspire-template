'use client'

import { Container, Grid, Paper, Typography } from '@mui/material'
import { PieChart, LineChart } from '@mui/x-charts'
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Collapse, IconButton } from '@mui/material'
import { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Order } from '@/types/order'
import { Product } from '@/types/product'

interface DashboardContentProps {
  orders: Order[]
  products: Product[]
}

export function DashboardContent({ orders, products }: DashboardContentProps) {
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

  // Process data for charts
  const orderStates = orders.reduce((acc, order) => {
    acc[order.state] = (acc[order.state] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const orderDates = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString()
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const stockLevels = products.reduce((acc, product) => {
    const level = product.stockLevel < product.reorderThreshold ? 'Low' : 'Good'
    acc[level] = (acc[level] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Order States Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
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
              width={300}
              height={200}
            />
          </Paper>
        </Grid>

        {/* Order Volume Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Order Volume (Last 30 Days)
            </Typography>
            <LineChart
              xAxis={[{ data: Object.keys(orderDates), scaleType: 'band' }]}
              series={[
                {
                  data: Object.values(orderDates),
                },
              ]}
              width={300}
              height={200}
            />
          </Paper>
        </Grid>

        {/* Inventory Levels Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
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
              width={300}
              height={200}
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
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
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
                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                    <TableCell>
                                      ${(item.quantity * item.price).toFixed(2)}
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
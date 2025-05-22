export interface OrderItem {
  id: string
  productId: string
  productName: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  state: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  totalAmount: number
  createdAt: string
  items: OrderItem[]
} 
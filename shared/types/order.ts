export interface OrderItem {
  productId: string
  quantity: number
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
}

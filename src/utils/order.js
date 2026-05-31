export const ORDER_ID_STORAGE_KEY = 'tharagai_last_order_id'

export function generateOrderId() {
  const orderNumber = Math.floor(1000 + Math.random() * 9000)
  return `HOT-${orderNumber}`
}
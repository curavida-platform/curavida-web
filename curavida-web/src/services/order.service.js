import api from './api'

export const createOrder = async (data) => {
       const response = await api.post('/orders', data)

       return response.data.data
}
export const getMyOrders = () => api.get('/orders/my-orders')
export const getOrders = () => api.get('/orders')
export const getOrderById = (id) => api.get(`/orders/${id}`)
export const updateOrderStatus = (id, status) =>
       api.patch(`/orders/${id}/status`, { status })
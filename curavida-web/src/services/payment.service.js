import api from './api'


export const createPixPayment = async (orderId) => {
  const response = await api.post(
    `/payments/${orderId}/pix`
  )

  return response.data.data
}


export const checkPaymentStatus = async (orderId) => {
  const response = await api.get(
    `/payments/${orderId}/status`
  )

  return response.data.data
}
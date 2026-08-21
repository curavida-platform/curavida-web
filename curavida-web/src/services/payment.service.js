import api from './api.js'


export const createPixPayment = async (orderId) => {
  const response = await api.post(
    `/payments/pix/${orderId}`
  )

  return response.data.data
}
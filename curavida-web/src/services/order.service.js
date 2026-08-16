import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const createOrder = async (token, data) => {
       return axios.post(`${API_URL}/orders`, data, {
              headers: {
                     Authorization: `Bearer ${token}`,
              },
       })
}

export const getMyOrders = async (token) => {
       return axios.get(`${API_URL}/orders/my-orders`, {
              headers: {
                     Authorization: `Bearer ${token}`,
              },
       })
}

export const getOrders = async (token) => {
       return axios.get(`${API_URL}/orders`, {
              headers: {
                     Authorization: `Bearer ${token}`,
              },
       })
}

export const getOrderById = async (id, token) => {
       return axios.get(`${API_URL}/orders/${id}`, {
              headers: {
                     Authorization: `Bearer ${token}`,
              },
       })
}

export const updateOrderStatus = async (id, status, token) => {
       return axios.patch(
              `${API_URL}/orders/${id}/status`,
              { status },
              {
                     headers: {
                            Authorization: `Bearer ${token}`,
                     },
              },
       )
}
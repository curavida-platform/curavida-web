import axios from 'axios'
import API_URL from './api'

const authService = {
       async register(data) {
              return axios.post(`${API_URL}/auth/register`, data)
       },

       async login(data) {
              return axios.post(`${API_URL}/auth/login`, data)
       },

       async getMe(token) {
              return axios.get(`${API_URL}/auth/me`, {
                     headers: {
                            Authorization: `Bearer ${token}`,
                     },
              })
       },
}

export default authService
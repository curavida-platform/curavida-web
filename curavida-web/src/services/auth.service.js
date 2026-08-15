import axios from 'axios'

const API_URL = 'http://localhost:3000'

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
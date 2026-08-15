import { defineStore } from 'pinia'
import authService from '../services/auth.service.js'

export const useAuthStore = defineStore('auth', {
       state: () => ({
              user: null,
              token: localStorage.getItem('curavida_token'),
              loading: false,
              initialized: false,
       }),

       getters: {
              isAuthenticated: (state) => !!state.token,

              customer: (state) => state.user?.customer || null,
       },

       actions: {
              async register(data) {
                     this.loading = true

                     try {
                            const response = await authService.register(data)

                            const { user, token } = response.data.data

                            this.token = token
                            this.user = user

                            localStorage.setItem('curavida_token', token)

                            return user
                     } finally {
                            this.loading = false
                     }
              },

              async login(data) {
                     this.loading = true

                     try {
                            const response = await authService.login(data)

                            const { id, email, role, customer, token } =
                                   response.data.data

                            this.user = {
                                   id,
                                   email,
                                   role,
                                   customer,
                            }

                            if (token) {
                                   this.token = token

                                   localStorage.setItem(
                                          'curavida_token',
                                          token,
                                   )
                            }

                            return this.user
                     } finally {
                            this.loading = false
                     }
              },

              async fetchUser() {
                     if (!this.token) {
                            this.initialized = true
                            return null
                     }

                     try {
                            const response = await authService.getMe(this.token)

                            this.user = response.data.data

                            return this.user
                     } catch (error) {
                            console.error(
                                   'Sessão inválida:',
                                   error,
                            )

                            this.logout()

                            return null
                     } finally {
                            this.initialized = true
                     }
              },

              logout() {
                     this.user = null
                     this.token = null

                     localStorage.removeItem(
                            'curavida_token',
                     )
              },
       },
})
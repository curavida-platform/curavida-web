import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    totalItems: (state) => {
      return state.items.reduce((total, item) => {
        return total + item.quantity
      }, 0)
    },

    isEmpty: (state) => {
      return state.items.length === 0
    },
  },

  actions: {
    addToCart(product) {
      const existingItem = this.items.find(
        (item) => item.id === product.id
      )

      if (existingItem) {
        existingItem.quantity++
        return
      }

      this.items.push({
        ...product,
        quantity: 1,
      })
    },

    removeFromCart(productId) {
      this.items = this.items.filter(
        (item) => item.id !== productId
      )
    },

    increaseQuantity(productId) {
      const item = this.items.find(
        (item) => item.id === productId
      )

      if (item) {
        item.quantity++
      }
    },

    decreaseQuantity(productId) {
      const item = this.items.find(
        (item) => item.id === productId
      )

      if (!item) return

      if (item.quantity > 1) {
        item.quantity--
      } else {
        this.removeFromCart(productId)
      }
    },

    clearCart() {
      this.items = []
    },
  },
})
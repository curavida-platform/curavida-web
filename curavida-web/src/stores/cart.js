import { defineStore } from 'pinia'

const CART_STORAGE_KEY = 'curavida-cart'

const loadCart = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)

    if (!savedCart) {
      return []
    }

    const parsedCart = JSON.parse(savedCart)

    return Array.isArray(parsedCart) ? parsedCart : []
  } catch (error) {
    console.error('Erro ao carregar carrinho:', error)

    return []
  }
}

const saveCart = (items) => {
  try {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(items)
    )
  } catch (error) {
    console.error('Erro ao salvar carrinho:', error)
  }
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: loadCart(),
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

        saveCart(this.items)

        return
      }

      this.items.push({
        ...product,
        quantity: 1,
      })

      saveCart(this.items)
    },

    removeFromCart(productId) {
      this.items = this.items.filter(
        (item) => item.id !== productId
      )

      saveCart(this.items)
    },

    increaseQuantity(productId) {
      const item = this.items.find(
        (item) => item.id === productId
      )

      if (item) {
        item.quantity++

        saveCart(this.items)
      }
    },

    decreaseQuantity(productId) {
      const item = this.items.find(
        (item) => item.id === productId
      )

      if (!item) return

      if (item.quantity > 1) {
        item.quantity--

        saveCart(this.items)
      } else {
        this.removeFromCart(productId)
      }
    },

    clearCart() {
      this.items = []

      localStorage.removeItem(CART_STORAGE_KEY)
    },
  },
})
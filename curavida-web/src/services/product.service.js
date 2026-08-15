import API_URL from './api'

export const getProducts = async () => {
       const response = await fetch(`${API_URL}/products`)

       if (!response.ok) {
              throw new Error('Erro ao buscar produtos.')
       }

       const result = await response.json()

       return result.data
}

export const getProductBySlug = async (slug) => {
       const response = await fetch(`${API_URL}/products/${slug}`)

       if (!response.ok) {
              throw new Error('Produto não encontrado.')
       }

       const result = await response.json()

       return result.data
}

export const createProduct = async (product) => {
       const response = await fetch(`${API_URL}/products`, {
              method: 'POST',
              headers: {
                     'Content-Type': 'application/json',
              },
              body: JSON.stringify(product),
       })

       if (!response.ok) {
              const error = await response.json()

              throw new Error(error.message || 'Erro ao criar produto.')
       }

       const result = await response.json()

       return result.data
}

export const addProductImage = async (productId, image) => {
       const response = await fetch(`${API_URL}/products/${productId}/images`, {
              method: 'POST',
              headers: {
                     'Content-Type': 'application/json',
              },
              body: JSON.stringify(image),
       })

       if (!response.ok) {
              throw new Error('Erro ao adicionar imagem.')
       }

       const result = await response.json()

       return result.data
}
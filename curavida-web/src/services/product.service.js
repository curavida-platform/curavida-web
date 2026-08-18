import api from './api'

export const getProducts = async () => {
       const response = await api.get('/products')
       return response.data.data
}

export const getProductBySlug = async (slug) => {
       const response = await api.get(`/products/${slug}`)
       return response.data.data
}

export const createProduct = async (product) => {
       const response = await api.post('/products', product)
       return response.data.data
}

export const addProductImage = async (productId, image) => {
       const response = await api.post(`/products/${productId}/images`, image)
       return response.data.data
}
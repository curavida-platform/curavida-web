import API_URL from './api'

export const getCategories = async () => {
  const response = await fetch(`${API_URL}/categories`)

  if (!response.ok) {
    throw new Error('Erro ao buscar categorias.')
  }

  const result = await response.json()

  return result.data
}
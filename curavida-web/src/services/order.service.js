const API_URL = 'http://localhost:3000'

const orderService = {
       async getMyOrders(token) {
              return fetch(`${API_URL}/orders/my-orders`, {
                     method: 'GET',
                     headers: {
                            Authorization: `Bearer ${token}`,
                     },
              }).then(async (response) => {
                     const data = await response.json()

                     if (!response.ok || !data.success) {
                            throw new Error(
                                   data.message || 'Não foi possível carregar seus pedidos.',
                            )
                     }

                     return {
                            data,
                     }
              })
       },
}

export default orderService
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const product = ref(null)
const loading = ref(true)
const error = ref('')

const API_URL = 'http://localhost:3000'

const loadProduct = async () => {
  try {
    loading.value = true

    const response = await fetch(
      `${API_URL}/products/${route.params.slug}`
    )

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.message)
    }

    product.value = result.data
  } catch (err) {
    console.error('Erro ao carregar produto:', err)
    error.value = 'Não foi possível carregar o produto.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProduct()
})
</script>

<template>
  <main class="product-details">
    <p v-if="loading">Carregando produto...</p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <section v-else-if="product" class="product-content">

      <div class="product-image">
        <img
          v-if="product.images?.length"
          :src="product.images[0].url"
          :alt="product.images[0].alt || product.name"
        />

        <span v-else>
          Produto
        </span>
      </div>

      <div class="product-info">

        <span class="product-category">
          {{ product.category?.name }}
        </span>

        <h1>
          {{ product.name }}
        </h1>

        <p class="description">
          {{ product.description }}
        </p>

        <div class="product-data">
          <p v-if="product.reference">
            <strong>Referência:</strong>
            {{ product.reference }}
          </p>

          <p v-if="product.brand">
            <strong>Marca:</strong>
            {{ product.brand }}
          </p>

          <p v-if="product.size">
            <strong>Tamanho:</strong>
            {{ product.size }}
          </p>

          <p v-if="product.quantityPerBox">
            <strong>Quantidade:</strong>
            {{ product.quantityPerBox }}
          </p>
        </div>

        <strong class="price">
          R$ {{ product.unitPrice }}
        </strong>

        <button class="contact-button">
          Solicitar produto
        </button>

      </div>

    </section>
  </main>
</template>

<style scoped>
.product-details {
  min-height: 80vh;
  padding: 80px 8%;
  background: #fff;
}

.product-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  align-items: center;
}

.product-image {
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7f6;
  border-radius: 24px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-image span {
  color: #9aa8a7;
}

.product-category {
  color: #d98991;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.product-info h1 {
  margin: 12px 0 20px;
  color: #263737;
  font-family: Georgia, serif;
  font-size: 42px;
}

.description {
  color: #748080;
  line-height: 1.7;
  font-size: 16px;
}

.product-data {
  margin: 30px 0;
  color: #526161;
  line-height: 1.8;
}

.product-data p {
  margin: 5px 0;
}

.price {
  display: block;
  margin-bottom: 25px;
  color: #176b6d;
  font-size: 25px;
}

.contact-button {
  padding: 14px 25px;
  border: none;
  border-radius: 30px;
  background: #176b6d;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.contact-button:hover {
  background: #12595b;
}

@media (max-width: 800px) {
  .product-content {
    grid-template-columns: 1fr;
    gap: 35px;
  }

  .product-image {
    height: 350px;
  }

  .product-info h1 {
    font-size: 34px;
  }
}
</style>
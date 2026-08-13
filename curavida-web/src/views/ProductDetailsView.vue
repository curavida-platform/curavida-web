<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart.js'

const route = useRoute()
const cartStore = useCartStore()

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

const addToCart = () => {
  if (!product.value) return

  cartStore.addToCart(product.value)
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
        <img v-if="product.images?.length" :src="product.images[0].url" :alt="product.images[0].alt || product.name" />

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

        <button class="contact-button" type="button" @click="addToCart">
          Adicionar ao carrinho
        </button>

      </div>

    </section>
  </main>
</template>

<style scoped>
.product-details {
  min-height: 80vh;

  background: var(--color-white);

  padding: 80px 0;
}

.product-content {
  width: min(1200px, calc(100% - 3rem));

  margin: 0 auto;

  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);

  gap: 70px;

  align-items: center;
}


/* =========================================
   IMAGEM
   ========================================= */

.product-image {
  width: 100%;
  height: 500px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--color-surface);

  border-radius: var(--radius-lg);

  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;

  object-fit: contain;
}

.product-image span {
  color: var(--color-text-light);

  font-size: 14px;
}


/* =========================================
   INFORMAÇÕES
   ========================================= */

.product-info {
  min-width: 0;
}

.product-category {
  display: inline-block;

  margin-bottom: 10px;

  color: var(--color-secondary);

  font-size: 13px;
  font-weight: 700;

  letter-spacing: 1px;

  text-transform: uppercase;
}

.product-info h1 {
  margin: 0 0 20px;

  color: var(--color-text);

  font-family: var(--font-display);

  font-size: clamp(2.3rem, 4vw, 3.2rem);
  font-weight: 600;

  line-height: 1.1;
}

.description {
  max-width: 550px;

  margin: 0;

  color: var(--color-text-light);

  font-size: 16px;

  line-height: 1.7;
}


/* =========================================
   DADOS DO PRODUTO
   ========================================= */

.product-data {
  margin: 30px 0;

  color: var(--color-text);

  line-height: 1.8;
}

.product-data p {
  margin: 5px 0;

  color: var(--color-text-light);
}

.product-data strong {
  color: var(--color-text);
}


/* =========================================
   PREÇO
   ========================================= */

.price {
  display: block;

  margin-bottom: 25px;

  color: var(--color-primary);

  font-size: 25px;
}


/* =========================================
   BOTÃO
   ========================================= */

.contact-button {
  min-height: 50px;

  padding: 0 25px;

  border: none;

  border-radius: var(--radius-full);

  background: var(--color-primary);

  color: var(--color-white);

  font-family: var(--font-primary);

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  transition:
    background var(--transition-fast),
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.contact-button:hover {
  background: var(--color-primary-dark);

  transform: translateY(-2px);

  box-shadow: var(--shadow-md);
}


/* =========================================
   TABLET
   ========================================= */

@media (max-width: 1024px) {
  .product-details {
    padding: 64px 0;
  }

  .product-content {
    gap: 45px;
  }

  .product-image {
    height: 420px;
  }
}


/* =========================================
   TABLET PEQUENO
   ========================================= */

@media (max-width: 800px) {
  .product-content {
    grid-template-columns: 1fr;

    gap: 35px;
  }

  .product-image {
    height: 400px;

    max-width: 600px;

    margin: 0 auto;
  }

  .product-info {
    max-width: 650px;

    margin: 0 auto;
  }

  .product-info h1 {
    font-size: 2.4rem;
  }
}


/* =========================================
   MOBILE
   ========================================= */

@media (max-width: 600px) {
  .product-details {
    padding: 40px 0 60px;
  }

  .product-content {
    width: calc(100% - 2rem);

    gap: 28px;
  }

  .product-image {
    height: 320px;

    border-radius: var(--radius-md);
  }

  .product-info h1 {
    font-size: 2rem;

    line-height: 1.15;
  }

  .description {
    font-size: 15px;

    line-height: 1.65;
  }

  .product-data {
    margin: 25px 0;

    font-size: 14px;
  }

  .price {
    margin-bottom: 20px;

    font-size: 23px;
  }

  .contact-button {
    width: 100%;
  }
}


/* =========================================
   MOBILE PEQUENO
   ========================================= */

@media (max-width: 400px) {
  .product-content {
    width: calc(100% - 1.5rem);
  }

  .product-image {
    height: 280px;
  }

  .product-info h1 {
    font-size: 1.8rem;
  }

  .product-data {
    font-size: 13px;
  }
}
</style>
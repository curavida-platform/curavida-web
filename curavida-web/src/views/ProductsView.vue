<script setup>
import { computed, onMounted, ref } from 'vue'
import ProductCard from '../components/cards/ProductCard.vue'

const API_URL = 'http://localhost:3000'

const products = ref([])
const search = ref('')
const selectedCategory = ref('Todos')
const loading = ref(true)
const error = ref(null)

const categories = [
       'Todos',
       'Curativos',
       'Estomias',
       'Cuidados com a pele',
]

const fetchProducts = async () => {
       try {
              loading.value = true
              error.value = null

              const response = await fetch(`${API_URL}/products`)

              if (!response.ok) {
                     throw new Error('Erro ao buscar produtos')
              }

              const result = await response.json()

              products.value = result.data
       } catch (err) {
              console.error('Erro ao carregar produtos:', err)
              error.value = 'Não foi possível carregar os produtos.'
       } finally {
              loading.value = false
       }
}

const filteredProducts = computed(() => {
       return products.value.filter((product) => {
              const matchesSearch =
                     product.name
                            .toLowerCase()
                            .includes(search.value.toLowerCase())

              const matchesCategory =
                     selectedCategory.value === 'Todos' ||
                     product.category?.name === selectedCategory.value

              return matchesSearch && matchesCategory
       })
})

onMounted(() => {
       fetchProducts()
})
</script>

<template>
       <main class="products-page">
              <section class="products-content">
                     <div class="products-header">
                            <div>
                                   <span class="section-label">NOSSO CATÁLOGO</span>
                                   <h2>Encontre o que você precisa</h2>
                            </div>

                            <div class="search-box">
                                   <span>⌕</span>
                                   <input v-model="search" type="text" placeholder="Buscar produto..." />
                            </div>
                     </div>

                     <div class="categories">
                            <button v-for="category in categories" :key="category"
                                   :class="{ active: selectedCategory === category }"
                                   @click="selectedCategory = category">
                                   {{ category }}
                            </button>
                     </div>

                     <div class="products-grid">

                            <p v-if="loading">
                                   Carregando produtos...
                            </p>

                            <p v-else-if="error">
                                   {{ error }}
                            </p>

                            <template v-else>
                                   <ProductCard v-for="product in filteredProducts" :key="product.id"
                                          :product="product" />

                                   <p v-if="filteredProducts.length === 0">
                                          Nenhum produto encontrado.
                                   </p>
                            </template>

                     </div>
              </section>
       </main>
</template>

<style scoped>
.products-page {
       min-height: 100vh;

       background: var(--color-white);
}

.products-content {
       width: min(1200px, calc(100% - 3rem));

       margin: 0 auto;

       padding: 80px 0;
}


/* =========================================
   CABEÇALHO
   ========================================= */

.products-header {
       display: flex;
       align-items: flex-end;
       justify-content: space-between;

       gap: 30px;
}

.section-label {
       display: inline-block;

       color: var(--color-primary);

       font-size: 0.75rem;
       font-weight: 700;

       letter-spacing: 0.14em;
}

.products-header h2 {
       margin-top: 12px;

       color: var(--color-text);

       font-family: var(--font-display);

       font-size: clamp(2.2rem, 4vw, 3rem);
       font-weight: 600;

       line-height: 1.1;
}


/* =========================================
   BUSCA
   ========================================= */

.search-box {
       display: flex;
       align-items: center;

       gap: 10px;

       width: 300px;

       padding: 13px 18px;

       border: 1px solid var(--color-border);
       border-radius: var(--radius-full);

       background: var(--color-white);

       transition:
              border-color var(--transition-fast),
              box-shadow var(--transition-fast);
}

.search-box:focus-within {
       border-color: var(--color-primary);

       box-shadow: 0 0 0 3px rgb(21 92 92 / 8%);
}

.search-box span {
       display: flex;
       align-items: center;

       color: var(--color-primary);

       font-size: 24px;
}

.search-box input {
       width: 100%;

       border: none;
       outline: none;

       background: transparent;

       color: var(--color-text);

       font-family: var(--font-primary);
       font-size: 15px;
}

.search-box input::placeholder {
       color: var(--color-text-light);
}


/* =========================================
   CATEGORIAS
   ========================================= */

.categories {
       display: flex;
       flex-wrap: wrap;
       align-items: center;

       gap: 10px;

       margin: 45px 0;
}

.categories button {
       padding: 11px 22px;

       border: 1px solid var(--color-border);
       border-radius: var(--radius-full);

       background: var(--color-white);

       color: var(--color-text);

       font-family: var(--font-primary);
       font-size: 14px;
       font-weight: 500;

       cursor: pointer;

       transition:
              background var(--transition-fast),
              color var(--transition-fast),
              border-color var(--transition-fast),
              transform var(--transition-fast);
}

.categories button:hover {
       border-color: var(--color-primary);

       color: var(--color-primary);

       transform: translateY(-1px);
}

.categories button.active {
       border-color: var(--color-primary);

       background: var(--color-primary);

       color: var(--color-white);
}


/* =========================================
   GRID
   ========================================= */

.products-grid {
       display: grid;

       grid-template-columns: repeat(3, minmax(0, 1fr));

       gap: 25px;
}


/* =========================================
   ESTADOS
   ========================================= */

.products-grid>p {
       grid-column: 1 / -1;

       padding: 3rem 1rem;

       color: var(--color-text-light);

       text-align: center;
}


/* =========================================
   TABLET
   ========================================= */

@media (max-width: 1024px) {
       .products-content {
              padding: 64px 0;
       }

       .products-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));

              gap: 20px;
       }
}


/* =========================================
   TABLET PEQUENO
   ========================================= */

@media (max-width: 900px) {
       .products-header {
              align-items: stretch;

              flex-direction: column;
       }

       .search-box {
              width: 100%;
       }

       .categories {
              margin: 35px 0;
       }
}


/* =========================================
   MOBILE
   ========================================= */

@media (max-width: 600px) {
       .products-content {
              width: calc(100% - 2rem);

              padding: 48px 0;
       }

       .products-header h2 {
              font-size: 2rem;

              line-height: 1.15;
       }

       .categories {
              gap: 8px;

              margin: 30px 0;
       }

       .categories button {
              padding: 9px 16px;

              font-size: 13px;
       }

       .products-grid {
              grid-template-columns: 1fr;

              gap: 18px;
       }
}


/* =========================================
   MOBILE PEQUENO
   ========================================= */

@media (max-width: 400px) {
       .products-content {
              width: calc(100% - 1.5rem);

              padding: 40px 0;
       }

       .products-header h2 {
              font-size: 1.8rem;
       }

       .categories button {
              padding: 8px 13px;

              font-size: 12px;
       }
}
</style>
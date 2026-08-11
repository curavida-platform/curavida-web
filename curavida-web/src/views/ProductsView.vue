<script setup>
import ProductCard from '../components/cards/ProductCard.vue'
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
                                   <input type="text" placeholder="Buscar produto..." />
                            </div>
                     </div>

                     <div class="categories">
                            <button class="active">Todos</button>
                            <button>Curativos</button>
                            <button>Estomias</button>
                            <button>Cuidados</button>
                     </div>

                     <div class="products-grid">
                            <ProductCard v-for="product in products" :key="product.id" :product="product" />
                     </div>
              </section>
       </main>
</template>

<style scoped>
.products-page {
       min-height: 100vh;
       background: #fff;
}

.products-content {
       padding: 80px 8%;
}

.products-header {
       display: flex;
       justify-content: space-between;
       align-items: end;
       gap: 30px;
}

.products-header h2 {
       margin-top: 12px;
       font-family: Georgia, serif;
       font-size: 42px;
       color: #263737;
}

.search-box {
       display: flex;
       align-items: center;
       gap: 10px;
       width: 300px;
       padding: 14px 18px;
       border: 1px solid #dfe5e4;
       border-radius: 30px;
}

.search-box span {
       font-size: 24px;
       color: #176b6d;
}

.search-box input {
       width: 100%;
       border: none;
       outline: none;
       font-size: 15px;
}

.categories {
       display: flex;
       gap: 10px;
       margin: 45px 0;
       flex-wrap: wrap;
}

.categories button {
       padding: 11px 22px;
       border: 1px solid #dfe5e4;
       border-radius: 30px;
       background: white;
       color: #315252;
       cursor: pointer;
}

.categories button.active,
.categories button:hover {
       background: #176b6d;
       color: white;
       border-color: #176b6d;
}

.products-grid {
       display: grid;
       grid-template-columns: repeat(3, 1fr);
       gap: 25px;
}

.product-card {
       overflow: hidden;
       border: 1px solid #e7eceb;
       border-radius: 20px;
       background: white;
       transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
       transform: translateY(-4px);
       box-shadow: 0 15px 35px rgba(30, 70, 70, 0.08);
}

.product-image {
       height: 250px;
       display: flex;
       align-items: center;
       justify-content: center;
       background: #f5f7f6;
       color: #9aa8a7;
}

.product-info {
       padding: 25px;
}

.product-category {
       font-size: 12px;
       font-weight: 700;
       letter-spacing: 1px;
       text-transform: uppercase;
       color: #d98991;
}

.product-info h3 {
       margin: 10px 0;
       color: #263737;
       font-size: 20px;
}

.product-info p {
       color: #748080;
       line-height: 1.5;
}

.product-footer {
       display: flex;
       justify-content: space-between;
       align-items: center;
       margin-top: 25px;
}

.product-footer strong {
       color: #176b6d;
       font-size: 18px;
}

.product-footer button {
       border: none;
       background: none;
       color: #176b6d;
       font-weight: 700;
       cursor: pointer;
}

@media (max-width: 900px) {
       .products-header {
              align-items: flex-start;
              flex-direction: column;
       }

       .search-box {
              width: 100%;
       }

       .products-grid {
              grid-template-columns: repeat(2, 1fr);
       }
}

@media (max-width: 600px) {

       .products-hero,
       .products-content {
              padding-left: 5%;
              padding-right: 5%;
       }

       .products-grid {
              grid-template-columns: 1fr;
       }

       .products-hero h1 {
              font-size: 52px;
       }

       .products-header h2 {
              font-size: 34px;
       }
}
</style>
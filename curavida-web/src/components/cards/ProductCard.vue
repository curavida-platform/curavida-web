<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="product-card">
    <div class="product-image">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
      />

      <span v-else>Produto</span>
    </div>

    <div class="product-info">
      <span class="product-category">
        {{ product.category }}
      </span>

      <h3>{{ product.name }}</h3>

      <p>{{ product.description }}</p>

      <div class="product-footer">
        <strong>
          R$ {{ product.price }}
        </strong>

        <button type="button">
          Ver produto →
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
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

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  gap: 15px;
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

.product-footer button:hover {
  text-decoration: underline;
}
</style>
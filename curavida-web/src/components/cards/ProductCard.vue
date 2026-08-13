<script setup>
import { useRouter } from 'vue-router'

defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const router = useRouter()

const viewProduct = (slug) => {
  router.push(`/produtos/${slug}`)
}
</script>

<template>
  <article class="product-card">
    <div class="product-image">
      <img v-if="product.images?.length" :src="product.images[0].url" :alt="product.images[0].alt || product.name" />

      <span v-else>Produto</span>
    </div>

    <div class="product-info">
      <span class="product-category">
        {{ product.category?.name }}
      </span>

      <h3>
        {{ product.name }}
      </h3>

      <p>
        {{ product.description || 'Produto CuraVida.' }}
      </p>

      <div class="product-footer">
        <strong>
          R$ {{ Number(product.unitPrice).toFixed(2).replace('.', ',') }}
        </strong>

        <button type="button" @click="viewProduct(product.slug)">
          Ver produto →
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  overflow: hidden;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background: var(--color-white);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);

  box-shadow: 0 15px 35px rgba(30, 70, 70, 0.08);
}


/* =========================================
   IMAGEM
   ========================================= */

.product-image {
  height: 250px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--color-surface);
  color: var(--color-text-light);

  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;

  object-fit: contain;

  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.03);
}


/* =========================================
   INFORMAÇÕES
   ========================================= */

.product-info {
  padding: 25px;
}

.product-category {
  display: block;

  margin-bottom: 10px;

  color: var(--color-secondary);

  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;

  text-transform: uppercase;
}

.product-info h3 {
  margin: 0 0 10px;

  color: var(--color-text);

  font-size: 20px;
  line-height: 1.3;
}

.product-info p {
  margin: 0;

  color: var(--color-text-light);

  font-size: 14px;
  line-height: 1.5;

  display: -webkit-box;
  -webkit-box-orient: vertical;

  overflow: hidden;
}


/* =========================================
   RODAPÉ
   ========================================= */

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 15px;

  margin-top: 25px;
}

.product-footer strong {
  color: var(--color-primary);

  font-size: 18px;
  white-space: nowrap;
}

.product-footer button {
  padding: 0;

  border: none;

  background: transparent;

  color: var(--color-primary);

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  white-space: nowrap;

  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.product-footer button:hover {
  color: var(--color-primary-dark);

  transform: translateX(2px);
}


/* =========================================
   TABLET
   ========================================= */

@media (max-width: 1024px) {
  .product-image {
    height: 220px;
  }

  .product-info {
    padding: 20px;
  }

  .product-info h3 {
    font-size: 18px;
  }
}


/* =========================================
   MOBILE
   ========================================= */

@media (max-width: 600px) {
  .product-image {
    height: 210px;
  }

  .product-info {
    padding: 18px;
  }

  .product-category {
    font-size: 11px;
  }

  .product-info h3 {
    font-size: 18px;
  }

  .product-info p {
    font-size: 13px;
  }

  .product-footer {
    gap: 10px;

    margin-top: 20px;
  }

  .product-footer strong {
    font-size: 16px;
  }

  .product-footer button {
    font-size: 13px;
  }
}


/* =========================================
   MOBILE PEQUENO
   ========================================= */

@media (max-width: 400px) {
  .product-image {
    height: 190px;
  }

  .product-info {
    padding: 16px;
  }

  .product-info h3 {
    font-size: 17px;
  }

  .product-footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .product-footer button {
    padding: 0;
  }
}
</style>
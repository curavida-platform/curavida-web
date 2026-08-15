<script setup>
import { computed, ref } from 'vue'
import { useCartStore } from '../stores/cart.js'
import { useAuthStore } from '../stores/auth.js'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

const items = computed(() => cart.items)

const showForm = ref(false)
const loading = ref(false)
const success = ref(false)
const error = ref('')

const notes = ref('')

const openRequestForm = () => {
  error.value = ''
  success.value = false

  if (!authStore.isAuthenticated) {
    router.push({
      name: 'login',
      query: {
        redirect: '/carrinho',
      },
    })

    return
  }

  showForm.value = true
}

const submitOrder = async () => {
  if (!authStore.isAuthenticated || !authStore.token) {
    error.value = 'Você precisa estar conectado para enviar o pedido.'
    return
  }

  if (items.value.length === 0) {
    error.value = 'Seu carrinho está vazio.'
    return
  }

  try {
    loading.value = true
    error.value = ''

    const response = await fetch('http://localhost:3000/orders', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`,
      },

      body: JSON.stringify({
        notes: notes.value || null,

        items: items.value.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      }),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || 'Erro ao enviar solicitação.',
      )
    }

    // Pedido criado com sucesso
    cart.clearCart()

    success.value = true
    showForm.value = false

    notes.value = ''
  } catch (err) {
    console.error('Erro ao solicitar orçamento:', err)

    error.value =
      err.message ||
      'Não foi possível enviar sua solicitação.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="cart-page">
    <section class="cart-content">

      <div v-if="success" class="success-message">
        <span class="material-symbols-outlined">
          check_circle
        </span>

        <h2>Solicitação enviada!</h2>

        <p>
          Recebemos seu pedido. Nossa equipe entrará em contato com você em breve.
        </p>

        <RouterLink to="/produtos" class="back-button">
          Continuar vendo produtos
        </RouterLink>
      </div>

      <div class="cart-header">
        <span class="section-label">SEU PEDIDO</span>
        <h1>Meu carrinho</h1>
      </div>

      <div v-if="cart.isEmpty" class="cart-empty">
        <span class="material-symbols-outlined">
          shopping_bag
        </span>

        <h2>Seu carrinho está vazio</h2>

        <p>
          Adicione alguns produtos para começar sua solicitação.
        </p>

        <RouterLink to="/produtos" class="back-button">
          Ver produtos
        </RouterLink>
      </div>

      <div v-else class="cart-list">

        <article v-for="item in items" :key="item.id" class="cart-item">
          <div class="cart-item-image">
            <img v-if="item.images?.length" :src="item.images[0].url" :alt="item.name" />

            <span v-else>
              Produto
            </span>
          </div>

          <div class="cart-item-info">
            <span class="product-reference">
              {{ item.reference }}
            </span>

            <h2>{{ item.name }}</h2>

            <p>
              {{ item.category?.name }}
            </p>
          </div>

          <div class="quantity-control">
            <button type="button" @click="cart.decreaseQuantity(item.id)">
              −
            </button>

            <span>{{ item.quantity }}</span>

            <button type="button" @click="cart.increaseQuantity(item.id)">
              +
            </button>
          </div>

          <button type="button" class="remove-button" @click="cart.removeFromCart(item.id)">
            Remover
          </button>
        </article>

        <div class="cart-footer">
          <div>
            <span>Total de itens</span>
            <strong>{{ cart.totalItems }}</strong>
          </div>

          <button class="request-button" type="button" @click="openRequestForm">
            {{ authStore.isAuthenticated
              ? 'Solicitar orçamento'
              : 'Entrar para solicitar' }}
          </button>
        </div>

      </div>

      <div v-if="showForm" class="request-form">

        <div class="request-form-header">
          <span class="section-label">
            FINALIZAR SOLICITAÇÃO
          </span>

          <h2>Quase tudo pronto</h2>

          <p>
            Seu pedido será enviado para nossa equipe.
            Usaremos os dados cadastrados na sua conta para entrar em contato.
          </p>
        </div>

        <form @submit.prevent="submitOrder">

          <div class="customer-summary">
            <strong>{{ authStore.customer?.name }}</strong>

            <span>
              {{ authStore.user?.email }}
            </span>

            <span v-if="authStore.customer?.phone">
              {{ authStore.customer.phone }}
            </span>
          </div>

          <div class="form-group">
            <label for="notes">
              Observação
            </label>

            <textarea id="notes" v-model="notes" rows="4"
              placeholder="Alguma informação adicional sobre o pedido?"></textarea>
          </div>

          <p v-if="error" class="form-error">
            {{ error }}
          </p>

          <div class="form-actions">
            <button type="button" class="cancel-button" @click="showForm = false">
              Voltar
            </button>

            <button type="submit" class="request-button" :disabled="loading">
              {{ loading ? 'Enviando...' : 'Enviar solicitação' }}
            </button>
          </div>

        </form>
      </div>

    </section>
  </main>
</template>

<style scoped>
/* =========================================
   PÁGINA
   ========================================= */

.cart-page {
  min-height: 100vh;
  background: var(--color-white);
}

.cart-content {
  width: min(1100px, calc(100% - 3rem));

  margin: 0 auto;
  padding: 80px 0;
}


/* =========================================
   CABEÇALHO
   ========================================= */

.section-label {
  color: var(--color-primary);

  font-size: 12px;
  font-weight: 700;

  letter-spacing: 1.5px;
}

.cart-header h1 {
  margin: 10px 0 0;

  color: var(--color-text);

  font-family: var(--font-display);

  font-size: clamp(2.2rem, 5vw, 2.8rem);
  font-weight: 600;
}


/* =========================================
   CARRINHO VAZIO
   ========================================= */

.cart-empty {
  margin-top: 60px;

  padding: 80px 20px;

  text-align: center;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background: var(--color-white);
}

.cart-empty .material-symbols-outlined {
  font-size: 48px;

  color: var(--color-primary);
}

.cart-empty h2 {
  margin: 20px 0 10px;

  color: var(--color-text);

  font-family: var(--font-display);
}

.cart-empty p {
  margin-bottom: 25px;

  color: var(--color-text-light);
}


/* =========================================
   BOTÕES
   ========================================= */

.back-button,
.request-button {
  min-height: 48px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0 24px;

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

.back-button:hover,
.request-button:hover {
  background: var(--color-primary-dark);

  transform: translateY(-2px);

  box-shadow: var(--shadow-md);
}


/* =========================================
   LISTA
   ========================================= */

.cart-list {
  margin-top: 50px;
}


/* =========================================
   ITEM
   ========================================= */

.cart-item {
  display: grid;

  grid-template-columns:
    110px minmax(0, 1fr) auto auto;

  align-items: center;

  gap: 25px;

  padding: 20px 0;

  border-bottom: 1px solid var(--color-border);
}

.cart-item-image {
  width: 110px;
  height: 110px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--color-surface);

  border-radius: var(--radius-md);

  overflow: hidden;
}

.cart-item-image img {
  width: 100%;
  height: 100%;

  object-fit: contain;
}

.cart-item-image span {
  color: var(--color-text-light);

  font-size: 12px;
}


/* =========================================
   INFORMAÇÕES
   ========================================= */

.cart-item-info {
  min-width: 0;
}

.product-reference {
  color: var(--color-secondary);

  font-size: 12px;
  font-weight: 700;

  letter-spacing: 0.8px;
}

.cart-item-info h2 {
  margin: 6px 0;

  overflow-wrap: break-word;

  color: var(--color-text);

  font-size: 19px;
  font-weight: 600;
}

.cart-item-info p {
  margin: 0;

  color: var(--color-text-light);

  font-size: 14px;
}

.customer-summary {
  display: flex;
  flex-direction: column;
  gap: 5px;

  margin-bottom: 24px;
  padding: 16px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);

  background: var(--color-surface);
}

.customer-summary strong {
  color: var(--color-text);
  font-size: 15px;
}

.customer-summary span {
  color: var(--color-text-light);
  font-size: 13px;
}


/* =========================================
   QUANTIDADE
   ========================================= */

.quantity-control {
  display: flex;
  align-items: center;

  gap: 15px;

  padding: 7px 10px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);

  background: var(--color-white);
}

.quantity-control span {
  min-width: 20px;

  text-align: center;

  color: var(--color-text);

  font-weight: 600;
}

.quantity-control button {
  width: 28px;
  height: 28px;

  display: grid;
  place-items: center;

  border: none;
  border-radius: 50%;

  background: var(--color-surface);

  color: var(--color-text);

  cursor: pointer;

  font-size: 18px;

  transition:
    background var(--transition-fast),
    color var(--transition-fast);
}

.quantity-control button:hover {
  background: var(--color-primary);

  color: var(--color-white);
}


/* =========================================
   REMOVER
   ========================================= */

.remove-button {
  padding: 8px;

  border: none;

  background: transparent;

  color: var(--color-secondary);

  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
}

.remove-button:hover {
  text-decoration: underline;
}


/* =========================================
   RODAPÉ DO CARRINHO
   ========================================= */

.cart-footer {
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 30px;

  margin-top: 40px;
  padding-top: 30px;
}

.cart-footer div {
  display: flex;
  flex-direction: column;

  gap: 5px;
}

.cart-footer span {
  color: var(--color-text-light);

  font-size: 14px;
}

.cart-footer strong {
  color: var(--color-text);

  font-size: 22px;
}


/* =========================================
   FORMULÁRIO
   ========================================= */

.request-form {
  width: 100%;
  max-width: 650px;

  margin: 50px auto 0;
  padding: 35px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background: var(--color-background);
}

.request-form-header {
  margin-bottom: 30px;
}

.request-form-header h2 {
  margin: 10px 0;

  color: var(--color-text);

  font-family: var(--font-display);

  font-size: 28px;
  font-weight: 600;
}

.request-form-header p {
  color: var(--color-text-light);

  line-height: 1.6;
}


/* =========================================
   CAMPOS
   ========================================= */

.form-group {
  display: flex;
  flex-direction: column;

  gap: 8px;

  margin-bottom: 20px;
}

.form-group label {
  color: var(--color-text);

  font-size: 14px;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  width: 100%;

  box-sizing: border-box;

  padding: 13px 15px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);

  background: var(--color-white);

  color: var(--color-text);

  font-family: var(--font-primary);
  font-size: 14px;

  outline: none;

  transition: border-color var(--transition-fast);
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--color-primary);
}

.form-group textarea {
  min-height: 110px;

  resize: vertical;
}


/* =========================================
   ERRO
   ========================================= */

.form-error {
  margin-bottom: 20px;

  color: #c46f78;

  font-size: 14px;
}


/* =========================================
   AÇÕES DO FORMULÁRIO
   ========================================= */

.form-actions {
  display: flex;

  justify-content: flex-end;

  gap: 12px;

  margin-top: 25px;
}

.cancel-button {
  min-height: 48px;

  padding: 0 24px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);

  background: var(--color-white);

  color: var(--color-text-light);

  font-family: var(--font-primary);
  font-weight: 700;

  cursor: pointer;

  transition:
    background var(--transition-fast),
    border-color var(--transition-fast);
}

.cancel-button:hover {
  border-color: var(--color-primary);

  color: var(--color-primary);
}

.request-button:disabled {
  opacity: 0.6;

  cursor: not-allowed;

  transform: none;

  box-shadow: none;
}


/* =========================================
   SUCESSO
   ========================================= */

.success-message {
  width: 100%;
  max-width: 600px;

  margin: 50px auto;

  padding: 50px 30px;

  box-sizing: border-box;

  text-align: center;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background: var(--color-surface);
}

.success-message .material-symbols-outlined {
  font-size: 52px;

  color: var(--color-primary);
}

.success-message h2 {
  margin: 15px 0 10px;

  color: var(--color-text);

  font-family: var(--font-display);
}

.success-message p {
  margin-bottom: 25px;

  color: var(--color-text-light);

  line-height: 1.6;
}


/* =========================================
   TABLET
   ========================================= */

@media (max-width: 900px) {
  .cart-content {
    width: min(100% - 2.5rem, 700px);

    padding: 60px 0;
  }

  .cart-item {
    grid-template-columns: 90px minmax(0, 1fr) auto;

    gap: 18px;
  }

  .cart-item-image {
    width: 90px;
    height: 90px;
  }

  .remove-button {
    grid-column: 3;

    justify-self: end;
  }
}


/* =========================================
   MOBILE
   ========================================= */

@media (max-width: 600px) {
  .cart-content {
    width: calc(100% - 2rem);

    padding: 40px 0 60px;
  }

  .cart-header h1 {
    font-size: 2.2rem;
  }

  .cart-list {
    margin-top: 35px;
  }

  /*
   * No celular o item vira um pequeno bloco.
   */

  .cart-item {
    grid-template-columns: 76px minmax(0, 1fr);

    gap: 15px;

    padding: 20px 0;
  }

  .cart-item-image {
    width: 76px;
    height: 76px;

    grid-row: 1 / span 2;
  }

  .cart-item-info h2 {
    font-size: 16px;

    line-height: 1.35;
  }

  .cart-item-info p {
    font-size: 13px;
  }

  .quantity-control {
    grid-column: 2;

    justify-self: start;

    gap: 12px;
  }

  .remove-button {
    grid-column: 2;

    justify-self: start;

    padding: 0;

    margin-top: -5px;
  }


  /* RODAPÉ */

  .cart-footer {
    align-items: stretch;

    flex-direction: column;

    gap: 20px;

    margin-top: 30px;
  }

  .cart-footer div {
    padding-bottom: 5px;
  }

  .cart-footer .request-button {
    width: 100%;
  }


  /* FORMULÁRIO */

  .request-form {
    margin-top: 35px;

    padding: 24px 20px;

    border-radius: var(--radius-md);
  }

  .request-form-header h2 {
    font-size: 24px;
  }

  .request-form-header p {
    font-size: 14px;
  }

  .form-actions {
    flex-direction: column-reverse;

    gap: 10px;
  }

  .form-actions button {
    width: 100%;
  }


  /* SUCESSO */

  .success-message {
    margin: 30px auto;

    padding: 40px 20px;
  }

  .success-message h2 {
    font-size: 24px;
  }

  .success-message p {
    font-size: 14px;
  }

  .back-button {
    width: 100%;
  }
}


/* =========================================
   MOBILE PEQUENO
   ========================================= */

@media (max-width: 400px) {
  .cart-content {
    width: calc(100% - 1.5rem);
  }

  .cart-item {
    grid-template-columns: 65px minmax(0, 1fr);

    gap: 12px;
  }

  .cart-item-image {
    width: 65px;
    height: 65px;
  }

  .cart-item-info h2 {
    font-size: 15px;
  }

  .quantity-control {
    padding: 6px 8px;
  }

  .quantity-control button {
    width: 26px;
    height: 26px;
  }
}
</style>
<script setup>
import { computed, ref } from 'vue'
import { useCartStore } from '../stores/cart.js'

const cart = useCartStore()

const items = computed(() => cart.items)

const showForm = ref(false)
const loading = ref(false)
const success = ref(false)
const error = ref('')

const customerName = ref('')
const customerEmail = ref('')
const customerPhone = ref('')
const notes = ref('')

const openRequestForm = () => {
  showForm.value = true
  success.value = false
  error.value = ''
}

const submitOrder = async () => {
  if (!customerName.value.trim()) {
    error.value = 'Informe seu nome.'
    return
  }

  if (!customerPhone.value.trim()) {
    error.value = 'Informe seu WhatsApp ou telefone.'
    return
  }

  try {
    loading.value = true
    error.value = ''

    const response = await fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerName: customerName.value,
        customerEmail: customerEmail.value || null,
        customerPhone: customerPhone.value,
        notes: notes.value || null,

        items: items.value.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      }),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Erro ao enviar solicitação.')
    }

    cart.clearCart()

    success.value = true
    showForm.value = false

    customerName.value = ''
    customerEmail.value = ''
    customerPhone.value = ''
    notes.value = ''
  } catch (err) {
    console.error('Erro ao solicitar orçamento:', err)
    error.value = err.message || 'Não foi possível enviar sua solicitação.'
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
            Solicitar orçamento
          </button>
        </div>

      </div>

      <div v-if="showForm" class="request-form">

        <div class="request-form-header">
          <span class="section-label">FINALIZAR SOLICITAÇÃO</span>

          <h2>Como podemos falar com você?</h2>

          <p>
            Preencha seus dados para que nossa equipe possa analisar sua solicitação.
          </p>
        </div>

        <form @submit.prevent="submitOrder">

          <div class="form-group">
            <label for="customerName">
              Nome *
            </label>

            <input id="customerName" v-model="customerName" type="text" placeholder="Seu nome" />
          </div>

          <div class="form-group">
            <label for="customerPhone">
              WhatsApp / Telefone *
            </label>

            <input id="customerPhone" v-model="customerPhone" type="tel" placeholder="(85) 99999-9999" />
          </div>

          <div class="form-group">
            <label for="customerEmail">
              E-mail
            </label>

            <input id="customerEmail" v-model="customerEmail" type="email" placeholder="seu@email.com" />
          </div>

          <div class="form-group">
            <label for="notes">
              Observação
            </label>

            <textarea id="notes" v-model="notes" rows="4" placeholder="Alguma informação adicional?"></textarea>
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
.cart-page {
  min-height: 100vh;
  background: #fff;
}

.cart-content {
  width: min(1100px, 90%);
  margin: 0 auto;
  padding: 80px 0;
}

.section-label {
  color: #176b6d;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.cart-header h1 {
  margin-top: 10px;
  color: #263737;
  font-family: Georgia, serif;
  font-size: 42px;
}

.cart-empty {
  margin-top: 60px;
  padding: 80px 20px;
  text-align: center;
  border: 1px solid #e7eceb;
  border-radius: 24px;
}

.cart-empty .material-symbols-outlined {
  font-size: 48px;
  color: #176b6d;
}

.cart-empty h2 {
  margin: 20px 0 10px;
  color: #263737;
}

.cart-empty p {
  color: #748080;
  margin-bottom: 25px;
}

.back-button,
.request-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 13px 24px;
  border: none;
  border-radius: 30px;
  background: #176b6d;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.cart-list {
  margin-top: 50px;
}

.cart-item {
  display: grid;
  grid-template-columns: 110px 1fr auto auto;
  align-items: center;
  gap: 25px;
  padding: 20px 0;
  border-bottom: 1px solid #e7eceb;
}

.cart-item-image {
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7f6;
  border-radius: 15px;
  overflow: hidden;
}

.cart-item-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-reference {
  color: #d98991;
  font-size: 12px;
  font-weight: 700;
}

.cart-item-info h2 {
  margin: 6px 0;
  color: #263737;
  font-size: 19px;
}

.cart-item-info p {
  margin: 0;
  color: #748080;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 8px 12px;
  border: 1px solid #dfe5e4;
  border-radius: 30px;
}

.quantity-control button {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: #f5f7f6;
  cursor: pointer;
  font-size: 18px;
}

.remove-button {
  border: none;
  background: transparent;
  color: #c46f78;
  cursor: pointer;
}

.cart-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  padding-top: 30px;
}

.cart-footer div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cart-footer span {
  color: #748080;
}

.cart-footer strong {
  color: #263737;
  font-size: 22px;
}

@media (max-width: 700px) {
  .cart-item {
    grid-template-columns: 80px 1fr;
  }

  .cart-item-image {
    width: 80px;
    height: 80px;
  }

  .quantity-control,
  .remove-button {
    grid-column: 2;
    justify-self: start;
  }

  .cart-footer {
    align-items: flex-start;
    flex-direction: column;
    gap: 25px;
  }
}

/* --- FORMULÁRIO --- */
.request-form {
  max-width: 650px;
  margin: 50px auto 0;
  padding: 35px;
  border: 1px solid #e7eceb;
  border-radius: 24px;
  background: #fafcfc;
}

.request-form-header {
  margin-bottom: 30px;
}

.request-form-header h2 {
  margin: 10px 0;
  color: #263737;
  font-family: Georgia, serif;
  font-size: 28px;
}

.request-form-header p {
  color: #748080;
  line-height: 1.6;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.form-group label {
  color: #263737;
  font-size: 14px;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 13px 15px;
  border: 1px solid #dfe5e4;
  border-radius: 12px;
  background: white;
  color: #263737;
  font: inherit;
  outline: none;
  transition: border-color 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #176b6d;
}

.form-group textarea {
  resize: vertical;
}

.form-error {
  margin-bottom: 20px;
  color: #c46f78;
  font-size: 14px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 25px;
}

.cancel-button {
  padding: 13px 24px;
  border: 1px solid #dfe5e4;
  border-radius: 30px;
  background: white;
  color: #526161;
  font-weight: 700;
  cursor: pointer;
}

.request-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  max-width: 600px;
  margin: 50px auto 0;
  padding: 50px 30px;
  text-align: center;
  border: 1px solid #dfe5e4;
  border-radius: 24px;
  background: #f8fbfa;
}

.success-message .material-symbols-outlined {
  font-size: 52px;
  color: #176b6d;
}

.success-message h2 {
  margin: 15px 0 10px;
  color: #263737;
}

.success-message p {
  margin-bottom: 25px;
  color: #748080;
  line-height: 1.6;
}
</style>
<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { getMyOrders } from '../services/order.service.js'

const authStore = useAuthStore()
const router = useRouter()

const orders = ref([])
const ordersLoading = ref(false)
const ordersError = ref('')

onMounted(async () => {
       if (!authStore.token) {
              router.push('/login')
              return
       }

       await authStore.fetchUser()

       if (!authStore.user) {
              router.push('/login')
              return
       }

       await loadOrders()
})

const loadOrders = async () => {
       try {
              ordersLoading.value = true
              ordersError.value = ''

              const response = await getMyOrders(authStore.token)

              orders.value = response.data.data
       } catch (error) {
              console.error('Erro ao carregar pedidos:', error)

              ordersError.value =
                     error.response?.data?.message ||
                     'Não foi possível carregar seus pedidos.'
       } finally {
              ordersLoading.value = false
       }
}

const handleLogout = () => {
       authStore.logout()

       router.push('/')
}
</script>

<template>
       <main class="account-page">
              <div v-if="!authStore.initialized" class="loading">
                     Carregando sua conta...
              </div>

              <div v-else-if="authStore.user" class="account-container">

                     <div class="account-header">
                            <div>
                                   <span class="account-label">
                                          MINHA CONTA
                                   </span>

                                   <h1>
                                          Olá, {{ authStore.customer?.name || 'Cliente' }}
                                   </h1>

                                   <p>
                                          Gerencie suas informações e acompanhe sua conta.
                                   </p>
                            </div>

                            <button type="button" class="logout-button" @click="handleLogout">
                                   Sair
                            </button>
                     </div>

                     <section class="account-card">
                            <div class="card-header">
                                   <div>
                                          <h2>Informações pessoais</h2>
                                          <p>Dados cadastrados na sua conta.</p>
                                   </div>
                            </div>

                            <div class="info-grid">

                                   <div class="info-item">
                                          <span>Nome</span>

                                          <strong>
                                                 {{ authStore.customer?.name || '—' }}
                                          </strong>
                                   </div>

                                   <div class="info-item">
                                          <span>E-mail</span>

                                          <strong>
                                                 {{ authStore.user.email }}
                                          </strong>
                                   </div>

                                   <div class="info-item">
                                          <span>CPF</span>

                                          <strong>
                                                 {{ authStore.customer?.cpf || '—' }}
                                          </strong>
                                   </div>

                                   <div class="info-item">
                                          <span>Telefone</span>

                                          <strong>
                                                 {{ authStore.customer?.phone || '—' }}
                                          </strong>
                                   </div>

                            </div>
                     </section>

                     <section class="account-card">
                            <div class="card-header">
                                   <div>
                                          <h2>Pedidos</h2>
                                          <p>
                                                 Acompanhe os pedidos realizados na CuraVida.
                                          </p>
                                   </div>
                            </div>

                            <div v-if="ordersLoading" class="orders-loading">
                                   Carregando seus pedidos...
                            </div>

                            <div v-else-if="ordersError" class="orders-error">
                                   {{ ordersError }}
                            </div>

                            <div v-else-if="orders.length === 0" class="empty-orders">
                                   <span>📋</span>

                                   <h3>
                                          Você ainda não possui pedidos
                                   </h3>

                                   <p>
                                          Quando você realizar uma solicitação,
                                          ela aparecerá aqui.
                                   </p>

                                   <RouterLink to="/produtos">
                                          Ver produtos
                                   </RouterLink>
                            </div>

                            <div v-else class="orders-list">

                                   <article v-for="order in orders" :key="order.id" class="order-card">

                                          <div class="order-header">

                                                 <div>
                                                        <span class="order-label">
                                                               PEDIDO
                                                        </span>

                                                        <strong>
                                                               #{{ order.id.slice(0, 8).toUpperCase() }}
                                                        </strong>
                                                 </div>

                                                 <span class="order-status"
                                                        :class="`status-${order.status.toLowerCase()}`">
                                                        {{ order.status }}
                                                 </span>

                                          </div>

                                          <div class="order-info">

                                                 <div>
                                                        <span>Data</span>

                                                        <strong>
                                                               {{ new Date(order.createdAt).toLocaleDateString('pt-BR')
                                                               }}
                                                        </strong>
                                                 </div>

                                                 <div>
                                                        <span>Itens</span>

                                                        <strong>
                                                               {{ order.items.length }}
                                                        </strong>
                                                 </div>

                                          </div>

                                          <div class="order-products">

                                                 <div v-for="item in order.items" :key="item.id" class="order-product">

                                                        <div>
                                                               <strong>
                                                                      {{ item.product.name }}
                                                               </strong>

                                                               <span>
                                                                      {{ item.quantity }} unidade(s)
                                                               </span>
                                                        </div>

                                                 </div>

                                          </div>

                                   </article>

                            </div>
                     </section>

              </div>
       </main>
</template>

<style scoped>
.account-page {
       min-height: calc(100vh - 76px);

       padding: 50px 20px;

       background: var(--color-surface);
}

.account-container {
       width: min(1000px, 100%);
       margin: 0 auto;
}

.account-header {
       display: flex;
       align-items: flex-start;
       justify-content: space-between;
       gap: 20px;

       margin-bottom: 28px;
}

.account-label {
       color: var(--color-primary);

       font-size: 11px;
       font-weight: 700;
       letter-spacing: 1.5px;
}

.account-header h1 {
       margin: 7px 0 5px;

       color: var(--color-text);
       font-size: 30px;
}

.account-header p {
       margin: 0;

       color: var(--color-muted);
       font-size: 14px;
}

.logout-button {
       padding: 10px 18px;

       border: 1px solid var(--color-border);
       border-radius: 9px;

       background: var(--color-white);
       color: var(--color-text);

       font-family: inherit;
       font-size: 14px;
       font-weight: 600;

       cursor: pointer;
}

.logout-button:hover {
       border-color: #dc2626;
       color: #dc2626;
}

.account-card {
       margin-bottom: 20px;

       padding: 24px;

       background: var(--color-white);
       border: 1px solid var(--color-border);
       border-radius: 14px;
}

.card-header {
       margin-bottom: 22px;
}

.card-header h2 {
       margin: 0 0 5px;

       color: var(--color-text);
       font-size: 18px;
}

.card-header p {
       margin: 0;

       color: var(--color-muted);
       font-size: 13px;
}

.info-grid {
       display: grid;
       grid-template-columns: 1fr 1fr;
       gap: 18px;
}

.info-item {
       padding: 16px;

       border: 1px solid var(--color-border);
       border-radius: 10px;
}

.info-item span,
.info-item strong {
       display: block;
}

.info-item span {
       margin-bottom: 6px;

       color: var(--color-muted);

       font-size: 12px;
}

.info-item strong {
       color: var(--color-text);

       font-size: 14px;
}

.empty-orders {
       min-height: 220px;

       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;

       padding: 30px;

       border: 1px dashed var(--color-border);
       border-radius: 10px;

       text-align: center;
}

.empty-orders>span {
       margin-bottom: 12px;

       font-size: 32px;
}

.empty-orders h3 {
       margin: 0 0 6px;

       color: var(--color-text);
       font-size: 16px;
}

.empty-orders p {
       max-width: 360px;

       margin: 0 0 18px;

       color: var(--color-muted);

       font-size: 14px;
       line-height: 1.5;
}

.empty-orders a {
       color: var(--color-primary);

       font-size: 14px;
       font-weight: 600;

       text-decoration: none;
}

.orders-list {
       display: flex;
       flex-direction: column;
       gap: 15px;
}

.order-card {
       padding: 20px;

       border: 1px solid var(--color-border);
       border-radius: 10px;

       background: var(--color-white);
}

.order-header {
       display: flex;
       align-items: center;
       justify-content: space-between;

       gap: 15px;

       padding-bottom: 15px;

       border-bottom: 1px solid var(--color-border);
}

.order-label {
       display: block;

       margin-bottom: 4px;

       color: var(--color-muted);

       font-size: 10px;
       font-weight: 700;
       letter-spacing: 1px;
}

.order-header strong {
       color: var(--color-text);

       font-size: 14px;
}

.order-status {
       padding: 6px 10px;

       border-radius: 20px;

       font-size: 11px;
       font-weight: 700;
}

.status-pending {
       background: #fff7ed;
       color: #c2410c;
}

.status-approved {
       background: #f0fdf4;
       color: #15803d;
}

.status-rejected {
       background: #fef2f2;
       color: #b91c1c;
}

.status-completed {
       background: #eff6ff;
       color: #1d4ed8;
}

.order-info {
       display: flex;
       gap: 40px;

       padding: 18px 0;
}

.order-info div {
       display: flex;
       flex-direction: column;
       gap: 5px;
}

.order-info span {
       color: var(--color-muted);

       font-size: 12px;
}

.order-info strong {
       color: var(--color-text);

       font-size: 14px;
}

.order-products {
       display: flex;
       flex-direction: column;

       gap: 8px;
}

.order-product {
       padding: 12px;

       border-radius: 8px;

       background: var(--color-surface);
}

.order-product div {
       display: flex;
       flex-direction: column;
       gap: 4px;
}

.order-product strong {
       color: var(--color-text);

       font-size: 13px;
}

.order-product span {
       color: var(--color-muted);

       font-size: 12px;
}

.orders-loading,
.orders-error {
       padding: 40px;

       text-align: center;

       color: var(--color-muted);

       border: 1px dashed var(--color-border);
       border-radius: 10px;
}

.orders-error {
       color: #b91c1c;
}

@media (max-width: 500px) {
       .order-header {
              align-items: flex-start;
              flex-direction: column;
       }

       .order-info {
              gap: 25px;
       }
}

.loading {
       min-height: 400px;

       display: flex;
       align-items: center;
       justify-content: center;

       color: var(--color-muted);
}

@media (max-width: 650px) {
       .account-header {
              flex-direction: column;
       }

       .info-grid {
              grid-template-columns: 1fr;
       }
}
</style>
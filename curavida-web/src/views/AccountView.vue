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

const editingProfile = ref(false)
const savingProfile = ref(false)
const profileError = ref('')
const profileSuccess = ref('')

const profileForm = ref({
       name: '',
       phone: '',
       cep: '',
       street: '',
       number: '',
       complement: '',
       neighborhood: '',
       city: '',
       state: '',
       reference: '',
})

const fillProfileForm = () => {
       const customer = authStore.customer

       if (!customer) return

       profileForm.value = {
              name: customer.name || '',
              phone: customer.phone || '',
              cep: customer.cep || '',
              street: customer.street || '',
              number: customer.number || '',
              complement: customer.complement || '',
              neighborhood: customer.neighborhood || '',
              city: customer.city || '',
              state: customer.state || '',
              reference: customer.reference || '',
       }
}

const handleSaveProfile = async () => {
       try {
              savingProfile.value = true
              profileError.value = ''
              profileSuccess.value = ''

              await authStore.updateProfile({
                     name: profileForm.value.name,
                     phone: profileForm.value.phone,
                     cep: profileForm.value.cep,
                     street: profileForm.value.street,
                     number: profileForm.value.number,
                     complement: profileForm.value.complement,
                     neighborhood: profileForm.value.neighborhood,
                     city: profileForm.value.city,
                     state: profileForm.value.state,
                     reference: profileForm.value.reference,
              })

              profileSuccess.value = 'Perfil atualizado com sucesso.'
              editingProfile.value = false
       } catch (error) {
              console.error('Erro ao atualizar perfil:', error)

              profileError.value =
                     error.response?.data?.message ||
                     'Não foi possível atualizar seu perfil.'
       } finally {
              savingProfile.value = false
       }
}

onMounted(async () => {
       // fetchUser já roda no guard do router, mas garantimos aqui também
       if (!authStore.initialized) {
              await authStore.fetchUser()
       }

       if (!authStore.user) {
              router.push('/login')
              return
       }

       fillProfileForm()

       await loadOrders()
})

const loadOrders = async () => {
       try {
              ordersLoading.value = true
              ordersError.value = ''

              const response = await getMyOrders()

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

const reloadPage = () => {
       window.location.reload()
}
</script>

<template>
       <main class="account-page">
              <div v-if="!authStore.initialized || !authStore.user" class="loading">
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

                            <button class="reload-button" @click="reloadPage">
                                   <span>↻</span>
                                   Atualizar página
                            </button>
                     </div>

                     <section class="account-card">
                            <div class="card-header">
                                   <div>
                                          <h2>Informações pessoais</h2>
                                          <p>Dados cadastrados na sua conta.</p>
                                   </div>

                                   <button v-if="!editingProfile" type="button" class="edit-profile-button"
                                          @click="editingProfile = true">
                                          Editar perfil
                                   </button>
                            </div>

                            <div v-if="authStore.customer && !editingProfile" class="info-grid">
                                   <div class="info-item">
                                          <span>Nome</span>
                                          <strong>{{ authStore.customer.name }}</strong>
                                   </div>
                                   <div class="info-item">
                                          <span>E-mail</span>
                                          <strong>{{ authStore.user.email }}</strong>
                                   </div>
                                   <div class="info-item">
                                          <span>CPF</span>
                                          <strong>{{ authStore.customer.cpf || '—' }}</strong>
                                   </div>
                                   <div class="info-item">
                                          <span>Telefone</span>
                                          <strong>{{ authStore.customer.phone || '—' }}</strong>
                                   </div>
                            </div>

                            <div v-if="authStore.customer && !editingProfile" class="address-display">
                                   <div class="address-display-header">
                                          <div>
                                                 <h3>Endereço de entrega</h3>
                                                 <p>Local onde seus pedidos serão entregues.</p>
                                          </div>
                                   </div>

                                   <div class="address-grid">

                                          <div class="info-item">
                                                 <span>CEP</span>
                                                 <strong>
                                                        {{ authStore.customer.cep || '—' }}
                                                 </strong>
                                          </div>

                                          <div class="info-item">
                                                 <span>Rua</span>
                                                 <strong>
                                                        {{ authStore.customer.street || '—' }}
                                                 </strong>
                                          </div>

                                          <div class="info-item">
                                                 <span>Número</span>
                                                 <strong>
                                                        {{ authStore.customer.number || '—' }}
                                                 </strong>
                                          </div>

                                          <div class="info-item">
                                                 <span>Complemento</span>
                                                 <strong>
                                                        {{ authStore.customer.complement || '—' }}
                                                 </strong>
                                          </div>

                                          <div class="info-item">
                                                 <span>Bairro</span>
                                                 <strong>
                                                        {{ authStore.customer.neighborhood || '—' }}
                                                 </strong>
                                          </div>

                                          <div class="info-item">
                                                 <span>Cidade</span>
                                                 <strong>
                                                        {{ authStore.customer.city || '—' }}
                                                 </strong>
                                          </div>

                                          <div class="info-item">
                                                 <span>Estado</span>
                                                 <strong>
                                                        {{ authStore.customer.state || '—' }}
                                                 </strong>
                                          </div>

                                          <div class="info-item">
                                                 <span>Ponto de referência</span>
                                                 <strong>
                                                        {{ authStore.customer.reference || '—' }}
                                                 </strong>
                                          </div>

                                   </div>
                            </div>

                            <form v-if="editingProfile" class="profile-form" @submit.prevent="handleSaveProfile">
                                   <div class="form-grid">

                                          <div class="form-group">
                                                 <label for="profile-name">
                                                        Nome
                                                 </label>

                                                 <input id="profile-name" v-model="profileForm.name" type="text"
                                                        autocomplete="name" required />
                                          </div>

                                          <div class="form-group">
                                                 <label for="profile-phone">
                                                        Telefone
                                                 </label>

                                                 <input id="profile-phone" v-model="profileForm.phone" type="tel"
                                                        autocomplete="tel" />
                                          </div>

                                   </div>

                                   <div class="form-grid">

                                          <div class="form-group">
                                                 <label for="profile-email">
                                                        E-mail
                                                 </label>

                                                 <input id="profile-email" :value="authStore.user.email" type="email"
                                                        disabled />
                                          </div>

                                          <div class="form-group">
                                                 <label for="profile-cpf">
                                                        CPF
                                                 </label>

                                                 <input id="profile-cpf" :value="authStore.customer.cpf || ''"
                                                        type="text" disabled />
                                          </div>

                                   </div>

                                   <div class="address-section">
                                          <div class="address-title">
                                                 <h3>Endereço de entrega</h3>
                                                 <p>
                                                        Informe o endereço onde seus pedidos deverão ser entregues.
                                                 </p>
                                          </div>

                                          <div class="form-grid">

                                                 <div class="form-group">
                                                        <label for="profile-cep">
                                                               CEP
                                                        </label>

                                                        <input id="profile-cep" v-model="profileForm.cep" type="text"
                                                               inputmode="numeric" autocomplete="postal-code"
                                                               placeholder="00000-000" />
                                                 </div>

                                                 <div class="form-group">
                                                        <label for="profile-state">
                                                               Estado
                                                        </label>

                                                        <input id="profile-state" v-model="profileForm.state"
                                                               type="text" maxlength="2" autocomplete="address-level1"
                                                               placeholder="CE" />
                                                 </div>

                                          </div>

                                          <div class="form-grid">

                                                 <div class="form-group form-group-wide">
                                                        <label for="profile-street">
                                                               Rua
                                                        </label>

                                                        <input id="profile-street" v-model="profileForm.street"
                                                               type="text" autocomplete="street-address"
                                                               placeholder="Nome da rua" />
                                                 </div>

                                                 <div class="form-group">
                                                        <label for="profile-number">
                                                               Número
                                                        </label>

                                                        <input id="profile-number" v-model="profileForm.number"
                                                               type="text" autocomplete="address-line2"
                                                               placeholder="123" />
                                                 </div>

                                          </div>

                                          <div class="form-grid">

                                                 <div class="form-group">
                                                        <label for="profile-neighborhood">
                                                               Bairro
                                                        </label>

                                                        <input id="profile-neighborhood"
                                                               v-model="profileForm.neighborhood" type="text"
                                                               autocomplete="address-level3" placeholder="Centro" />
                                                 </div>

                                                 <div class="form-group">
                                                        <label for="profile-city">
                                                               Cidade
                                                        </label>

                                                        <input id="profile-city" v-model="profileForm.city" type="text"
                                                               autocomplete="address-level2" placeholder="Fortaleza" />
                                                 </div>

                                          </div>

                                          <div class="form-grid">

                                                 <div class="form-group">
                                                        <label for="profile-complement">
                                                               Complemento
                                                        </label>

                                                        <input id="profile-complement" v-model="profileForm.complement"
                                                               type="text" autocomplete="address-line2"
                                                               placeholder="Apto, bloco, sala..." />
                                                 </div>

                                                 <div class="form-group">
                                                        <label for="profile-reference">
                                                               Ponto de referência
                                                        </label>

                                                        <input id="profile-reference" v-model="profileForm.reference"
                                                               type="text" placeholder="Próximo à..." />
                                                 </div>

                                          </div>
                                   </div>

                                   <div v-if="profileError" class="profile-message profile-error">
                                          {{ profileError }}
                                   </div>

                                   <div v-if="profileSuccess" class="profile-message profile-success">
                                          {{ profileSuccess }}
                                   </div>

                                   <div class="form-actions">

                                          <button type="button" class="cancel-button" @click="editingProfile = false">
                                                 Cancelar
                                          </button>

                                          <button type="submit" class="save-profile-button" :disabled="savingProfile">
                                                 {{ savingProfile ? 'Salvando...' : 'Salvar alterações' }}
                                          </button>

                                   </div>
                            </form>
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

.reload-button {
       display: none;
}

.account-card {
       margin-bottom: 20px;

       padding: 24px;

       background: var(--color-white);
       border: 1px solid var(--color-border);
       border-radius: 14px;
}

.card-header {
       display: flex;
       align-items: flex-start;
       justify-content: space-between;
       gap: 20px;
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

.edit-profile-button {
       padding: 9px 14px;
       border: 1px solid var(--color-primary);
       border-radius: 8px;
       background: transparent;
       color: var(--color-primary);
       font-family: inherit;
       font-size: 13px;
       font-weight: 600;
       cursor: pointer;
       transition: 0.2s ease;
}

.edit-profile-button:hover {
       background: var(--color-primary);
       color: var(--color-white);
}

.address-section {
       margin-top: 28px;
       padding-top: 24px;
       border-top: 1px solid var(--color-border);
}

.address-title {
       margin-bottom: 18px;
}

.address-title h3 {
       margin: 0 0 5px;
       color: var(--color-text);
       font-size: 16px;
}

.address-title p {
       margin: 0;
       color: var(--color-muted);
       font-size: 13px;
}

.profile-form {
       display: flex;
       flex-direction: column;
       gap: 20px;
}

.form-grid {
       display: grid;
       grid-template-columns: 1fr 1fr;
       gap: 16px;
}

.form-group {
       display: flex;
       flex-direction: column;
       gap: 7px;
}

.form-group-wide {
       grid-column: span 1;
}

.form-group label {
       color: var(--color-text);
       font-size: 12px;
       font-weight: 600;
}

.form-group input {
       width: 100%;
       padding: 11px 12px;
       border: 1px solid var(--color-border);
       border-radius: 8px;
       background: var(--color-white);
       color: var(--color-text);
       font-family: inherit;
       font-size: 14px;
       outline: none;
       transition: border-color 0.2s ease, box-shadow 0.2s ease;
       box-sizing: border-box;
}

.form-group input:focus {
       border-color: var(--color-primary);
       box-shadow: 0 0 0 3px rgba(21, 92, 92, 0.08);
}

.form-group input:disabled {
       background: var(--color-surface);
       color: var(--color-muted);
       cursor: not-allowed;
}

.form-actions {
       display: flex;
       justify-content: flex-end;
       gap: 10px;
       padding-top: 4px;
}

.cancel-button,
.save-profile-button {
       padding: 10px 16px;
       border-radius: 8px;
       font-family: inherit;
       font-size: 13px;
       font-weight: 600;
       cursor: pointer;
       transition: 0.2s ease;
}

.cancel-button {
       border: 1px solid var(--color-border);
       background: var(--color-white);
       color: var(--color-text);
}

.cancel-button:hover {
       background: var(--color-surface);
}

.save-profile-button {
       border: 1px solid var(--color-primary);
       background: var(--color-primary);
       color: var(--color-white);
}

.save-profile-button:hover {
       opacity: 0.9;
}

.save-profile-button:disabled {
       opacity: 0.6;
       cursor: not-allowed;
}

.profile-message {
       padding: 11px 13px;
       border-radius: 8px;
       font-size: 13px;
       line-height: 1.4;
}

.profile-error {
       border: 1px solid #fecaca;
       background: #fef2f2;
       color: #b91c1c;
}

.profile-success {
       border: 1px solid #bbf7d0;
       background: #f0fdf4;
       color: #15803d;
}

.address-display {
       margin-top: 24px;
       padding-top: 24px;
       border-top: 1px solid var(--color-border);
}

.address-display-header {
       margin-bottom: 18px;
}

.address-display-header h3 {
       margin: 0 0 5px;
       color: var(--color-text);
       font-size: 16px;
}

.address-display-header p {
       margin: 0;
       color: var(--color-muted);
       font-size: 13px;
}

.address-grid {
       display: grid;
       grid-template-columns: repeat(2, 1fr);
       gap: 18px;
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

@media (max-width: 768px) {
       .reload-button {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;

              width: 100%;
              padding: 11px 18px;

              border: 1px solid var(--color-border);
              border-radius: 9px;

              background: var(--color-white);
              color: var(--color-primary);

              font-family: inherit;
              font-size: 14px;
              font-weight: 600;

              cursor: pointer;

              transition:
                     background 0.2s ease,
                     border-color 0.2s ease,
                     transform 0.1s ease;
       }

       .reload-button:hover {
              background: var(--color-surface);
              border-color: var(--color-primary);
       }

       .reload-button:active {
              transform: scale(0.98);
       }

       .reload-button span {
              font-size: 19px;
              line-height: 1;
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

       .form-grid {
              grid-template-columns: 1fr;
       }

       .form-actions {
              flex-direction: column-reverse;
       }

       .cancel-button,
       .save-profile-button {
              width: 100%;
       }

       .address-grid {
              grid-template-columns: 1fr;
       }
}
</style>
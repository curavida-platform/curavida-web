<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
       if (!authStore.token) {
              router.push('/login')
              return
       }

       if (!authStore.user) {
              await authStore.fetchUser()
       }

       if (!authStore.user) {
              router.push('/login')
       }
})

const handleLogout = () => {
       authStore.logout()

       router.push('/')
}
</script>

<template>
       <main class="account-page">
              <div v-if="authStore.loading" class="loading">
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

                            <div class="empty-orders">
                                   <span>📋</span>

                                   <h3>
                                          Seus pedidos aparecerão aqui
                                   </h3>

                                   <p>
                                          Assim que você realizar um pedido,
                                          poderá acompanhá-lo nesta área.
                                   </p>

                                   <RouterLink to="/produtos">
                                          Ver produtos
                                   </RouterLink>
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
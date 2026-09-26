<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const newPassword = ref('')
const confirmPassword = ref('')

const error = ref('')
const success = ref('')
const loading = ref(false)

const token = route.query.token

const handleResetPassword = async () => {
       error.value = ''
       success.value = ''

       if (!token) {
              error.value =
                     'Token de recuperação não encontrado.'
              return
       }

       if (!newPassword.value || !confirmPassword.value) {
              error.value =
                     'Preencha os dois campos de senha.'
              return
       }

       if (newPassword.value.length < 6) {
              error.value =
                     'A senha deve ter pelo menos 6 caracteres.'
              return
       }

       if (newPassword.value !== confirmPassword.value) {
              error.value =
                     'As senhas não são iguais.'
              return
       }

       loading.value = true

       try {
              await axios.post(
                     `${import.meta.env.VITE_API_URL}/auth/reset-password`,
                     {
                            token,
                            newPassword: newPassword.value,
                     },
              )

              success.value =
                     'Senha redefinida com sucesso.'

              setTimeout(() => {
                     router.push('/login')
              }, 1500)
       } catch (err) {
              console.error(
                     'Erro ao redefinir senha:',
                     err,
              )

              error.value =
                     err.response?.data?.message ||
                     'Não foi possível redefinir sua senha.'
       } finally {
              loading.value = false
       }
}
</script>

<template>
       <main class="reset-page">
              <div class="reset-container">

                     <div class="reset-header">
                            <span class="reset-label">
                                   CURAVIDA
                            </span>

                            <h1>
                                   Criar nova senha
                            </h1>

                            <p>
                                   Digite sua nova senha para recuperar
                                   o acesso à sua conta.
                            </p>
                     </div>

                     <form class="reset-form" @submit.prevent="handleResetPassword">

                            <div class="form-group">
                                   <label for="new-password">
                                          Nova senha
                                   </label>

                                   <input id="new-password" v-model="newPassword" type="password"
                                          placeholder="Digite sua nova senha" autocomplete="new-password" />
                            </div>

                            <div class="form-group">
                                   <label for="confirm-password">
                                          Confirmar nova senha
                                   </label>

                                   <input id="confirm-password" v-model="confirmPassword" type="password"
                                          placeholder="Digite sua senha novamente" autocomplete="new-password" />
                            </div>

                            <div v-if="error" class="form-error">
                                   {{ error }}
                            </div>

                            <div v-if="success" class="form-success">
                                   {{ success }}
                            </div>

                            <button type="submit" class="reset-button" :disabled="loading">
                                   {{ loading ? 'Salvando...' : 'Redefinir senha' }}
                            </button>

                     </form>

                     <div class="back-login">
                            <RouterLink to="/login">
                                   ← Voltar para o login
                            </RouterLink>
                     </div>

              </div>
       </main>
</template>

<style scoped>
.reset-page {
       min-height: calc(100vh - 76px);
       display: flex;
       align-items: center;
       justify-content: center;
       padding: 60px 20px;
       background: var(--color-surface);
}

.reset-container {
       width: min(430px, 100%);
       padding: 40px;
       background: var(--color-white);
       border: 1px solid var(--color-border);
       border-radius: 18px;
       box-shadow: 0 12px 35px rgba(0, 0, 0, 0.05);
}

.reset-header {
       margin-bottom: 30px;
       text-align: center;
}

.reset-label {
       color: var(--color-primary);
       font-size: 11px;
       font-weight: 700;
       letter-spacing: 1.5px;
}

.reset-header h1 {
       margin: 8px 0;
       color: var(--color-text);
       font-size: 28px;
}

.reset-header p {
       margin: 0;
       color: var(--color-muted);
       font-size: 14px;
       line-height: 1.6;
}

.reset-form {
       display: flex;
       flex-direction: column;
       gap: 18px;
}

.form-group {
       display: flex;
       flex-direction: column;
       gap: 7px;
}

.form-group label {
       color: var(--color-text);
       font-size: 13px;
       font-weight: 600;
}

.form-group input {
       width: 100%;
       height: 44px;
       box-sizing: border-box;
       padding: 0 13px;
       border: 1px solid var(--color-border);
       border-radius: 9px;
       background: var(--color-white);
       color: var(--color-text);
       font-family: inherit;
       font-size: 14px;
       outline: none;
       transition:
              border-color 0.2s ease,
              box-shadow 0.2s ease;
}

.form-group input:focus {
       border-color: var(--color-primary);
       box-shadow:
              0 0 0 3px rgba(22, 163, 74, 0.1);
}

.form-error {
       padding: 11px 12px;
       border-radius: 8px;
       background: #fee2e2;
       color: #991b1b;
       font-size: 13px;
}

.form-success {
       padding: 11px 12px;
       border-radius: 8px;
       background: #dcfce7;
       color: #166534;
       font-size: 13px;
}

.reset-button {
       width: 100%;
       height: 46px;
       border: none;
       border-radius: 9px;
       background: var(--color-primary);
       color: white;
       font-family: inherit;
       font-size: 14px;
       font-weight: 600;
       cursor: pointer;
       transition:
              background 0.2s ease,
              opacity 0.2s ease;
}

.reset-button:hover {
       background: #15803d;
}

.reset-button:disabled {
       opacity: 0.6;
       cursor: not-allowed;
}

.back-login {
       display: flex;
       justify-content: center;
       margin-top: 25px;
}

.back-login a {
       color: var(--color-primary);
       font-size: 13px;
       font-weight: 600;
       text-decoration: none;
}

.back-login a:hover {
       text-decoration: underline;
}

@media (max-width: 500px) {
       .reset-container {
              padding: 30px 22px;
       }
}
</style>
<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const loading = ref(false)
const success = ref('')
const error = ref('')

const handleForgotPassword = async () => {
       success.value = ''
       error.value = ''

       if (!email.value) {
              error.value = 'Digite seu e-mail.'
              return
       }

       loading.value = true

       try {
              await axios.post(
                     `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
                     {
                            email: email.value,
                     },
              )

              success.value =
                     'Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.'
       } catch (err) {
              console.error(
                     'Erro ao solicitar recuperação:',
                     err,
              )

              error.value =
                     err.response?.data?.message ||
                     'Não foi possível solicitar a recuperação da senha.'
       } finally {
              loading.value = false
       }
}
</script>

<template>
       <main class="forgot-page">
              <div class="forgot-container">

                     <div class="forgot-header">
                            <span class="forgot-label">
                                   CURAVIDA
                            </span>

                            <h1>
                                   Esqueceu sua senha?
                            </h1>

                            <p>
                                   Informe seu e-mail e enviaremos as instruções
                                   para redefinir sua senha.
                            </p>
                     </div>

                     <form class="forgot-form" @submit.prevent="handleForgotPassword">

                            <div class="form-group">
                                   <label for="email">
                                          E-mail
                                   </label>

                                   <input id="email" v-model="email" type="email" placeholder="seu@email.com"
                                          autocomplete="email" />
                            </div>

                            <div v-if="error" class="form-error">
                                   {{ error }}
                            </div>

                            <div v-if="success" class="form-success">
                                   {{ success }}
                            </div>

                            <button type="submit" class="forgot-button" :disabled="loading">
                                   {{ loading ? 'Enviando...' : 'Enviar instruções' }}
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
.forgot-page {
       min-height: calc(100vh - 76px);
       display: flex;
       align-items: center;
       justify-content: center;
       padding: 60px 20px;
       background: var(--color-surface);
}

.forgot-container {
       width: min(430px, 100%);
       padding: 40px;
       background: var(--color-white);
       border: 1px solid var(--color-border);
       border-radius: 18px;
       box-shadow: 0 12px 35px rgba(0, 0, 0, 0.05);
}

.forgot-header {
       margin-bottom: 30px;
       text-align: center;
}

.forgot-label {
       color: var(--color-primary);
       font-size: 11px;
       font-weight: 700;
       letter-spacing: 1.5px;
}

.forgot-header h1 {
       margin: 8px 0;
       color: var(--color-text);
       font-size: 28px;
}

.forgot-header p {
       margin: 0;
       color: var(--color-muted);
       font-size: 14px;
       line-height: 1.6;
}

.forgot-form {
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
       line-height: 1.5;
}

.forgot-button {
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

.forgot-button:hover {
       background: #15803d;
}

.forgot-button:disabled {
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
       .forgot-container {
              padding: 30px 22px;
       }
}
</style>
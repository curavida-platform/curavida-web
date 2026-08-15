<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
       error.value = ''

       if (!email.value || !password.value) {
              error.value = 'Preencha seu e-mail e sua senha.'
              return
       }

       try {
              await authStore.login({
                     email: email.value,
                     password: password.value,
              })

              router.push('/')
       } catch (err) {
              console.error('Erro ao entrar:', err)

              error.value =
                     err.response?.data?.message ||
                     'Não foi possível entrar na sua conta.'
       }
}
</script>

<template>
       <main class="login-page">
              <div class="login-container">

                     <div class="login-header">
                            <span class="login-label">
                                   CURAVIDA
                            </span>

                            <h1>
                                   Bem-vindo de volta
                            </h1>

                            <p>
                                   Entre na sua conta para continuar.
                            </p>
                     </div>

                     <form class="login-form" @submit.prevent="handleLogin">

                            <div class="form-group">
                                   <label for="email">
                                          E-mail
                                   </label>

                                   <input id="email" v-model="email" type="email" placeholder="seu@email.com"
                                          autocomplete="email" />
                            </div>

                            <div class="form-group">
                                   <label for="password">
                                          Senha
                                   </label>

                                   <input id="password" v-model="password" type="password"
                                          placeholder="Digite sua senha" autocomplete="current-password" />
                            </div>

                            <div v-if="error" class="form-error">
                                   {{ error }}
                            </div>

                            <button type="submit" class="login-button" :disabled="authStore.loading">
                                   {{ authStore.loading ? 'Entrando...' : 'Entrar' }}
                            </button>

                     </form>

                     <div class="register-link">
                            <span>
                                   Ainda não possui uma conta?
                            </span>

                            <RouterLink to="/cadastro">
                                   Criar conta
                            </RouterLink>
                     </div>

              </div>
       </main>
</template>

<style scoped>
.login-page {
       min-height: calc(100vh - 76px);

       display: flex;
       align-items: center;
       justify-content: center;

       padding: 60px 20px;

       background: var(--color-surface);
}

.login-container {
       width: min(430px, 100%);

       padding: 40px;

       background: var(--color-white);
       border: 1px solid var(--color-border);
       border-radius: 18px;

       box-shadow: 0 12px 35px rgba(0, 0, 0, 0.05);
}

.login-header {
       margin-bottom: 30px;
       text-align: center;
}

.login-label {
       color: var(--color-primary);
       font-size: 11px;
       font-weight: 700;
       letter-spacing: 1.5px;
}

.login-header h1 {
       margin: 8px 0;

       color: var(--color-text);
       font-size: 28px;
}

.login-header p {
       margin: 0;

       color: var(--color-muted);
       font-size: 14px;
}

.login-form {
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

.login-button {
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

.login-button:hover {
       background: #15803d;
}

.login-button:disabled {
       opacity: 0.6;
       cursor: not-allowed;
}

.register-link {
       display: flex;
       justify-content: center;
       gap: 5px;

       margin-top: 25px;

       color: var(--color-muted);
       font-size: 13px;
}

.register-link a {
       color: var(--color-primary);
       font-weight: 600;
       text-decoration: none;
}

.register-link a:hover {
       text-decoration: underline;
}

@media (max-width: 500px) {
       .login-container {
              padding: 30px 22px;
       }
}
</style>
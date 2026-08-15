<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const cpf = ref('')
const phone = ref('')
const password = ref('')
const passwordConfirmation = ref('')

const error = ref('')

const handleRegister = async () => {
       error.value = ''

       if (
              !name.value ||
              !email.value ||
              !cpf.value ||
              !phone.value ||
              !password.value ||
              !passwordConfirmation.value
       ) {
              error.value = 'Preencha todos os campos.'
              return
       }

       if (password.value.length < 6) {
              error.value = 'A senha deve ter pelo menos 6 caracteres.'
              return
       }

       if (password.value !== passwordConfirmation.value) {
              error.value = 'As senhas não coincidem.'
              return
       }

       try {
              await authStore.register({
                     name: name.value,
                     email: email.value,
                     cpf: cpf.value,
                     phone: phone.value,
                     password: password.value,
              })

              router.push('/conta')
       } catch (err) {
              console.error('Erro ao criar conta:', err)

              error.value =
                     err.response?.data?.message ||
                     'Não foi possível criar sua conta.'
       }
}
</script>

<template>
       <main class="register-page">
              <div class="register-container">

                     <div class="register-header">
                            <span class="register-label">
                                   CURAVIDA
                            </span>

                            <h1>
                                   Crie sua conta
                            </h1>

                            <p>
                                   Cadastre seus dados para continuar.
                            </p>
                     </div>

                     <form class="register-form" @submit.prevent="handleRegister">

                            <div class="form-group">
                                   <label for="name">
                                          Nome completo
                                   </label>

                                   <input id="name" v-model="name" type="text" placeholder="Seu nome completo"
                                          autocomplete="name" />
                            </div>

                            <div class="form-group">
                                   <label for="email">
                                          E-mail
                                   </label>

                                   <input id="email" v-model="email" type="email" placeholder="seu@email.com"
                                          autocomplete="email" />
                            </div>

                            <div class="form-row">

                                   <div class="form-group">
                                          <label for="cpf">
                                                 CPF
                                          </label>

                                          <input id="cpf" v-model="cpf" type="text" placeholder="00000000000"
                                                 autocomplete="off" />
                                   </div>

                                   <div class="form-group">
                                          <label for="phone">
                                                 Telefone
                                          </label>

                                          <input id="phone" v-model="phone" type="tel" placeholder="(85) 99999-9999"
                                                 autocomplete="tel" />
                                   </div>

                            </div>

                            <div class="form-group">
                                   <label for="password">
                                          Senha
                                   </label>

                                   <input id="password" v-model="password" type="password"
                                          placeholder="Mínimo de 6 caracteres" autocomplete="new-password" />
                            </div>

                            <div class="form-group">
                                   <label for="passwordConfirmation">
                                          Confirmar senha
                                   </label>

                                   <input id="passwordConfirmation" v-model="passwordConfirmation" type="password"
                                          placeholder="Digite a senha novamente" autocomplete="new-password" />
                            </div>

                            <div v-if="error" class="form-error">
                                   {{ error }}
                            </div>

                            <button type="submit" class="register-button" :disabled="authStore.loading">
                                   {{
                                          authStore.loading
                                                 ? 'Criando conta...'
                                   : 'Criar minha conta'
                                   }}
                            </button>

                     </form>

                     <div class="login-link">
                            <span>
                                   Já possui uma conta?
                            </span>

                            <RouterLink to="/login">
                                   Entrar
                            </RouterLink>
                     </div>

              </div>
       </main>
</template>

<style scoped>
.register-page {
       min-height: calc(100vh - 76px);

       display: flex;
       align-items: center;
       justify-content: center;

       padding: 50px 20px;

       background: var(--color-surface);
}

.register-container {
       width: min(520px, 100%);

       padding: 40px;

       background: var(--color-white);
       border: 1px solid var(--color-border);
       border-radius: 18px;

       box-shadow: 0 12px 35px rgba(0, 0, 0, 0.05);
}

.register-header {
       margin-bottom: 28px;
       text-align: center;
}

.register-label {
       color: var(--color-primary);
       font-size: 11px;
       font-weight: 700;
       letter-spacing: 1.5px;
}

.register-header h1 {
       margin: 8px 0;

       color: var(--color-text);
       font-size: 28px;
}

.register-header p {
       margin: 0;

       color: var(--color-muted);
       font-size: 14px;
}

.register-form {
       display: flex;
       flex-direction: column;
       gap: 17px;
}

.form-row {
       display: grid;
       grid-template-columns: 1fr 1fr;
       gap: 14px;
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

.register-button {
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
}

.register-button:hover {
       background: #15803d;
}

.register-button:disabled {
       opacity: 0.6;
       cursor: not-allowed;
}

.login-link {
       display: flex;
       justify-content: center;
       gap: 5px;

       margin-top: 25px;

       color: var(--color-muted);
       font-size: 13px;
}

.login-link a {
       color: var(--color-primary);
       font-weight: 600;
       text-decoration: none;
}

.login-link a:hover {
       text-decoration: underline;
}

@media (max-width: 550px) {
       .register-container {
              padding: 30px 22px;
       }

       .form-row {
              grid-template-columns: 1fr;
       }
}
</style>
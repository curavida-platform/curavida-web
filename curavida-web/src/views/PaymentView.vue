<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
       createPixPayment,
       checkPaymentStatus,
} from '../services/payment.service.js'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const checking = ref(false)
const error = ref('')
const payment = ref(null)
const paid = ref(false)
const copied = ref(false)

let statusInterval = null

const loadPayment = async () => {
       try {
              loading.value = true
              error.value = ''

              payment.value = await createPixPayment(
                     route.params.orderId
              )

              checkStatus()
       } catch (err) {
              console.error('Erro ao carregar pagamento:', err)

              error.value =
                     err.response?.data?.message ||
                     err.message ||
                     'Não foi possível carregar o pagamento.'
       } finally {
              loading.value = false
       }
}


const checkStatus = async () => {
       if (!payment.value?.paymentId) {
              return
       }

       try {
              checking.value = true

              const result = await checkPaymentStatus(
                     route.params.orderId
              )

              payment.value.status = result.status

              if (
                     result.status === 'RECEIVED' ||
                     result.status === 'CONFIRMED'
              ) {
                     paid.value = true

                     stopChecking()
              }
       } catch (err) {
              console.error(
                     'Erro ao consultar status do pagamento:',
                     err
              )
       } finally {
              checking.value = false
       }
}


const startChecking = () => {
       stopChecking()

       statusInterval = setInterval(() => {
              if (!paid.value) {
                     checkStatus()
              }
       }, 5000)
}


const stopChecking = () => {
       if (statusInterval) {
              clearInterval(statusInterval)
              statusInterval = null
       }
}


const copyPix = async () => {
       if (!payment.value?.pixCopyPaste) {
              return
       }

       try {
              await navigator.clipboard.writeText(
                     payment.value.pixCopyPaste
              )

              copied.value = true

              setTimeout(() => {
                     copied.value = false
              }, 2500)
       } catch (err) {
              console.error(
                     'Erro ao copiar Pix:',
                     err
              )
       }
}


onMounted(async () => {
       await loadPayment()

       if (!paid.value) {
              startChecking()
       }
})


onUnmounted(() => {
       stopChecking()
})
</script>


<template>
       <main class="payment-page">

              <section class="payment-container">

                     <!-- CARREGANDO -->
                     <div v-if="loading" class="payment-card loading-card">

                            <span class="material-symbols-outlined loading-icon">
                                   progress_activity
                            </span>

                            <span class="section-label">
                                   PAGAMENTO
                            </span>

                            <h1>
                                   Preparando seu pagamento
                            </h1>

                            <p class="description">
                                   Estamos preparando sua cobrança Pix.
                            </p>

                     </div>


                     <!-- ERRO -->
                     <div v-else-if="error" class="payment-card error-card">

                            <span class="material-symbols-outlined error-icon">
                                   error
                            </span>

                            <span class="section-label">
                                   OPA...
                            </span>

                            <h1>
                                   Não foi possível carregar
                            </h1>

                            <p class="description">
                                   {{ error }}
                            </p>

                            <button type="button" class="primary-button" @click="loadPayment">
                                   Tentar novamente
                            </button>

                     </div>


                     <!-- PAGAMENTO CONFIRMADO -->
                     <div v-else-if="paid" class="payment-card paid-card">

                            <div class="success-icon-wrapper">

                                   <span class="material-symbols-outlined">
                                          check_circle
                                   </span>

                            </div>

                            <span class="section-label">
                                   PAGAMENTO CONFIRMADO
                            </span>

                            <h1>
                                   Tudo certo!
                            </h1>

                            <p class="description">
                                   Seu pagamento foi confirmado e seu pedido
                                   foi aprovado.
                            </p>


                            <div class="payment-status confirmed">

                                   <span class="material-symbols-outlined">
                                          verified
                                   </span>

                                   <div>
                                          <span>
                                                 Status do pagamento
                                          </span>

                                          <strong>
                                                 Pago
                                          </strong>
                                   </div>

                            </div>


                            <button type="button" class="primary-button" @click="router.push('/produtos')">
                                   Continuar
                            </button>

                     </div>


                     <!-- PAGAMENTO PIX -->
                     <div v-else class="payment-card">

                            <div class="pix-header">

                                   <div class="pix-icon-wrapper">

                                          <span class="material-symbols-outlined">
                                                 qr_code_2
                                          </span>

                                   </div>

                                   <span class="section-label">
                                          PAGAMENTO SEGURO
                                   </span>

                                   <h1>
                                          Finalize seu pedido
                                   </h1>

                                   <p class="description">
                                          Pague via Pix para confirmar sua solicitação.
                                   </p>

                            </div>


                            <!-- VALOR -->

                            <div class="value">

                                   <span>
                                          Valor do pedido
                                   </span>

                                   <strong>
                                          R$ {{ Number(payment.value).toFixed(2).replace('.', ',') }}
                                   </strong>

                            </div>


                            <!-- QR CODE -->

                            <div class="qr-wrapper">

                                   <div class="qr-area">

                                          <img :src="`data:image/png;base64,${payment.pixQrCode}`" alt="QR Code Pix" />

                                   </div>

                                   <p>
                                          Aponte a câmera do seu banco para o QR Code
                                   </p>

                            </div>


                            <!-- PIX COPIA E COLA -->

                            <div class="pix-code">

                                   <label>
                                          Pix Copia e Cola
                                   </label>

                                   <textarea readonly :value="payment.pixCopyPaste" rows="4" />

                                   <button type="button" class="primary-button" @click="copyPix">

                                          <span class="material-symbols-outlined">
                                                 {{ copied ? 'check' : 'content_copy' }}
                                          </span>

                                          {{ copied ? 'Código copiado!' : 'Copiar código Pix' }}

                                   </button>

                            </div>


                            <!-- STATUS -->

                            <div class="payment-status waiting">

                                   <span class="material-symbols-outlined">
                                          schedule
                                   </span>

                                   <div>

                                          <span>
                                                 Status do pagamento
                                          </span>

                                          <strong>
                                                 Aguardando pagamento
                                          </strong>

                                   </div>

                            </div>


                            <!-- VERIFICANDO -->

                            <div class="checking">

                                   <span class="material-symbols-outlined" :class="{ spinning: checking }">
                                          sync
                                   </span>

                                   <span>
                                          {{ checking
                                                 ? 'Verificando pagamento...'
                                          : 'Aguardando confirmação' }}
                                   </span>

                            </div>


                            <div class="security-info">

                                   <span class="material-symbols-outlined">
                                          lock
                                   </span>

                                   <p>
                                          Pagamento processado de forma segura pelo
                                          <strong>Asaas</strong>.
                                   </p>

                            </div>

                     </div>

              </section>

       </main>
</template>


<style scoped>
.payment-page {
       min-height: 100vh;

       display: flex;
       justify-content: center;

       padding: 70px 20px 100px;

       background:
              linear-gradient(180deg,
                     var(--color-surface) 0%,
                     var(--color-white) 100%);
}


.payment-container {
       width: 100%;
       max-width: 520px;
}


/* =========================================
   CARD
   ========================================= */

.payment-card {
       width: 100%;

       box-sizing: border-box;

       padding: 42px 36px;

       text-align: center;

       border: 1px solid var(--color-border);
       border-radius: var(--radius-lg);

       background: var(--color-white);

       box-shadow: var(--shadow-md);
}


/* =========================================
   HEADER
   ========================================= */

.section-label {
       display: block;

       margin-top: 12px;

       color: var(--color-primary);

       font-size: 11px;
       font-weight: 700;

       letter-spacing: 1.6px;
}


.payment-card h1 {
       margin: 10px 0;

       color: var(--color-text);

       font-family: var(--font-display);

       font-size: 31px;
       font-weight: 600;
}


.description {
       margin: 0 auto;

       max-width: 420px;

       color: var(--color-text-light);

       font-size: 14px;

       line-height: 1.7;
}


/* =========================================
   PIX ICON
   ========================================= */

.pix-icon-wrapper,
.success-icon-wrapper {
       width: 64px;
       height: 64px;

       display: flex;
       align-items: center;
       justify-content: center;

       margin: 0 auto;

       border-radius: 50%;

       background: var(--color-surface);
}


.pix-icon-wrapper span {
       font-size: 34px;

       color: var(--color-primary);
}


.success-icon-wrapper {
       background: var(--color-surface);
}


.success-icon-wrapper span {
       font-size: 38px;

       color: var(--color-primary);
}


/* =========================================
   VALOR
   ========================================= */

.value {
       display: flex;
       flex-direction: column;

       gap: 5px;

       margin: 30px 0 25px;

       padding: 18px;

       border-radius: var(--radius-md);

       background: var(--color-surface);
}


.value span {
       color: var(--color-text-light);

       font-size: 13px;
}


.value strong {
       color: var(--color-text);

       font-size: 28px;
}


/* =========================================
   QR CODE
   ========================================= */

.qr-wrapper {
       margin: 25px 0;
}


.qr-area {
       width: 260px;
       height: 260px;

       display: flex;
       align-items: center;
       justify-content: center;

       box-sizing: border-box;

       margin: 0 auto;

       padding: 12px;

       border: 1px solid var(--color-border);

       border-radius: var(--radius-md);

       background: var(--color-white);
}


.qr-area img {
       display: block;

       width: 100%;
       height: 100%;

       object-fit: contain;
}


.qr-wrapper p {
       margin: 12px 0 0;

       color: var(--color-text-light);

       font-size: 12px;
}


/* =========================================
   COPIA E COLA
   ========================================= */

.pix-code {
       margin-top: 25px;

       text-align: left;
}


.pix-code label {
       display: block;

       margin-bottom: 8px;

       color: var(--color-text);

       font-size: 13px;
       font-weight: 700;
}


.pix-code textarea {
       width: 100%;

       box-sizing: border-box;

       padding: 13px;

       resize: none;

       border: 1px solid var(--color-border);
       border-radius: var(--radius-md);

       background: var(--color-surface);

       color: var(--color-text-light);

       font-family: monospace;

       font-size: 11px;

       line-height: 1.5;

       outline: none;
}


/* =========================================
   BOTÃO
   ========================================= */

.primary-button {
       width: 100%;

       min-height: 50px;

       display: flex;
       align-items: center;
       justify-content: center;

       gap: 8px;

       margin-top: 12px;

       padding: 0 20px;

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


.primary-button:hover {
       background: var(--color-primary-dark);

       transform: translateY(-1px);

       box-shadow: var(--shadow-md);
}


.primary-button span {
       font-size: 19px;
}


/* =========================================
   STATUS
   ========================================= */

.payment-status {
       display: flex;

       align-items: center;

       gap: 12px;

       margin-top: 25px;

       padding: 15px;

       text-align: left;

       border-radius: var(--radius-md);
}


.payment-status>span {
       font-size: 25px;
}


.payment-status div {
       display: flex;
       flex-direction: column;

       gap: 3px;
}


.payment-status div span {
       color: var(--color-text-light);

       font-size: 11px;
}


.payment-status strong {
       color: var(--color-text);

       font-size: 14px;
}


.payment-status.waiting {
       background: var(--color-surface);
}


.payment-status.waiting>span {
       color: var(--color-primary);
}


.payment-status.confirmed {
       background: var(--color-surface);
}


.payment-status.confirmed>span {
       color: var(--color-primary);
}


/* =========================================
   VERIFICAÇÃO
   ========================================= */

.checking {
       display: flex;

       align-items: center;
       justify-content: center;

       gap: 7px;

       margin-top: 18px;

       color: var(--color-text-light);

       font-size: 12px;
}


.checking span:first-child {
       font-size: 17px;
}


.spinning {
       animation: spin 1s linear infinite;
}


@keyframes spin {
       from {
              transform: rotate(0deg);
       }

       to {
              transform: rotate(360deg);
       }
}


/* =========================================
   SEGURANÇA
   ========================================= */

.security-info {
       display: flex;

       align-items: center;
       justify-content: center;

       gap: 8px;

       margin-top: 25px;
       padding-top: 20px;

       border-top: 1px solid var(--color-border);
}


.security-info span {
       color: var(--color-primary);

       font-size: 18px;
}


.security-info p {
       margin: 0;

       color: var(--color-text-light);

       font-size: 11px;

       line-height: 1.5;
}


/* =========================================
   LOADING / ERROR
   ========================================= */

.loading-icon {
       display: block;

       margin-bottom: 10px;

       color: var(--color-primary);

       font-size: 45px;

       animation: spin 1s linear infinite;
}


.error-icon {
       color: #c46f78;

       font-size: 50px;
}


.error-card .section-label {
       color: #c46f78;
}


.error-card .primary-button {
       margin-top: 25px;
}


/* =========================================
   MOBILE
   ========================================= */

@media (max-width: 600px) {

       .payment-page {
              padding: 35px 15px 60px;
       }


       .payment-card {
              padding: 32px 20px;

              border-radius: var(--radius-md);
       }


       .payment-card h1 {
              font-size: 26px;
       }


       .qr-area {
              width: min(260px, 75vw);
              height: min(260px, 75vw);
       }


       .value strong {
              font-size: 25px;
       }

}


@media (max-width: 380px) {

       .payment-card {
              padding: 28px 16px;
       }


       .payment-card h1 {
              font-size: 24px;
       }


       .qr-area {
              width: 230px;
              height: 230px;
       }

}
</style>
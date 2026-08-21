<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { createPixPayment } from '../services/payment.service.js'

const route = useRoute()

const loading = ref(true)
const error = ref('')
const payment = ref(null)


const loadPayment = async () => {
       try {
              loading.value = true

              payment.value = await createPixPayment(
                     route.params.orderId
              )

       } catch (err) {
              console.error(err)

              error.value =
                     'Não foi possível carregar o pagamento.'
       } finally {
              loading.value = false
       }
}


onMounted(loadPayment)
</script>


<template>

       <main class="payment-page">

              <section class="payment-container">


                     <div class="payment-card">


                            <div v-if="loading" class="state">

                                   <span class="material-symbols-outlined loader">
                                          progress_activity
                                   </span>

                                   <h2>
                                          Gerando pagamento...
                                   </h2>

                                   <p>
                                          Estamos preparando seu pagamento Pix.
                                   </p>

                            </div>



                            <div v-else-if="error" class="state error">

                                   <span class="material-symbols-outlined">
                                          error
                                   </span>

                                   <h2>
                                          Pagamento indisponível
                                   </h2>

                                   <p>
                                          {{ error }}
                                   </p>

                            </div>



                            <div v-else>


                                   <div class="header">


                                          <div class="secure-badge">

                                                 <span class="material-symbols-outlined">
                                                        verified_user
                                                 </span>

                                                 Pagamento seguro

                                          </div>


                                          <span class="section-label">
                                                 PIX CURAVIDA
                                          </span>


                                          <h1>
                                                 Finalize seu pedido
                                          </h1>


                                          <p>
                                                 Seu pagamento será processado com segurança pelo Pix.
                                          </p>


                                   </div>




                                   <div class="payment-status">


                                          <span>
                                                 Status do pagamento
                                          </span>


                                          <strong>
                                                 {{ payment.status }}
                                          </strong>


                                   </div>




                                   <div class="qr-box">


                                          <div class="qr-header">

                                                 <span class="material-symbols-outlined">
                                                        qr_code_2
                                                 </span>

                                                 <h2>
                                                        Escaneie o QR Code
                                                 </h2>

                                          </div>


                                          <img :src="`data:image/png;base64,${payment.pixQrCode}`" alt="QR Code Pix" class="qr-code"/>


                                   </div>





                                   <div class="copy-area">


                                          <label>
                                                 Pix Copia e Cola
                                          </label>


                                          <textarea readonly :value="payment.pixCopyPaste" />



                                          <button @click="navigator.clipboard.writeText(payment.pixCopyPaste)">

                                                 <span class="material-symbols-outlined">
                                                        content_copy
                                                 </span>

                                                 Copiar código Pix

                                          </button>


                                   </div>




                                   <div class="security-box">


                                          <span class="material-symbols-outlined">
                                                 lock
                                          </span>


                                          <div>

                                                 <strong>
                                                        Pagamento protegido
                                                 </strong>


                                                 <p>
                                                        Após a confirmação, seu pedido será atualizado automaticamente.
                                                 </p>

                                          </div>


                                   </div>



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

       padding: 80px 20px;

       background:
              linear-gradient(180deg,
                     #ffffff 0%,
                     #f6faf9 100%);

}



.payment-container {

       width: 100%;
       max-width: 560px;

}



.payment-card {


       padding: 45px;

       background: white;

       border: 1px solid var(--color-border);

       border-radius: 32px;

       box-shadow:
              0 20px 60px rgba(0, 0, 0, .08);

}





.header {

       text-align: center;

}



.secure-badge {


       display: inline-flex;

       align-items: center;

       gap: 8px;


       padding: 8px 16px;


       border-radius: 999px;


       background: #eef9f4;


       color: var(--color-primary);


       font-size: 13px;

       font-weight: 700;


       margin-bottom: 25px;


}



.secure-badge span {

       font-size: 18px;

}





.header h1 {


       margin: 15px 0;


       font-family: var(--font-display);

       font-size: 34px;


       color: var(--color-text);

}



.header p {

       color: var(--color-text-light);

       line-height: 1.6;

}





.payment-status {


       margin: 35px 0;


       padding: 18px;


       display: flex;

       justify-content: space-between;

       align-items: center;


       background: #f8faf9;


       border-radius: 18px;


}



.payment-status span {

       color: var(--color-text-light);

       font-size: 14px;

}



.payment-status strong {


       padding: 7px 18px;


       border-radius: 999px;


       background: #fff3cd;


       color: #856404;


       font-size: 13px;


}




.qr-box {


       padding: 25px;


       border-radius: 25px;


       background: #fafafa;


       border: 1px solid var(--color-border);


       text-align: center;


}



.qr-code{
       margin-left: 78px;
       width: 260px;
       height: 260px;

}



.qr-header {


       display: flex;

       justify-content: center;

       align-items: center;

       gap: 10px;


       margin-bottom: 20px;


}



.qr-header span {

       color: var(--color-primary);

       font-size: 30px;

}



.qr-header h2 {

       margin: 0;

       font-size: 18px;

       color: var(--color-text);

}





.qr-box img {


       width: 260px;

       height: 260px;


       padding: 15px;


       background: white;


       border-radius: 20px;


}





.copy-area {


       margin-top: 30px;


       text-align: left;


}



.copy-area label {


       display: block;

       margin-bottom: 10px;


       font-size: 14px;

       font-weight: 700;


       color: var(--color-text);

}




.copy-area textarea {


       width: 100%;


       height: 100px;


       padding: 15px;


       box-sizing: border-box;


       resize: none;


       border-radius: 16px;


       border: 1px solid var(--color-border);


       font-size: 12px;


}




.copy-area button {


       margin-top: 15px;


       width: 100%;


       height: 52px;


       border: none;


       border-radius: 999px;


       background: var(--color-primary);


       color: white;


       font-weight: 700;


       font-size: 15px;


       cursor: pointer;


       display: flex;

       align-items: center;

       justify-content: center;

       gap: 8px;


       transition: .2s;


}



.copy-area button:hover {


       background: var(--color-primary-dark);

       transform: translateY(-2px);

}





.security-box {


       margin-top: 30px;


       padding: 18px;


       display: flex;

       gap: 15px;


       background: #f8faf9;


       border-radius: 18px;


       text-align: left;


}



.security-box span {

       color: var(--color-primary);

}



.security-box strong {

       color: var(--color-text);

}



.security-box p {

       margin: 5px 0 0;


       font-size: 13px;


       color: var(--color-text-light);


       line-height: 1.5;

}





.state {

       text-align: center;

}



.state span {

       font-size: 50px;

       color: var(--color-primary);

}



.state h2 {

       color: var(--color-text);

}



.state p {

       color: var(--color-text-light);

}





.loader {

       animation: spin 1s linear infinite;

}



@keyframes spin {

       from {
              transform: rotate(0);
       }

       to {
              transform: rotate(360deg);
       }

}




@media(max-width:600px) {
       .qr-code {
              margin-left: 0;
       }

       .payment-card {

              padding: 30px 20px;

              border-radius: 24px;

       }


       .header h1 {

              font-size: 28px;

       }


       .qr-box img {

              width: 220px;

              height: 220px;

       }


}
</style>
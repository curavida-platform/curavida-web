<script setup>
import logo from '../../assets/images/logo-transparent.png'
</script>

<template>
       <section class="hero">
              <div class="hero__container">

                     <div class="hero__content">
                            <span class="hero__eyebrow">
                                   CUIDADO • QUALIDADE • CONFIANÇA
                            </span>

                            <h1 class="hero__title">
                                   Cuidar também é
                                   <span>acolher.</span>
                            </h1>

                            <p class="hero__description">
                                   Encontre soluções para curativos, estomias e cuidados
                                   especializados, com qualidade e segurança.
                            </p>

                            <div class="hero__actions">
                                   <RouterLink to="/produtos" class="hero__button hero__button--primary">
                                          Explorar produtos
                                          <span class="material-symbols-outlined">
                                                 arrow_forward
                                          </span>
                                   </RouterLink>

                                   <RouterLink to="/sobre" class="hero__button hero__button--secondary">
                                          Conheça a CuraVida
                                   </RouterLink>
                            </div>
                     </div>

                     <div class="hero__visual">
                            <div class="hero__circle"></div>

                            <div class="hero__logo">
                                   <img :src="logo" alt="CuraVida" />
                            </div>

                            <div class="hero__decoration hero__decoration--top"></div>
                            <div class="hero__decoration hero__decoration--bottom"></div>
                     </div>

              </div>
       </section>
</template>

<style scoped>
.hero {
       position: relative;
       overflow: hidden;

       min-height: calc(100vh - 76px);

       display: flex;
       align-items: center;

       background: var(--color-background);
}

.hero__container {
       width: min(1200px, calc(100% - 3rem));
       margin: 0 auto;

       display: grid;
       grid-template-columns: 1fr 0.9fr;
       align-items: center;

       gap: 3rem;

       padding: 4rem 0;
}

/* CONTEÚDO */

.hero__content {
       position: relative;
       z-index: 2;
}

.hero__eyebrow {
       display: inline-block;

       margin-bottom: 1.25rem;

       color: var(--color-primary);

       font-size: 0.75rem;
       font-weight: 700;
       letter-spacing: 0.14em;
}

.hero__title {
       max-width: 650px;

       color: var(--color-text);

       font-family: var(--font-display);
       font-size: clamp(3rem, 5vw, 5rem);
       font-weight: 600;
       line-height: 1.05;
       letter-spacing: -0.04em;
}

.hero__title span {
       display: block;
       color: var(--color-secondary);
}

.hero__description {
       max-width: 520px;

       margin-top: 1.5rem;

       color: var(--color-text-light);

       font-size: 1.05rem;
       line-height: 1.8;
}

.hero__actions {
       display: flex;
       align-items: center;
       gap: 1rem;

       margin-top: 2rem;
}

.hero__button {
       min-height: 50px;

       display: inline-flex;
       align-items: center;
       justify-content: center;
       gap: 0.6rem;

       padding: 0 1.4rem;

       border-radius: var(--radius-full);

       font-size: 0.9rem;
       font-weight: 600;

       transition:
              transform var(--transition-fast),
              background var(--transition-fast),
              box-shadow var(--transition-fast);
}

.hero__button:hover {
       transform: translateY(-2px);
}

.hero__button--primary {
       background: var(--color-primary);
       color: var(--color-white);
       box-shadow: var(--shadow-sm);
}

.hero__button--primary:hover {
       background: var(--color-primary-dark);
       box-shadow: var(--shadow-md);
}

.hero__button--secondary {
       border: 1px solid var(--color-border);
       background: var(--color-white);
       color: var(--color-primary);
}

.hero__button--secondary:hover {
       border-color: var(--color-primary);
}

/* VISUAL */

.hero__visual {
       position: relative;

       min-height: 520px;

       display: flex;
       align-items: center;
       justify-content: center;
}


/* CÍRCULO DE FUNDO */

.hero__circle {
       position: absolute;

       width: 430px;
       height: 430px;

       border-radius: 50%;

       background: var(--color-secondary-light);

       opacity: 0.8;

       transform: translateY(10px);
}


/* LOGO */

.hero__logo {
       position: relative;
       z-index: 2;

       width: 430px;

       display: flex;
       align-items: center;
       justify-content: center;

       animation: heroLogoFloat 5s ease-in-out infinite;
}

.hero__logo img {
       width: 100%;
       margin-top: 129px;
       height: auto;

       object-fit: contain;

       transform: scale(2.4);

       filter: drop-shadow(0 18px 30px rgb(21 92 92 / 10%));
}


/* DECORAÇÕES */

.hero__decoration {
       position: absolute;

       border-radius: 50%;

       pointer-events: none;
}

.hero__decoration--top {
       width: 18px;
       height: 18px;

       top: 90px;
       right: 80px;

       background: var(--color-secondary);
}

.hero__decoration--bottom {
       width: 12px;
       height: 12px;

       bottom: 95px;
       left: 70px;

       background: var(--color-primary);
}


/* ANIMAÇÃO */

@keyframes heroLogoFloat {

       0%,
       100% {
              transform: translateY(0);
       }

       50% {
              transform: translateY(-8px);
       }
}

/* RESPONSIVO */

@media (max-width: 900px) {
       .hero {
              min-height: auto;
       }

       .hero__container {
              grid-template-columns: 1fr;

              padding: 4rem 0;
       }

       .hero__content {
              text-align: center;
       }

       .hero__description {
              margin-inline: auto;
       }

       .hero__actions {
              justify-content: center;
       }

       .hero__visual {
              min-height: 380px;
       }

       .hero__circle {
              width: 340px;
              height: 340px;
       }

       .hero__logo {
              width: 310px;
       }

       .hero__logo img {
              width: 100%;
              margin-top: 90px;
              height: auto;

              object-fit: contain;

              transform: scale(2.4);

              filter: drop-shadow(0 18px 30px rgb(21 92 92 / 10%));
       }
}

@media (max-width: 600px) {
       .hero__visual {
              min-height: 300px;
       }

       .hero__circle {
              width: 270px;
              height: 270px;
       }

       .hero__logo {
              width: 250px;
       }

       .hero__decoration--top {
              top: 35px;
              right: 30px;
       }

       .hero__decoration--bottom {
              bottom: 45px;
              left: 25px;
       }
}
</style>
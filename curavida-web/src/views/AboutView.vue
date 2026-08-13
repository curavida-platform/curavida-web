<template>
  <main class="about-page">

    <!-- HERO -->
    <section class="about-hero">
      <div class="about-container">

        <div class="about-hero__content">
          <span class="section-label">
            SOBRE A CURAVIDA
          </span>

          <h1>
            Cuidar também é
            <span>acolher.</span>
          </h1>

          <p>
            A CuraVida nasceu com o propósito de tornar o acesso a produtos
            para cuidados especializados mais simples, seguro e humano.
          </p>
        </div>

        <div class="about-hero__visual">
          <div class="about-hero__circle"></div>

          <div class="about-hero__card">
            <span class="material-symbols-outlined">
              favorite
            </span>

            <strong>
              Cuidado em cada detalhe.
            </strong>

            <p>
              Qualidade, confiança e atenção para quem cuida e para quem
              precisa de cuidado.
            </p>
          </div>
        </div>

      </div>
    </section>


    <!-- NOSSA HISTÓRIA -->
    <section class="about-story">
      <div class="about-container about-container--story">

        <div class="about-story__title">
          <span class="section-label">
            NOSSA ESSÊNCIA
          </span>

          <h2>
            Mais do que produtos.
            <span>Uma forma de cuidar.</span>
          </h2>
        </div>

        <div class="about-story__text">
          <p>
            A CuraVida trabalha para oferecer soluções voltadas para
            curativos, estomias e cuidados especializados, reunindo
            qualidade e praticidade em um só lugar.
          </p>

          <p>
            Nosso objetivo é proporcionar uma experiência mais simples para
            profissionais, pacientes e familiares que precisam encontrar
            produtos confiáveis para seus cuidados.
          </p>
        </div>

      </div>
    </section>


    <!-- VALORES -->
    <section class="about-values">
      <div class="about-container">

        <div class="about-values__header">
          <span class="section-label">
            NOSSOS VALORES
          </span>

          <h2>
            O que guia a CuraVida
          </h2>
        </div>

        <div class="values-grid">

          <article class="value-card">
            <div class="value-icon">
              <span class="material-symbols-outlined">
                favorite
              </span>
            </div>

            <h3>
              Cuidado
            </h3>

            <p>
              Colocamos as pessoas no centro de tudo o que fazemos.
            </p>
          </article>


          <article class="value-card">
            <div class="value-icon">
              <span class="material-symbols-outlined">
                verified
              </span>
            </div>

            <h3>
              Qualidade
            </h3>

            <p>
              Buscamos oferecer produtos confiáveis e soluções adequadas
              para diferentes necessidades.
            </p>
          </article>


          <article class="value-card">
            <div class="value-icon">
              <span class="material-symbols-outlined">
                handshake
              </span>
            </div>

            <h3>
              Confiança
            </h3>

            <p>
              Construímos relações baseadas em transparência, respeito e
              responsabilidade.
            </p>
          </article>

        </div>

      </div>
    </section>


    <!-- CTA -->
    <section class="about-cta">
      <div class="about-container">

        <div class="about-cta__content">
          <span class="section-label">
            CURAVIDA
          </span>

          <h2>
            Encontre as soluções
            <span>para o seu cuidado.</span>
          </h2>

          <p>
            Conheça nosso catálogo de produtos e encontre o que você precisa.
          </p>

          <RouterLink to="/produtos" class="about-cta__button">
            Explorar produtos

            <span class="material-symbols-outlined">
              arrow_forward
            </span>
          </RouterLink>
        </div>

      </div>
    </section>

  </main>
</template>


<style scoped>
/* =========================================
   BASE
   ========================================= */

.about-page {
  background: var(--color-white);
}

.about-container {
  width: min(1200px, calc(100% - 3rem));

  margin: 0 auto;
}

.section-label {
  display: inline-block;

  color: var(--color-primary);

  font-size: 12px;
  font-weight: 700;

  letter-spacing: 1.5px;
}


/* =========================================
   HERO
   ========================================= */

.about-hero {
  overflow: hidden;

  padding: 100px 0;

  background: var(--color-background);
}

.about-hero .about-container {
  display: grid;

  grid-template-columns: 1fr 0.8fr;

  align-items: center;

  gap: 70px;
}

.about-hero__content {
  max-width: 650px;
}

.about-hero h1 {
  margin: 18px 0 25px;

  color: var(--color-text);

  font-family: var(--font-display);

  font-size: clamp(3rem, 5vw, 5rem);
  font-weight: 600;

  line-height: 1.05;

  letter-spacing: -0.04em;
}

.about-hero h1 span {
  display: block;

  color: var(--color-secondary);
}

.about-hero__content p {
  max-width: 560px;

  color: var(--color-text-light);

  font-size: 1.05rem;

  line-height: 1.8;
}


/* =========================================
   HERO VISUAL
   ========================================= */

.about-hero__visual {
  position: relative;

  min-height: 400px;

  display: flex;

  align-items: center;
  justify-content: center;
}

.about-hero__circle {
  position: absolute;

  width: 360px;
  height: 360px;

  border-radius: 50%;

  background: var(--color-secondary-light);
}

.about-hero__card {
  position: relative;
  z-index: 2;

  width: min(320px, 80%);

  padding: 35px;

  border: 1px solid rgb(255 255 255 / 70%);

  border-radius: var(--radius-lg);

  background: rgb(255 255 255 / 90%);

  box-shadow: var(--shadow-md);

  backdrop-filter: blur(10px);
}

.about-hero__card .material-symbols-outlined {
  margin-bottom: 20px;

  color: var(--color-secondary);

  font-size: 42px;
}

.about-hero__card strong {
  display: block;

  margin-bottom: 10px;

  color: var(--color-text);

  font-family: var(--font-display);

  font-size: 24px;
}

.about-hero__card p {
  margin: 0;

  color: var(--color-text-light);

  font-size: 14px;

  line-height: 1.7;
}


/* =========================================
   HISTÓRIA
   ========================================= */

.about-story {
  padding: 100px 0;
}

.about-container--story {
  display: grid;

  grid-template-columns: 0.8fr 1fr;

  gap: 100px;
}

.about-story__title h2 {
  margin-top: 15px;

  color: var(--color-text);

  font-family: var(--font-display);

  font-size: clamp(2.2rem, 4vw, 3.5rem);

  font-weight: 600;

  line-height: 1.1;
}

.about-story__title h2 span {
  display: block;

  color: var(--color-secondary);
}

.about-story__text {
  padding-top: 30px;
}

.about-story__text p {
  margin: 0 0 20px;

  color: var(--color-text-light);

  font-size: 1rem;

  line-height: 1.9;
}


/* =========================================
   VALORES
   ========================================= */

.about-values {
  padding: 100px 0;

  background: var(--color-surface);
}

.about-values__header {
  text-align: center;

  margin-bottom: 50px;
}

.about-values__header h2 {
  margin-top: 12px;

  color: var(--color-text);

  font-family: var(--font-display);

  font-size: clamp(2rem, 4vw, 3rem);

  font-weight: 600;
}

.values-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 25px;
}

.value-card {
  padding: 35px;

  border: 1px solid var(--color-border);

  border-radius: var(--radius-lg);

  background: var(--color-white);

  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.value-card:hover {
  transform: translateY(-4px);

  box-shadow: var(--shadow-md);
}

.value-icon {
  width: 48px;
  height: 48px;

  display: grid;
  place-items: center;

  margin-bottom: 25px;

  border-radius: 50%;

  background: var(--color-secondary-light);

  color: var(--color-primary);
}

.value-card h3 {
  margin-bottom: 10px;

  color: var(--color-text);

  font-family: var(--font-display);

  font-size: 22px;
}

.value-card p {
  margin: 0;

  color: var(--color-text-light);

  line-height: 1.7;
}


/* =========================================
   CTA
   ========================================= */

.about-cta {
  padding: 100px 0;

  background: var(--color-primary);

  color: var(--color-white);

  text-align: center;
}

.about-cta__content {
  max-width: 700px;

  margin: 0 auto;
}

.about-cta .section-label {
  color: var(--color-secondary-light);
}

.about-cta h2 {
  margin: 15px 0;

  font-family: var(--font-display);

  font-size: clamp(2.3rem, 5vw, 4rem);

  font-weight: 600;

  line-height: 1.1;
}

.about-cta h2 span {
  display: block;

  color: var(--color-secondary-light);
}

.about-cta p {
  margin: 0 auto 30px;

  max-width: 500px;

  color: rgb(255 255 255 / 75%);

  line-height: 1.7;
}

.about-cta__button {
  min-height: 50px;

  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 8px;

  padding: 0 25px;

  border-radius: var(--radius-full);

  background: var(--color-white);

  color: var(--color-primary);

  font-size: 14px;
  font-weight: 700;

  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.about-cta__button:hover {
  transform: translateY(-2px);

  box-shadow: var(--shadow-md);
}


/* =========================================
   TABLET
   ========================================= */

@media (max-width: 900px) {
  .about-hero {
    padding: 70px 0;
  }

  .about-hero .about-container {
    grid-template-columns: 1fr;

    gap: 50px;
  }

  .about-hero__content {
    max-width: 700px;

    text-align: center;

    margin: 0 auto;
  }

  .about-hero__content p {
    margin-inline: auto;
  }

  .about-container--story {
    grid-template-columns: 1fr;

    gap: 30px;
  }

  .about-story__text {
    padding-top: 0;
  }

  .values-grid {
    grid-template-columns: 1fr 1fr;
  }

  .value-card:last-child {
    grid-column: 1 / -1;
  }
}


/* =========================================
   MOBILE
   ========================================= */

@media (max-width: 600px) {
  .about-container {
    width: calc(100% - 2rem);
  }

  .about-hero {
    padding: 55px 0;
  }

  .about-hero h1 {
    font-size: 2.8rem;
  }

  .about-hero__visual {
    min-height: 300px;
  }

  .about-hero__circle {
    width: 270px;
    height: 270px;
  }

  .about-hero__card {
    padding: 25px;
  }

  .about-story {
    padding: 65px 0;
  }

  .about-story__title h2 {
    font-size: 2.3rem;
  }

  .about-values {
    padding: 65px 0;
  }

  .values-grid {
    grid-template-columns: 1fr;

    gap: 15px;
  }

  .value-card:last-child {
    grid-column: auto;
  }

  .value-card {
    padding: 28px;
  }

  .about-cta {
    padding: 70px 0;
  }

  .about-cta h2 {
    font-size: 2.5rem;
  }

  .about-cta__button {
    width: 100%;
  }
}


/* =========================================
   MOBILE PEQUENO
   ========================================= */

@media (max-width: 400px) {
  .about-container {
    width: calc(100% - 1.5rem);
  }

  .about-hero h1 {
    font-size: 2.4rem;
  }

  .about-hero__visual {
    min-height: 270px;
  }

  .about-hero__circle {
    width: 240px;
    height: 240px;
  }

  .about-story__title h2 {
    font-size: 2rem;
  }
}
</style>
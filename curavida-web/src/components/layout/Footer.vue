<template>
  <footer class="footer">
    <div class="footer__container">

      <div class="footer__brand">
        <RouterLink to="/" class="footer__logo">
          <span>Cura</span>Vida
        </RouterLink>

        <p>
          Cuidado, qualidade e confiança
          para quem precisa.
        </p>
      </div>

      <div class="footer__column">
        <h3>Loja</h3>

        <RouterLink to="/produtos">
          Produtos
        </RouterLink>

        <RouterLink to="/categorias">
          Categorias
        </RouterLink>

        <RouterLink to="/carrinho">
          Carrinho
        </RouterLink>
      </div>

      <div class="footer__column">
        <h3>Institucional</h3>

        <RouterLink to="/sobre">
          Sobre nós
        </RouterLink>

        <RouterLink to="/contato">
          Contato
        </RouterLink>

        <RouterLink to="/blog">
          Blog
        </RouterLink>
      </div>

      <div class="footer__column">
        <h3>Atendimento</h3>

        <a href="#">
          WhatsApp
        </a>

        <a href="#">
          Instagram
        </a>

        <a href="#">
          E-mail
        </a>
      </div>

    </div>

    <div class="footer__bottom">
      <p>
        © 2026 CuraVida. Todos os direitos reservados.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 5rem;

  background: var(--color-primary);
  color: var(--color-white);
}

.footer__container {
  width: min(1200px, calc(100% - 3rem));
  margin: 0 auto;
  padding: 4rem 0;

  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 3rem;
}

.footer__brand {
  max-width: 280px;
}

.footer__logo {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 600;
}

.footer__logo span {
  color: var(--color-secondary);
}

.footer__brand p {
  margin-top: 1rem;

  color: rgb(255 255 255 / 70%);

  line-height: 1.7;
}

.footer__column {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.footer__column h3 {
  margin-bottom: 0.5rem;

  font-size: 0.9rem;
  font-weight: 600;
}

.footer__column a {
  width: fit-content;

  color: rgb(255 255 255 / 70%);

  font-size: 0.85rem;

  transition: color var(--transition-fast);
}

.footer__column a:hover {
  color: var(--color-white);
}

.footer__bottom {
  border-top: 1px solid rgb(255 255 255 / 10%);

  padding: 1.5rem;

  text-align: center;
}

.footer__bottom p {
  color: rgb(255 255 255 / 60%);
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .footer__container {
    grid-template-columns: 1fr 1fr;
  }

  .footer__brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 500px) {
  .footer__container {
    grid-template-columns: 1fr;
  }

  .footer__brand {
    grid-column: auto;
  }
}
</style>
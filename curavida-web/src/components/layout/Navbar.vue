<template>
       <header class="navbar">
              <div class="navbar__container">

                     <RouterLink to="/" class="navbar__logo">
                            <span class="navbar__logo-cura">Cura</span><span class="navbar__logo-vida">Vida</span>
                     </RouterLink>

                     <nav class="navbar__navigation">
                            <RouterLink to="/" class="navbar__link">
                                   Início
                            </RouterLink>

                            <RouterLink to="/produtos" class="navbar__link">
                                   Produtos
                            </RouterLink>

                            <RouterLink to="/sobre" class="navbar__link">
                                   Sobre nós
                            </RouterLink>
                     </nav>

                     <div class="navbar__actions">

                            <button type="button" class="navbar__action" aria-label="Favoritos">
                                   <span class="material-symbols-outlined">
                                          favorite
                                   </span>
                            </button>

                            <RouterLink to="/carrinho" class="navbar__action" aria-label="Carrinho">
                                   <span class="material-symbols-outlined">
                                          shopping_bag
                                   </span>
                            </RouterLink>

                            <RouterLink to="/login" class="navbar__account">
                                   <span class="material-symbols-outlined">
                                          person
                                   </span>

                                   <span>Entrar</span>
                            </RouterLink>

                     </div>

              </div>
       </header>
</template>

<style scoped>
.navbar {
       width: 100%;
       height: 76px;

       background: var(--color-white);
       border-bottom: 1px solid var(--color-border);

       position: sticky;
       top: 0;
       z-index: 100;
}

.navbar__container {
       width: min(1200px, calc(100% - 3rem));
       height: 100%;
       margin: 0 auto;

       display: flex;
       align-items: center;
       justify-content: space-between;
}

/* LOGO */

.navbar__logo {
       display: inline-flex;
       align-items: center;

       font-family: var(--font-display);
       font-size: 1.8rem;
       font-weight: 600;
       letter-spacing: -0.03em;
}

.navbar__logo-cura {
       color: var(--color-primary);
}

.navbar__logo-vida {
       color: var(--color-secondary);
}

/* NAVEGAÇÃO */

.navbar__navigation {
       display: flex;
       align-items: center;
       gap: 2rem;
}

.navbar__link {
       position: relative;

       color: var(--color-text);

       font-size: 0.9rem;
       font-weight: 500;

       transition:
              color var(--transition-fast);
}

.navbar__link::after {
       content: "";

       position: absolute;
       left: 0;
       bottom: -8px;

       width: 0;
       height: 2px;

       background: var(--color-secondary);

       transition: width var(--transition-normal);
}

.navbar__link:hover {
       color: var(--color-primary);
}

.navbar__link:hover::after {
       width: 100%;
}

/* AÇÕES */

.navbar__actions {
       display: flex;
       align-items: center;
       gap: 0.4rem;
}

.navbar__action {
       width: 40px;
       height: 40px;

       display: grid;
       place-items: center;

       border-radius: var(--radius-full);

       background: transparent;
       color: var(--color-text);

       transition:
              background var(--transition-fast),
              color var(--transition-fast);
}

.navbar__action:hover {
       background: var(--color-surface);
       color: var(--color-primary);
}

.navbar__account {
       margin-left: 0.5rem;

       display: flex;
       align-items: center;
       gap: 0.4rem;

       padding: 0.65rem 1rem;

       border: 1px solid var(--color-border);
       border-radius: var(--radius-full);

       color: var(--color-primary);

       font-size: 0.85rem;
       font-weight: 600;

       transition:
              background var(--transition-fast),
              border-color var(--transition-fast);
}

.navbar__account:hover {
       background: var(--color-surface);
       border-color: var(--color-primary);
}

/* RESPONSIVO */

@media (max-width: 900px) {
       .navbar__navigation {
              display: none;
       }
}

@media (max-width: 600px) {
       .navbar {
              height: 68px;
       }

       .navbar__container {
              width: min(100% - 1.5rem, 1200px);
       }

       .navbar__logo {
              font-size: 1.55rem;
       }

       .navbar__account span:last-child {
              display: none;
       }
}
</style>
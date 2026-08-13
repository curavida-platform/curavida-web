<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const closeMenu = () => {
  isOpen.value = false
}
</script>

<template>
  <div class="mobile-menu">
    <!-- Botão -->
    <button
      type="button"
      class="mobile-menu__button"
      aria-label="Abrir menu"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <span class="material-symbols-outlined">
        {{ isOpen ? 'close' : 'menu' }}
      </span>
    </button>

    <!-- Menu -->
    <Transition name="mobile-menu">
      <div v-if="isOpen" class="mobile-menu__panel">
        <nav class="mobile-menu__navigation">
          <RouterLink
            to="/"
            class="mobile-menu__link"
            @click="closeMenu"
          >
            <span class="material-symbols-outlined">
              home
            </span>

            <span>Início</span>
          </RouterLink>

          <RouterLink
            to="/produtos"
            class="mobile-menu__link"
            @click="closeMenu"
          >
            <span class="material-symbols-outlined">
              inventory_2
            </span>

            <span>Produtos</span>
          </RouterLink>

          <RouterLink
            to="/sobre"
            class="mobile-menu__link"
            @click="closeMenu"
          >
            <span class="material-symbols-outlined">
              info
            </span>

            <span>Sobre nós</span>
          </RouterLink>
        </nav>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.mobile-menu {
  display: none;
}

.mobile-menu__button {
  width: 40px;
  height: 40px;

  display: grid;
  place-items: center;

  border: none;
  border-radius: var(--radius-full);

  background: transparent;
  color: var(--color-text);

  cursor: pointer;

  transition:
    background var(--transition-fast),
    color var(--transition-fast);
}

.mobile-menu__button:hover {
  background: var(--color-surface);
  color: var(--color-primary);
}

.mobile-menu__panel {
  position: fixed;
  top: 68px;
  left: 0;

  width: 100%;

  padding: 1rem;

  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);

  box-shadow: var(--shadow-md);

  z-index: 99;
}

.mobile-menu__navigation {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.mobile-menu__link {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  padding: 0.9rem 1rem;

  border-radius: var(--radius-md);

  color: var(--color-text);

  font-size: 0.95rem;
  font-weight: 500;

  transition:
    background var(--transition-fast),
    color var(--transition-fast);
}

.mobile-menu__link:hover,
.mobile-menu__link.router-link-active {
  background: var(--color-surface);
  color: var(--color-primary);
}

.mobile-menu__link .material-symbols-outlined {
  font-size: 21px;
}

/* Animação */

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Mobile */

@media (max-width: 900px) {
  .mobile-menu {
    display: block;
  }
}
</style>
<!-- src/components/Header.vue -->
<script setup lang="ts">
import logoUrl from '/assets/images/logos/logo.svg'
import { trackCTA } from '@/utils/ga'
</script>
<template>
  <header class="main-header header-three">
    <div class="header-upper">
      <div class="container">
        <div class="header-inner py-20 d-flex align-items-center">

          <!-- Logo (menu-left) -->
          <div class="logo-outer d-none d-lg-flex justify-content-start flex-1">
            <div class="logo">
              <RouterLink to="/">
                <img :src="logoUrl" alt="Logo StarChats" />
              </RouterLink>
            </div>
          </div>

          <!-- Navegação centralizada -->
          <div class="nav-outer flex-grow-2 d-flex justify-content-center">
            <nav class="main-menu navbar-expand-lg">
              <div class="navbar-header d-lg-none">
                <div class="logo-mobile">
                  <RouterLink to="/">
                    <img src="/assets/images/logos/logo.png" alt="Logo StarChats" />
                  </RouterLink>
                </div>
                <button
                  type="button"
                  class="navbar-toggle"
                  data-bs-toggle="collapse"
                  data-bs-target="#main-menu"
                  aria-controls="main-menu"
                >
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
              </div>

              <div class="navbar-collapse collapse" id="main-menu">
                <ul class="navigation gap-4">
                    <li>
                        <RouterLink to="/#home" @click="trackCTA('header', 'home')">Início</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/integrations" @click="trackCTA('header', 'integracoes')">Integrações</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/#solucoes" @click="trackCTA('header', 'solucoes')">Soluções</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/#servicos" @click="trackCTA('header', 'servicos')">Serviços</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/sobre-nos" @click="trackCTA('header', 'sobre')">Sobre</RouterLink>
                    </li>
                </ul>
              </div>
            </nav>
          </div>

          <!-- Botão da direita (menu-right) -->
          <div class="menu-right d-none d-lg-flex justify-content-end align-items-center flex-1">
            <RouterLink to="/register" @click="trackCTA('header', 'Começar Agora')" class="theme-btn style-two">
              Começar Agora <i class="fas fa-arrow-right"></i>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>


<style scoped>
.flex-1 {
  flex: 1;
}
.flex-grow-2 {
  flex: 2;
}
</style>


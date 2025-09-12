<template>
  <section id="sistema" class="dashboard-section rel z-1 py-65 rpy-100">
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="col-xl-7 col-lg-8 col-md-10">
          <div class="section-title mb-60">
            <span class="sub-title">Visual do Sistema</span>
            <h2>Veja como é o painel do StarChats</h2>
            <p>Visual moderno, intuitivo e totalmente pensado para facilitar o atendimento em múltiplos canais.</p>
          </div>
        </div>
      </div>

      <!-- Bootstrap 5 Carousel -->
      <div :id="carouselId" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
        <!-- indicadores -->
        <div class="carousel-indicators">
          <button
            v-for="(src, i) in slides"
            :key="'ind-' + i"
            type="button"
            :data-bs-target="'#' + carouselId"
            :data-bs-slide-to="i"
            :class="{ active: i === 0 }"
            :aria-current="i === 0 ? 'true' : undefined"
            :aria-label="`Slide ${i + 1}`">
          </button>
        </div>

        <!-- itens -->
        <div class="carousel-inner">
          <div v-for="(src, i) in slides" :key="src" :class="['carousel-item', { active: i === 0 }]">
            <img :src="src" class="d-block w-100 dashboard-img" :alt="`Dashboard ${i + 4}`" loading="lazy" />
          </div>
        </div>

        <!-- controles -->
        <button class="carousel-control-prev" type="button" :data-bs-target="'#' + carouselId" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" :data-bs-target="'#' + carouselId" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Próximo</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const carouselId = 'dashboardCarousel';

const slides = [
  '/assets/images/screenshots/dashboard-screenshot1.png',
  '/assets/images/screenshots/dashboard-screenshot2.png',
  '/assets/images/screenshots/dashboard-screenshot3.png',
  '/assets/images/screenshots/dashboard-screenshot4.png',
  '/assets/images/screenshots/dashboard-screenshot5.png',
  '/assets/images/screenshots/dashboard-screenshot6.png',
  '/assets/images/screenshots/dashboard-screenshot7.png',
  '/assets/images/screenshots/dashboard-screenshot8.png',
  '/assets/images/screenshots/dashboard-screenshot9.png',
  '/assets/images/screenshots/dashboard-screenshot10.png',
  '/assets/images/screenshots/dashboard-screenshot11.png',
  '/assets/images/screenshots/dashboard-screenshot12.png',

];
</script>

<style scoped>
/* deixa as imagens bonitas no espaço disponível */
.dashboard-img {
  max-height: 540px;          /* ajuste a altura que preferir */
  object-fit: contain;        /* evita “cortar” as telas */
  background: #0b0b0b0a;      /* leve fundo pra telas com transparência */
}

/* opcional: remove “salto” quando carrega */
.carousel-item {
  transition: transform .6s ease;
}
</style>

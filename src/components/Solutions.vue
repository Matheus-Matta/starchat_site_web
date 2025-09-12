<template>
  <!--====== Seção de Soluções Início ======-->
  <section
    id="solucoes"
    class="solutions-section-three text-white text-center rel bg-blue pt-130 rpt-100 z-1 pb-75 rpb-45"
    :style="bgStyle"
  >
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-7 col-lg-8 col-md-10">
          <div class="section-title mb-75">
            <span class="sub-title">Soluções Inteligentes</span>
            <h2>Transformamos atendimento em resultados com StarChats</h2>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-xl-4 col-md-6">
          <div class="solution-item-three wow fadeInUp delay-0-2s">
            <i class="far fa-comments"></i>
            <h3><a href="">Atendimento Multicanal</a></h3>
            <p>
              Gerencie WhatsApp, Instagram, Facebook, e muito mais em um só lugar
              com sua equipe organizada por departamentos.
            </p>
          </div>
        </div>

        <div class="col-xl-4 col-md-6">
          <div class="solution-item-three wow fadeInUp delay-0-4s">
            <i class="fas fa-users-cog"></i>
            <h3><a href="">Gestão de Equipe</a></h3>
            <p>
              Atribua atendimentos, acompanhe produtividade e crie permissões para cada
              membro da equipe com base na empresa.
            </p>
          </div>
        </div>

        <div class="col-xl-4 col-md-6">
          <div class="solution-item-three wow fadeInUp delay-0-6s">
            <i class="fas fa-chart-line"></i>
            <h3><a href="">Relatórios e Insights</a></h3>
            <p>
              Visualize relatórios por empresa, canal e usuário. Veja o desempenho real
              do seu time em tempo real.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--====== Seção de Soluções Fim ======-->
</template>

<script setup lang="ts">

const bgStyle = {
  backgroundImage: `url('/assets/images/shapes/solutions-bg-dots.png')`,
}
</script>

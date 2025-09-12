<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'   
import { useHead } from '@unhead/vue'
import { trackCTA } from '@/utils/ga'

useHead({
  title: 'Sobre a StarDev | StarChats',
  meta: [
    {
      name: 'description',
      content: 'Conheça a história da StarDev e como criamos o StarChats: um CRM multicanal que centraliza atendimento, organiza equipes e gera confiança com tecnologia e transparência.'
    },
    { name: 'robots', content: 'index,follow' },
    { property: 'og:title', content: 'Sobre a StarDev | StarChats' },
    { property: 'og:description', content: 'História, missão, visão e valores da StarDev — criadores do StarChats, a plataforma de atendimento multicanal.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://starchats.com.br/sobre' },
    { property: 'og:image', content: 'https://starchats.com.br/assets/images/og/sobre.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Sobre a StarDev | StarChats' },
    { name: 'twitter:description', content: 'Conheça a StarDev e nossa plataforma StarChats: missão, visão e valores.' },
    { name: 'twitter:image', content: 'https://starchats.com.br/assets/images/og/sobre.jpg' }
  ],
  link: [
    { rel: 'canonical', href: 'https://starchats.com.br/sobre' }
  ],
})
</script>

<template>
  <div id="home" class="home-three">
    <div class="page-wrapper">
      <!-- Header somente -->
      <Header />

      <!-- Hero -->
      <section class="rel z-1 pt-140 bg-white">
        <div class="container">
          <div class="row justify-content-center text-center">
            <div class="col-xl-8 col-lg-10">
              <div class="section-title mb-20">
                <h1>Sobre a StarDev</h1>
                <p class="lead mt-15">
                  Impulsionamos empresas com tecnologia e transparência. Criamos o
                  <strong>StarChats</strong>, uma plataforma de multiatendimento para facilitar sua rotina, otimizar processos e alavancar vendas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Nossa história -->
      <section class="rel z-1 py-20 bg-white">
        <div class="container">
          <div class="row align-items-center gy-4">
            <div class="col-lg-6">
              <div class="section-title mb-20 text-lg-start text-center">
                <span class="sub-title">Nossa história</span>
                <h2>De uma ideia simples a um produto usado por times reais</h2>
              </div>
              <p class="mb-15">
                A <strong>StarDev</strong> nasceu do incômodo de ver equipes perdendo tempo com ferramentas dispersas e processos manuais.
                Em vez de mais um “sistema de chat”, pensamos em um
                <em>hub de atendimento</em>: rápido de instalar, fácil de operar e pronto para crescer com o negócio.
              </p>
              <p class="mb-25">
                Assim surgiu o <strong>StarChats</strong>: um CRM multicanal que centraliza conversas, organiza times e traz dados claros para
                decisões melhores. Mantemos uma cultura focada no futuro e na transparência com o cliente — porque escalar vendas
                começa por construir confiança e eficiência todos os dias.
              </p>
            </div>

            <div class="col-lg-6">
              <div class="about-image text-lg-center">
                <!-- Ilustração / placeholder -->
                <img
                  
                  style="width: 75%;"
                  src="/assets/images/hero/hero.png"
                  alt="Linha do tempo / evolução da empresa"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Missão & Visão -->
      <section class="rel z-1 py-20 bg-lighter">
        <div class="container">
          <div class="row justify-content-center text-center">
            <div class="col-xl-8 col-lg-10">
              <div class="section-title mb-40">
                <span class="sub-title">Propósito</span>
                <h2>Missão &amp; Visão</h2>
                <p class="mt-10">
                  Conectamos pessoas e marcas com automação inteligente, sem perder o toque humano.
                </p>
              </div>
            </div>
          </div>

          <div class="row gy-4">
            <div class="col-md-6">
              <div class="p-30 bg-white rounded-3 border">
                <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-lighter mb-15 icon-64">
                  <i class="fas fa-bullseye"></i>
                </div>
                <h3 class="h4 mb-10">Nossa missão</h3>
                <p class="mb-0">
                  Democratizar o multiatendimento com ferramentas <strong>simples, poderosas e orientadas por dados</strong>, ajudando empresas
                  de todos os portes a identificar, atender e encantar clientes com eficiência real.
                </p>
              </div>
            </div>

            <div class="col-md-6">
              <div class="p-30 bg-white rounded-3 border">
                <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-lighter mb-15 icon-64">
                  <i class="fas fa-eye"></i>
                </div>
                <h3 class="h4 mb-10">Nossa visão</h3>
                <p class="mb-0">
                  Ser o <strong>padrão global</strong> em atendimento inteligente: cada interação significativa, cada lead qualificado e
                  cada conversão contribuindo para um crescimento sustentável dos nossos clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Valores -->
      <section class="rel z-1 py-20 mb-140 bg-white">
        <div class="container">
          <div class="row justify-content-center text-center">
            <div class="col-xl-8 col-lg-10">
              <div class="section-title mb-40">
                <span class="sub-title">No que acreditamos</span>
                <h2>Valores que guiam nosso trabalho</h2>
                <p class="mt-10">Princípios que sustentam cada decisão de produto e cada conversa com clientes.</p>
              </div>
            </div>
          </div>

          <div class="row gy-4">
            <div class="col-md-4">
              <div class="text-center p-25 rounded-3 border h-100">
                <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-lighter mb-15 icon-64">
                  <i class="fas fa-lightbulb"></i>
                </div>
                <h3 class="h5 mb-10">Inovação</h3>
                <p class="mb-0">
                  Questionamos o óbvio e antecipamos necessidades, aplicando tecnologia na medida certa para resolver problemas reais.
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="text-center p-25 rounded-3 border h-100">
                <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-lighter mb-15 icon-64">
                  <i class="fas fa-handshake"></i>
                </div>
                <h3 class="h5 mb-10">Transparência</h3>
                <p class="mb-0">
                  Relacionamentos de longo prazo nascem de comunicação clara, métricas abertas e respeito em cada etapa.
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="text-center p-25 rounded-3 border h-100">
                <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-lighter mb-15 icon-64">
                  <i class="fas fa-trophy"></i>
                </div>
                <h3 class="h5 mb-10">Excelência</h3>
                <p class="mb-0">
                  Capricho nos detalhes — da experiência do usuário ao suporte — porque o resultado final sempre importa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <!-- Scroll Top -->
      <button class="scroll-top scroll-to-target" data-target="html">
        <span class="fa fa-angle-up"></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.icon-64 { width: 64px; height: 64px; }
/* Ajustes leves para harmonia com o tema */
.bg-dark { background: #0f172a; }
.lead { font-size: 1.125rem; }
.p-25 { padding: 25px; }
.p-30 { padding: 30px; }
.py-100 { padding-top: 100px; padding-bottom: 100px; }
.pt-140 { padding-top: 140px; }
.pb-80 { padding-bottom: 80px; }
.mb-15 { margin-bottom: 15px; }
.mb-20 { margin-bottom: 20px; }
.mb-25 { margin-bottom: 25px; }
.mb-30 { margin-bottom: 30px; }
.mb-40 { margin-bottom: 40px; }
.rounded-3 { border-radius: 12px; }
.border { border: 1px solid rgba(15, 23, 42, 0.08); }
.text-white-50 { color: rgba(255,255,255,.75); }
</style>

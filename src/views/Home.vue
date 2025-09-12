<script setup lang="ts">
import Header from '@/components/Header.vue'
import Hero from '@/components/Hero.vue'
import Solutions from '@/components/Solutions.vue'
import About from '@/components/About.vue'
import Auto from '@/components/Auto.vue'
import Newsletter from '@/components/Newsletter.vue'
import Services from '@/components/Services.vue'
import Screenshot from '@/components/Screenshot.vue'
import Contact from '@/components/Contact.vue'
import Footer from '@/components/Footer.vue'
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'

useHead({
  title: 'StarChats — Centralize seu atendimento em um único lugar',
  meta: [
    {
      name: 'description',
      content:
        'O StarChats centraliza WhatsApp, Instagram, Telegram, e-mail e chat em uma única plataforma. Organize equipes, automatize fluxos e aumente suas vendas com eficiência.'
    },
    { name: 'robots', content: 'index,follow' },
    // Open Graph
    { property: 'og:title', content: 'StarChats — Centralize seu atendimento' },
    {
      property: 'og:description',
      content:
        'Plataforma multicanal com automações, relatórios e IA para transformar o atendimento da sua empresa.'
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://starchats.com.br/' },
    { property: 'og:image', content: 'https://starchats.com.br/assets/images/og/home.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'StarChats — Centralize seu atendimento' },
    {
      name: 'twitter:description',
      content:
        'Centralize WhatsApp, Instagram, Telegram e mais em um só CRM. Experimente grátis.'
    },
    { name: 'twitter:image', content: 'https://starchats.com.br/assets/images/og/home.jpg' }
  ],
  link: [{ rel: 'canonical', href: 'https://starchats.com.br/' }]
})
</script>
<template>
  <div id="home" class="home-three">
    <div class="page-wrapper">
      <!-- Preloader -->

      <Header />
      <Hero />
      <Solutions />
      <About />
      <Auto />
      <Newsletter />
      <Services />
      <Screenshot />
      <Contact />
      <Footer />

      <!-- Scroll Top Button -->
      <button class="scroll-top scroll-to-target" data-target="html">
        <span class="fa fa-angle-up"></span>
      </button>
    </div>
  </div>
</template>

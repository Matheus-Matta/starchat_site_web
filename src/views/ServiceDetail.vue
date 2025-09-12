<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import data from '@/data/services.json'
import { useHead } from '@unhead/vue'

// rota e slug
const route = useRoute()
const router = useRouter()
const slug = computed(() => String(route.params.slug || ''))

// busca conteúdo do JSON
const service = computed(() => (data as any)[slug.value])

// se não existir, manda pra home ou 404
watchEffect(() => {
  if (!service.value) {
    router.replace('/') 
  } else {
    document.title = `${service.value.title} · StarChat`
  }
})

useHead(() => {
  if (!service.value) {
    return {
      title: 'Serviço não encontrado · StarChats',
      meta: [{ name: 'robots', content: 'noindex,nofollow' }],
      link: [{ rel: 'canonical', href: `https://starchats.com.br/services` }]
    }
  }
  return {
    title: `${service.value.title} · StarChats`,
    meta: [
      {
        name: 'description',
        content:
          service.value.hero?.description ||
          service.value.excerpt ||
          `Saiba mais sobre ${service.value.title} no StarChats.`
      },
      { name: 'robots', content: 'index,follow' },
      { property: 'og:title', content: `${service.value.title} · StarChats` },
      {
        property: 'og:description',
        content: service.value.hero?.description || service.value.excerpt
      },
      { property: 'og:type', content: 'article' },
      {
        property: 'og:url',
        content: `https://starchats.com.br/services/${slug.value}`
      },
      {
        property: 'og:image',
        content:
          service.value.image ||
          'https://starchats.com.br/assets/images/og/service-default.jpg'
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${service.value.title} · StarChats` },
      {
        name: 'twitter:description',
        content: service.value.hero?.description || service.value.excerpt
      },
      {
        name: 'twitter:image',
        content:
          service.value.image ||
          'https://starchats.com.br/assets/images/og/service-default.jpg'
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: `https://starchats.com.br/services/${slug.value}`
      }
    ]
  }
})
</script>

<template>
  <div id="home" class="home-three">
    <div class="page-wrapper">
      <Header />

      <section class="rel z-1 pt-150 pb-140 bg-white" v-if="service">
        <div class="container">
          <div class="row justify-content-center text-center">
            <div class="col-xl-8 col-lg-10">
              <div class="section-title mb-20">
                <span class="sub-title">{{ service.hero?.subtitle }}</span>
                <h1>{{ service.hero?.headline || service.title }}</h1>
                <p class="lead mt-15">{{ service.hero?.description || service.excerpt }}</p>
              </div>
            </div>
          </div>

          <div class="row align-items-center gy-4 mt-40">
            <div class="col-lg-6 order-lg-1 order-2">
              <div class="pe-lg-4">
                <div
                  v-for="(sec, idx) in service.sections || []"
                  :key="idx"
                  class="mb-25"
                >
                  <h3 class="h4 mb-10">{{ sec.heading }}</h3>
                  <p class="mb-0">{{ sec.text }}</p>
                </div>

                <ul class="list-style-one mt-25" v-if="service.features?.length">
                  <li v-for="(f, i) in service.features" :key="i">{{ f }}</li>
                </ul>

                <div class="mt-30" v-if="service.cta">
                  <RouterLink :to="service.cta.to" class="theme-btn style-two">
                    {{ service.cta.label }} <i class="fas fa-arrow-right"></i>
                  </RouterLink>
                </div>
              </div>
            </div>

            <div class="col-lg-6 order-lg-2 order-1">
              <div class="text-center text-lg-end">
                <img
                  class="img-fluid rounded-3 shadow-sm"
                  :src="service.image || '/assets/images/illustrations/placeholder-wide.png'"
                  :alt="service.title"
                  @error="(e:any)=>e.target.src='/assets/images/illustrations/placeholder-wide.png'"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <button class="scroll-top scroll-to-target" data-target="html">
        <span class="fa fa-angle-up"></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
    .pt-150 { padding-top: 150px; }
    .pb-80 { padding-bottom: 80px; }
    .mt-40 { margin-top: 40px; }
    .mb-25 { margin-bottom: 25px; }
    .h4 { font-size: 1.25rem; }
    .rounded-3 { border-radius: 12px; }
    .shadow-sm { box-shadow: 0 8px 24px rgba(2, 6, 23, 0.06); }
</style>

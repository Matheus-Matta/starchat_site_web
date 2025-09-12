<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useHead } from '@unhead/vue'

// ✅ Import do JSON
import integrationsRaw from '@/data/integrations.json'
const data = integrationsRaw as unknown as {
  items: {
    slug: string
    title: string
    icon: string
    excerpt: string
    description?: string
    features: string[]
    to?: string
    label?: string
  }[]
}

const route = useRoute()
const router = useRouter()
const slug = computed(() => String(route.params.slug || ''))

const integration = computed(() => (data.items || []).find(i => i.slug === slug.value))

watchEffect(() => {
  if (!integration.value) return
  document.title = `${integration.value.title} · StarChats`
})

useHead(() => {
  if (!integration.value) {
    return {
      title: 'Integração não encontrada · StarChats',
      meta: [
        { name: 'robots', content: 'noindex,nofollow' }
      ],
      link: [{ rel: 'canonical', href: `https://starchats.com.br/integrations` }]
    }
  }
  return {
    title: `${integration.value.title} · StarChats`,
    meta: [
      {
        name: 'description',
        content: integration.value.excerpt || 'Detalhes da integração no StarChats'
      },
      { name: 'robots', content: 'index,follow' },
      { property: 'og:title', content: `${integration.value.title} · StarChats` },
      {
        property: 'og:description',
        content: integration.value.description || integration.value.excerpt
      },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: `https://starchats.com.br/integrations/${slug.value}` },
      { property: 'og:image', content: integration.value.icon },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: `${integration.value.title} · StarChats` },
      {
        name: 'twitter:description',
        content: integration.value.description || integration.value.excerpt
      },
      { name: 'twitter:image', content: integration.value.icon }
    ],
    link: [
      { rel: 'canonical', href: `https://starchats.com.br/integrations/${slug.value}` }
    ]
  }
})
</script>

<template>
  <div class="page-wrapper">
    <Header />

    <section style="margin: 160px 0;" class="py-5 bg-white" v-if="integration">
      <div class="container">
        <!-- Cabeçalho -->
        <div class="text-center mb-5">
          <img :src="integration.icon" :alt="integration.title" style="width:72px;height:72px" />
          <h1 class="display-5 fw-bold mt-3">{{ integration.title }}</h1>
          <p class="lead text-muted">{{ integration.excerpt }}</p>
        </div>

        <!-- Descrição -->
        <div v-if="integration.description" class="row justify-content-center mb-5">
          <div class="col-lg-8">
            <p class="fs-5 text-dark text-center">
              {{ integration.description }}
            </p>
          </div>
        </div>

        <!-- Recursos -->
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card p-4">
              <h5 class="fw-semibold mb-3">Recursos</h5>
              <ul class="list-unstyled">
                <li v-for="(f,i) in integration.features" :key="i" class="mb-2">
                  <i class="fas fa-check text-success me-2"></i>{{ f }}
                </li>
              </ul>
            </div>

            <!-- Botão de ação -->
            <div v-if="integration.to && integration.label" class="mt-4 text-center">
              <RouterLink :to="integration.to" class="theme-btn style-two">
                {{ integration.label }}
              </RouterLink>
            </div>

            <div class="mt-4 text-center">
              <RouterLink to="/integrations" class="text-decoration-none">
                ← Voltar para integrações
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-else class="py-5">
      <div class="container text-center">
        <div class="text-muted mb-3">Integração não encontrada.</div>
        <RouterLink to="/integrations" class="btn btn-outline-primary btn-sm">Ver integrações</RouterLink>
      </div>
    </section>

    <Footer />
  </div>
</template>

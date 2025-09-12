<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useHead } from '@unhead/vue'
import { track, trackCTA } from '@/utils/ga'

// Importa JSON com fallback seguro
import integrationsRaw from '@/data/integrations.json'
const raw = (integrationsRaw as any) ?? {}

function onFilterClick(key: string, label: string) {
  track('integration_filter_click', { key, label })
  selected.value = key
}

function onCardClick(slug: string, title: string) {
  trackCTA('integrations_list', title) 
}

function onFeatureClick(title: string, feature: string) {
  track('integration_feature_click', { title, feature })
}

type Category = { key: string; label: string }
type Integration = {
  slug: string
  title: string
  category: string
  icon: string
  excerpt: string
  features: string[]
  /** novos campos para CTA direto */
  label?: string
  to?: string
}

const data: { categories: Category[]; items: Integration[] } = {
  categories: Array.isArray(raw.categories) ? raw.categories : [],
  items: Array.isArray(raw.items) ? raw.items : []
}

const categories = computed<Category[]>(() => [{ key: 'all', label: 'Todas' }, ...data.categories])
const selected = ref('all')

const items = computed<Integration[]>(() =>
  (data.items || []).filter(i => selected.value === 'all' || i.category === selected.value)
)
useHead({
  title: 'Integrações · StarChats',
  meta: [
    {
      name: 'description',
      content:
        'Explore as integrações do StarChats por categoria: WhatsApp, Instagram, Telegram, e-mail, automações, IA e mais.'
    },
    { name: 'robots', content: 'index,follow' },
    { property: 'og:title', content: 'Integrações · StarChats' },
    {
      property: 'og:description',
      content:
        'Veja todas as integrações disponíveis no StarChats e potencialize seu atendimento multicanal.'
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://starchats.com.br/integrations' },
    { property: 'og:image', content: 'https://starchats.com.br/assets/images/og/integrations.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Integrações · StarChats' },
    {
      name: 'twitter:description',
      content: 'Integrações por categoria: canais, automações, IA e relatórios.'
    },
    { name: 'twitter:image', content: 'https://starchats.com.br/assets/images/og/integrations.jpg' }
  ],
  link: [{ rel: 'canonical', href: 'https://starchats.com.br/integrations' }]
})
</script>

<template>
  <div class="page-wrapper">
    <Header />

    <section style="margin: 160px 0;" id="integration-categories" class="py-5">
      <div class="container bg-white">
        <div class="text-center mb-5">
          <h2 class="display-4 fw-bold text-dark">Categorias de Integrações</h2>
          <p class="lead text-muted">Explore nossas integrações organizadas por categoria</p>
        </div>

        <div class="d-flex flex-wrap justify-content-center gap-3 mb-20">
          <button
            v-for="c in categories"
            :key="c.key"
            class="filter-btn"
            :class="{ active: selected === c.key }"
            @click="onFilterClick(c.key, c.label)"
          >
            {{ c.label }}
          </button>
        </div>

        <div v-if="items.length" class="row g-4">
          <div v-for="it in items" :key="it.slug" class="col-lg-4 col-md-6">
            <RouterLink :to="`/integrations/${it.slug}`" @click="onCardClick(it.slug, it.title)" class="text-decoration-none">
              <div class="card integration-card h-100 position-relative">
                <div class="category-badge">
                  {{ (data.categories.find(c => c.key === it.category) || { label: it.category }).label }}
                </div>

                <div class="integration-icon">
                  <img
                    :src="it.icon"
                    :alt="it.title"
                    class="w-100 h-100 object-fit-contain"
                    @error="(e:any)=> e.target.src='/assets/icons/integrations/placeholder.svg'"
                  />
                </div>

                <h3 class="h4 fw-bold mb-3 text-dark">{{ it.title }}</h3>
                <p class="text-muted mb-4">{{ it.excerpt }}</p>

                <div class="text-start">
                  <h5 class="fw-semibold mb-3">Recursos:</h5>
                  <ul class="list-unstyled">
                    <li v-for="(f, i) in it.features" :key="i" class="mb-2">
                      <i class="fas fa-check text-success me-2"></i>{{ f }}
                    </li>
                  </ul>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>

        <div v-else class="text-center text-muted py-5">
          Nenhuma integração encontrada nessa categoria.
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.filter-btn{ border:1px solid #e5e7eb;border-radius:10px;padding:.5rem 1rem;background:#fff; }
.filter-btn.active{ border-color:#4f46e5;color:#4f46e5 }
.integration-card{ border:1px solid rgba(15,23,42,.08);border-radius:16px;padding:1.25rem }
.category-badge{
  position:absolute;top:12px;right:12px;background:#f3f4f6;color:#111827;
  padding:.25rem .5rem;border-radius:8px;font-size:.75rem
}
.integration-icon{
  width:56px;height:56px;border-radius:14px;display:flex;align-items:center;justify-content:center;
  border:1px solid rgba(15,23,42,.08); margin-bottom:12px; background:#fff;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import servicesData from '@/data/services.json'
import { track, trackCTA } from '@/utils/ga'  // 👈 add

const order = [
  'multicanal',
  'funcoes-e-auditoria',
  'times-e-agentes',
  'relatorios',
  'automacoes',
  'robos-com-ia',
  'helpercenter',
  'sla-e-csat',
  'campanhas',
  'aplicativo-mobile'
]

type Badge = { text: string; class?: string }
type Card = {
  title: string
  icon: string
  excerpt: string
  features: string[]
  badge?: Badge
}

const items = computed<Card[]>(() =>
  order
    .filter(k => (servicesData as any)[k])
    .map(k => {
      const s = (servicesData as any)[k]
      return {
        title: s.title,
        icon: s.icon || 'fas fa-circle',
        excerpt: s.excerpt,
        features: s.features || s.bullets || [],
        badge: s.badge
      }
    })
)

function onCardClick(serviceTitle: string) {
  trackCTA('services', serviceTitle) 
}
function onFeatureClick(serviceTitle: string, feature: string) {
  track('feature_click', { service: serviceTitle, feature })
}
</script>

<template>
  <section class="services-section-three bg-lighter rel z-1 pt-250 pb-50 rpb-70">
    <div class="container">
      <!-- ... título ... -->

      <div id="servicos" class="row g-4">
        <div
          v-for="(c, i) in items"
          :key="i"
          class="col-lg-4 col-md-6"
        >
          <!-- clique no card inteiro -->
          <div
            class="card h-100 feature-card p-3"
            @click="onCardClick(c.title)"
          >
            <div class="service-icon mb-3">
              <i :class="c.icon + ' text-white fs-2'"></i>
            </div>

            <h3 class="h4 fw-bold mb-3">{{ c.title }}</h3>
            <p class="text-muted mb-4">{{ c.excerpt }}</p>

            <template v-if="c.features && c.features.length">
              <h5 class="fw-semibold mb-3">Recursos:</h5>
              <ul class="list-unstyled text-start">
                <li
                  v-for="(f, j) in c.features"
                  :key="j"
                  class="mb-2"
                  @click.stop="onFeatureClick(c.title, f)"  
                >
                  <i class="fas fa-check text-success me-2"></i>{{ f }}
                </li>
              </ul>
            </template>

            <div v-if="c.badge?.text" class="mt-3">
              <span
                class="badge p-2"
                :class="c.badge.class || 'bg-primary-subtle text-primary'"
                @click.stop="track('badge_click', { service: c.title, badge: c.badge.text })"
              >
                {{ c.badge.text }}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>


<style scoped>
.feature-card {
  border: 1px solid rgba(15,23,42,.08);
  border-radius: 16px;
  box-shadow: 0 10px 24px rgba(2,6,23,.06);
}
.service-icon{
  width:56px;height:56px;
  border-radius:14px;
  display:flex;align-items:center;justify-content:center;
  background: linear-gradient(135deg,#7c3aed 0%, #4f46e5 100%);
}
</style>

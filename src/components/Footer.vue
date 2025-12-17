<template>
  <footer class="footer-section footer-two bg-gray text-white rel z-1">
    <div class="container">
      <!-- CTA Superior -->
      <div class="call-to-action bg-blue bgs-cover text-white rel z-1">
        <div class="row align-items-center">
          <div class="col-xl-7 col-lg-6">
            <div class="section-title mb-20">
              <h2>Precisa de ajuda para sua operação de atendimento?</h2>
              <p>Nossa equipe está pronta para te auxiliar no que for preciso.</p>
            </div>
          </div>
          <div class="col-xl-5 col-lg-6">
            <div class="call-to-action-btns text-xl-right mb-20">
              <RouterLink to="/register" class="theme-btn style-two rmb-15">
                Comece agora <i class="fas fa-arrow-right"></i>
              </RouterLink>
              <RouterLink to="/sobre-nos" class="theme-btn style-three rmb-15">
                Saiba mais <i class="fas fa-arrow-right"></i>
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- shapes -->
        <img class="white-circle" src="/assets/images/shapes/white-circle.png" alt="White Circle" />
        <img class="white-dots slideUpRight" src="/assets/images/shapes/white-dots.png" alt="shape" />
        <img class="white-dots-circle slideLeftRight" src="/assets/images/shapes/white-dots-circle.png" alt="shape" />
      </div>

      <div class="row justify-content-between">
        <!-- Sobre -->
        <div class="col-xl-3 col-sm-6 col-7 col-small">
          <div class="footer-widget about-widget">
            <div class="footer-logo mb-20">
              <RouterLink to="/#home">
                <img :src="logoFooter" alt="Logo StarChats" />
              </RouterLink>
            </div>
            <p><span>Com o StarChats, você tem uma central inteligente de atendimento multicanal</span></p>
            <RouterLink to="/sobre-nos" class="read-more">
              Saiba mais <i class="fas fa-arrow-right"></i>
            </RouterLink>
          </div>
        </div>

        <!-- Menu -->
        <div class="col-xl-2 col-sm-4 col-5 col-small">
          <div class="footer-widget link-widget">
            <h4 class="footer-title">Menu</h4>
            <ul class="list-style-two">
              <li><RouterLink to="/#home">Início</RouterLink></li>
              <li><RouterLink to="/integrations">Integrações</RouterLink></li>
              <li><RouterLink to="/#solucoes">Soluções</RouterLink></li>
              <li><RouterLink to="/#servicos">Serviços</RouterLink></li>
              <li><RouterLink to="/sobre-nos">Sobre</RouterLink></li>
            </ul>
          </div>
        </div>

        <!-- Serviços (dinâmico via services.json) -->
        <div class="col-xl-4 col-md-8">
          <div class="footer-widget link-widget">
            <h4 class="footer-title">Serviços</h4>
            <ul class="list-style-two two-column">
              <li v-for="s in serviceLinks" :key="s.slug">
                <RouterLink :to="`/services/${s.slug}`">{{ s.title }}</RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- Contato -->
        <div class="col-xl-3 col-md-4">
          <div class="footer-widget contact-widget mb-0">
            <h4 class="footer-title">Fale Conosco</h4>
            <ul class="list-style-three">
              <li>
                <i class="fas fa-envelope-open"></i>
                <span><a :href="`mailto:${email}`">{{ email }}</a></span>
              </li>
              <li>
                <i class="fas fa-phone"></i>
                <span>WhatsApp: <a :href="whatsapp" target="_blank" rel="noopener">{{ phone }}</a></span>
              </li>
            </ul>

            <div class="social-style-one mt-25">
              <a v-if="facebook" :href="facebook" target="_blank" rel="noopener"><i class="fab fa-facebook-f"></i></a>
              <a v-if="twitter" :href="twitter" target="_blank" rel="noopener"><i class="fab fa-twitter"></i></a>
              <a v-if="linkedin" :href="linkedin" target="_blank" rel="noopener"><i class="fab fa-linkedin-in"></i></a>
              <a v-if="instagram" :href="instagram" target="_blank" rel="noopener"><i class="fab fa-instagram"></i></a>
              <a v-if="whatsapp" :href="whatsapp" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i></a>
            </div>
          </div>

          <div class="footer-widget contact-widget">
            <h4 class="footer-title">Termos e condições</h4>
            <ul class="list-style-three">
              <li><RouterLink to="/termos-de-uso">Termos de uso</RouterLink></li>
              <li><RouterLink to="/politicas-de-privacidade">Políticas de privacidade</RouterLink></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="copyright-area text-center">
        <p>
          © {{ year }}
          <RouterLink :to="siteUrl">{{ siteName }}</RouterLink>.
          Todos os direitos reservados
        </p>
      </div>
    </div>

    <!-- shapes finais -->
    <img class="dots-shape" src="/assets/images/shapes/dots.png" alt="Shape" />
    <img class="tringle-shape" src="/assets/images/shapes/tringle.png" alt="Shape" />
    <img class="close-shape" src="/assets/images/shapes/close.png" alt="Shape" />
    <img class="circle-shape" src="/assets/images/shapes/circle.png" alt="Shape" />
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import servicesRaw from '@/data/services.json'

/** Variáveis via .env (Vite exige prefixo VITE_) */
const email     = import.meta.env.VITE_CONTACT_EMAIL      || 'contato@starchats.com.br'
const phone     = import.meta.env.VITE_CONTACT_PHONE      || '(00) 00000-0000'
const whatsapp  = import.meta.env.VITE_CONTACT_WHATSAPP   || 'https://wa.me/5500000000000'
const instagram = import.meta.env.VITE_CONTACT_INSTAGRAM  || ''
const facebook  = import.meta.env.VITE_SOCIAL_FACEBOOK    || ''
const twitter   = import.meta.env.VITE_SOCIAL_TWITTER     || ''
const linkedin  = import.meta.env.VITE_SOCIAL_LINKEDIN    || ''
const siteName  = import.meta.env.VITE_SITE_NAME          || 'StarChats'
const siteUrl   = import.meta.env.VITE_SITE_URL           || '/'

/** Logo do rodapé via public/ */
const logoFooter = '/assets/images/logos/logo-footer2.png'

/** Ano atual */
const year = computed(() => new Date().getFullYear())

/** Services dinâmico (title + slug) */
type Svc = { title: string }
const services = servicesRaw as Record<string, Svc>

/** Ordem padrão (mesma usada nos cards) */
const defaultOrder = [
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

/** Lista ordenada + fallback para serviços novos que surgirem no JSON */
const serviceLinks = computed(() => {
  const slugsFromJson = Object.keys(services || {})
  const orderedFirst = defaultOrder.filter(slug => slugsFromJson.includes(slug))
  const rest = slugsFromJson.filter(slug => !defaultOrder.includes(slug))
  return [...orderedFirst, ...rest].map(slug => ({
    slug,
    title: services[slug]?.title || slug
  }))
})
</script>

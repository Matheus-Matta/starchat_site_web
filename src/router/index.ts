import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import About from '@/views/About.vue'
import ServiceDetail from '@/views/ServiceDetail.vue'
import PrivacyPolicy from '@/views/PrivacyPolicy.vue'
import TermsOfUse from '@/views/TermsOfUse.vue'
import Integrations from '@/views/Integrations.vue'
import IntegrationDetail from '@/views/IntegrationDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/register', name: 'register', component: Register },
    { path: '/sobre-nos', name: 'about', component: About },
    { path: '/services/:slug', name: 'service-detail', component: ServiceDetail },
    { path: '/politicas-de-privacidade', name: 'privacy-policy', component: PrivacyPolicy },
    { path: '/termos-de-uso', name: 'terms-of-use', component: TermsOfUse },

    { path: '/integrations', name: 'integrations', component: Integrations },
    { path: '/integrations/:slug', name: 'integration-detail', component: IntegrationDetail },

    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return new Promise(resolve =>
        setTimeout(() => resolve({ el: to.hash, behavior: 'smooth' }), 0)
      )
    }
    return { top: 0 }
  }
})

export default router

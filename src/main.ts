// src/main.ts
import { createApp } from 'vue';
import { createHead } from '@unhead/vue/client'
import App from './App.vue';
import router from './router';

// --- CSS de libs  ---
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'magnific-popup/dist/magnific-popup.css';
import 'nice-select2/dist/css/nice-select2.css';

// --- CSS ---
import '@/assets/css/fontawesome.5.9.0.min.css';
import '@/assets/css/flaticon.css';
import '@/assets/css/animate.min.css';
import '@/assets/css/spacing.min.css';
import '@/assets/css/menu.css';
import '@/assets/css/style.css';
import '@/assets/css/responsive.css';

// --- jQuery como global ---
import jQuery from 'jquery';
(window as any).jQuery = jQuery;
(window as any).$ = jQuery;

// --- Plugins jQuery ---
import 'jquery-mask-plugin/dist/jquery.mask.min.js';
import 'slick-carousel/slick/slick.min.js';
import 'magnific-popup/dist/jquery.magnific-popup.min.js';

// --- Outras libs ---
import imagesLoaded from 'imagesloaded';
import Isotope from 'isotope-layout';
import NiceSelect from 'nice-select2';

(window as any).imagesLoaded = imagesLoaded;
(window as any).Isotope = Isotope;
(window as any).NiceSelect = NiceSelect;

// --- JS do Bootstrap ---
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// --- Vue app ---
const app = createApp(App)
app.use(router)
app.use(createHead())                       
app.mount('#app')

router.afterEach((to) => {
  const gaId = import.meta.env.VITE_GA_ID
  if (!gaId) return
  const w = window as any
  if (!w.gtag) return

  w.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: to.fullPath,
  })
})
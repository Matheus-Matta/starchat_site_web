<template>
  <!--====== Seção de Contato Início ======-->
  <section class="contact-section-two rel z-1 pt-115 rpt-85 pb-130 rpb-55">
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="col-xl-6 col-lg-8 col-md-10">
          <div class="section-title mb-50">
            <span class="sub-title">Entre em contato</span>
            <h2>Fale com a gente e agende uma demostração do nosso Sistema!</h2>
            <p>Entre em contato conosco para mais informações.</p>
          </div>
        </div>
      </div>

      <div class="contact-information-area pb-50">
        <div class="row justify-content-center">
          <!-- Email -->
          <div class="col-lg-6 col-md-6">
            <div class="contact-info-item wow fadeInUp delay-0-2s">
              <i class="fas fa-envelope-open"></i>
              <div class="contact-info-content">
                <h3>Email</h3>
                <span>
                  <a :href="`mailto:${email}`">{{ email }}</a>
                </span>
              </div>
            </div>
          </div>

          <!-- WhatsApp -->
          <div class="col-lg-6 col-md-6">
            <div class="contact-info-item wow fadeInUp delay-0-6s">
              <i class="fab fa-whatsapp" style="font-size: 1.3rem; padding-top: 0.1rem;"></i>
              <div class="contact-info-content">
                <h3>WhatsApp</h3>
                <span>
                  <a :href="whatsapp" target="_blank" rel="noopener">{{ phone }}</a>
                </span>
              </div>
            </div>
          </div>
        </div><!-- /.row -->
      </div><!-- /.contact-information-area -->
    </div>
  </section>
  <!--====== Seção de Contato Fim ======-->
</template>

<script setup lang="ts">
const email = import.meta.env.VITE_CONTACT_EMAIL || 'contato@starchats.com.br'
const phone = import.meta.env.VITE_CONTACT_PHONE || '(00) 00000-0000'
const whatsapp = import.meta.env.VITE_CONTACT_WHATSAPP || 'https://wa.me/5500000000000'
</script>

<!-- src/views/Register.vue -->
<script setup lang="ts">
import { reactive, computed, ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import services from '@/data/services.json' // <- carrega o JSON

const ENDPOINT = import.meta.env.VITE_REGISTER_ENDPOINT
const USER = import.meta.env.VITE_N8N_BASIC_USER
const PASS = import.meta.env.VITE_N8N_BASIC_PASS

type ServiceMap = Record<string, { title: string }>
const serviceOptions = Object.entries(services as ServiceMap).map(([slug, obj]) => ({
  value: slug,
  label: obj.title,
}))

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone_display: '',   
  phone_e164: '',      
  service: '',
})

const submitting = ref(false)
const success = ref(false)
const error = ref<string | null>(null)

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const isValidE164 = (v: string) => /^\+55\d{10,11}$/.test(v)

function toE164BR(display: string): string {
  const digits = (display || '').replace(/\D+/g, '')
  // se já vier com 55 no começo:
  let d = digits.startsWith('55') ? digits : '55' + digits
  d = d.slice(0, 13) // 55 + 11 dígitos
  return '+' + d
}

function onPhoneInput(e: Event) {
  form.phone_display = (e.target as HTMLInputElement).value
  form.phone_e164 = toE164BR(form.phone_display)
}

const isValid = computed(() =>
  form.name.trim().length > 2 &&
  form.company.trim().length > 1 &&
  isValidEmail(form.email) &&
  isValidE164(form.phone_e164) &&
  !!form.service
)

async function onSubmit() {
  success.value = false
  error.value = null

  if (!ENDPOINT || !USER || !PASS) {
    error.value = 'Endpoint/credenciais ausentes (.env).'
    return
  }
  if (!isValid.value) return

  submitting.value = true
  const basicAuth = btoa(`${USER}:${PASS}`)

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify({
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone_e164,
        service: form.service,
      }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    success.value = true
    Object.assign(form, {
      name: '', company: '', email: '', phone_display: '', phone_e164: '',
      service: '',
    })
  } catch (e: any) {
    const msg = (e?.message || '').toLowerCase()
    if (msg.includes('failed to fetch')) {
      error.value = 'Falha de rede/DNS. Confira o ENDPOINT.'
    } else {
      error.value = 'Não foi possível enviar. Tente novamente.'
    }
  } finally {
    submitting.value = false
  }
}

// máscara leve (opcional) — se já usa jquery-mask, pode remover esta parte
onMounted(() => {
  // nada obrigatório aqui; mantive caso queira plugar mask jQuery depois
})
</script>

<template>
  <div id="home" class="home-three">
    <div class="page-wrapper">
      <Header />

      <section style="margin: 120px 0;" class="register-hero py-80 bg-white">
        <div class="container">
          <div class="row g-4 align-items-start">
            <!-- TEXTO À ESQUERDA -->
            <div class="col-12 col-lg-6">
              <div class="promo-copy">
                <div class="eyebrow theme-btn style-six">
                  <i class="bi bi-rocket-takeoff-fill me-2"></i>
                  Transforme sua empresa hoje!
                </div>
                <h1 class="display-6 fw-bold mb-12">
                  Demonstração gratuita, personalizada e sem compromisso
                </h1>
                <p class="lead text-slate">
                  Preencha o formulário e receba um contato de um especialista em até
                  <strong>2 horas</strong>. Vamos mostrar como centralizar canais, equipes e relatórios
                  no StarChats para acelerar seu atendimento.
                </p>

                <ul class="badges mt-24">
                  <li><i class="bi bi-lightning-charge-fill"></i> Resposta em 2h</li>
                  <li><i class="bi bi-gift-fill"></i> Demo gratuita</li>
                  <li><i class="bi bi-people-fill"></i> Consultor especialista</li>
                </ul>
              </div>
            </div>

            <!-- FORM À DIREITA -->
            <div class="col-12 col-lg-6">
              <form @submit.prevent="onSubmit" class="card-form p-24">
                <div class="row g-3">
                  <!-- Nome -->
                  <div class="col-12 col-md-6">
                    <label class="form-label form-label-sm">Nome completo *</label>
                    <div class="input-group input-group-sm">
                      <span class="input-group-text input-icon"><i class="bi bi-person"></i></span>
                      <input v-model.trim="form.name" type="text" class="form-control form-control-slim"
                             placeholder="Seu nome completo" required />
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="col-12 col-md-6">
                    <label class="form-label form-label-sm">Email corporativo *</label>
                    <div class="input-group input-group-sm">
                      <span class="input-group-text input-icon"><i class="bi bi-envelope"></i></span>
                      <input v-model.trim="form.email" type="email" class="form-control form-control-slim"
                             placeholder="voce@suaempresa.com" required />
                    </div>
                  </div>

                  <!-- Telefone -->
                  <div class="col-12 col-md-6">
                    <label class="form-label form-label-sm">Telefone *</label>
                    <div class="input-group input-group-sm">
                      <span class="input-group-text input-icon"><i class="bi bi-telephone"></i></span>
                      <input
                        :value="form.phone_display"
                        @input="onPhoneInput"
                        type="tel"
                        class="form-control form-control-slim"
                        placeholder="(XX) XXXXX-XXXX"
                        required
                      />
                    </div>
                  </div>

                  <!-- Empresa -->
                  <div class="col-12 col-md-6">
                    <label class="form-label form-label-sm">Empresa *</label>
                    <div class="input-group input-group-sm">
                      <span class="input-group-text input-icon"><i class="bi bi-building"></i></span>
                      <input v-model.trim="form.company" type="text" class="form-control form-control-slim"
                             placeholder="Nome da sua empresa" required />
                    </div>
                  </div>

                  <!-- Solução (select vindo do JSON) -->
                  <div class="col-12">
                    <label class="form-label form-label-sm">Solução de interesse *</label>
                    <select v-model="form.service" class="form-select form-control-slim" required>
                      <option disabled value="">Selecione a solução de seu interesse</option>
                      <option v-for="opt in serviceOptions" :key="opt.value" :value="opt.value">
                        {{ opt.label }}
                      </option>
                    </select>
                  </div>

                  <!-- CTA -->
                  <div class="col-12">
                    <button class="theme-btn btn-cta w-100" type="submit" :disabled="submitting || !isValid">
                      <span v-if="!submitting">Quero minha demonstração gratuita</span>
                      <span v-else>Enviando…</span>
                    </button>
                  </div>

                  <!-- Feedback -->
                  <div class="col-12">
                    <p v-if="success" class="mt-2 text-success text-center">Recebido! Em breve falamos com você 🎉</p>
                    <p v-if="error" class="mt-2 text-danger text-center">{{ error }}</p>
                  </div>
                </div>
              </form>
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
/* layout */
.register-hero { background: #f8faff; }
.eyebrow { color:#fff; display:inline-flex; align-items:center;
  gap:8px; padding:6px 12px; border-radius:999px; font-weight:700; margin-bottom:16px; }
.text-slate { color:#475569; }

/* badges */
.badges { list-style:none; padding:0; margin:16px 0 0; display:flex; gap:16px; flex-wrap:wrap; }
.badges li { background:#eef2ff; color:#3730a3; font-weight:600; padding:8px 12px; border-radius:999px; display:flex; align-items:center; gap:8px; }

/* cartão/form */
.p-24 { padding: 24px; }
.card-form {
  background:#fff; border:1px solid rgba(15,23,42,.08); border-radius:16px;
  box-shadow:0 8px 24px rgba(2,6,23,.06);
}
.form-label-sm { font-weight:600; font-size:.9rem; margin-bottom:6px; color:#0f172a; }
.form-control-slim, .form-select.form-control-slim {
  height:44px; padding:8px 12px; font-size:.95rem; border-radius:12px;
  border:1px solid rgba(2,6,23,.12); background:#fff;
}
.form-control-slim:focus, .form-select.form-control-slim:focus {
  border-color:#7c3aed; box-shadow:0 0 0 .2rem rgba(124,58,237,.15);
}
.input-icon { background:#f8fafc; border:1px solid rgba(2,6,23,.12); border-right:0; color:#475569; padding: 0 16px !important; }

/* botão */
.btn-cta {
  height:48px; border:0; border-radius:10px; font-weight:800;
  background:linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%); color:#fff;
  box-shadow:0 10px 22px rgba(79,70,229,.28), 0 2px 6px rgba(0,0,0,.04);
  transition:transform .08s ease, box-shadow .2s ease, filter .2s ease;
}
.btn-cta:hover:enabled { box-shadow:0 12px 26px rgba(79,70,229,.35), 0 3px 8px rgba(0,0,0,.06); filter:brightness(1.02); }
.btn-cta:active:enabled { transform:translateY(1px); box-shadow:0 8px 18px rgba(79,70,229,.28); }
.btn-cta:disabled { opacity:.65; cursor:not-allowed; }

@media (max-width: 991.98px) {
  .display-6 { font-size: 1.8rem; }
  .card-form { border-radius: 10px; }
}
</style>

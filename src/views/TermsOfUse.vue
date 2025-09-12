<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

// Preferência 1: receber via prop
const props = defineProps<{ termsHtml?: string }>()
const termsHtml = ref<string>('')

onMounted(async () => {
  if (props.termsHtml) {
    termsHtml.value = props.termsHtml
  } else {
    try {
      const url = import.meta.env.VITE_SITE_TERMS_ENDPOINT || '/api/site-config/terms'
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json() // { terms: '<section>...</section>' }
        termsHtml.value = data?.terms || ''
      } else {
        console.warn('Falha ao carregar termos. HTTP', res.status)
      }
    } catch (err) {
      console.error('Erro buscando termos:', err)
    }
  }

  setHeadTags({
    title: 'Termos de Uso | Starchat',
    description: cutText(stripHtml(termsHtml.value), 160),
    image: '/assets/images/newsletter/circle.png',
    url: window.location.href,
  })
})

function cutText(txt: string, max = 160) {
  const t = (txt || '').replace(/\s+/g, ' ').trim()
  return t.length > max ? t.slice(0, max - 1) + '…' : t
}
function stripHtml(html: string) {
  const div = document.createElement('div')
  div.innerHTML = html || ''
  return (div.textContent || div.innerText || '').trim()
}
function setHeadTags({ title, description, image, url }:
  { title?: string; description?: string; image?: string; url?: string }) {
  if (title) document.title = title
  const ensure = (selector: string, attr: string, content: string) => {
    if (!content) return
    let el = document.head.querySelector(selector) as HTMLMetaElement | null
    if (!el) {
      el = document.createElement('meta')
      if (selector.startsWith('meta[name="')) {
        const name = selector.match(/meta\[name="(.+?)"\]/)?.[1]
        if (name) el.setAttribute('name', name)
      } else if (selector.startsWith('meta[property="')) {
        const prop = selector.match(/meta\[property="(.+?)"\]/)?.[1]
        if (prop) el.setAttribute('property', prop)
      }
      document.head.appendChild(el)
    }
    el.setAttribute(attr, content)
  }
  if (description) ensure('meta[name="description"]', 'content', description)
  if (title) {
    ensure('meta[property="og:title"]', 'content', title)
    ensure('meta[name="twitter:title"]', 'content', title)
  }
  if (description) {
    ensure('meta[property="og:description"]', 'content', description)
    ensure('meta[name="twitter:description"]', 'content', description)
  }
  if (image) {
    ensure('meta[property="og:image"]', 'content', image)
    ensure('meta[name="twitter:image"]', 'content', image)
  }
  if (url) ensure('meta[property="og:url"]', 'content', url)
  ensure('meta[name="twitter:card"]', 'content', 'summary_large_image')
}
</script>

<template>
  <div class="page-wrapper">
    <Header />

    <section
      class="page-banner bg-blue rel z-1"
      :style="{ backgroundImage: 'url(/assets/images/background/banner-bg.png)' }"
    >
      <div class="container">
        <div class="banner-inner">
          <h1 class="page-title wow fadeInUp delay-0-2s">Termos de Uso</h1>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb wow fadeInUp delay-0-4s">
              <li class="breadcrumb-item">
                <RouterLink to="/">Home</RouterLink>
              </li>
              <li class="breadcrumb-item active">Termos de Uso</li>
            </ol>
          </nav>
        </div>
      </div>
      <img class="dots-shape" src="/assets/images/shapes/white-dots-two.png" alt="Shape" />
      <img class="tringle-shape slideLeftRight" src="/assets/images/shapes/white-tringle.png" alt="Shape" />
      <img class="close-shape" src="/assets/images/shapes/white-close.png" alt="Shape" />
      <img src="/assets/images/newsletter/circle.png" alt="shape" class="banner-circle slideUpRight" />
      <img class="dots-shape-three slideUpDown delay-1-5s" src="/assets/images/shapes/white-dots-three.png" alt="Shape" />
    </section>

    <section class="single-servcie-section rel z-1 py-80 rpy-100">
      <div class="container">
        <div class="row">
          <div class="col-xl-12 col-lg-12 mb-4">
            <div class="single-service-content">
              <div class="service-body wow fadeInUp delay-0-6s">
                <!-- Conteúdo: você pode manter inline ou substituir por <div v-html="termsHtml" class="prose"></div> -->
                <section aria-labelledby="tou-title" class="prose">
                  <h2 id="tou-title">Termos de Uso</h2>
                  <p><strong>Vigente a partir de 11/03/2025</strong></p>

                  <p>
                    Estes Termos regulam o uso do <strong>StarChats</strong>, plataforma de atendimento multicanal/CRM
                    fornecida pela <strong>StarDev</strong> (“<strong>Nós</strong>”). Ao criar conta, acessar ou utilizar o serviço,
                    <strong>Você</strong> (cliente/usuário) concorda integralmente com estes Termos.
                    Se não concordar, interrompa o uso.
                  </p>

                  <hr>

                  <h3>Criação e uso de conta</h3>
                  <ul>
                    <li>É necessário fornecer informações corretas e atualizadas no cadastro.</li>
                    <li>Credenciais são pessoais e intransferíveis. O usuário é responsável por manter segurança e sigilo.</li>
                    <li>Podemos suspender contas em caso de uso indevido ou descumprimento destes Termos.</li>
                  </ul>

                  <h3>Assinaturas e cobrança</h3>
                  <ul>
                    <li>Planos pagos são cobrados conforme periodicidade definida e divulgada.</li>
                    <li>Impostos, taxas de gateways e variações cambiais podem ser aplicados.</li>
                    <li>O não pagamento pode levar à suspensão e exclusão da conta após prazos legais.</li>
                  </ul>

                  <h3>Uso aceitável</h3>
                  <p>É proibido:</p>
                  <ul>
                    <li>Enviar spam ou mensagens não autorizadas.</li>
                    <li>Usar a plataforma para atividades ilegais ou que infrinjam direitos de terceiros.</li>
                    <li>Explorar falhas, realizar engenharia reversa ou burlar limites de uso.</li>
                    <li>Inserir dados sensíveis sem base legal na LGPD.</li>
                  </ul>

                  <h3>Integrações e canais de terceiros</h3>
                  <p>
                    O StarChats se conecta a serviços como WhatsApp, Instagram, e-mail e outros.
                    O uso desses canais depende das regras e políticas de cada provedor.
                    Instabilidades ou mudanças externas podem impactar recursos.
                  </p>

                  <h3>Conteúdo do cliente</h3>
                  <p>
                    O conteúdo inserido ou processado pela sua conta é de sua responsabilidade.
                    Nós apenas tratamos dados para viabilizar o serviço, conforme a <a href="/politicas-de-privacidade">Política de Privacidade</a>.
                  </p>

                  <h3>Privacidade e proteção de dados</h3>
                  <p>
                    Seguimos a Lei Geral de Proteção de Dados (LGPD). O cliente é responsável por obter consentimento
                    ou base legal para tratar dados de seus contatos/clientes dentro da plataforma.
                  </p>

                  <h3>Segurança</h3>
                  <p>
                    Utilizamos controles técnicos e organizacionais para proteger os dados (criptografia, logs, acesso restrito).
                    Nenhum sistema é isento de riscos. Em incidentes relevantes, notificaremos conforme exigido por lei.
                  </p>

                  <h3>Suporte e disponibilidade</h3>
                  <p>
                    Oferecemos suporte pelos canais oficiais e buscamos alta disponibilidade.
                    Interrupções podem ocorrer por manutenção, falhas externas ou força maior.
                  </p>

                  <h3>Propriedade intelectual</h3>
                  <p>
                    A marca, código-fonte e documentação do StarChats pertencem à StarDev.
                    É proibido copiar, sublicenciar ou modificar sem autorização.
                  </p>

                  <h3>Recursos de IA e APIs</h3>
                  <ul>
                    <li><strong>IA:</strong> Respostas podem conter imprecisões; o cliente deve validar antes de decisões críticas.</li>
                    <li><strong>APIs:</strong> Podem existir limites de requisições; abusos podem levar à suspensão.</li>
                    <li><strong>Recursos Beta:</strong> Sujeitos a instabilidade ou descontinuação sem aviso prévio.</li>
                  </ul>

                  <h3>Limitação de responsabilidade</h3>
                  <p>
                    Não nos responsabilizamos por danos indiretos ou lucros cessantes.
                    Nossa responsabilidade máxima é limitada ao valor pago nos últimos 12 meses antes do evento.
                  </p>

                  <h3>Encerramento</h3>
                  <p>
                    A conta pode ser encerrada por inadimplência, violação de Termos ou requisição legal.
                    O cliente pode solicitar exportação dos dados em até 30 dias após encerramento, salvo impedimento legal.
                  </p>

                  <h3>Alterações destes Termos</h3>
                  <p>
                    Podemos atualizar estes Termos a qualquer momento. A nova versão terá data de vigência e poderá ser comunicada via e-mail ou aviso no produto.
                  </p>

                  <h3>Lei aplicável e foro</h3>
                  <p>
                    Estes Termos seguem a legislação brasileira. Fica eleito o foro da sede da StarDev, salvo competência legal diversa.
                  </p>

                  <p><em>Última atualização: 11/09/2025.</em></p>
                </section>
                <!-- /FIM TERMOS -->
              </div>
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
</template>

<style scoped>
/* Banner padrão */
.page-banner { background-size: cover; background-position: center; }
.breadcrumb { margin-bottom: 0; }

/* Tipografia de alta legibilidade */
.prose {
  color: #0f172a;
  line-height: 1.75;
  font-size: 1rem;
  max-width: 72ch;     /* largura ótima de leitura */
  margin-inline: auto; /* centraliza no container */
}
.prose p { margin: 0 0 1rem; }
.prose h2, .prose h3 {
  line-height: 1.25;
  margin-top: 2rem;
  margin-bottom: .75rem;
  font-weight: 800;
  letter-spacing: -0.01em;
}
.prose h2 { font-size: clamp(1.5rem, 2.5vw, 2rem); }
.prose h3 { font-size: clamp(1.125rem, 1.8vw, 1.25rem); }
.prose ul, .prose ol { padding-left: 1.25rem; margin: 0 0 1rem; }
.prose li { margin: .25rem 0; }
.prose hr {
  border: 0; height: 1px; background: linear-gradient(90deg, #e5e7eb, #f1f5f9);
  margin: 1.5rem 0;
}

/* Links com contraste e sublinhado sutil */
.prose a { color: #4f46e5; text-underline-offset: 2px; }
.prose a:hover { text-decoration: underline; }

/* Tabelas (se houver) — responsivas e acessíveis */
.prose :global(.table-wrap) {
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(2,6,23,0.04);
  margin: 1rem 0 1.5rem;
}
.prose :global(.table-wrap) table {
  width: 100%;
  border-collapse: collapse;
  min-width: 640px;
}
.prose :global(.table-wrap) th,
.prose :global(.table-wrap) td {
  text-align: left;
  padding: 12px 14px;
  border-bottom: 1px solid #f1f5f9;
}
.prose :global(.table-wrap) thead th {
  background: #f8fafc;
  font-weight: 700;
}
.prose :global(.table-wrap) tbody tr:hover { background: #fafafa; }

/* Mobile refinado */
@media (max-width: 575.98px) {
  .prose { font-size: 0.985rem; padding-inline: 4px; }
}
</style>

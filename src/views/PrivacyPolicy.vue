// src/views/PrivacyPolicy.vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const props = defineProps<{ policyHtml?: string }>()

const policyHtml = ref<string>('')

onMounted(async () => {
  if (props.policyHtml) {
    policyHtml.value = props.policyHtml
  } else {
    try {
      const url = import.meta.env.VITE_SITE_POLICY_ENDPOINT || '/api/site-config/policy'
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json() // espera { policy: '<p>...</p>' }
        policyHtml.value = data?.policy || ''
      } else {
        console.warn('Falha ao carregar policy. HTTP', res.status)
      }
    } catch (err) {
      console.error('Erro buscando policy:', err)
    }
  }

  setHeadTags({
    title: 'Políticas de Privacidade | Starchat',
    description: recap(limpaHtml(policyHtml.value), 160),
    image: '/assets/images/newsletter/circle.png',
    url: window.location.href,
  })
})

function recap(txt: string, max = 160) {
  if (!txt) return ''
  const clean = txt.replace(/\s+/g, ' ').trim()
  return clean.length > max ? clean.slice(0, max - 1) + '…' : clean
}

function limpaHtml(html: string) {
  const div = document.createElement('div')
  div.innerHTML = html || ''
  return (div.textContent || div.innerText || '').trim()
}

function setHeadTags({ title, description, image, url }: { title?: string; description?: string; image?: string; url?: string }) {
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

    <!-- Banner -->
    <section
      class="page-banner bg-blue rel z-1"
      :style="{ backgroundImage: 'url(/assets/images/background/banner-bg.png)' }"
    >
      <div class="container">
        <div class="banner-inner">
          <h1 class="page-title wow fadeInUp delay-0-2s">Políticas de Privacidade</h1>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb wow fadeInUp delay-0-4s">
              <li class="breadcrumb-item">
                <RouterLink to="/">Home</RouterLink>
              </li>
              <li class="breadcrumb-item active">Políticas de Privacidade</li>
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

    <!-- Conteúdo principal -->
    <section class="single-servcie-section rel z-1 py-80 rpy-100">
      <div class="container">
        <div class="row">
          <div class="col-xl-12 col-lg-12 mb-4">
            <div class="single-service-content">
              <div class="service-body wow fadeInUp delay-0-6s">
                <!-- Versão com melhor legibilidade e sem números nos títulos -->
                <section aria-labelledby="pp-title" class="prose">
                  <h2 id="pp-title">Política de Privacidade</h2>
                  <p><strong>Vigente a partir de 11/03/2025</strong></p>

                  <p>
                    A <strong>StarDev</strong>, criadora do <strong>StarChats</strong>, respeita a sua privacidade e
                    se compromete com a transparência no tratamento de dados pessoais. Esta
                    Política explica como coletamos, usamos, compartilhamos e protegemos seus dados quando você
                    visita nossos sites, usa o StarChats (plataforma de multiatendimento/CRM) ou interage com nossa equipe.
                    Aplicamos a Lei Geral de Proteção de Dados Pessoais (<strong>LGPD – Lei 13.709/2018</strong>).
                  </p>

                  <hr>

                  <h3 id="dados-coletados">Dados pessoais que coletamos</h3>
                  <p>Os tipos de dados podem variar conforme o uso:</p>
                  <ul>
                    <li><strong>Cadastro e conta:</strong> nome, e-mail, telefone, empresa/cargo, preferências.</li>
                    <li><strong>Uso da plataforma:</strong> logs de acesso, IP, dispositivo/navegador, páginas e recursos acessados, data e hora.</li>
                    <li><strong>Atendimento multicanal:</strong> conteúdos de mensagens/tickets, anexos, metadados, identificadores de contato (WhatsApp, Instagram, e-mail), notas e auditorias.</li>
                    <li><strong>Comercial e suporte:</strong> histórico de interações, solicitações, NPS/CSAT.</li>
                    <li><strong>Faturamento:</strong> dados de cobrança e notas fiscais conforme a lei.</li>
                    <li><strong>Cookies:</strong> funcionalidade, analytics e, se habilitado, marketing.</li>
                  </ul>

                  <h3 id="finalidades-bases">Finalidades e bases legais</h3>
                  <ul>
                    <li><strong>Operação do StarChats</strong> — execução de contrato.</li>
                    <li><strong>Suporte</strong> — execução de contrato e legítimo interesse.</li>
                    <li><strong>Melhoria e segurança</strong> — legítimo interesse/obrigação legal.</li>
                    <li><strong>Comunicações de serviço</strong> — execução de contrato/legítimo interesse.</li>
                    <li><strong>Marketing</strong> — consentimento ou legítimo interesse com opt-out.</li>
                    <li><strong>Obrigação legal/regulatória</strong> — cumprimento de obrigação legal.</li>
                  </ul>
                  <p>Quando necessário, solicitaremos <strong>consentimento</strong>, que pode ser revogado a qualquer momento.</p>

                  <h3 id="compartilhamento">Com quem compartilhamos</h3>
                  <ul>
                    <li><strong>Infraestrutura/serviços</strong> (hospedagem, e-mail, canais, analytics, suporte) sob contrato e segurança.</li>
                    <li><strong>Parceiros de integração</strong> (ex.: WhatsApp/Instagram/e-mail conectados por você).</li>
                    <li><strong>Autoridades</strong> quando houver obrigação legal.</li>
                    <li><strong>Operações societárias</strong> (ex.: fusão/aquisição), com aviso em mudanças materiais.</li>
                  </ul>

                  <h3 id="transferencias">Transferências internacionais</h3>
                  <p>Quando houver, aplicamos mecanismos da LGPD (art. 33+), com cláusulas e salvaguardas adequadas.</p>

                  <h3 id="retencao">Retenção e descarte</h3>
                  <p>Mantemos dados pelo tempo necessário às finalidades e prazos legais; depois, excluímos ou anonimizamos com segurança.</p>

                  <h3 id="direitos-titular">Seus direitos</h3>
                  <ul>
                    <li>Confirmação de tratamento e <strong>acesso</strong> aos dados;</li>
                    <li><strong>Correção</strong> de dados;</li>
                    <li><strong>Anonimização/bloqueio/eliminação</strong> do que for desnecessário ou em desconformidade;</li>
                    <li><strong>Portabilidade</strong> (ANPD);</li>
                    <li><strong>Informações</strong> sobre compartilhamentos e sobre consentimento;</li>
                    <li><strong>Revogação do consentimento</strong> e <strong>oposição</strong> ao legítimo interesse, quando cabível.</li>
                  </ul>
                  <p>Contato: <a href="mailto:support@starchats.com.br">support@starchats.com.br</a> · WhatsApp (11) 99999-9999.</p>

                  <h3 id="seguranca">Segurança da informação</h3>
                  <p>
                    Empregamos controles técnicos e organizacionais (criptografia em trânsito, controle de acesso, logs,
                    segregação de ambientes e backups). Em incidentes relevantes, adotaremos medidas e notificaremos quando devido.
                  </p>

                  <h3 id="cookies">Cookies e tecnologias similares</h3>
                  <p>Usamos cookies para funcionalidade, métricas e, se habilitado, marketing. Você pode gerenciá-los no navegador/centro de consentimento.</p>
                  <div class="table-wrap" role="region" aria-label="Tabela de cookies">
                    <table>
                      <thead>
                        <tr>
                          <th>Categoria</th>
                          <th>Exemplos</th>
                          <th>Finalidade</th>
                          <th>Base legal</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Estritamente necessários</td>
                          <td>Sessão, autenticação</td>
                          <td>Login, segurança, estabilidade</td>
                          <td>Execução de contrato</td>
                        </tr>
                        <tr>
                          <td>Analytics</td>
                          <td>Métricas de uso</td>
                          <td>Melhorar experiência e produto</td>
                          <td>Legítimo interesse / Consentimento</td>
                        </tr>
                        <tr>
                          <td>Marketing (opcional)</td>
                          <td>Remarketing, A/B tests</td>
                          <td>Mensagens relevantes</td>
                          <td>Consentimento</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 id="criancas">Crianças e adolescentes</h3>
                  <p>Produto voltado a uso profissional. Não coletamos dados de menores sem representação legal/consentimento específico (art. 14, LGPD).</p>

                  <h3 id="terceiros">Links e integrações de terceiros</h3>
                  <p>Terceiros possuem suas próprias políticas. Recomendamos leitura antes de fornecer dados nesses ambientes.</p>

                  <h3 id="alteracoes">Alterações desta Política</h3>
                  <p>Podemos atualizar esta Política. Publicaremos a nova versão com data de vigência e, quando relevante, notificaremos.</p>

                  <p><em>Última atualização: 11/09/2025.</em></p>
                </section>
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
/* Banner padrão do tema */
.page-banner { background-size: cover; background-position: center; }
.breadcrumb { margin-bottom: 0; }

/* Legibilidade do corpo do texto */
.prose {
  color: #0f172a;
  line-height: 1.75;
  font-size: 1rem;
  max-width: 72ch;        /* largura ótima de leitura */
  margin-inline: auto;    /* centraliza no container */
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

/* Tabela acessível e responsiva */
.table-wrap {
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(2,6,23,0.04);
  margin: 1rem 0 1.5rem;
}
.table-wrap table {
  width: 100%;
  border-collapse: collapse;
  min-width: 640px; /* evita quebrar colunas no mobile */
}
.table-wrap th, .table-wrap td {
  text-align: left;
  padding: 12px 14px;
  border-bottom: 1px solid #f1f5f9;
}
.table-wrap thead th {
  background: #f8fafc;
  font-weight: 700;
}
.table-wrap tbody tr:hover {
  background: #fafafa;
}

/* Melhor contraste de links no texto */
.prose a { color: #4f46e5; text-underline-offset: 2px; }
.prose a:hover { text-decoration: underline; }

/* Mobile */
@media (max-width: 575.98px) {
  .prose { font-size: 0.985rem; padding-inline: 4px; }
}
</style>

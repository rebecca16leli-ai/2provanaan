// ============ NAAN Semijoias — Landing (JS puro) ============
document.addEventListener('DOMContentLoaded', () => {
  /* ---- Header muda de estilo ao rolar ---- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Marquee (tarja de aviso) ---- */
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    const itemHTML = 'Importante: para aprovação, é necessário não possuir restrição no nome.<span class="dot-sep" aria-hidden="true">◆</span>';
    let html = '';
    for (let i = 0; i < 12; i++) html += `<span>${itemHTML}</span>`;
    marqueeTrack.innerHTML = html;
  }

  /* ---- FAQ accordion ---- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    // estado inicial
    answer.style.maxHeight = item.classList.contains('open') ? answer.scrollHeight + 'px' : '0px';
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // fecha todos
      faqItems.forEach((it) => {
        it.classList.remove('open');
        it.querySelector('.faq-a').style.maxHeight = '0px';
      });
      // abre o clicado, se não estava aberto
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---- Campo condicional: nome da consultora ---- */
  const conheceSelect = document.getElementById('conhece');
  const consultoraRow = document.getElementById('consultoraNomeRow');
  if (conheceSelect && consultoraRow) {
    conheceSelect.addEventListener('change', () => {
      consultoraRow.style.display = conheceSelect.value === 'Sim' ? 'grid' : 'none';
    });
  }

  /* ---- Formulário de cadastro ---- */
  const form = document.getElementById('cadastroForm');
  const successBox = document.getElementById('formSuccess');
  const URL_API = 'https://painel.naansemijoias.com.br/api/salvar_cadastro.php';

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const botao = form.querySelector('button[type="submit"]');
      const autorizaCheckbox = form.querySelector('.consent input[type="checkbox"]');

      const dados = {
        nome_completo: form.nome.value,
        cpf: form.cpf.value,
        idade: form.idade.value,
        email: form.email.value,
        whatsapp: form.whats.value,
        cidade_estado: form.cidade.value,
        instagram: form.ig.value,
        endereco_completo: form.endereco.value,
        modalidade_venda: form.modo.value,
        ja_trabalha_semijoias: form.exp.value,
        experiencia_revenda: form.revenda.value,
        conhece_consultora: form.conhece.value,
        nome_consultora: form['consultora-nome'].value,
        informacoes_adicionais: form.info.value,
        autorizou_contato: autorizaCheckbox && autorizaCheckbox.checked ? 1 : 0,
      };

      if (botao) botao.disabled = true;

      try {
        const resposta = await fetch(URL_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados),
        });
        const resultado = await resposta.json();

        if (resultado.sucesso) {
          form.style.display = 'none';
          successBox.style.display = 'block';
        } else {
          alert(resultado.erro || 'Não foi possível enviar. Tente novamente.');
          if (botao) botao.disabled = false;
        }
      } catch (erro) {
        alert('Erro de conexão. Verifique sua internet e tente novamente.');
        if (botao) botao.disabled = false;
      }
    });
  }

  /* ---- Ano no rodapé ---- */
  const footYear = document.getElementById('footYear');
  if (footYear) {
    footYear.textContent = `© ${new Date().getFullYear()} NAAN Semijoias. Todos os direitos reservados.`;
  }
});

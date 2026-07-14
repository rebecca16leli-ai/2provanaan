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
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      // Aqui entra a integração real de envio (endpoint, planilha, CRM, etc.)
      form.style.display = 'none';
      successBox.style.display = 'block';
    });
  }

  /* ---- Ano no rodapé ---- */
  const footYear = document.getElementById('footYear');
  if (footYear) {
    footYear.textContent = `© ${new Date().getFullYear()} NAAN Semijoias. Todos os direitos reservados.`;
  }

});

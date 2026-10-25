/* ==========================================================
   YZA TERAPEUTA · CLIENT INTERACTIVITY SCRIPT
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    mainNav.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 3. Interactive Pain Cards (Click to toggle with live counter feedback)
  const painCards = document.querySelectorAll('.pain-card');
  const painsCounter = document.getElementById('pains-counter');
  const summaryBtn = document.querySelector('.summary-cta-button');

  function updatePainsFeedback() {
    const selectedCards = document.querySelectorAll('.pain-card.selected');
    const count = selectedCards.length;

    if (painsCounter) {
      if (count === 0) {
        painsCounter.innerHTML = '<i class="fa-solid fa-sparkles"></i> <span>Clique nos cards abaixo para identificar seus padrões</span>';
      } else if (count === 1) {
        painsCounter.innerHTML = '<i class="fa-solid fa-check"></i> <strong>1 padrão identificado</strong> · Esse peso pode ser compreendido e curado';
      } else {
        painsCounter.innerHTML = `<i class="fa-solid fa-check-double"></i> <strong>${count} padrões identificados</strong> · Você não precisa carregar essa história sozinha`;
      }
    }

    if (summaryBtn && count > 0) {
      const categories = Array.from(selectedCards).map(c => c.getAttribute('data-category')).join(', ');
      const msg = encodeURIComponent(`Olá Yza! No seu site identifiquei estes padrões: ${categories}. Gostaria de entender como a visão sistêmica pode me ajudar.`);
      summaryBtn.href = `https://wa.me/5548996518182?text=${msg}`;
    }
  }

  painCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      const stateText = card.querySelector('.pill-state-text');
      if (stateText) {
        stateText.textContent = card.classList.contains('selected') ? 'Reconheço' : 'Selecionar';
      }
      updatePainsFeedback();
    });
  });

  // 4. FAQ Accordion
  const faqPanels = document.querySelectorAll('.faq-panel-item');
  faqPanels.forEach(panel => {
    const btn = panel.querySelector('.faq-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = panel.classList.contains('active');

        faqPanels.forEach(other => {
          if (other !== panel) other.classList.remove('active');
        });

        panel.classList.toggle('active', !isActive);
      });
    }
  });

  // 5. WhatsApp Floating Widget
  const waToggle = document.getElementById('wa-toggle-btn');
  const waWindow = document.getElementById('wa-chat-window');
  const waClose = document.getElementById('wa-close-btn');

  if (waToggle && waWindow) {
    waToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      waWindow.classList.toggle('active');
    });

    if (waClose) {
      waClose.addEventListener('click', (e) => {
        e.stopPropagation();
        waWindow.classList.remove('active');
      });
    }

    // Auto-open after 5 seconds once
    setTimeout(() => {
      if (!sessionStorage.getItem('wa_bubble_shown')) {
        waWindow.classList.add('active');
        sessionStorage.setItem('wa_bubble_shown', 'true');
      }
    }, 5000);

    document.addEventListener('click', (e) => {
      if (!waWindow.contains(e.target) && !waToggle.contains(e.target)) {
        waWindow.classList.remove('active');
      }
    });
  }

  // 6. Current Year in Footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 7. Interactive Systemic Mini-Diagnostic ("Qual Lei Está Bloqueando?")
  const diagScores = { ordem: 0, pertencimento: 0, equilibrio: 0 };
  let currentDiagStep = 1;

  const diagSteps = [
    document.getElementById('diag-step-1'),
    document.getElementById('diag-step-2'),
    document.getElementById('diag-step-3')
  ];
  const diagProgressBar = document.getElementById('diag-progress-bar');
  const diagStepCounter = document.getElementById('diag-step-counter');
  const diagProgressWrap = document.getElementById('diag-progress-wrap');
  const diagResultCard = document.getElementById('diag-result-card');
  const diagRestartBtn = document.getElementById('diag-restart-btn');

  const diagData = {
    ordem: {
      title: 'A Lei da Ordem (Hierarquia Familiar)',
      pill: 'DIAGNÓSTICO SISTÊMICO REVELADO',
      icon: 'fa-solid fa-arrow-down-up-across-line',
      lead: 'O seu campo familiar aponta uma inversão de papéis com os pais ou antepassados.',
      explanation: 'Você provavelmente assumiu inconscientemente a postura de "mãe da sua mãe", protetora dos pais ou salvadora da família. Na visão de Bert Hellinger, quem veio antes é maior. Quando uma filha tenta carregar a dor dos pais ou compensar o que eles sofreram, a força para o próprio casamento, carreira e dinheiro se esgota.',
      solution: '"Queridos pais, vocês são os grandes, eu sou a pequena. O destino de vocês eu deixo com vocês com respeito e amor. Olhem com carinho se eu fizer um pouco diferente e for feliz."',
      waMessage: 'Olá Yza! Fiz o mini-diagnóstico no seu site e meu resultado apontou bloqueio na Lei da Ordem (Hierarquia familiar / sobrecarga de salvar os pais). Gostaria de entender como o Grupo Eva ou a Constelação podem me ajudar.'
    },
    pertencimento: {
      title: 'A Lei do Pertencimento (Vínculo & Raízes)',
      pill: 'DIAGNÓSTICO SISTÊMICO REVELADO',
      icon: 'fa-solid fa-circle-nodes',
      lead: 'O seu campo aponta uma lealdade invisível a membros excluídos ou silenciados da família.',
      explanation: 'Quando alguém da árvore genealógica é esquecido, julgado, abortado ou rejeitado, o sistema familiar busca compensação através dos descendentes mais sensíveis. Você pode estar sentindo uma solidão ou um peso inexplicável porque está tentando dar lugar a alguém que ficou no silêncio da sua linhagem.',
      solution: '"Eu vejo você e honro o seu lugar na nossa história. Você pertence à nossa família. Em sua honra, eu escolho viver plenamente."',
      waMessage: 'Olá Yza! Fiz o mini-diagnóstico no seu site e meu resultado apontou a Lei do Pertencimento (Exclusões / Solidão e peso ancestral). Gostaria de agendar uma conversa sobre os atendimentos.'
    },
    equilibrio: {
      title: 'A Lei do Equilíbrio (Dar e Receber)',
      pill: 'DIAGNÓSTICO SISTÊMICO REVELADO',
      icon: 'fa-solid fa-scale-balanced',
      lead: 'O fluxo de troca nos seus relacionamentos e na vida financeira está descompensado.',
      explanation: 'Você tende a se doar em excesso, assumir a responsabilidade pelos outros e ter enorme dificuldade em receber cuidado ou abundância sem sentir culpa. Esse padrão gera dívida emocional nas relações afetivas e bloqueia a permanência do dinheiro, pois você inconscientemente acredita que precisa se sacrificar para merecer o amor.',
      solution: '"Eu me abro para receber com gratidão. Eu mereço o amor, o descanso e a prosperidade na mesma medida em que me doo."',
      waMessage: 'Olá Yza! Fiz o mini-diagnóstico no seu site e meu resultado apontou a Lei do Equilíbrio (Bloqueio no dar e receber / Relações e Dinheiro). Gostaria de entender como destravar esse fluxo.'
    }
  };

  function selectDiagOption(law) {
    if (diagScores[law] !== undefined) {
      diagScores[law]++;
    }

    if (currentDiagStep < 3) {
      if (diagSteps[currentDiagStep - 1]) {
        diagSteps[currentDiagStep - 1].classList.remove('active');
      }
      currentDiagStep++;
      if (diagSteps[currentDiagStep - 1]) {
        diagSteps[currentDiagStep - 1].classList.add('active');
      }
      const progressPercent = currentDiagStep === 2 ? 66.6 : 100;
      if (diagProgressBar) diagProgressBar.style.width = `${progressPercent}%`;
      if (diagStepCounter) diagStepCounter.textContent = `Pergunta ${currentDiagStep} de 3`;
    } else {
      showDiagResult();
    }
  }

  function showDiagResult() {
    let maxScore = -1;
    let winningLaw = 'ordem';
    for (const [law, score] of Object.entries(diagScores)) {
      if (score > maxScore) {
        maxScore = score;
        winningLaw = law;
      }
    }

    const data = diagData[winningLaw] || diagData.ordem;

    diagSteps.forEach(step => { if (step) step.classList.remove('active'); });
    if (diagProgressWrap) diagProgressWrap.style.display = 'none';

    const resIcon = document.getElementById('res-icon');
    const resTitle = document.getElementById('res-title');
    const resPill = document.getElementById('res-pill');
    const resLead = document.getElementById('res-lead');
    const resExplanation = document.getElementById('res-explanation');
    const resSolutionQuote = document.getElementById('res-solution-quote');
    const resWhatsappLink = document.getElementById('res-whatsapp-link');

    if (resIcon) resIcon.className = data.icon;
    if (resTitle) resTitle.textContent = data.title;
    if (resPill) resPill.textContent = data.pill;
    if (resLead) resLead.textContent = data.lead;
    if (resExplanation) resExplanation.textContent = data.explanation;
    if (resSolutionQuote) resSolutionQuote.textContent = data.solution;
    if (resWhatsappLink) {
      const textParam = encodeURIComponent(data.waMessage);
      resWhatsappLink.href = `https://wa.me/5548996518182?text=${textParam}`;
    }

    if (diagResultCard) {
      diagResultCard.style.display = 'block';
      diagResultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function resetDiagnostic() {
    diagScores.ordem = 0;
    diagScores.pertencimento = 0;
    diagScores.equilibrio = 0;
    currentDiagStep = 1;

    if (diagResultCard) diagResultCard.style.display = 'none';
    if (diagProgressWrap) diagProgressWrap.style.display = 'block';
    if (diagProgressBar) diagProgressBar.style.width = '33.3%';
    if (diagStepCounter) diagStepCounter.textContent = 'Pergunta 1 de 3';

    diagSteps.forEach((step, idx) => {
      if (step) {
        if (idx === 0) step.classList.add('active');
        else step.classList.remove('active');
      }
    });

    const box = document.getElementById('diagnostico-sistemico');
    if (box) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.querySelectorAll('.diag-option-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const law = btn.getAttribute('data-law');
      selectDiagOption(law);
    });
  });

  if (diagRestartBtn) {
    diagRestartBtn.addEventListener('click', resetDiagnostic);
  }

  // 6. Interactive 3D Tilt for Eva Narrative Image
  const evaFrame = document.getElementById('eva-visual-frame');
  if (evaFrame && window.matchMedia('(min-width: 1025px)').matches) {
    evaFrame.addEventListener('mousemove', (e) => {
      const rect = evaFrame.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      evaFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    evaFrame.addEventListener('mouseleave', () => {
      evaFrame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      evaFrame.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
    });

    evaFrame.addEventListener('mouseenter', () => {
      evaFrame.style.transition = 'transform 0.1s ease-out';
    });
  }

});

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

  // 7. Interactive Constellation Board with Systemic Figurines
  const tableBoard = document.getElementById('table-field-board');
  const scenarioBtns = document.querySelectorAll('.scenario-btn');
  const btnHarmonize = document.getElementById('btn-harmonize-field');
  const boardEnergySvg = document.getElementById('board-energy-svg');
  const systemicFigurines = document.querySelectorAll('.systemic-figurine');

  const insightStatusBadge = document.getElementById('insight-status-badge');
  const insightFigName = document.getElementById('insight-fig-name');
  const insightTitle = document.getElementById('insight-title');
  const insightDesc = document.getElementById('insight-desc');
  const insightHealingPhrase = document.getElementById('insight-healing-phrase');
  const insightHealingBox = document.getElementById('insight-healing-box');
  const healingTag = document.getElementById('healing-tag');

  const figFather = document.getElementById('fig-father');
  const figMother = document.getElementById('fig-mother');
  const figSelf = document.getElementById('fig-self');
  const figPartner = document.getElementById('fig-partner');
  const figMoney = document.getElementById('fig-money');

  let currentScenarioKey = 'pais';
  let isHarmonized = false;

  const scenariosData = {
    pais: {
      key: 'pais',
      name: 'Inversão com os Pais',
      conflict: {
        status: 'CAMPO COM INVERSÃO DE PAPÉIS',
        statusClass: 'status-warning',
        subName: 'Dinâmica: Hierarquia Familiar',
        title: 'Você no Lugar de Mãe da sua Mãe',
        desc: 'Na visão sistêmica, quem veio antes é maior. Quando a filha se coloca à frente ou acima dos pais tentando salvá-los ou resolver as dores deles, ela perde a força que deveria receber nas suas costas.',
        healingPhrase: '"Queridos pais, tomo a vida que veio através de vocês. Vocês são os grandes, eu sou a pequena. O que é de vocês eu deixo com vocês com respeito e amor."',
        positions: {
          self:    { top: '34%', left: '50%', rot: 180, opacity: 1 },
          mother:  { top: '70%', left: '38%', rot: 0,   opacity: 1 },
          father:  { top: '70%', left: '62%', rot: 0,   opacity: 1 },
          money:   { top: '16%', left: '18%', rot: 0,   opacity: 0.35 },
          partner: { top: '16%', left: '82%', rot: 0,   opacity: 0.35 }
        }
      },
      harmonized: {
        status: '✨ CAMPO HARMONIZADO (ORDEM RESTABELECIDA)',
        statusClass: 'status-success',
        subName: 'Hierarquia Sagrada Restaurada',
        title: 'Os Pais Atrás Abençoando, a Filha Livre para a Vida',
        desc: 'Quando a hierarquia é respeitada, os pais ficam atrás da filha dando sustentação e bênção. A filha fica no seu lugar de pequena, acolhida pelo amor da linhagem e com total força para trilhar o seu próprio destino.',
        healingPhrase: '"Queridos pais, tomo a vida que veio através de vocês. Vocês são os grandes, eu sou a pequena. O que é de vocês eu deixo com vocês com respeito e amor."',
        positions: {
          father:  { top: '76%', left: '38%', rot: 0, opacity: 1 },
          mother:  { top: '76%', left: '62%', rot: 0, opacity: 1 },
          self:    { top: '46%', left: '50%', rot: 0, opacity: 1 },
          partner: { top: '46%', left: '76%', rot: 0, opacity: 0.8 },
          money:   { top: '20%', left: '50%', rot: 0, opacity: 0.8 }
        }
      }
    },
    dinheiro: {
      key: 'dinheiro',
      name: 'Bloqueio no Dinheiro',
      conflict: {
        status: 'LEALDADE INVISÍVEL DE ESCASSEZ',
        statusClass: 'status-warning',
        subName: 'Dinâmica: Prosperidade & Mãe',
        title: 'Distanciamento da Mãe & Freio no Dinheiro',
        desc: 'Bert Hellinger ensina que o dinheiro tem a mesma energia da mãe — quem rejeita, julga ou se ressente da mãe, fecha inconscientemente a porta para receber abundância e prosperidade.',
        healingPhrase: '"Querida mãe, recebo a vida com tudo o que ela traz. Por tudo o que você me deu, já foi o suficiente e muito. Em sua honra, agora me permito prosperar e ser feliz."',
        positions: {
          self:    { top: '52%', left: '68%', rot: -60, opacity: 1 },
          mother:  { top: '68%', left: '26%', rot: 60,  opacity: 1 },
          father:  { top: '78%', left: '50%', rot: 0,   opacity: 0.8 },
          money:   { top: '22%', left: '24%', rot: 180, opacity: 0.35 },
          partner: { top: '32%', left: '86%', rot: 0,   opacity: 0.35 }
        }
      },
      harmonized: {
        status: '✨ CAMPO HARMONIZADO (ORDEM RESTABELECIDA)',
        statusClass: 'status-success',
        subName: 'Fluxo com a Mãe & Prosperidade Liberado',
        title: 'A Mãe no Coração, a Abundância no Caminho',
        desc: 'Ao reconciliar-se com a mãe e acolher a vida pelo preço que custou, a lealdade invisível à escassez se desfaz. A prosperidade e o dinheiro encontram permissão e espaço para fluir.',
        healingPhrase: '"Querida mãe, recebo a vida com tudo o que ela traz. Por tudo o que você me deu, já foi o suficiente e muito. Em sua honra, agora me permito prosperar e ser feliz."',
        positions: {
          father:  { top: '76%', left: '38%', rot: 0, opacity: 0.9 },
          mother:  { top: '76%', left: '62%', rot: 0, opacity: 1 },
          self:    { top: '50%', left: '50%', rot: 0, opacity: 1 },
          money:   { top: '22%', left: '50%', rot: 0, opacity: 1 },
          partner: { top: '50%', left: '76%', rot: 0, opacity: 0.6 }
        }
      }
    },
    amor: {
      key: 'amor',
      name: 'Repetição no Amor',
      conflict: {
        status: 'COBRANÇA & REPETIÇÃO DE CICLOS',
        statusClass: 'status-warning',
        subName: 'Dinâmica: Relações Afetivas',
        title: 'Carência da Criança Cobrada no Parceiro',
        desc: 'Esperar que o parceiro supra o afeto e a validação que faltaram na infância gera cobranças impossíveis. A relação adoece quando a mulher se comporta como filha carente ou como mãe exigente do parceiro.',
        healingPhrase: '"Eu te vejo como meu igual. O que foi nosso eu guardo com carinho; o que não deu certo eu deixo para trás. Eu tomo o meu lugar de mulher e te dou o seu de homem."',
        positions: {
          self:    { top: '48%', left: '36%', rot: 90,  opacity: 1 },
          partner: { top: '48%', left: '66%', rot: -90, opacity: 1 },
          mother:  { top: '76%', left: '32%', rot: 0,   opacity: 0.8 },
          father:  { top: '76%', left: '68%', rot: 0,   opacity: 0.8 },
          money:   { top: '18%', left: '50%', rot: 0,   opacity: 0.4 }
        }
      },
      harmonized: {
        status: '✨ CAMPO HARMONIZADO (ORDEM RESTABELECIDA)',
        statusClass: 'status-success',
        subName: 'Equilíbrio & Reciprocidade no Amor',
        title: 'Amor Maduro: Olhando Juntos na Mesma Direção',
        desc: 'Ao devolver aos pais as carências da infância, a mulher para de projetar no parceiro aquilo que ele não pode dar. Homem e mulher se encontram em perfeita igualdade, respeito e reciprocidade.',
        healingPhrase: '"Eu te vejo como meu igual. O que foi nosso eu guardo com carinho; o que não deu certo eu deixo para trás. Eu tomo o meu lugar de mulher e te dou o seu de homem."',
        positions: {
          father:  { top: '76%', left: '38%', rot: 0, opacity: 0.8 },
          mother:  { top: '76%', left: '62%', rot: 0, opacity: 0.8 },
          self:    { top: '48%', left: '42%', rot: 0, opacity: 1 },
          partner: { top: '48%', left: '58%', rot: 0, opacity: 1 },
          money:   { top: '20%', left: '50%', rot: 0, opacity: 0.7 }
        }
      }
    }
  };

  const figurineMeanings = {
    father: {
      name: 'O Pai no Campo Sistêmico',
      role: 'Elemento: Raiz Masculina',
      desc: 'Representa a força para ir para o mundo, a capacidade de agir, limites claros, segurança e sucesso profissional. Quem toma o pai no coração tem coragem e foco.'
    },
    mother: {
      name: 'A Mãe no Campo Sistêmico',
      role: 'Elemento: Raiz Feminina',
      desc: 'Representa o vínculo primordial com a vida, a saúde, o autocuidado, o acolhimento e o fluxo natural do dinheiro. Tomar a mãe é permitir-se receber nutrição e abundância.'
    },
    self: {
      name: 'Você (A Filha / Lugar Sagrado)',
      role: 'Elemento: O Presente',
      desc: 'O seu verdadeiro lugar na hierarquia familiar é de filha — menor que os pais, livre de tentar salvá-los, aberta para receber o amor que veio antes e transmiti-lo para a própria vida.'
    },
    partner: {
      name: 'O Parceiro no Campo Sistêmico',
      role: 'Elemento: Troca & Amor',
      desc: 'Nas relações de casal, homem e mulher estão no mesmo patamar de igualdade. O amor amadurece quando há equilíbrio entre dar e receber, sem exigir do parceiro o papel de pai ou mãe.'
    },
    money: {
      name: 'A Prosperidade & O Dinheiro',
      role: 'Elemento: Energia de Troca',
      desc: 'O dinheiro ama quem honra a vida como ela é. Ele flui com abundância quando você se reconcilia com a linhagem feminina e aceita o seu merecimento sem sentimento de culpa.'
    }
  };

  function applyPositions(posMap) {
    if (!posMap) return;
    const figElements = {
      self: figSelf,
      father: figFather,
      mother: figMother,
      partner: figPartner,
      money: figMoney
    };

    Object.keys(posMap).forEach(key => {
      const el = figElements[key];
      const p = posMap[key];
      if (el && p) {
        el.style.top = p.top;
        el.style.left = p.left;
        el.style.transform = `translate(-50%, -50%) rotate(${p.rot}deg)`;
        el.style.opacity = p.opacity;
      }
    });
  }

  function renderFieldState(scKey, harmonizedState) {
    const sc = scenariosData[scKey];
    if (!sc) return;

    const data = harmonizedState ? sc.harmonized : sc.conflict;

    if (insightStatusBadge) {
      insightStatusBadge.className = `insight-status-badge ${data.statusClass}`;
      insightStatusBadge.innerHTML = data.statusClass.includes('warning') 
        ? `<i class="fa-solid fa-triangle-exclamation"></i> ${data.status}`
        : `<i class="fa-solid fa-sparkles"></i> ${data.status}`;
    }

    if (insightFigName) insightFigName.textContent = data.subName;
    if (insightTitle) insightTitle.textContent = data.title;
    if (insightDesc) insightDesc.textContent = data.desc;

    if (harmonizedState) {
      if (insightHealingBox) insightHealingBox.classList.add('harmonized');
      if (healingTag) {
        healingTag.className = 'healing-tag revealed';
        healingTag.innerHTML = '<i class="fa-solid fa-quote-left"></i> Frase de Cura Sagrada Liberada:';
      }
      if (insightHealingPhrase) {
        insightHealingPhrase.textContent = data.healingPhrase;
      }
    } else {
      if (insightHealingBox) insightHealingBox.classList.remove('harmonized');
      if (healingTag) {
        healingTag.className = 'healing-tag';
        healingTag.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Frase de Cura Sagrada:';
      }
      if (insightHealingPhrase) {
        insightHealingPhrase.innerHTML = '<span class="healing-placeholder-text"><i class="fa-solid fa-hand-pointer"></i> Clique no botão <strong>Harmonizar Campo</strong> abaixo para reorganizar os bonecos e gerar a frase de cura desta dinâmica.</span>';
      }
    }

    if (boardEnergySvg) {
      if (harmonizedState) boardEnergySvg.classList.add('active');
      else boardEnergySvg.classList.remove('active');
    }

    if (btnHarmonize) {
      if (harmonizedState) {
        btnHarmonize.classList.add('active');
        btnHarmonize.innerHTML = `<i class="fa-solid fa-rotate-left"></i> <span>Ver Padrão com Bloqueio</span>`;
      } else {
        btnHarmonize.classList.remove('active');
        btnHarmonize.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> <span>Harmonizar Campo (Frase de Cura)</span>`;
      }
    }

    applyPositions(data.positions);
  }

  if (scenarioBtns.length > 0) {
    scenarioBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        scenarioBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentScenarioKey = btn.getAttribute('data-scenario') || 'pais';
        isHarmonized = false;
        renderFieldState(currentScenarioKey, false);
      });
    });
  }

  if (btnHarmonize) {
    btnHarmonize.addEventListener('click', () => {
      isHarmonized = !isHarmonized;
      renderFieldState(currentScenarioKey, isHarmonized);
    });
  }

  if (systemicFigurines.length > 0) {
    systemicFigurines.forEach(fig => {
      fig.addEventListener('click', () => {
        systemicFigurines.forEach(f => f.classList.remove('active'));
        fig.classList.add('active');

        const role = fig.getAttribute('data-role');
        const m = figurineMeanings[role];
        if (m) {
          if (insightFigName) insightFigName.textContent = m.role;
          if (insightTitle) insightTitle.textContent = m.name;
          if (insightDesc) insightDesc.textContent = m.desc;
        }
      });
    });
  }
});

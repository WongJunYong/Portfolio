/* ==========================================================================
   WONG JUN YONG — ARCHITECTURAL CANVA PORTFOLIO CONTROLLER
   ========================================================================== */

const MAIN_RESUME = {
  title: 'Wong Jun Yong — Official Curriculum Vitae',
  sub: 'Business Analytics • AI, RAG & Intelligent Automation • Data Analytics & BI',
  filename: 'Wong_Jun_Yong_Resume.pdf',
  pdfPath: 'assets/resumes/Wong_Jun_Yong_Resume.pdf',
  page1Img: 'assets/resumes/Wong_Jun_Yong_Resume_page_1.png',
  page2Img: 'assets/resumes/Wong_Jun_Yong_Resume_page_2.png'
};

const FLOW_STEPS = [
  {
    title: '01. Unstructured Complaint Intake & Parent–Child KB',
    desc: 'Built a parent–child maintenance knowledge base converting unstructured hotel maintenance complaints into structured passages, achieving 100% context reconstruction across 510 retrieval-eligible complaints.'
  },
  {
    title: '02. Hybrid Retrieval & Cross-Encoder Reranking',
    desc: 'Combined dense BGE embeddings with BM25 sparse retrieval, weighted fusion, and cross-encoder reranking—validated on 490 synthetic queries across 98 scenarios with 90.20% post-rerank Hit@5.'
  },
  {
    title: '03. Bounded Generate–Verify–Ground–Repair Loop',
    desc: 'Engineered a bounded Llama 3.1 8B (Groq API) assurance loop with semantic verification, deterministic claim-level grounding, one evidence-constrained repair cycle, and fail-closed controls.'
  },
  {
    title: '04. Deterministic Human-in-the-Loop (HITL) Governance',
    desc: 'Evaluated the complete pipeline on 50 cases: 45 achieved final evidence validity; deterministic governance automatically released 32/45 while retaining human authority for 13/45.'
  },
  {
    title: '05. FastAPI & MySQL Operational Prototype',
    desc: 'Integrated the RAG-LLM pipeline with the SmartOps operational web prototype through FastAPI and MySQL, supporting complaint intake, admin review, technician workflows, and structured API handoff.'
  }
];

const CERTIFICATES_DATA = [
  {
    id: 'cert-champion',
    title: 'Champion — Capstone Showcase 2026',
    tag: '01 / Overall Champion',
    category: 'champion',
    img: 'assets/certificates/01_Champion_Capstone_Showcase_page_1.png',
    pdf: 'assets/certificates/01_Champion_Capstone_Showcase.pdf',
    isChampion: true
  },
  {
    id: 'cert-ai-tech',
    title: 'AI Technology Excellence Award',
    tag: '02 / AI Engineering',
    category: 'ai',
    img: 'assets/certificates/02_AI_Technology_Excellence_Award_page_1.png',
    pdf: 'assets/certificates/02_AI_Technology_Excellence_Award.pdf',
    isChampion: false
  },
  {
    id: 'cert-workflow',
    title: 'Excellence in Integrated AI Workflow Design',
    tag: '03 / AI Workflow Design',
    category: 'ai',
    img: 'assets/certificates/03_Excellence_In_Integrated_AI_Workflow_Design_page_1.png',
    pdf: 'assets/certificates/03_Excellence_In_Integrated_AI_Workflow_Design.pdf',
    isChampion: false
  },
  {
    id: 'cert-ops-ai',
    title: 'Operational Advancement AI Award',
    tag: '04 / Operational AI',
    category: 'ai',
    img: 'assets/certificates/04_Operational_Advancement_AI_Award_page_1.png',
    pdf: 'assets/certificates/04_Operational_Advancement_AI_Award.pdf',
    isChampion: false
  },
  {
    id: 'cert-digital-trans',
    title: 'Business Digital Transformation Award',
    tag: '05 / Digital Transformation',
    category: 'business',
    img: 'assets/certificates/05_Business_Digital_Transformation_Award_page_1.png',
    pdf: 'assets/certificates/05_Business_Digital_Transformation_Award.pdf',
    isChampion: false
  },
  {
    id: 'cert-biz-ex',
    title: 'Business Excellence Award',
    tag: '06 / Business Excellence',
    category: 'business',
    img: 'assets/certificates/06_Business_Excellence_Award_page_1.png',
    pdf: 'assets/certificates/06_Business_Excellence_Award.pdf',
    isChampion: false
  },
  {
    id: 'cert-speaker',
    title: 'Best Speaker Award',
    tag: '07 / Best Speaker',
    category: 'speaker',
    img: 'assets/certificates/07_Best_Speaker_Award_page_1.png',
    pdf: 'assets/certificates/07_Best_Speaker_Award.pdf',
    isChampion: false
  }
];

let currentCvPage = 1;
let currentCertFilter = 'all';
let activeCertModalIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderAwardsGrid();
  setFlowStep(0);
  bindEvents();
});

function setCvPage(pageNum) {
  currentCvPage = pageNum;
  const previewImg = document.getElementById('heroCvPreviewImg');
  if (previewImg) {
    previewImg.src = currentCvPage === 1 ? MAIN_RESUME.page1Img : MAIN_RESUME.page2Img;
  }
  document.querySelectorAll('.cv-tab-btn').forEach(btn => {
    btn.classList.toggle('active', Number(btn.dataset.page) === currentCvPage);
  });
}

function setFlowStep(idx) {
  const item = FLOW_STEPS[idx] || FLOW_STEPS[0];
  document.querySelectorAll('.canva-pipe-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === idx);
  });
  const titleEl = document.getElementById('flowExpTitle');
  const descEl = document.getElementById('flowExpDesc');

  if (titleEl) titleEl.textContent = item.title;
  if (descEl) descEl.textContent = item.desc;
}

function renderAwardsGrid() {
  const grid = document.getElementById('awardsGrid');
  if (!grid) return;

  const list = CERTIFICATES_DATA.filter(c =>
    currentCertFilter === 'all' ? true : c.category === currentCertFilter
  );

  grid.innerHTML = list.map(cert => {
    const idx = CERTIFICATES_DATA.findIndex(x => x.id === cert.id);
    return `
      <article class="cert-canva-card ${cert.isChampion ? 'champion-card' : ''}" data-index="${idx}" tabindex="0" role="button">
        <div class="cert-img-box">
          <img src="${cert.img}" alt="${cert.title}" loading="lazy" />
        </div>
        <span class="cert-tag">${cert.tag}</span>
        <h3 class="cert-name">${cert.title}</h3>
      </article>
    `;
  }).join('');

  grid.querySelectorAll('.cert-canva-card').forEach(card => {
    card.addEventListener('click', () => openCertModal(Number(card.dataset.index)));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCertModal(Number(card.dataset.index));
      }
    });
  });
}

function openCertModal(index) {
  activeCertModalIndex = (index + CERTIFICATES_DATA.length) % CERTIFICATES_DATA.length;
  const cert = CERTIFICATES_DATA[activeCertModalIndex];

  const modal = document.getElementById('viewerModal');
  const titleEl = document.getElementById('modalTitle');
  const subEl = document.getElementById('modalSubtitle');
  const bodyEl = document.getElementById('modalBodyContent');
  const dlBtn = document.getElementById('modalDownloadBtn');
  const navGroup = document.getElementById('modalCertNavGroup');

  titleEl.textContent = cert.title;
  subEl.textContent = `Sunway University Capstone Showcase (11 Aug 2026) • Certificate ${activeCertModalIndex + 1} of 7`;
  dlBtn.href = cert.pdf;
  dlBtn.setAttribute('download', `${cert.title.replace(/[^a-z0-9]/gi, '_')}.pdf`);
  navGroup.style.display = 'inline-flex';

  bodyEl.innerHTML = `<img src="${cert.img}" alt="${cert.title}" />`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openCvReaderModal() {
  const modal = document.getElementById('viewerModal');
  const titleEl = document.getElementById('modalTitle');
  const subEl = document.getElementById('modalSubtitle');
  const bodyEl = document.getElementById('modalBodyContent');
  const dlBtn = document.getElementById('modalDownloadBtn');
  const navGroup = document.getElementById('modalCertNavGroup');

  titleEl.textContent = MAIN_RESUME.title;
  subEl.textContent = `Full 2-Page Resume Preview • ${MAIN_RESUME.filename}`;
  dlBtn.href = MAIN_RESUME.pdfPath;
  dlBtn.setAttribute('download', MAIN_RESUME.filename);
  navGroup.style.display = 'none';

  bodyEl.innerHTML = `
    <img src="${MAIN_RESUME.page1Img}" alt="Wong Jun Yong Resume Page 1" />
    <img src="${MAIN_RESUME.page2Img}" alt="Wong Jun Yong Resume Page 2" />
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('viewerModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function bindEvents() {
  document.querySelectorAll('.cv-tab-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      setCvPage(Number(btn.dataset.page));
    });
  });

  document.getElementById('openCvModalBtn')?.addEventListener('click', openCvReaderModal);
  document.getElementById('cvPaperShowcase')?.addEventListener('click', openCvReaderModal);

  document.getElementById('copyEmailTile')?.addEventListener('click', () => {
    navigator.clipboard.writeText('wongjunyong30@gmail.com').then(() => {
      showToast('Copied email: wongjunyong30@gmail.com');
    });
  });

  document.querySelectorAll('.canva-pipe-btn').forEach((btn, idx) => {
    btn.addEventListener('click', () => setFlowStep(idx));
  });

  document.querySelectorAll('.canva-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCertFilter = btn.dataset.filter;
      document.querySelectorAll('.canva-filter-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.filter === currentCertFilter)
      );
      renderAwardsGrid();
    });
  });

  document.getElementById('modalCloseBtn')?.addEventListener('click', closeModal);
  document.getElementById('viewerModal')?.addEventListener('click', e => {
    if (e.target.id === 'viewerModal') closeModal();
  });
  document.getElementById('modalPrevBtn')?.addEventListener('click', () => openCertModal(activeCertModalIndex - 1));
  document.getElementById('modalNextBtn')?.addEventListener('click', () => openCertModal(activeCertModalIndex + 1));

  document.addEventListener('keydown', e => {
    const modal = document.getElementById('viewerModal');
    if (!modal || !modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    const navVisible = document.getElementById('modalCertNavGroup')?.style.display !== 'none';
    if (navVisible && e.key === 'ArrowLeft') openCertModal(activeCertModalIndex - 1);
    if (navVisible && e.key === 'ArrowRight') openCertModal(activeCertModalIndex + 1);
  });
}

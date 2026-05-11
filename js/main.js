/* ============================================
   MAIN.JS — Portfolio Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar Scroll Effect ----
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---- Active Nav Link Highlighting ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  const highlightNav = () => {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.navbar__link[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // ---- Mobile Menu Toggle ----
  const toggle = document.querySelector('.navbar__toggle');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Scroll-triggered Fade-in Animations ----
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // ---- Smooth scroll for nav links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80; // account for fixed nav
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
  // ---- Portfolio Filter Tabs ----
  const filterBtns = document.querySelectorAll('.portfolio__filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      portfolioCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ---- Project Modal Logic ----
  const projectsData = [
    {
      id: "live-commerce",
      tag: "Live Commerce",
      title: "LIVE STREAMING HOST",
      desc: "Experienced in hosting live streaming sessions for various brands through TikTok and Shopee platforms, focusing on audience engagement, product presentation, and live commerce communication.",
      liveBadge: true,
      views: "12.5K",
      heroImg: "assets/LIVE STREAMING 200M.jpg",
      gridImgs: [
        "assets/LIVE STREAMING ANALYTICS.jpg",
        "assets/LIVE STREAMING_(2).jpg",
        "assets/LIVE STREAMING_(3).jpg",
        "assets/LIVE STREAMING_(4).jpg"
      ],
      stats: [
        { label: "Total GMV", value: "Rp 25.750.000" },
        { label: "Units Sold", value: "1.240" },
        { label: "Total Viewers", value: "12.5K" },
        { label: "Orders", value: "1.032" }
      ],
      roles: [
        "Explaining products and promotions",
        "Supporting sales conversion during live sessions",
        "Maintaining audience retention and interaction",
        "Collaborating with team during campaign events"
      ],
      platforms: [
        "TikTok Live",
        "Shopee Live",
        "Live Commerce",
        "Regular Sessions"
      ],
      achievements: [
        "Event revenue contribution: 150M+",
        "Live sales performance: 10M–30M per session",
        "5–7 hours live streaming daily",
        "Increased followers & customer trust"
      ],
      skills: ["Communication", "Sales", "Audience Engagement", "Product Knowledge", "Confidence", "Adaptability"]
    },
    {
      id: "teaching",
      tag: "Teaching",
      title: "TEACHING & DATA MANAGEMENT",
      desc: "Experienced in teaching beginner coding classes while supporting administrative and operational activities for educational programs.",
      liveBadge: false,
      heroImg: "assets/PORTO TEACHING.jpg",
      gridImgs: [
        "assets/TEACHING(1).jpg",
        "assets/TEACHING(2).jpg",
        "assets/TEACHING_(1).jpg",
        "assets/TEACHING_(2).jpg"
      ],
      stats: [
        { label: "Students Taught", value: "150+" },
        { label: "Classes Managed", value: "50+" },
        { label: "Curriculum Designed", value: "12" },
        { label: "Satisfaction Rate", value: "98%" }
      ],
      roles: [
        "Teaching Robotics, Scratch & Python basic classes",
        "Managing student schedules & reports",
        "Organizing operational and administrative data",
        "Supporting class preparation & learning activities",
        "Assisting finance and reporting documentation"
      ],
      platforms: [
        "Google Sheets",
        "Microsoft Excel",
        "Google Docs",
        "Scratch",
        "Python Basic"
      ],
      achievements: [
        "Assisted teaching activities for multiple students",
        "Supported operational workflow & reporting",
        "Managed scheduling and administrative tasks",
        "Contributed to smooth classroom activities"
      ],
      skills: ["Teaching", "Communication", "Data Management", "Administrative Support", "Time Management", "Attention to Detail"]
    },
    {
      id: "projects",
      tag: "Digital Marketing",
      title: "DIGITAL MARKETING & CONTENT SUPPORT",
      desc: "Assisted digital marketing activities to support audience engagement, program promotion, and online communication.",
      liveBadge: false,
      heroImg: "assets/DIGMAR.jpg",
      gridImgs: [
        "assets/DIGMAR(1).jpg",
        "assets/DIGMAR(2).jpg",
        "assets/DIGMAR(3).jpg",
        "assets/DIGMAR(4).jpg",
        "assets/DIGMAR(5).jpg",
        "assets/DIGMAR(6).jpg",
        "assets/DIGMAR(7).jpg"
      ],
      stats: [
        { label: "Reports Generated", value: "500+" },
        { label: "Data Accuracy", value: "99.9%" },
        { label: "Workflows Optimized", value: "5" },
        { label: "Time Saved", value: "20hrs/wk" }
      ],
      roles: [
        "Supporting promotional activities",
        "Assisting social media communication",
        "Creating content ideas & captions",
        "Helping audience engagement activities",
        "Supporting campaign & event promotion"
      ],
      platforms: [
        "Instagram",
        "TikTok",
        "Canva",
        "Google Sheets"
      ],
      achievements: [
        "Supported program promotion activities",
        "Assisted audience engagement efforts",
        "Contributed to digital communication activities",
        "Supported educational campaign programs"
      ],
      skills: ["Communication", "Audience Engagement", "Creativity", "Digital Communication", "Content Support"]
    }
  ];

  let currentProjectIndex = 0;
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('modal-overlay');

  function renderModal(index) {
    const project = projectsData[index];
    
    // Ensure we don't crash if gridImgs has less than 4
    let gridImgsHtml = project.gridImgs.slice(0, 4).map(img => `<img src="${img}" alt="Thumbnail" loading="lazy">`).join('');
    
    let statsHtml = project.stats.map(stat => `
      <div class="modal__stat-row">
        <span class="modal__stat-label">${stat.label}</span>
        <span class="modal__stat-value">${stat.value}</span>
      </div>
    `).join('');

    let rolesHtml = project.roles.map(role => `
      <li>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
        ${role}
      </li>
    `).join('');

    let platformsHtml = project.platforms.map(plat => `
      <div class="modal__platform-item">
        <div class="modal__platform-icon" style="background: rgba(123, 131, 97, 0.1); color: var(--color-primary)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        </div>
        ${plat}
      </div>
    `).join('');

    let achievementsHtml = project.achievements.map(ach => `
      <li>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
        ${ach}
      </li>
    `).join('');

    let skillsHtml = project.skills.map(skill => `<span class="modal__skill-pill">${skill}</span>`).join('');

    let badgeHtml = project.liveBadge ? `
      <div class="modal__live-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8"/></svg>
        LIVE
      </div>
      <div class="modal__views-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
        ${project.views || '10K+'}
      </div>
    ` : '';

    modalContent.innerHTML = `
      <div class="modal__left">
        <div class="modal__hero-wrapper">
          ${badgeHtml}
          <img src="${project.heroImg}" alt="${project.title}" class="modal__hero-img" loading="lazy">
        </div>
        <div class="modal__grid-imgs" style="grid-template-columns: repeat(${project.gridImgs.length > 0 ? Math.min(project.gridImgs.length, 2) : 1}, 1fr);">
          ${gridImgsHtml}
        </div>
      </div>
      <div class="modal__right">
        <div>
          <span class="modal__tag">${project.tag}</span>
          <h2 class="modal__project-title">${project.title}</h2>
          <p class="modal__desc">${project.desc}</p>
        </div>

        <div class="modal__section">
          <div class="modal__section-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            Roles & Responsibilities
          </div>
          <ul class="modal__list">${rolesHtml}</ul>
        </div>

        <div class="modal__section">
          <div class="modal__section-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            Platform
          </div>
          <div class="modal__platform-grid">${platformsHtml}</div>
        </div>

        <div class="modal__section">
          <div class="modal__section-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            Achievements
          </div>
          <ul class="modal__list">${achievementsHtml}</ul>
        </div>

        <div class="modal__section">
          <div class="modal__section-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            Skills Applied
          </div>
          <div class="modal__skills-wrap">${skillsHtml}</div>
        </div>

        <div class="modal__nav">
          <button class="btn btn--outline" id="modal-prev-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
            Previous
          </button>
          <button class="btn btn--hero-primary" id="modal-next-btn">
            Next Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    `;

    // Reattach event listeners to new buttons
    document.getElementById('modal-prev-btn').addEventListener('click', () => {
      currentProjectIndex = (currentProjectIndex - 1 + projectsData.length) % projectsData.length;
      renderModal(currentProjectIndex);
    });
    document.getElementById('modal-next-btn').addEventListener('click', () => {
      currentProjectIndex = (currentProjectIndex + 1) % projectsData.length;
      renderModal(currentProjectIndex);
    });
  }

  function openModal(index) {
    if(!modal) return;
    currentProjectIndex = index;
    renderModal(index);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if(!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  // Attach to Portfolio Cards
  const viewBtns = document.querySelectorAll('.portfolio-card__link');
  viewBtns.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(idx);
    });
  });

});

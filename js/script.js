document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modular components
  initTheme();
  initCustomCursor();
  initMobileMenu();
  initNavbarScroll();
  initCanvasParticles();
  initScrollSpy();
  initScrollReveal();
  initPortfolio();
  initContactForm();
});

// --- DARK/LIGHT THEME CONTROL ---
function initTheme() {
  const themeToggle = document.querySelector('.theme-toggle-btn');
  if (!themeToggle) return;

  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let targetTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
  });
}

// --- CUSTOM CURSOR SYSTEM ---
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const cursorOutline = document.querySelector('.custom-cursor-outline');
  if (!cursor || !cursorOutline) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Direct movement for standard cursor dot
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  // Smooth lerped animation for the outer ring outline
  function animateOutline() {
    let dx = mouseX - cursorX;
    let dy = mouseY - cursorY;
    
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    
    cursorOutline.style.left = `${cursorX}px`;
    cursorOutline.style.top = `${cursorY}px`;
    
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Hover states for links and interactive triggers
  const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .filter-btn, input, textarea');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('hovering-link');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('hovering-link');
    });
  });
}

// --- MOBILE NAVIGATION BURGER ---
function initMobileMenu() {
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
}

// --- NAVBAR SCROLL & PAGE PROGRESS ---
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const progressBar = document.querySelector('.scroll-progress-bar');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    // Nav bg morph
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll progress bar indicator
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (windowHeight > 0) {
      const scrollPercent = (window.scrollY / windowHeight) * 100;
      if (progressBar) progressBar.style.width = `${scrollPercent}%`;
    }

    // Back to top button visibility
    if (backToTop) {
      if (window.scrollY > 600) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }
  });
}

// --- INTERACTIVE BACKGROUND CANVAS PARTICLES ---
function initCanvasParticles() {
  const canvas = document.getElementById('canvas-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = Math.random() * 0.4 - 0.2;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap boundaries
      if (this.x > width) this.x = 0;
      else if (this.x < 0) this.x = width;
      if (this.y > height) this.y = 0;
      else if (this.y < 0) this.y = height;
    }

    draw() {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      ctx.fillStyle = isDark 
        ? `rgba(136, 175, 155, ${this.opacity})` 
        : `rgba(120, 154, 136, ${this.opacity * 0.4})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Populate particles
  const totalParticles = Math.min(60, Math.floor((width * height) / 25000));
  for (let i = 0; i < totalParticles; i++) {
    particlesArray.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Connect particles with thin lines if close
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const connectionDist = 120;
    
    for (let a = 0; a < particlesArray.length; a++) {
      particlesArray[a].update();
      particlesArray[a].draw();
      
      for (let b = a + 1; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDist) {
          let alpha = (1 - distance / connectionDist) * 0.15;
          ctx.strokeStyle = isDark 
            ? `rgba(136, 175, 155, ${alpha})` 
            : `rgba(120, 154, 136, ${alpha * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// --- SCROLLSPY (ACTIVE NAV STATE) ---
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 150; // offset

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

// --- SCROLL REVEAL & SKILLS MATRIX ANIMATION ---
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const skillBars = document.querySelectorAll('.skill-progress-bar');
  
  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Trigger specific skill progress animation when skill container is revealed
        if (entry.target.classList.contains('skills-container') || entry.target.querySelector('.skill-progress-bar')) {
          animateSkillBars();
        }
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
  
  // Explicitly observe parent of skills just in case
  const skillsContainer = document.querySelector('.skills-container');
  if (skillsContainer) revealObserver.observe(skillsContainer);

  function animateSkillBars() {
    skillBars.forEach(bar => {
      const percent = bar.getAttribute('data-percent');
      bar.style.width = `${percent}%`;
    });
  }
}

// --- PORTFOLIO GALLERY CONTROLLER & MODAL DETAILS ---
const PROJECTS_DATA = {
  1: {
    title: "智能 AI 協同開發代理人平台",
    category: "網頁開發",
    image: "assets/portfolio-1.png",
    tags: ["HTML5", "CSS3", "JavaScript", "Vite", "Prompt Engineering", "OpenAI API"],
    client: "陳志勝獨立軟體開發工作室",
    date: "2025 年 12 月",
    link: "https://example.com/project-ai-agent",
    desc: "這是一個基於提示詞鏈路控制（Prompt Chain Orchestration）的高速程式碼自動生成與部署系統。用戶只需輸入自然語言需求，系統內部的多個 AI 代理人（設計師、架構師、程式編寫員、代碼審查員）便會協同作業，快速生成 100% 語意化且響應式的網頁應用，以 10 倍速率縮短 MVP 開發週期。"
  },
  2: {
    title: "麻將牌局流向與概率決策分析儀表板",
    category: "行動應用",
    image: "assets/portfolio-2.png",
    tags: ["Game Theory", "Probability Algorithms", "Dynamic Programming", "Mobile Design"],
    client: "博弈與決策科學研究會",
    date: "2026 年 2 月",
    link: "https://example.com/project-mahjong-ai",
    desc: "以博弈論與動態規劃為核心的麻將實時輔助決策 App。透過直覺式介面紀錄牌局捨牌，後端算法實時精算牌牆剩餘張數、聽牌路徑與聽牌概率，並針對對手副露進行心理學防守推算，給出全局防守安全牌與進攻路徑的最佳推薦，實現麻將牌局科學化決策。"
  },
  3: {
    title: "演算法與強化學習論文學術識別",
    category: "品牌識別",
    image: "assets/portfolio-3.png",
    tags: ["FCU CS", "Academic Identity", "Reinforcement Learning", "UI/UX Guide"],
    client: "逢甲大學 資訊工程學研究所",
    date: "2024 年 6 月",
    link: "https://example.com/project-thesis",
    desc: "這是陳志勝於逢甲大學資工所攻讀碩士學位期間的學術精華。論文深入探討了基於不確定多變局勢下強化學習策略之決策機制，並將複雜的學術演算法邏輯轉化為精美的學術識別展示系統，兼具高水準學術價值與極簡日系設計質感。"
  }
};

function initPortfolio() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const modal = document.querySelector('.modal');
  const modalClose = document.querySelector('.modal-close-btn');

  if (!portfolioItems.length) return;

  // 1. Grid Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button states
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === itemCategory) {
          item.style.display = 'block';
          // Small animation delay for grid reflow
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 2. Dynamic Modal System
  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const projectId = item.getAttribute('data-id');
      const data = PROJECTS_DATA[projectId];
      if (!data) return;

      // Populate Modal Content
      modal.querySelector('.modal-img-container img').src = data.image;
      modal.querySelector('.modal-category').textContent = data.category;
      modal.querySelector('.modal-title').textContent = data.title;
      modal.querySelector('.modal-body-left p').textContent = data.desc;
      
      // Render Tech Tags
      const tagsContainer = modal.querySelector('.modal-tags');
      tagsContainer.innerHTML = '';
      data.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'modal-tag';
        span.textContent = tag;
        tagsContainer.appendChild(span);
      });

      // Render Info Details
      modal.querySelector('.info-client').textContent = data.client;
      modal.querySelector('.info-date').textContent = data.date;
      modal.querySelector('.info-link').innerHTML = `<a href="${data.link}" target="_blank" rel="noopener noreferrer">點此訪問專案 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>`;

      // Open Modal
      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Lock scrolling
    });
  });

  // Close Modal Events
  if (modalClose && modal) {
    const closeModalFunc = () => {
      modal.classList.remove('show');
      document.body.style.overflow = ''; // Unlock scrolling
    };

    modalClose.addEventListener('click', closeModalFunc);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModalFunc();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) closeModalFunc();
    });
  }
}

// --- INTERACTIVE CONTACT FORM VALIDATION & MOCK SUBMIT ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.querySelector('.contact-toast');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();
    const submitBtn = form.querySelector('.form-submit-btn');

    if (!name || !email || !message) {
      alert('請填寫所有必要欄位！');
      return;
    }

    // Mock loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>發送中...</span> <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`;

    // CSS for spinner rotation injected once
    if (!document.getElementById('spin-keyframes')) {
      const style = document.createElement('style');
      style.id = 'spin-keyframes';
      style.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
      document.head.appendChild(style);
    }

    // Simulate Network Request Delay
    setTimeout(() => {
      // Reset form and state
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      // Show beautiful toast notification
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 4000);
      }
    }, 2000);
  });
}

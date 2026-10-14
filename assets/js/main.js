/**
 * Creative Studio Interactive Engine for Monishka Sonawane's Portfolio
 * Includes Floating Dock Spy, Interactive Resume Sheet, GovSolve Showcase & Event Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initDockScrollSpy();
  initProjectFilter();
  initProjectModal();
  initEventFilter();
  initEventModal();
  initResumeActions();
  initContactForm();
  initCopyEmail();
  initScrollAnimations();
});

/* -------------------------------------------------------------
   1. Dynamic Typewriter Effect
------------------------------------------------------------- */
function initTypewriter() {
  const words = [
    "Computer Engineering Student",
    "Aspiring Software Engineer",
    "Python & AI/ML Enthusiast",
    "GovSolve Citizen Architect",
    "Full-Stack Web Developer",
    "Problem Solver & Technologist"
  ];
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 75;
  const deletingSpeed = 38;
  const pauseTime = 1800;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 350;
    }

    setTimeout(type, speed);
  }

  type();
}

/* -------------------------------------------------------------
   2. Floating macOS Dock & Header Scroll Spy
------------------------------------------------------------- */
function initDockScrollSpy() {
  const dockItems = document.querySelectorAll('.dock-item');
  const sections = document.querySelectorAll('section[id]');
  const mainNav = document.getElementById('main-nav');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    // Header shadow
    if (mainNav) {
      if (window.scrollY > 50) {
        mainNav.classList.add('shadow-2xl', 'bg-[#050811]/95', 'border-slate-800/80');
      } else {
        mainNav.classList.remove('shadow-2xl', 'bg-[#050811]/95', 'border-slate-800/80');
      }
    }

    // Scroll spy for Floating Dock
    let currentId = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    dockItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentId}`) {
        item.classList.add('active');
      }
    });
  });

  // Mobile menu
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
      }
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

/* -------------------------------------------------------------
   3. Interactive Resume Actions (Print & Copy)
------------------------------------------------------------- */
function initResumeActions() {
  const printBtn = document.getElementById('print-resume-btn');
  const copyResumeBtn = document.getElementById('copy-resume-btn');

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (copyResumeBtn) {
    copyResumeBtn.addEventListener('click', () => {
      const resumeSheet = document.getElementById('resume-sheet-content');
      if (!resumeSheet) return;

      const text = resumeSheet.innerText;
      navigator.clipboard.writeText(text).then(() => {
        showToast('Resume content copied to clipboard!');
      }).catch(() => {
        showToast('Use Ctrl+P to save resume as PDF');
      });
    });
  }
}

/* -------------------------------------------------------------
   4. Projects Data & Architecture Modal
------------------------------------------------------------- */
const projectDetailsData = {
  'project-govsolve': {
    title: 'GovSolve Citizen — Civic Issue Resolution & Smart Governance Platform',
    subtitle: 'Flagship Full-Stack Civic Tech & Citizen Grievance Redressal Architecture',
    category: 'Full-Stack / Civic Tech',
    tech: ['Python', 'Django', 'Geolocation API', 'SQLite/PostgreSQL', 'HTML5', 'Tailwind CSS', 'REST APIs'],
    description: `A citizen-centric smart governance platform engineered to streamline reporting, geo-tracking, automated municipal ward dispatching, and transparent tracking of civic issues (infrastructure, road repair, sanitation, and municipal utilities).`,
    highlights: [
      'Interactive citizen complaint submission with automated GPS geolocation tagging and evidence photo upload.',
      'Intelligent department categorization and municipal ward routing to eliminate bureaucratic delays.',
      'Real-time transparent status pipeline (Submitted -> Department Assigned -> Crew Dispatched -> Resolved & Citizen Verified).',
      'Administrative analytics telemetry dashboard monitoring ward resolution turnaround times and citizen satisfaction ratings.',
      'Role-based access control separating Citizens, Municipal Field Engineers, and Department Administrators.'
    ],
    github: 'https://github.com/monishkasonawane',
    demo: '#'
  },
  'project-1': {
    title: 'AI-Based Text Document Categorization',
    subtitle: 'Supervised Machine Learning & Web Classification Engine',
    category: 'Machine Learning',
    tech: ['Python', 'Django', 'Scikit-learn', 'Pandas', 'NumPy', 'SQLite', 'TF-IDF'],
    description: `A full-featured web application engineered to ingest, process, and automatically classify raw text documents into designated categories with high precision using supervised learning techniques.`,
    highlights: [
      'Implemented Multinomial Naïve Bayes classifier paired with TF-IDF feature extraction.',
      'Supports single document analysis as well as bulk ZIP file upload and processing.',
      'Includes confidence-based filtering to flag uncertain classifications for human review.',
      'Integrated SQLite database to log classification history, dataset metrics, and model evaluation telemetry.',
      'Interactive Django administrative dashboard for training data management and report export.'
    ],
    github: 'https://github.com/monishkasonawane',
    demo: '#'
  },
  'project-2': {
    title: 'Nursery Plant Recommendation System',
    subtitle: 'Smart Botanical Matching & Preference Engine',
    category: 'Web Development / AI',
    tech: ['Python', 'Django', 'SQLite', 'HTML5', 'CSS3', 'JavaScript'],
    description: `An intelligent recommendation portal crafted to assist gardening enthusiasts and nursery visitors in selecting ideal plant species tailored to their exact environmental parameters.`,
    highlights: [
      'Multi-variable recommendation algorithm evaluating sunlight availability, watering frequencies, humidity, and maintenance difficulty.',
      'Curated botanical taxonomy covering indoor, outdoor, ornamental, and medicinal plants.',
      'Interactive questionnaire guiding users step-by-step to the best matched botanical options.',
      'Dynamic Django backend with SQLite storage for nursery inventory and user preference profiles.',
      'Responsive, user-friendly UI designed for seamless browsing on mobile, tablet, and desktop.'
    ],
    github: 'https://github.com/monishkasonawane',
    demo: '#'
  },
  'project-3': {
    title: 'Exploratory Data Analysis & Predictive Modeling',
    subtitle: 'Data Science & Statistical Inference Suite',
    category: 'Data Science',
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Jupyter'],
    description: `A data analysis and machine learning experimentation project focused on deep data preprocessing, feature engineering, and evaluating multiple classification algorithms.`,
    highlights: [
      'Rigorous exploratory data analysis (EDA) including missing value imputation, outlier detection, and correlation matrices.',
      'Comparative model benchmarking (Decision Trees, Logistic Regression, Naive Bayes, KNN).',
      'Hyperparameter tuning and cross-validation for enhanced generalization on unseen datasets.',
      'Clear visual reporting of performance metrics including Confusion Matrix, Precision, Recall, and ROC-AUC curves.'
    ],
    github: 'https://github.com/monishkasonawane',
    demo: '#'
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeModalBtn = document.getElementById('modal-close-btn');
  const viewDetailBtns = document.querySelectorAll('.view-project-btn');

  if (!modal) return;

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      const data = projectDetailsData[projId];
      if (!data) return;

      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-subtitle').textContent = data.subtitle;
      document.getElementById('modal-desc').textContent = data.description;
      
      const techContainer = document.getElementById('modal-tech');
      techContainer.innerHTML = '';
      data.tech.forEach(t => {
        const badge = document.createElement('span');
        badge.className = 'tech-capsule bg-sky-500/10 text-sky-300 border-sky-500/30';
        badge.textContent = t;
        techContainer.appendChild(badge);
      });

      const highlightList = document.getElementById('modal-highlights');
      highlightList.innerHTML = '';
      data.highlights.forEach(h => {
        const li = document.createElement('li');
        li.className = 'flex items-start text-sm text-slate-300 gap-2';
        li.innerHTML = `<span class="text-sky-400 mt-1">✦</span><span>${h}</span>`;
        highlightList.appendChild(li);
      });

      const ghLink = document.getElementById('modal-github');
      if (ghLink) ghLink.href = data.github;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* -------------------------------------------------------------
   5. Projects Filter
------------------------------------------------------------- */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-sky-500', 'text-slate-950', 'shadow-sky-500/25');
        b.classList.add('bg-slate-900/80', 'text-slate-300', 'hover:bg-slate-800');
      });
      btn.classList.remove('bg-slate-900/80', 'text-slate-300', 'hover:bg-slate-800');
      btn.classList.add('bg-sky-500', 'text-slate-950', 'shadow-sky-500/25');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || (category && category.includes(filter))) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* -------------------------------------------------------------
   6. Event Gallery Filter & Modal
------------------------------------------------------------- */
function initEventFilter() {
  const eventFilterBtns = document.querySelectorAll('.event-filter-btn');
  const eventCards = document.querySelectorAll('.event-card');

  if (!eventFilterBtns.length) return;

  eventFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      eventFilterBtns.forEach(b => {
        b.classList.remove('bg-sky-500', 'text-slate-950', 'shadow-sky-500/25');
        b.classList.add('bg-slate-900/80', 'text-slate-400', 'hover:bg-slate-800');
      });
      btn.classList.remove('bg-slate-900/80', 'text-slate-400', 'hover:bg-slate-800');
      btn.classList.add('bg-sky-500', 'text-slate-950', 'shadow-sky-500/25');

      const filter = btn.getAttribute('data-event-filter');

      eventCards.forEach(card => {
        const cat = card.getAttribute('data-event-type');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

function initEventModal() {
  const eventModal = document.getElementById('event-modal');
  const closeEventModalBtn = document.getElementById('event-modal-close-btn');
  const eventTriggers = document.querySelectorAll('.view-event-btn');

  if (!eventModal) return;

  eventTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-title') || 'Campus Event / Activity';
      const type = btn.getAttribute('data-type') || 'Activity';
      const desc = btn.getAttribute('data-desc') || 'Participation details awaiting update.';
      const img = btn.getAttribute('data-img') || 'assets/images/event-hackathon.svg';

      document.getElementById('event-modal-title').textContent = title;
      document.getElementById('event-modal-type').textContent = type;
      document.getElementById('event-modal-desc').textContent = desc;
      const modalImg = document.getElementById('event-modal-img');
      if (modalImg) modalImg.src = img;

      eventModal.classList.remove('hidden');
      eventModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeEventModal() {
    eventModal.classList.add('hidden');
    eventModal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }

  if (closeEventModalBtn) closeEventModalBtn.addEventListener('click', closeEventModal);

  eventModal.addEventListener('click', (e) => {
    if (e.target === eventModal) closeEventModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !eventModal.classList.contains('hidden')) {
      closeEventModal();
    }
  });
}

/* -------------------------------------------------------------
   7. Copy Email & Toast
------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailVal = "monishkasonawane@gmail.com";

  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailVal).then(() => {
      showToast('Email copied to clipboard: ' + emailVal);
    }).catch(() => {
      showToast('Contact: ' + emailVal);
    });
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 3200);
}

/* -------------------------------------------------------------
   8. Contact Form Handler
------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg> Sending Message...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `✓ Message Sent Successfully!`;
      submitBtn.classList.remove('bg-sky-500');
      submitBtn.classList.add('bg-emerald-600');

      if (formStatus) {
        formStatus.textContent = "Thank you! Monishka will receive your inquiry and reply promptly.";
        formStatus.className = "text-emerald-400 text-sm mt-3 block";
      }

      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.classList.add('bg-sky-500');
        submitBtn.classList.remove('bg-emerald-600');
        if (formStatus) formStatus.textContent = '';
      }, 5000);
    }, 1200);
  });
}

/* -------------------------------------------------------------
   9. Scroll Reveal Animations
------------------------------------------------------------- */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-8');
    observer.observe(el);
  });
}

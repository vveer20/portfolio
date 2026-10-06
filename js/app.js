/**
 * VISHAL VEER — LEAD GRAPHIC VISUALISER
 * Main Application & Interactive Experience Engine
 */

(function () {
  'use strict';

  // State Management
  const state = {
    currentCompany: null,
    currentClient: null,
    currentGalleryImages: [],
    lightboxIndex: 0,
    touchStartX: 0,
    touchEndX: 0,
    visitedSections: new Set(['profile'])
  };

  let portfolioHistoryDepth = 0;

  // DOM Elements
  const elements = {
    header: document.getElementById('site-header'),
    themeToggle: document.getElementById('theme-toggle'),
    mobileThemeToggle: document.getElementById('mobile-theme-toggle'),
    mobileToggle: document.getElementById('mobile-toggle'),
    mobileDrawer: document.getElementById('mobile-drawer'),
    companiesContainer: document.getElementById('companies-container'),
    toolsContainer: document.getElementById('tools-container'),
    drilldownModal: document.getElementById('drilldown-modal'),
    modalBreadcrumb: document.getElementById('modal-breadcrumb'),
    modalBody: document.getElementById('modal-body-content'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    lightboxModal: document.getElementById('lightbox-modal'),
    lightboxTitle: document.getElementById('lightbox-title'),
    lightboxSubtitle: document.getElementById('lightbox-subtitle'),
    lightboxCounter: document.getElementById('lightbox-counter'),
    lightboxImageContainer: document.getElementById('lightbox-image-container'),
    lightboxPrevBtn: document.getElementById('lightbox-prev-btn'),
    lightboxNextBtn: document.getElementById('lightbox-next-btn'),
    lightboxCloseBtn: document.getElementById('lightbox-close-btn'),
    lightboxContentArea: document.getElementById('lightbox-content-area'),
    quickviewModal: document.getElementById('quickview-modal'),
    quickviewCloseBtn: document.getElementById('quickview-close-btn'),
    currentYear: document.getElementById('current-year'),
    entryExperience: document.getElementById('entry-experience'),
    entrySkipBtn: document.getElementById('entry-skip-btn'),
    entryBottomSkipBtn: document.getElementById('entry-bottom-skip-btn'),
    entryChoiceSkipBtn: document.getElementById('entry-choice-skip-btn'),
    entryBeginBtn: document.getElementById('entry-begin-btn'),
    entryScreen1: document.getElementById('entry-screen-1'),
    entryScreen2: document.getElementById('entry-screen-2'),
    entryChoiceJourney: document.getElementById('entry-choice-journey'),
    entryChoiceWork: document.getElementById('entry-choice-work'),
    entryChoiceQuick: document.getElementById('entry-choice-quick'),
    btnReplayJourney: document.getElementById('btn-replay-journey')
  };

  /* ==========================================================================
     1. INITIALIZATION & DATA RENDERING
     ========================================================================== */
  function init() {
    setupCopyrightYear();
    setupThemeController();
    setupEntryExperience();
    renderPersonalPhotos();
    setupHeroPhotoUpload();
    renderCompanyCards();
    renderTools();
    setupContactLinks();
    setupNavigation();
    setupModals();
    setupKeyboardAndGestures();
  }

  /* ==========================================================================
     0. IMMERSIVE INTERACTIVE ENTRY EXPERIENCE CONTROLLER
     ========================================================================== */
  let recTimer = null;

  function dismissEntryExperience() {
    if (recTimer) {
      clearTimeout(recTimer);
      recTimer = null;
    }

    try {
      sessionStorage.setItem('vv_intro_completed', 'true');
      localStorage.setItem('vv_intro_seen', 'true');
    } catch (e) {}

    if (elements.entryExperience) {
      elements.entryExperience.classList.add('dismissed');
      setTimeout(() => {
        document.documentElement.classList.add('intro-dismissed');
        document.body.classList.remove('entry-active');
      }, 400);
    } else {
      document.documentElement.classList.add('intro-dismissed');
      document.body.classList.remove('entry-active');
    }
  }

  function openEntryExperience() {
    if (recTimer) {
      clearTimeout(recTimer);
      recTimer = null;
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.classList.remove('intro-dismissed');
    document.body.classList.add('entry-active');

    if (elements.entryExperience) {
      elements.entryExperience.classList.remove('dismissed');
    }

    // Reset screens to Screen 01 active
    if (elements.entryScreen1) {
      elements.entryScreen1.classList.remove('fading-out');
      elements.entryScreen1.classList.add('active');

      // Re-trigger staggered CSS animations cleanly
      const animItems = elements.entryScreen1.querySelectorAll('.entry-anim-item');
      animItems.forEach((el) => {
        el.style.animation = 'none';
        void el.offsetHeight;
        el.style.animation = '';
      });
    }

    if (elements.entryScreen2) {
      elements.entryScreen2.classList.remove('active', 'fading-out');
    }

    if (elements.entryChoiceJourney) {
      elements.entryChoiceJourney.classList.remove('recommended');
    }
  }

  window.openEntryExperience = openEntryExperience;
  window.dismissEntryExperience = dismissEntryExperience;

  function setupEntryExperience() {
    if (!elements.entryExperience) return;

    // Check if returning visitor in session or previously seen
    let isDismissed = false;
    try {
      isDismissed =
        sessionStorage.getItem('vv_intro_completed') === 'true' ||
        localStorage.getItem('vv_intro_seen') === 'true';
    } catch (e) {
      isDismissed = false;
    }

    if (isDismissed) {
      document.documentElement.classList.add('intro-dismissed');
      elements.entryExperience.classList.add('dismissed');
      document.body.classList.remove('entry-active');
    } else {
      document.documentElement.classList.remove('intro-dismissed');
      elements.entryExperience.classList.remove('dismissed');
      document.body.classList.add('entry-active');
    }

    // Screen 01: "BEGIN THE JOURNEY" Button -> Transitions to Screen 02
    if (elements.entryBeginBtn) {
      const startScreen2 = (e) => {
        if (e) e.preventDefault();
        if (elements.entryScreen1) {
          elements.entryScreen1.classList.add('fading-out');
        }

        setTimeout(() => {
          if (elements.entryScreen1) {
            elements.entryScreen1.classList.remove('active', 'fading-out');
          }
          if (elements.entryScreen2) {
            elements.entryScreen2.classList.add('active');

            // 8-second recommendation gentle pulse timer
            if (recTimer) clearTimeout(recTimer);
            recTimer = setTimeout(() => {
              if (
                elements.entryChoiceJourney &&
                elements.entryScreen2.classList.contains('active') &&
                !elements.entryExperience.classList.contains('dismissed')
              ) {
                elements.entryChoiceJourney.classList.add('recommended');
              }
            }, 8000);
          }
        }, 280);
      };

      elements.entryBeginBtn.addEventListener('click', startScreen2);
      elements.entryBeginBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          startScreen2(e);
        }
      });
    }

    // Skip Buttons (Top bar, Screen 1 subtle, Screen 2 subtle)
    const skipButtons = [
      elements.entrySkipBtn,
      elements.entryBottomSkipBtn,
      elements.entryChoiceSkipBtn
    ].filter(Boolean);

    skipButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (e) e.preventDefault();
        dismissEntryExperience();
      });
    });

    // Screen 02 Choice Cards
    // Choice 01: MY JOURNEY -> Dismiss + Scroll to #experience with accent pulse
    if (elements.entryChoiceJourney) {
      const handleJourneyChoice = (e) => {
        if (e) e.preventDefault();
        dismissEntryExperience();

        const expSection = document.getElementById('experience');
        if (expSection) {
          setTimeout(() => {
            expSection.scrollIntoView({ behavior: 'smooth' });
            expSection.classList.remove('section-highlight-pulse');
            void expSection.offsetWidth;
            expSection.classList.add('section-highlight-pulse');
            setTimeout(() => {
              expSection.classList.remove('section-highlight-pulse');
            }, 1500);

            if (typeof markSectionVisited === 'function') {
              markSectionVisited('experience');
            }
          }, 150);
        }
      };

      elements.entryChoiceJourney.addEventListener('click', handleJourneyChoice);
      elements.entryChoiceJourney.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleJourneyChoice(e);
        }
      });
    }

    // Choice 02: MY WORK -> Dismiss + openClientsShortcut()
    if (elements.entryChoiceWork) {
      const handleWorkChoice = (e) => {
        if (e) e.preventDefault();
        dismissEntryExperience();
        setTimeout(() => {
          if (typeof window.openClientsShortcut === 'function') {
            window.openClientsShortcut(e);
          }
          if (typeof markSectionVisited === 'function') {
            markSectionVisited('experience');
          }
        }, 150);
      };

      elements.entryChoiceWork.addEventListener('click', handleWorkChoice);
      elements.entryChoiceWork.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleWorkChoice(e);
        }
      });
    }

    // Choice 03: QUICK PROFILE -> Dismiss + openQuickViewModal()
    if (elements.entryChoiceQuick) {
      const handleQuickChoice = (e) => {
        if (e) e.preventDefault();
        dismissEntryExperience();
        setTimeout(() => {
          if (typeof window.openQuickViewModal === 'function') {
            window.openQuickViewModal(e);
          }
        }, 150);
      };

      elements.entryChoiceQuick.addEventListener('click', handleQuickChoice);
      elements.entryChoiceQuick.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleQuickChoice(e);
        }
      });
    }

    // Footer Replay Journey Button
    if (elements.btnReplayJourney) {
      elements.btnReplayJourney.addEventListener('click', (e) => {
        if (e) e.preventDefault();
        openEntryExperience();
      });
    }
  }

  // Setup Dark / Light Theme Controller
  function setupThemeController() {
    const toggles = [elements.themeToggle, elements.mobileThemeToggle].filter(Boolean);

    function getActiveTheme() {
      return document.documentElement.getAttribute('data-theme') || 'dark';
    }

    function updateToggleState(theme) {
      const isDark = theme === 'dark';
      const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
      toggles.forEach((btn) => {
        btn.setAttribute('aria-label', label);
        btn.setAttribute('title', label);
      });
    }

    function setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      try {
        localStorage.setItem('vv_theme', theme);
      } catch (e) {
        // Graceful fallback if storage restricted
      }
      updateToggleState(theme);
    }

    // Set initial aria-label based on current active theme
    updateToggleState(getActiveTheme());

    // Bind click handlers to all theme buttons (desktop header & mobile drawer)
    toggles.forEach((btn) => {
      btn.addEventListener('click', () => {
        const current = getActiveTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
      });
    });

    // Listen for OS system theme changes
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        try {
          const saved = localStorage.getItem('vv_theme');
          if (!saved) {
            setTheme(e.matches ? 'dark' : 'light');
          }
        } catch (err) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      });
    } catch (e) {
      // Ignore in older environments
    }
  }

  // Set Current Year in Footer
  function setupCopyrightYear() {
    if (elements.currentYear) {
      elements.currentYear.textContent = new Date().getFullYear();
    }
  }

  // Render Personal Photography Slots
  function renderPersonalPhotos() {
    const photos = PORTFOLIO_DATA.profile.photos;

    // Helper to render photo frame content
    function updatePhotoFrame(frameId, photoData) {
      const frame = document.getElementById(frameId);
      if (!frame || !photoData) return;

      if (photoData.src) {
        frame.style.padding = '0';
        frame.innerHTML = `
          <img src="${photoData.src}" alt="${photoData.alt}" loading="eager" class="hero-profile-img" style="width: 100%; height: 100%; object-fit: contain; object-position: center; border-radius: inherit; display: block; background: transparent;">
        `;
      } else {
        // Keep editorial placeholder with custom label
        const badge = frame.querySelector('.placeholder-badge, .profile-upload-badge');
        if (badge && photoData.placeholderLabel) {
          badge.textContent = photoData.placeholderLabel;
        }
      }
    }

    // Primary Profile Photo (Intended single portrait on website)
    updatePhotoFrame('hero-photo-frame', photos.hero);
  }

  // Profile Photo Upload / Select Handler (Supports transparent PNG selection)
  function setupHeroPhotoUpload() {
    const frame = document.getElementById('hero-photo-frame');
    const input = document.getElementById('hero-photo-input');
    if (!frame || !input) return;

    frame.addEventListener('click', () => {
      input.click();
    });

    frame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        input.click();
      }
    });

    input.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        const frameEl = document.getElementById('hero-photo-frame');
        if (frameEl) {
          frameEl.style.padding = '0';
          frameEl.innerHTML = `
            <img src="${dataUrl}" alt="Vishal Veer — Lead Graphic Visualiser" loading="eager" class="hero-profile-img" style="width: 100%; height: 100%; object-fit: contain; object-position: center; border-radius: inherit; display: block; background: transparent;">
          `;
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // Render Creative Journey Vertical Timeline (Ultra-compact: ~110–140px natural desktop height)
  function renderCompanyCards() {
    if (!elements.companiesContainer) return;
    elements.companiesContainer.innerHTML = '';

    PORTFOLIO_DATA.companies.forEach((company, index) => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.setAttribute('data-company-id', company.id);

      const sequence = company.number || String(index + 1).padStart(2, '0');
      const hasWork = company.hasWork !== false;
      const buttonLabel = company.buttonText || 'VIEW WORK';

      const actionMarkup = hasWork
        ? `
          <div class="timeline-card-action">
            <button class="btn btn-timeline-view" type="button" tabindex="-1" aria-hidden="true">
              <span>${buttonLabel}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        `
        : '';

      const cardClasses = hasWork ? 'timeline-card' : 'timeline-card timeline-card-static';
      const cardAccessibility = hasWork
        ? `tabindex="0" role="button" aria-label="Explore ${company.name} — ${company.role}"`
        : `aria-label="${company.name} — ${company.role}"`;

      item.innerHTML = `
        <!-- Circular Milestone Indicator on Left Spine -->
        <div class="timeline-milestone" aria-hidden="true">
          <div class="milestone-indicator">
            <span class="milestone-num">${sequence}</span>
          </div>
        </div>

        <!-- Ultra-compact Timeline Card (~110-140px: number left, info center, button right) -->
        <article class="${cardClasses}" ${cardAccessibility}>
          <div class="timeline-card-num">${sequence}</div>

          <div class="timeline-card-main">
            <div class="timeline-title-row">
              <h3 class="timeline-company-name">${company.name}</h3>
              ${company.isCurrent ? '<span class="company-status-badge">Present Role</span>' : ''}
              <span class="timeline-duration">${company.duration}</span>
            </div>
            <div class="timeline-role">${company.role}</div>
            <p class="timeline-summary">${company.summary}</p>
          </div>

          ${actionMarkup}
        </article>
      `;

      // Event listener on timeline card to trigger drilldown only when work exists
      if (hasWork) {
        const card = item.querySelector('.timeline-card');
        card.addEventListener('click', () => openCompanyModal(company.id));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openCompanyModal(company.id);
          }
        });
      }

      elements.companiesContainer.appendChild(item);
    });
  }

  // Helper: Vector Icons for Tools
  function getToolIconSvg(id) {
    switch (id) {
      case 'photoshop':
        return `
          <svg class="tool-icon-svg" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect width="40" height="40" rx="8" fill="#001E36"/>
            <path d="M12 28V12h6.2c1.9 0 3.3.4 4.2 1.3.9.9 1.4 2.1 1.4 3.7 0 1.6-.5 2.8-1.4 3.7-.9.9-2.3 1.3-4.2 1.3H15.2V28H12zm3.2-8.5h2.8c.9 0 1.6-.2 2.1-.7.5-.5.7-1.2.7-2s-.2-1.5-.7-2c-.5-.5-1.2-.7-2.1-.7h-2.8v5.4z" fill="#31A8FF"/>
            <path d="M24 23.5c.6.6 1.3 1 2.2 1.3.9.3 1.7.5 2.5.5 1.1 0 1.9-.2 2.4-.7.5-.5.8-1.1.8-1.8 0-.6-.2-1.1-.6-1.5-.4-.4-1.2-.8-2.4-1.2-1.5-.5-2.6-1.1-3.3-1.8-.7-.7-1-1.6-1-2.8 0-1.5.5-2.6 1.6-3.5 1.1-.9 2.5-1.3 4.4-1.3 1 0 1.9.2 2.8.5.9.3 1.6.8 2.2 1.4l-1.8 2.2c-1-.8-2-1.3-3.2-1.3-1 0-1.7.2-2.1.7-.4.5-.6 1-.6 1.6 0 .5.2 1 .6 1.3.4.4 1.2.7 2.3 1.1 1.6.5 2.7 1.1 3.4 1.8.7.7 1.1 1.6 1.1 2.8 0 1.5-.5 2.7-1.6 3.6-1.1.9-2.6 1.4-4.5 1.4-1.2 0-2.3-.2-3.3-.6-1-.4-1.9-1-2.7-1.8l1.7-2.3z" fill="#31A8FF"/>
          </svg>
        `;
      case 'illustrator':
        return `
          <svg class="tool-icon-svg" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect width="40" height="40" rx="8" fill="#330000"/>
            <path d="M18.8 28l-1.5-4.5h-5.9L9.9 28H6.5L13.1 12h3.4L23.1 28h-4.3zm-2.4-7.8l-2-6-2 6h4z" fill="#FF9A00"/>
            <path d="M26.2 14.5c0-.6.2-1.1.6-1.5.4-.4 1-.6 1.6-.6s1.2.2 1.6.6c.4.4.6.9.6 1.5s-.2 1.1-.6 1.5c-.4.4-1 .6-1.6.6s-1.2-.2-1.6-.6c-.4-.4-.6-.9-.6-1.5zm.3 13.5V18h3.3v10h-3.3z" fill="#FF9A00"/>
          </svg>
        `;
      case 'premiere':
        return `
          <svg class="tool-icon-svg" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect width="40" height="40" rx="8" fill="#00005B"/>
            <path d="M12 28V12h6.2c1.9 0 3.3.4 4.2 1.3.9.9 1.4 2.1 1.4 3.7 0 1.6-.5 2.8-1.4 3.7-.9.9-2.3 1.3-4.2 1.3H15.2V28H12zm3.2-8.5h2.8c.9 0 1.6-.2 2.1-.7.5-.5.7-1.2.7-2s-.2-1.5-.7-2c-.5-.5-1.2-.7-2.1-.7h-2.8v5.4z" fill="#9999FF"/>
            <path d="M24.5 28V17.8h3.1v1.8c.5-.7 1-1.2 1.6-1.5.6-.3 1.3-.5 2.1-.5.5 0 .9.1 1.3.2l-.6 3c-.4-.1-.8-.2-1.3-.2-.9 0-1.7.3-2.2 1-.5.7-.8 1.6-.8 2.8V28h-3.2z" fill="#9999FF"/>
          </svg>
        `;
      case 'canva':
        return `
          <svg class="tool-icon-svg" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect width="40" height="40" rx="8" fill="#00C4CC"/>
            <path d="M25 15.5c-1.2-1-2.8-1.5-4.7-1.5-2.3 0-4.1.8-5.5 2.3-1.4 1.5-2.1 3.5-2.1 6s.7 4.5 2.1 6c1.4 1.5 3.2 2.3 5.5 2.3 1.9 0 3.5-.5 4.8-1.6l-1.5-2.2c-.9.8-2 1.2-3.3 1.2-1.4 0-2.5-.5-3.4-1.5-.9-1-1.3-2.4-1.3-4.2s.4-3.2 1.3-4.2c.9-1 2-1.5 3.4-1.5 1.3 0 2.4.4 3.2 1.1l1.5-2.2z" fill="#FFFFFF"/>
          </svg>
        `;
      case 'powerpoint':
        return `
          <svg class="tool-icon-svg" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect width="40" height="40" rx="8" fill="#D24726"/>
            <path d="M14 28V12h7c2 0 3.6.5 4.6 1.4 1 1 1.6 2.3 1.6 4 0 1.7-.5 3-1.6 4-1 1-2.6 1.5-4.6 1.5H17.5V28H14zm3.5-9.4h3.3c1 0 1.8-.2 2.3-.7.5-.5.8-1.2.8-2.1 0-.9-.3-1.6-.8-2.1-.5-.5-1.3-.7-2.3-.7h-3.3v5.6z" fill="#FFFFFF"/>
          </svg>
        `;
      case 'figma':
        return `
          <svg class="tool-icon-svg" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect width="40" height="40" rx="8" fill="#1E1E1E"/>
            <path d="M15 11h5v5h-5a2.5 2.5 0 0 1 0-5z" fill="#F24E1E"/>
            <path d="M20 11h5a2.5 2.5 0 0 1 0 5h-5v-5z" fill="#FF7262"/>
            <path d="M15 16h5v5h-5a2.5 2.5 0 0 1 0-5z" fill="#A259FF"/>
            <path d="M20 16h5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1-2.5 2.5h-2.5v-7.5z" fill="#1ABCFE"/>
            <path d="M15 21h5v5a2.5 2.5 0 0 1-5 0v-5z" fill="#0ACF83"/>
          </svg>
        `;
      default:
        return '';
    }
  }

  // Render Tools & Software Proficiency Grid
  function renderTools() {
    if (!elements.toolsContainer) return;
    elements.toolsContainer.innerHTML = '';

    PORTFOLIO_DATA.tools.forEach((tool) => {
      const card = document.createElement('div');
      card.className = 'tool-proficiency-card';
      card.setAttribute('data-tool-id', tool.id);

      let iconMarkup = '';
      if (tool.icon) {
        iconMarkup = `<img src="${encodeURI(tool.icon)}" alt="${tool.name} Logo" class="tool-icon-img" width="44" height="44" loading="lazy">`;
      } else {
        iconMarkup = getToolIconSvg(tool.id);
      }

      card.innerHTML = `
        <div class="tool-card-main">
          <div class="tool-icon-frame" aria-hidden="true">
            ${iconMarkup}
          </div>
          <div class="tool-content">
            <div class="tool-header-row">
              <h3 class="tool-name">${tool.name}</h3>
              <div class="tool-percentage-wrap">
                <span class="tool-percentage" data-target="${tool.percentage}">0%</span>
              </div>
            </div>
            <p class="tool-description">${tool.disciplines}</p>
          </div>
        </div>
        <div class="tool-progress-track" role="progressbar" aria-valuenow="${tool.percentage}" aria-valuemin="0" aria-valuemax="100" aria-label="${tool.name} proficiency: ${tool.percentage}%">
          <div class="tool-progress-fill" style="width: 0%;" data-target="${tool.percentage}"></div>
        </div>
      `;
      elements.toolsContainer.appendChild(card);
    });

    setupToolsScrollAnimation();
  }

  // Animate Tools Progress & Number Counter on Viewport Entry
  function setupToolsScrollAnimation() {
    if (!elements.toolsContainer) return;

    const cards = elements.toolsContainer.querySelectorAll('.tool-proficiency-card');
    if (!cards.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animateTools = () => {
      cards.forEach((card, index) => {
        const fill = card.querySelector('.tool-progress-fill');
        const percentageEl = card.querySelector('.tool-percentage');
        if (!fill || !percentageEl) return;

        const target = parseInt(percentageEl.getAttribute('data-target'), 10) || 0;

        if (prefersReducedMotion) {
          fill.style.width = target + '%';
          percentageEl.textContent = target + '%';
          return;
        }

        const staggerDelay = index * 70;
        setTimeout(() => {
          fill.style.width = target + '%';

          const duration = 1000;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Cubic ease-out
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(easeOut * target);

            percentageEl.textContent = currentVal + '%';

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              percentageEl.textContent = target + '%';
            }
          }

          requestAnimationFrame(updateCounter);
        }, staggerDelay);
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateTools();
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
      });

      observer.observe(elements.toolsContainer);
    } else {
      animateTools();
    }
  }



  // Setup Contact Links from Central Data
  function setupContactLinks() {
    const contact = PORTFOLIO_DATA.profile.contact;

    const emailLinks = [
      document.getElementById('header-email-btn'),
      document.getElementById('contact-email-icon'),
      document.getElementById('contact-email-link'),
      document.getElementById('btn-email-me')
    ];
    emailLinks.forEach((link) => {
      if (link) {
        link.href = `mailto:${contact.email}`;
      }
    });

    const linkedinLinks = [
      document.getElementById('header-linkedin-btn'),
      document.getElementById('contact-linkedin-icon'),
      document.getElementById('contact-linkedin-link'),
      document.getElementById('btn-linkedin-me'),
      document.getElementById('qv-linkedin-link')
    ];
    linkedinLinks.forEach((link) => {
      if (link) {
        link.href = contact.linkedin;
      }
    });

    // LinkedIn Card-level click target
    const linkedinCard = document.getElementById('card-linkedin');
    if (linkedinCard && !linkedinCard.dataset.wired) {
      linkedinCard.dataset.wired = 'true';
      linkedinCard.style.cursor = 'pointer';
      linkedinCard.addEventListener('click', (e) => {
        if (!e.target.closest('a')) {
          window.open(contact.linkedin, '_blank', 'noopener,noreferrer');
        }
      });
    }

    const phoneClean = contact.phone.replace(/[^+\d]/g, '');
    const phoneLinks = [
      document.getElementById('header-phone-btn'),
      document.getElementById('contact-phone-icon'),
      document.getElementById('contact-phone-link'),
      document.getElementById('btn-call-me')
    ];
    phoneLinks.forEach((link) => {
      if (link) {
        link.href = `tel:${phoneClean}`;
      }
    });

    const waLink = document.getElementById('contact-whatsapp-icon');
    if (waLink) {
      const waNumber = contact.phone.replace(/[^\d]/g, '');
      waLink.href = `https://wa.me/${waNumber}`;
    }
  }

  /* ==========================================================================
     2. NAVIGATION & SCROLL MANAGEMENT
     ========================================================================== */
  function setupNavigation() {
    // Header Scroll Shadow
    window.addEventListener('scroll', () => {
      if (window.scrollY > 24) {
        elements.header.classList.add('scrolled');
      } else {
        elements.header.classList.remove('scrolled');
      }
      highlightActiveSection();
    }, { passive: true });

    // Mobile Hamburger Toggle
    if (elements.mobileToggle && elements.mobileDrawer) {
      elements.mobileToggle.addEventListener('click', () => {
        const isOpen = elements.mobileDrawer.classList.toggle('open');
        elements.mobileToggle.classList.toggle('active', isOpen);
        elements.mobileToggle.setAttribute('aria-expanded', isOpen);
        elements.mobileDrawer.setAttribute('aria-hidden', !isOpen);
      });

      // Close drawer when clicking any nav link
      const mobileNavLinks = elements.mobileDrawer.querySelectorAll('.mobile-nav-link');
      mobileNavLinks.forEach((link) => {
        link.addEventListener('click', () => {
          elements.mobileDrawer.classList.remove('open');
          elements.mobileToggle.classList.remove('active');
          elements.mobileToggle.setAttribute('aria-expanded', 'false');
          elements.mobileDrawer.setAttribute('aria-hidden', 'true');
        });
      });
    }
  }

  // Highlight Active Nav Link
  function highlightActiveSection() {
    const sections = document.querySelectorAll('main section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`.site-nav a[href="#${id}"]`);

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.site-nav .nav-link').forEach((l) => l.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }

  // Quick shortcut for "Clients" navigation:
  // Opens the primary enterprise client exploration flow (EduRiser)
  window.openClientsShortcut = function (e) {
    if (e) e.preventDefault();
    if (elements.mobileDrawer && elements.mobileDrawer.classList.contains('open')) {
      elements.mobileDrawer.classList.remove('open');
      if (elements.mobileToggle) {
        elements.mobileToggle.classList.remove('active');
        elements.mobileToggle.setAttribute('aria-expanded', 'false');
      }
      elements.mobileDrawer.setAttribute('aria-hidden', 'true');
    }
    openCompanyModal('eduriser');
  };

  /* ==========================================================================
     3. INTERACTIVE DRILL-DOWN MODAL LOGIC (COMPANY -> CLIENT -> WORK)
     ========================================================================== */
  function setupModals() {
    // Browser History popstate listener
    window.addEventListener('popstate', (e) => {
      handlePopState(e.state);
    });

    // Handle initial state if page is refreshed inside a modal
    if (window.history.state && window.history.state.vvPortfolio) {
      dismissEntryExperience();
      handlePopState(window.history.state);
    }

    // Close Drilldown Modal
    if (elements.modalCloseBtn) {
      elements.modalCloseBtn.addEventListener('click', () => closeDrilldownModal());
    }

    if (elements.drilldownModal) {
      elements.drilldownModal.addEventListener('click', (e) => {
        if (e.target === elements.drilldownModal || e.target.classList.contains('modal-viewport')) {
          closeDrilldownModal();
        }
      });
    }

    // Close Quick View Modal
    if (elements.quickviewCloseBtn) {
      elements.quickviewCloseBtn.addEventListener('click', closeQuickViewModal);
    }

    if (elements.quickviewModal) {
      elements.quickviewModal.addEventListener('click', (e) => {
        if (e.target === elements.quickviewModal || e.target.classList.contains('quickview-viewport')) {
          closeQuickViewModal();
        }
      });
    }

    const qvExploreBtn = document.getElementById('qv-explore-btn');
    if (qvExploreBtn) {
      qvExploreBtn.addEventListener('click', () => {
        closeQuickViewModal();
        const exp = document.getElementById('experience');
        if (exp) {
          exp.scrollIntoView({ behavior: 'smooth' });
          markSectionVisited('experience');
        }
      });
    }

    // Close Lightbox
    if (elements.lightboxCloseBtn) {
      elements.lightboxCloseBtn.addEventListener('click', closeLightbox);
    }

    // Lightbox Prev/Next
    if (elements.lightboxPrevBtn) {
      elements.lightboxPrevBtn.addEventListener('click', navigateLightboxPrev);
    }
    if (elements.lightboxNextBtn) {
      elements.lightboxNextBtn.addEventListener('click', navigateLightboxNext);
    }
  }

  // Open Quick View Recruiter Modal
  window.openQuickViewModal = function (e) {
    if (e) e.preventDefault();
    if (elements.mobileDrawer && elements.mobileDrawer.classList.contains('open')) {
      elements.mobileDrawer.classList.remove('open');
      if (elements.mobileToggle) {
        elements.mobileToggle.classList.remove('active');
        elements.mobileToggle.setAttribute('aria-expanded', 'false');
      }
      elements.mobileDrawer.setAttribute('aria-hidden', 'true');
    }
    if (elements.quickviewModal) {
      elements.quickviewModal.classList.add('active');
      elements.quickviewModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      setTimeout(() => {
        if (elements.quickviewCloseBtn) elements.quickviewCloseBtn.focus();
      }, 100);
    }
  };

  // Close Quick View Modal
  window.closeQuickViewModal = function () {
    if (elements.quickviewModal) {
      elements.quickviewModal.classList.remove('active');
      elements.quickviewModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }
  };

  // Open Company Modal
  function openCompanyModal(companyId, options = {}) {
    const company = PORTFOLIO_DATA.companies.find((c) => c.id === companyId);
    if (!company) return;

    state.currentCompany = company;
    state.currentClient = null;

    if (typeof markSectionVisited === 'function') {
      markSectionVisited('experience');
      if (company.clients && company.clients.length > 0) {
        markSectionVisited('clients');
      }
    }

    if (!options.fromHistory) {
      history.pushState(
        {
          vvPortfolio: {
            level: 'company',
            companyId: company.id
          }
        },
        ''
      );
      portfolioHistoryDepth = 1;
    }

    renderCompanyOverview(company, { fromHistory: true });
    elements.drilldownModal.classList.add('active');
    document.body.classList.add('modal-open');
    elements.drilldownModal.setAttribute('aria-hidden', 'false');

    // Focus close button for accessibility
    setTimeout(() => {
      if (elements.modalCloseBtn) elements.modalCloseBtn.focus();
    }, 100);
  }

  // Close Company Modal
  function closeDrilldownModal(options = {}) {
    elements.drilldownModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    elements.drilldownModal.setAttribute('aria-hidden', 'true');
    state.currentCompany = null;
    state.currentClient = null;

    if (!options.fromHistory) {
      if (portfolioHistoryDepth > 0) {
        const depthToUnwind = portfolioHistoryDepth;
        portfolioHistoryDepth = 0;
        try {
          if (depthToUnwind === 1) {
            window.history.back();
          } else if (depthToUnwind >= 2) {
            window.history.go(-depthToUnwind);
          }
        } catch (e) {
          window.history.replaceState(null, '');
        }
      }
    }
  }

  // Navigate back to Company / Client Accounts view
  function navigateBackToCompany() {
    if (portfolioHistoryDepth >= 2 || (window.history.state && window.history.state.vvPortfolio && window.history.state.vvPortfolio.level === 'client')) {
      window.history.back();
    } else if (state.currentCompany) {
      renderCompanyOverview(state.currentCompany, { fromHistory: true });
    }
  }

  // Browser History popstate dispatcher
  function handlePopState(stateObj) {
    if (elements.lightboxModal && elements.lightboxModal.classList.contains('active')) {
      closeLightbox();
    }

    const vv = stateObj && stateObj.vvPortfolio;

    if (!vv) {
      portfolioHistoryDepth = 0;
      if (elements.drilldownModal && elements.drilldownModal.classList.contains('active')) {
        closeDrilldownModal({ fromHistory: true });
      }
      return;
    }

    if (vv.level === 'company') {
      portfolioHistoryDepth = 1;
      const company = PORTFOLIO_DATA.companies.find((c) => c.id === vv.companyId);
      if (!company) {
        closeDrilldownModal({ fromHistory: true });
        return;
      }

      state.currentCompany = company;
      state.currentClient = null;

      if (!elements.drilldownModal.classList.contains('active')) {
        elements.drilldownModal.classList.add('active');
        document.body.classList.add('modal-open');
        elements.drilldownModal.setAttribute('aria-hidden', 'false');
      }

      renderCompanyOverview(company, { fromHistory: true });
    } else if (vv.level === 'client') {
      portfolioHistoryDepth = 2;
      const company = PORTFOLIO_DATA.companies.find((c) => c.id === vv.companyId);
      if (!company) {
        closeDrilldownModal({ fromHistory: true });
        return;
      }
      const client = (company.clients || []).find((cl) => cl.id === vv.clientId);
      if (!client) {
        state.currentCompany = company;
        state.currentClient = null;
        renderCompanyOverview(company, { fromHistory: true });
        return;
      }

      state.currentCompany = company;
      if (!elements.drilldownModal.classList.contains('active')) {
        elements.drilldownModal.classList.add('active');
        document.body.classList.add('modal-open');
        elements.drilldownModal.setAttribute('aria-hidden', 'false');
      }

      openClientView(client, { fromHistory: true });
    }
  }

  // Render Company Overview inside Modal
  function renderCompanyOverview(company) {
    updateBreadcrumbs([
      { label: 'Creative Journey', onClick: closeDrilldownModal },
      { label: company.shortName, active: true }
    ]);

    // Build Company Banner with Back to Timeline trigger
    const bannerMarkup = `
      <div class="company-banner">
        <button class="back-to-timeline-btn" id="modal-back-btn" aria-label="Return to Creative Journey">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          ← BACK TO CREATIVE JOURNEY
        </button>
        <span class="company-banner-badge">Career Milestone ${company.number || ''}</span>
        <h2 class="company-banner-title" id="modal-company-title">${company.fullName || company.name}</h2>
        <div class="company-banner-meta">
          <div>Role: <strong>${company.role}</strong></div>
          <div>Tenure: <strong>${company.duration}</strong></div>
          <div>Location: <strong>${company.location}</strong></div>
        </div>
      </div>
    `;

    // Handle View based on company type
    if (company.type === 'with_clients') {
      const clientsListMarkup = (company.clients || [])
        .map((client) => {
          let logoMarkup = '';
          if (client.logo) {
            const logoClass = client.logoClass ? `client-logo-img ${client.logoClass}` : 'client-logo-img';
            logoMarkup = `<img src="${client.logo}" alt="${client.name} Logo" class="${logoClass}" loading="lazy">`;
          } else {
            logoMarkup = `<div class="logo-slot-text">${client.logoPlaceholder || `UPLOAD ${client.name.toUpperCase()} LOGO`}</div>`;
          }

          return `
            <div class="client-card" tabindex="0" role="button" data-client-id="${client.id}" aria-label="View creative work for ${client.name}">
              <div class="client-logo-box">
                ${logoMarkup}
              </div>
              <h4 class="client-card-name">${client.name}</h4>
              <div class="client-card-cta" aria-hidden="true">
                <span class="cta-text">VIEW WORK</span>
                <span class="cta-arrow">→</span>
              </div>
            </div>
          `;
        })
        .join('');

      elements.modalBody.innerHTML = `
        ${bannerMarkup}
        <div class="clients-overview-container">
          <div style="margin-bottom: 1.5rem;">
            <h3 class="modal-section-title">${company.clientsLabel || 'SELECTED CLIENT WORK'}</h3>
            <p style="font-size: 0.88rem; color: var(--color-text-secondary); margin-top: 0.25rem;">
              Select a client account to view dedicated project deliverables and creative collateral.
            </p>
          </div>
          <div class="clients-grid">
            ${clientsListMarkup}
          </div>
        </div>
      `;

      // Back to timeline button listener
      const backBtn = document.getElementById('modal-back-btn');
      if (backBtn) {
        backBtn.addEventListener('click', () => closeDrilldownModal());
      }

      // Attach client card click listeners
      elements.modalBody.querySelectorAll('.client-card').forEach((card) => {
        const clientId = card.getAttribute('data-client-id');
        const client = company.clients.find((c) => c.id === clientId);
        card.addEventListener('click', () => openClientView(client));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openClientView(client);
          }
        });
      });
    } else if (company.type === 'with_brands') {
      // Karma Management — Brand accounts with Logo, Name, Contextual Note & Creative Gallery
      const brandsList = company.brands || [];
      const allBrandImages = [];
      brandsList.forEach((b) => {
        if (b.images) allBrandImages.push(...b.images);
      });
      state.currentGalleryImages = allBrandImages;

      let currentOffset = 0;
      const brandBlocksMarkup = brandsList
        .map((brand) => {
          let logoMarkup = '';
          if (brand.logo) {
            const logoClass = brand.logoClass ? `brand-logo-img ${brand.logoClass}` : 'brand-logo-img';
            logoMarkup = `<img src="${brand.logo}" alt="${brand.name} Logo" class="${logoClass}" loading="lazy">`;
          } else {
            logoMarkup = `<span class="logo-slot-text">${brand.logoPlaceholder || brand.name}</span>`;
          }

          const contributionPills = (brand.contribution || [])
            .map((c) => `<span class="contribution-tag">${c}</span>`)
            .join('');

          const galleryMarkup = renderArtworkGalleryMarkup(brand.images, brand.name, currentOffset);
          currentOffset += (brand.images ? brand.images.length : 0);

          return `
            <section class="brand-account-card" id="${brand.id}">
              <div class="brand-account-header">
                <div class="client-brand-identity-row">
                  <div class="client-header-logo-box">
                    ${logoMarkup}
                  </div>
                  <div class="client-brand-text-col">
                    <span class="eyebrow">${brand.clientBadge || `Brand Account — ${company.shortName}`}</span>
                    <h3 class="brand-account-name font-heading">${brand.fullName || brand.name}</h3>
                    ${brand.relationshipNote ? `
                      <div class="client-relationship-note" role="note">
                        <span class="relationship-note-icon" aria-hidden="true">ⓘ</span>
                        <span class="relationship-note-text">${brand.relationshipNote}</span>
                      </div>
                    ` : ''}
                  </div>
                </div>

                <p class="brand-account-desc">${brand.description}</p>

                <div class="client-contribution-bar">
                  <span class="contribution-label">Key Deliverables:</span>
                  ${contributionPills}
                </div>
              </div>

              <div class="brand-gallery-wrap">
                <div class="gallery-grid">
                  ${galleryMarkup}
                </div>
              </div>
            </section>
          `;
        })
        .join('');

      elements.modalBody.innerHTML = `
        ${bannerMarkup}
        <div class="brands-showcase-container">
          <div style="margin-bottom: 1.25rem;">
            <h3 class="modal-section-title">${company.clientsLabel || 'BRAND &amp; CLIENT ACCOUNTS'}</h3>
            <p style="font-size: 0.88rem; color: var(--color-text-secondary); margin-top: 0.25rem;">
              Enterprise brand accounts and visual deliverables executed during my tenure at ${company.name}.
            </p>
          </div>
          <div class="brands-stack-wrap">
            ${brandBlocksMarkup}
          </div>
        </div>
      `;

      const backBtn = document.getElementById('modal-back-btn');
      if (backBtn) {
        backBtn.addEventListener('click', () => closeDrilldownModal());
      }

      attachArtworkClickListeners();
    } else {
      // Direct Works (DigiMarketerZ, SNP Softwares, JKH Exports, Veer Graphics)
      state.currentGalleryImages = company.images || [];

      const contributionPills = (company.contribution || [])
        .map((c) => `<span class="contribution-tag">${c}</span>`)
        .join('');

      const galleryMarkup = renderArtworkGalleryMarkup(company.images, company.shortName);

      elements.modalBody.innerHTML = `
        ${bannerMarkup}
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
            <h3 class="modal-section-title">${company.workLabel || 'SELECTED CREATIVE WORK'}</h3>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              ${contributionPills}
            </div>
          </div>
          <div class="gallery-grid">
            ${galleryMarkup}
          </div>
        </div>
      `;

      const backBtn = document.getElementById('modal-back-btn');
      if (backBtn) {
        backBtn.addEventListener('click', () => closeDrilldownModal());
      }

      attachArtworkClickListeners();
    }
  }

  // Open Client Dedicated Creative View inside Modal
  function openClientView(client, options = {}) {
    state.currentClient = client;
    state.currentGalleryImages = client.images || [];

    const company = state.currentCompany || PORTFOLIO_DATA.companies.find((c) => (c.clients || []).some((cl) => cl.id === client.id));
    if (company && !state.currentCompany) {
      state.currentCompany = company;
    }

    if (!options.fromHistory && state.currentCompany) {
      history.pushState(
        {
          vvPortfolio: {
            level: 'client',
            companyId: state.currentCompany.id,
            clientId: client.id
          }
        },
        ''
      );
      portfolioHistoryDepth = 2;
    }

    updateBreadcrumbs([
      { label: 'Creative Journey', onClick: () => closeDrilldownModal() },
      { label: state.currentCompany ? state.currentCompany.shortName : 'EduRiser', onClick: () => navigateBackToCompany() },
      { label: client.name, active: true }
    ]);

    const contributionPills = (client.contribution || [])
      .map((c) => `<span class="contribution-tag">${c}</span>`)
      .join('');

    const galleryMarkup = renderArtworkGalleryMarkup(client.images, client.name);

    let clientLogoMarkup = '';
    if (client.logo) {
      const logoClass = client.logoClass ? `client-header-logo-img ${client.logoClass}` : 'client-header-logo-img';
      clientLogoMarkup = `<img src="${client.logo}" alt="${client.name} Logo" class="${logoClass}">`;
    } else {
      clientLogoMarkup = `<span class="client-header-logo-text">${client.logoPlaceholder || client.name}</span>`;
    }

    elements.modalBody.innerHTML = `
      <div class="client-work-view">
        <div class="client-work-header">
          <button class="back-to-clients-btn" id="back-to-clients-btn" aria-label="Return to ${state.currentCompany ? state.currentCompany.shortName : 'EduRiser'} client list">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            ← Back to ${state.currentCompany ? state.currentCompany.shortName : 'EduRiser'} Accounts
          </button>

          <div class="client-brand-identity-row">
            <div class="client-header-logo-box">
              ${clientLogoMarkup}
            </div>
            <div class="client-brand-text-col">
              <span class="eyebrow">${client.clientBadge || `Client Project — ${state.currentCompany ? state.currentCompany.shortName : 'EduRiser'}`}</span>
              <h2 class="client-brand-name font-heading">
                ${client.fullName || client.name}
              </h2>
              ${client.relationshipNote ? `
                <div class="client-relationship-note" role="note">
                  <span class="relationship-note-icon" aria-hidden="true">ⓘ</span>
                  <span class="relationship-note-text">${client.relationshipNote}</span>
                </div>
              ` : ''}
            </div>
          </div>

          <p class="client-work-desc">
            ${client.description}
          </p>

          <div class="client-contribution-bar">
            <span class="contribution-label">My Contribution:</span>
            ${contributionPills}
          </div>
        </div>

        <div class="client-gallery-intro">
          <h3 class="font-heading client-gallery-title">
            Creative Deliverables &amp; Visual Artwork
          </h3>
          <p class="client-gallery-sub">
            Click any artwork to inspect in full-screen high-resolution lightbox with aspect-ratio preservation.
          </p>
        </div>

        <div class="gallery-grid">
          ${galleryMarkup}
        </div>
      </div>
    `;

    // Back to clients button listener
    const backBtn = document.getElementById('back-to-clients-btn');
    if (backBtn) {
      backBtn.addEventListener('click', navigateBackToCompany);
    }

    attachArtworkClickListeners();
  }

  // Render Reusable Image Gallery Markup
  function renderArtworkGalleryMarkup(images, parentName, startIndex = 0) {
    if (!images || images.length === 0) {
      return `<p style="padding: 2rem; color: var(--color-charcoal-muted);">No artwork uploaded yet.</p>`;
    }

    return images
      .map((item, index) => {
        const itemIdx = startIndex + index;
        let thumbnailMarkup = '';
        if (item.src) {
          thumbnailMarkup = `
            <img src="${item.src}" alt="${item.title}" loading="lazy">
          `;
        } else {
          thumbnailMarkup = `
            <div class="artwork-placeholder-content">
              <div class="artwork-placeholder-border"></div>
              <div class="artwork-placeholder-badge">${item.placeholder || `UPLOAD ${parentName.toUpperCase()} DESIGN 0${index + 1}`}</div>
              <div class="artwork-dim-hint">Preserves original aspect ratio</div>
            </div>
          `;
        }

        return `
          <article class="artwork-card" tabindex="0" role="button" data-index="${itemIdx}" aria-label="View ${item.title}">
            <div class="artwork-thumbnail-box">
              ${thumbnailMarkup}
            </div>
          </article>
        `;
      })
      .join('');
  }

  // Attach Click Listeners to Artwork Cards
  function attachArtworkClickListeners() {
    elements.modalBody.querySelectorAll('.artwork-card').forEach((card) => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      card.addEventListener('click', () => openLightbox(idx));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
        }
      });
    });
  }

  // Update Breadcrumb Navigation
  function updateBreadcrumbs(items) {
    if (!elements.modalBreadcrumb) return;
    elements.modalBreadcrumb.innerHTML = '';

    items.forEach((item, index) => {
      if (index > 0) {
        const sep = document.createElement('span');
        sep.className = 'breadcrumb-sep';
        sep.textContent = '/';
        elements.modalBreadcrumb.appendChild(sep);
      }

      const el = document.createElement('span');
      el.className = `breadcrumb-item ${item.active ? 'active' : ''}`;
      el.textContent = item.label;

      if (item.onClick && !item.active) {
        el.setAttribute('tabindex', '0');
        el.setAttribute('role', 'button');
        el.addEventListener('click', item.onClick);
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.onClick();
          }
        });
      }

      elements.modalBreadcrumb.appendChild(el);
    });
  }

  /* ==========================================================================
     4. FULL-SCREEN LIGHTBOX ENGINE
     ========================================================================== */
  function openLightbox(index) {
    state.lightboxIndex = index;
    renderLightboxContent();
    elements.lightboxModal.classList.add('active');
    elements.lightboxModal.setAttribute('aria-hidden', 'false');

    if (typeof markSectionVisited === 'function') {
      markSectionVisited('work');
    }

    // Accessibility: Focus close button
    setTimeout(() => {
      if (elements.lightboxCloseBtn) elements.lightboxCloseBtn.focus();
    }, 100);
  }

  function closeLightbox() {
    elements.lightboxModal.classList.remove('active');
    elements.lightboxModal.setAttribute('aria-hidden', 'true');
  }

  function navigateLightboxPrev() {
    if (!state.currentGalleryImages.length) return;
    state.lightboxIndex = (state.lightboxIndex - 1 + state.currentGalleryImages.length) % state.currentGalleryImages.length;
    renderLightboxContent();
  }

  function navigateLightboxNext() {
    if (!state.currentGalleryImages.length) return;
    state.lightboxIndex = (state.lightboxIndex + 1) % state.currentGalleryImages.length;
    renderLightboxContent();
  }

  function renderLightboxContent() {
    const images = state.currentGalleryImages;
    if (!images || !images[state.lightboxIndex]) return;

    const currentItem = images[state.lightboxIndex];
    const total = images.length;

    // Subtitle context
    let contextLabel = state.currentClient ? state.currentClient.name : state.currentCompany.name;

    elements.lightboxTitle.textContent = currentItem.title;
    elements.lightboxSubtitle.textContent = `${currentItem.category} — ${contextLabel}`;
    elements.lightboxCounter.textContent = `${state.lightboxIndex + 1} / ${total}`;

    // Render viewport image or placeholder
    elements.lightboxImageContainer.innerHTML = '';

    if (currentItem.src) {
      const img = document.createElement('img');
      img.src = currentItem.src;
      img.alt = currentItem.title;
      elements.lightboxImageContainer.appendChild(img);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'lightbox-placeholder-view';
      placeholder.innerHTML = `
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="stroke: var(--color-accent-purple); margin-bottom: 1rem;">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <circle cx="9" cy="9" r="2"/>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
        <div class="placeholder-badge" style="font-size: 0.85rem; margin-bottom: 0.75rem;">
          ${currentItem.placeholder || `UPLOAD ${contextLabel.toUpperCase()} DESIGN`}
        </div>
        <h3 class="font-heading" style="color: var(--color-text-primary); font-size: 1.4rem; margin-bottom: 0.5rem;">
          ${currentItem.title}
        </h3>
        <p style="font-size: 0.85rem; color: var(--color-text-secondary); max-width: 400px; line-height: 1.5;">
          Place design artwork in the corresponding assets folder to automatically preview high-resolution deliverables here.
        </p>
      `;
      elements.lightboxImageContainer.appendChild(placeholder);
    }
  }

  /* ==========================================================================
     5. KEYBOARD SHORTCUTS & TOUCH SWIPE GESTURES
     ========================================================================== */
  function setupKeyboardAndGestures() {
    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      // If Entry Experience is active
      if (
        elements.entryExperience &&
        !elements.entryExperience.classList.contains('dismissed') &&
        !document.documentElement.classList.contains('intro-dismissed')
      ) {
        if (e.key === 'Escape') {
          e.preventDefault();
          dismissEntryExperience();
          return;
        }
      }

      // If Lightbox is open
      if (elements.lightboxModal.classList.contains('active')) {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          navigateLightboxPrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          navigateLightboxNext();
        }
        return;
      }

      // If Quick View Modal is open
      if (elements.quickviewModal && elements.quickviewModal.classList.contains('active')) {
        if (e.key === 'Escape') {
          e.preventDefault();
          window.closeQuickViewModal();
        }
        return;
      }

      // If Drilldown Modal is open
      if (elements.drilldownModal.classList.contains('active')) {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeDrilldownModal();
        }
      }
    });

    // Mobile Swipe Gestures on Lightbox
    if (elements.lightboxContentArea) {
      elements.lightboxContentArea.addEventListener('touchstart', (e) => {
        state.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      elements.lightboxContentArea.addEventListener('touchend', (e) => {
        state.touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
      }, { passive: true });
    }
  }

  function handleSwipeGesture() {
    const swipeDistance = state.touchStartX - state.touchEndX;
    const minThreshold = 45; // Minimum px to count as intentional swipe

    if (Math.abs(swipeDistance) > minThreshold) {
      if (swipeDistance > 0) {
        // Swiped Left -> Go Next
        navigateLightboxNext();
      } else {
        // Swiped Right -> Go Prev
        navigateLightboxPrev();
      }
    }
  }

  function markSectionVisited() {
    // Navigation/progress tracker removed per homepage simplification
  }

  // Run on DOM Content Loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

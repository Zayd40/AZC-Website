// Mobile menu toggle & simple UI enhancements
(function () {
  function initSite() {
    // --- MOBILE NAV ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const pageBody = document.body;

    if (hamburger && navMenu) {
      const closeNav = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        pageBody.classList.remove('nav-open');
      };

      const toggleNav = () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        const nextState = !expanded;
        hamburger.setAttribute('aria-expanded', String(nextState));
        hamburger.classList.toggle('active', nextState);
        navMenu.classList.toggle('active', nextState);
        pageBody.classList.toggle('nav-open', nextState);
      };

      // Ensure correct initial state
      closeNav();

      // Toggle menu open/closed
      hamburger.addEventListener('click', toggleNav);

      // Close menu when a nav link is tapped (on mobile)
      navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            closeNav();
          }
        });
      });

      // On resize, always reset nav state so it never gets stuck
      window.addEventListener('resize', closeNav);
    }

    // --- SMOOTH SCROLL FOR #ANCHORS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', event => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // --- FADE-IN ON SCROLL ---
    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document
      .querySelectorAll(
        '.card, .info-card, .hero-content, .hero-image, .facility-card, .committee-member, .contact-form'
      )
      .forEach(el => {
        el.setAttribute('data-animate', '');
        observer.observe(el);
      });

    // --- CONTACT FORM SIMPLE VALIDATION ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', event => {
        const inputs = contactForm.querySelectorAll(
          'input[required], textarea[required], select[required]'
        );
        let hasError = false;

        inputs.forEach(input => {
          if (!input.value.trim()) {
            input.classList.add('error');
            hasError = true;
          } else {
            input.classList.remove('error');
          }
        });

        if (hasError) {
          event.preventDefault();
        }
      });
    }
  }

  // Run whether DOMContentLoaded has already fired or not
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSite);
  } else {
    initSite();
  }
})();

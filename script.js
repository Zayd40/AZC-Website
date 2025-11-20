// Mobile menu toggle & simple UI enhancements
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link (on mobile)
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll for internal anchor links (#target)
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

  // Simple fade-in on scroll using IntersectionObserver
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

  document.querySelectorAll('.card, .info-card, .hero-content, .hero-image, .facility-card, .committee-member, .contact-form')
    .forEach(el => {
      el.setAttribute('data-animate', '');
      observer.observe(el);
    });

  // Optional: simple front-end validation highlight for the contact form
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
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
});
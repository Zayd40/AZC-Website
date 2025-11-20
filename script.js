// Mobile menu toggle & simple UI enhancements

// Wrap in an IIFE so we don't leak variables into the global scope
(() => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  // Mobile nav toggle
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
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Simple contact form validation (only if the form exists)
  const contactForm = document.querySelector('form[data-validate="basic"]');
  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
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
})();
/* ============================================
   HANDPRO LANDING PAGE - JAVASCRIPT
   ============================================ */

// === Header Scroll Effect ===
const header = document.getElementById('header');

function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleScroll);

// === Mobile Menu Toggle ===
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMobile = document.getElementById('nav-mobile');
const iconMenu = document.getElementById('icon-menu');
const iconClose = document.getElementById('icon-close');

function toggleMobileMenu() {
  navMobile.classList.toggle('hidden');
  iconMenu.classList.toggle('hidden');
  iconClose.classList.toggle('hidden');
}

// === Smooth Scroll to Section ===
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    
    // Close mobile menu if open
    if (!navMobile.classList.contains('hidden')) {
      toggleMobileMenu();
    }
  }
}

// === Form Submission ===
const leadForm = document.getElementById('lead-form');
const formView = document.getElementById('form-view');
const successView = document.getElementById('success-view');

leadForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value
  };
  
  // Log form data (in production, send to backend)
  console.log('Form submitted:', formData);
  
  // Show success message
  formView.classList.add('hidden');
  successView.classList.remove('hidden');
});

// === Intersection Observer for Animations ===
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.animate-fade-in, .animate-slide-left, .animate-slide-right').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// === Phone Input Mask (Brazilian Format) ===
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  
  if (value.length <= 11) {
    if (value.length <= 2) {
      value = value.replace(/^(\d{0,2})/, '($1');
    } else if (value.length <= 7) {
      value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else {
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  }
  
  e.target.value = value;
});

// === Scroll Animation on Page Load ===
document.addEventListener('DOMContentLoaded', function() {
  // Trigger animations for hero section elements
  const heroElements = document.querySelectorAll('.hero .animate-fade-in');
  heroElements.forEach(el => {
    el.style.animationPlayState = 'running';
  });
});

// === Active Navigation Highlight ===
const sections = document.querySelectorAll('section[id]');
const navButtons = document.querySelectorAll('.nav-desktop button:not(.btn-cta)');

function highlightNavigation() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navButtons.forEach(btn => {
        btn.style.color = '';
        if (btn.textContent.toLowerCase() === sectionId || 
            (sectionId === 'inscricao' && btn.textContent === 'Inscrição')) {
          btn.style.color = 'hsl(45, 100%, 50%)';
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// === Parallax Effect for Hero ===
const heroSection = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg img');

window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const heroHeight = heroSection.offsetHeight;
  
  if (scrolled < heroHeight) {
    heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
  }
});

// === Counter Animation ===
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + (element.dataset.suffix || '');
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + (element.dataset.suffix || '');
    }
  }
  
  updateCounter();
}

// Observe stat numbers for counter animation
const statNumbers = document.querySelectorAll('.stat-number, .proof-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const text = element.textContent;
      const numMatch = text.match(/[\d.]+/);
      
      if (numMatch) {
        const num = parseFloat(numMatch[0]);
        const suffix = text.replace(numMatch[0], '');
        element.dataset.suffix = suffix;
        animateCounter(element, num);
      }
      
      counterObserver.unobserve(element);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// === Smooth Reveal on Scroll ===
const revealElements = document.querySelectorAll('.module-card, .benefit-card, .testimonial-card, .credential-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

console.log('HandPro Landing Page loaded successfully! 🏐');

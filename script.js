// LOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2400);
});

// PARTICLES
(function() {
  const container = document.getElementById('particles');
  const count = 20;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (8 + Math.random() * 15) + 's';
    p.style.animationDelay = (Math.random() * 12) + 's';
    p.style.width = p.style.height = (1 + Math.random() * 2) + 'px';
    container.appendChild(p);
  }
})();


// Accessible mobile navigation
const nav = document.getElementById('nav');
const menuToggle = document.querySelector('.menu-toggle');
if (nav && menuToggle) {
  const closeMenu = () => {
    nav.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Відкрити меню');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Відкрити меню' : 'Закрити меню');
    nav.classList.toggle('menu-open', !isOpen);
    if (!isOpen) nav.querySelector('.nav-links a')?.focus();
  });

  nav.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuToggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

// NAV SCROLL
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// TYPE BUTTONS
function selectType(btn) {
  document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// FORM SUBMIT
function submitForm() {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  if (!name || !phone) {
    document.getElementById('name').style.borderColor = name ? '' : '#e05';
    document.getElementById('phone').style.borderColor = phone ? '' : '#e05';
    return;
  }

  const type = document.querySelector('.type-btn.active')?.textContent.trim() || 'Не обрано';
  const service = document.getElementById('service').value || 'Не обрано';
  const date = document.getElementById('date').value || 'Не обрана';
  const message = document.getElementById('message').value.trim() || '—';

  const text = 'Вітаю! Хочу записатися на консультацію.\n\n' +
    'Тип звернення: ' + type + '\n' +
    'Ім’я: ' + name + '\n' +
    'Телефон: ' + phone + '\n' +
    'Послуга: ' + service + '\n' +
    'Бажана дата: ' + date + '\n' +
    'Опис: ' + message;
  const whatsappUrl = `https://wa.me/380964804765?text=${encodeURIComponent(text)}`;
  document.getElementById('whatsappFallback').href = whatsappUrl;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  document.getElementById('formSuccess').classList.add('show');
}

// FAQ TOGGLE
function toggleFaq(el) {
  const item = el.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
  });
  if (!wasOpen) {
    item.classList.add('open');
    el.setAttribute('aria-expanded', 'true');
  }
}

// DATE MIN
const dateInput = document.getElementById('date');
if (dateInput) {
  const now = new Date();
  const today = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
  dateInput.setAttribute('min', today);
}

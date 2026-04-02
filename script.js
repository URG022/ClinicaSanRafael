// ── Menú hamburguesa ─────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.innerHTML = navLinks.classList.contains('open') ? '&#x2715;' : '&#9776;';
});

// Cerrar menú al hacer click en un enlace
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.innerHTML = '&#9776;';
  });
});

// ── Navbar: sombra al hacer scroll ───────────────────
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ── Ocultar logo-img si no carga ─────────────────────
// (el onerror inline en el HTML ya maneja el fallback de texto)
// Este bloque oculta el <img> del logo si la ruta no existe,
// dejando solo el texto del nombre de la clínica.
const logoImg = document.querySelector('.nav-logo-img');
if (logoImg) {
  logoImg.addEventListener('error', () => {
    logoImg.style.display = 'none';
  });
}

// ── Animación de entrada con IntersectionObserver ────
// Las tarjetas y secciones aparecen suavemente al hacer scroll
const animTargets = document.querySelectorAll(
  '.service-card, .doctor-card, .horario-card, .seguro-item, .testimonio-card, .why-item'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animTargets.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ── Formulario: feedback de envío ────────────────────
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // Si usa Formspree, el redireccionamiento lo maneja Formspree.
    // Para formularios custom, agrega tu lógica aquí.
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Solicitud enviada!';
      btn.style.background = '#16a34a';
    }, 2000);
  });
}
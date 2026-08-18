// Inicializador Principal de la Aplicación - Mundo Roma

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicializar Catálogo
  if (typeof initCatalog === "function") {
    initCatalog();
  }

  // 2. Inicializar Modales y Drawers
  if (typeof initModals === "function") {
    initModals();
  }

  // 3. Inicializar Menú Móvil
  initMobileMenu();

  // 4. Header dinámico en scroll
  initHeaderScroll();

  // 5. Enlaces de WhatsApp directos y redes sociales
  initSocialLinks();
});

// Menú Móvil
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-toggle-btn");
  const closeBtn = document.getElementById("close-mobile-menu-btn");
  const mobileNav = document.getElementById("mobile-nav-drawer");
  const overlay = document.getElementById("drawer-overlay");

  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener("click", () => {
      mobileNav.classList.add("active");
      if (overlay) overlay.classList.add("active");
      document.body.classList.add("modal-open");
    });
  }

  if (closeBtn && mobileNav) {
    closeBtn.addEventListener("click", closeMobileMenu);
  }

  // Cerrar al clickear cualquier link del menú
  const links = document.querySelectorAll(".mobile-nav-link");
  links.forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });
}

function closeMobileMenu() {
  const mobileNav = document.getElementById("mobile-nav-drawer");
  const overlay = document.getElementById("drawer-overlay");
  if (mobileNav) mobileNav.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
  document.body.classList.remove("modal-open");
}

// Header en scroll
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });
}

// Configurar enlaces directos a WhatsApp y redes
function initSocialLinks() {
  const cleanPhone = (SITE_CONFIG.phone || "").replace(/[^0-9]/g, "");
  const generalWaMsg = encodeURIComponent("¡Hola Mundo Roma! Quisiera hacer una consulta sobre sus productos.");
  const waUrl = `https://wa.me/${cleanPhone}?text=${generalWaMsg}`;

  // Botones de WhatsApp generales
  const waBtns = document.querySelectorAll(".global-whatsapp-link");
  waBtns.forEach(btn => {
    btn.href = waUrl;
    btn.target = "_blank";
  });

  // Instagram
  const igLinks = document.querySelectorAll(".instagram-link");
  igLinks.forEach(link => {
    if (SITE_CONFIG.instagram) {
      link.href = SITE_CONFIG.instagram;
      link.target = "_blank";
    }
  });

  // Facebook
  const fbLinks = document.querySelectorAll(".facebook-link");
  fbLinks.forEach(link => {
    if (SITE_CONFIG.facebook) {
      link.href = SITE_CONFIG.facebook;
      link.target = "_blank";
    }
  });
}

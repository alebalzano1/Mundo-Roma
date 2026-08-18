// Lógica del Modal de Detalle de Producto y Control de Drawers - Mundo Roma

let currentModalProduct = null;
let currentModalQty = 1;

// Abrir Modal de Producto
function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  currentModalProduct = product;
  currentModalQty = 1;

  const modal = document.getElementById("product-detail-modal");
  const imgElem = document.getElementById("modal-product-img");
  const tagElem = document.getElementById("modal-product-tag");
  const catElem = document.getElementById("modal-product-category");
  const titleElem = document.getElementById("modal-product-title");
  const priceElem = document.getElementById("modal-product-price");
  const oldPriceElem = document.getElementById("modal-product-old-price");
  const discountElem = document.getElementById("modal-product-discount");
  const descElem = document.getElementById("modal-product-description");
  const specsContainer = document.getElementById("modal-product-specs");
  const qtyNumElem = document.getElementById("modal-qty-num");
  const addBtn = document.getElementById("modal-add-to-cart-btn");
  const directWaBtn = document.getElementById("modal-direct-whatsapp-btn");

  if (imgElem) {
    imgElem.src = product.image;
    imgElem.alt = product.name;
  }

  if (tagElem) {
    if (product.tag) {
      tagElem.textContent = product.tag;
      tagElem.className = `badge-tag badge-${product.tag.toLowerCase().replace(/\s+/g, '-')}`;
      tagElem.classList.remove("hidden");
    } else {
      tagElem.classList.add("hidden");
    }
  }

  if (catElem) catElem.textContent = product.categoryName || "Mundo Roma";
  if (titleElem) titleElem.textContent = product.name;
  
  const formattedPrice = (SITE_CONFIG.currency || "$") + product.price.toLocaleString("es-AR");
  if (priceElem) priceElem.textContent = formattedPrice;

  if (oldPriceElem) {
    if (product.oldPrice) {
      oldPriceElem.textContent = (SITE_CONFIG.currency || "$") + product.oldPrice.toLocaleString("es-AR");
      oldPriceElem.classList.remove("hidden");
    } else {
      oldPriceElem.classList.add("hidden");
    }
  }

  if (discountElem) {
    if (product.discount) {
      discountElem.textContent = product.discount;
      discountElem.classList.remove("hidden");
    } else {
      discountElem.classList.add("hidden");
    }
  }

  if (descElem) descElem.textContent = product.description || product.shortDesc || "";

  if (specsContainer) {
    if (product.specs && product.specs.length > 0) {
      specsContainer.innerHTML = product.specs.map(s => `
        <div class="spec-row">
          <span class="spec-label">${s.label}:</span>
          <span class="spec-value">${s.value}</span>
        </div>
      `).join("");
      specsContainer.classList.remove("hidden");
    } else {
      specsContainer.classList.add("hidden");
    }
  }

  if (qtyNumElem) qtyNumElem.textContent = currentModalQty;

  // Actualizar enlace directo de WhatsApp para este producto
  if (directWaBtn) {
    const singleProductMsg = `${SITE_CONFIG.welcomeMessage}\n\n• ${product.name} (Ref: ${product.id}) — ${formattedPrice}\n\nQuisiera consultar disponibilidad y coordinar la compra directa.`;
    const cleanPhone = (SITE_CONFIG.phone || "").replace(/[^0-9]/g, "");
    directWaBtn.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(singleProductMsg)}`;
  }

  if (modal) {
    modal.classList.add("active");
    document.body.classList.add("modal-open");
  }
}

// Cerrar Modal
function closeProductModal() {
  const modal = document.getElementById("product-detail-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  }
  currentModalProduct = null;
}

// Control de Cantidad en Modal
function changeModalQty(delta) {
  currentModalQty = Math.max(1, currentModalQty + delta);
  const qtyNumElem = document.getElementById("modal-qty-num");
  if (qtyNumElem) qtyNumElem.textContent = currentModalQty;
}

// Agregar al carrito desde Modal
function addModalProductToCart() {
  if (currentModalProduct && cart) {
    cart.addItem(currentModalProduct, currentModalQty);
    closeProductModal();
    openCartDrawer();
  }
}

// Abrir y Cerrar Carrito Drawer
function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("drawer-overlay");
  if (drawer) drawer.classList.add("active");
  if (overlay) overlay.classList.add("active");
  document.body.classList.add("modal-open");
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("drawer-overlay");
  if (drawer) drawer.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
  document.body.classList.remove("modal-open");
}

// Inicializar eventos de modales y drawers
function initModals() {
  // Modal de Detalle
  const modal = document.getElementById("product-detail-modal");
  const closeBtn = document.getElementById("close-product-modal-btn");
  if (closeBtn) closeBtn.addEventListener("click", closeProductModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeProductModal();
    });
  }

  // Drawer Carrito
  const openCartBtns = document.querySelectorAll(".cart-btn-trigger");
  openCartBtns.forEach(btn => btn.addEventListener("click", openCartDrawer));

  const closeCartBtn = document.getElementById("close-cart-drawer-btn");
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCartDrawer);

  const overlay = document.getElementById("drawer-overlay");
  if (overlay) {
    overlay.addEventListener("click", () => {
      closeCartDrawer();
      closeMobileMenu();
    });
  }

  // Tecla Escape para cerrar modales
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProductModal();
      closeCartDrawer();
      closeMobileMenu();
    }
  });
}

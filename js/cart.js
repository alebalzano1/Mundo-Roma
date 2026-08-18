// Lógica del Carrito de Compras y Checkout por WhatsApp - Mundo Roma
const CART_STORAGE_KEY = "mundo_roma_cart_v1";

class CartManager {
  constructor() {
    this.items = this.loadCart();
    this.initListeners();
    this.updateUI();
  }

  loadCart() {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Error al cargar carrito:", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {
      console.error("Error al guardar carrito:", e);
    }
    this.updateUI();
  }

  addItem(product, quantity = 1) {
    const qty = parseInt(quantity, 10) || 1;
    const existingIndex = this.items.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += qty;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice || null,
        image: product.image,
        categoryName: product.categoryName,
        quantity: qty
      });
    }

    this.saveCart();
    this.showToast(`¡"${product.name}" agregado al carrito!`, "success");
    this.animateCartBadge();
  }

  updateQuantity(productId, newQty) {
    const itemIndex = this.items.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
      if (newQty <= 0) {
        this.removeItem(productId);
      } else {
        this.items[itemIndex].quantity = newQty;
        this.saveCart();
      }
    }
  }

  removeItem(productId) {
    const item = this.items.find(i => i.id === productId);
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    if (item) {
      this.showToast(`Se quitó "${item.name}" del carrito.`, "info");
    }
  }

  clearCart() {
    if (this.items.length === 0) return;
    if (confirm("¿Estás seguro de que deseas vaciar tu carrito?")) {
      this.items = [];
      this.saveCart();
      this.showToast("Tu carrito se ha vaciado.", "info");
    }
  }

  getTotalCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  formatCurrency(amount) {
    return (SITE_CONFIG?.currency || "$") + amount.toLocaleString("es-AR");
  }

  // Generación del mensaje optimizado para WhatsApp
  buildWhatsAppUrl() {
    if (this.items.length === 0) return null;

    let message = `${SITE_CONFIG.welcomeMessage}\n\n`;

    this.items.forEach((item, index) => {
      const itemTotal = this.formatCurrency(item.price * item.quantity);
      message += `• ${item.name} x${item.quantity} — ${itemTotal}\n`;
    });

    const grandTotal = this.formatCurrency(this.getSubtotal());
    message += `\n💰 *Total del pedido: ${grandTotal}*\n`;
    message += `\n${SITE_CONFIG.closingMessage}`;

    const cleanPhone = (SITE_CONFIG.phone || "").replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }

  checkoutWhatsApp() {
    if (this.items.length === 0) {
      this.showToast("Tu carrito está vacío. ¡Agregá productos primero!", "warning");
      return;
    }
    const url = this.buildWhatsAppUrl();
    if (url) {
      window.open(url, "_blank");
    }
  }

  updateUI() {
    // 1. Badges del carrito (desktop y mobile)
    const totalCount = this.getTotalCount();
    const subtotal = this.getSubtotal();
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(badge => {
      badge.textContent = totalCount;
      if (totalCount > 0) {
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    });

    // 2. Renderizar items en el Drawer
    const drawerContainer = document.getElementById("cart-drawer-items");
    const emptyState = document.getElementById("cart-empty-state");
    const footerContainer = document.getElementById("cart-drawer-footer");
    const subtotalElem = document.getElementById("cart-subtotal-amount");
    const totalElem = document.getElementById("cart-total-amount");

    if (subtotalElem) subtotalElem.textContent = this.formatCurrency(subtotal);
    if (totalElem) totalElem.textContent = this.formatCurrency(subtotal);

    if (this.items.length === 0) {
      if (emptyState) emptyState.classList.remove("hidden");
      if (footerContainer) footerContainer.classList.add("hidden");
      if (drawerContainer) drawerContainer.innerHTML = "";
    } else {
      if (emptyState) emptyState.classList.add("hidden");
      if (footerContainer) footerContainer.classList.remove("hidden");

      if (drawerContainer) {
        drawerContainer.innerHTML = this.items.map(item => `
          <div class="cart-item-card" data-id="${item.id}">
            <div class="cart-item-img-wrap">
              <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="cart-item-info">
              <span class="cart-item-category">${item.categoryName || 'Mundo Roma'}</span>
              <h4 class="cart-item-title">${item.name}</h4>
              <div class="cart-item-price-row">
                <span class="cart-item-price">${this.formatCurrency(item.price)}</span>
                ${item.oldPrice ? `<span class="cart-item-old-price">${this.formatCurrency(item.oldPrice)}</span>` : ''}
              </div>
              <div class="cart-item-controls">
                <div class="qty-selector">
                  <button class="qty-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})" aria-label="Disminuir">-</button>
                  <span class="qty-num">${item.quantity}</span>
                  <button class="qty-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})" aria-label="Aumentar">+</button>
                </div>
                <button class="cart-remove-btn" onclick="cart.removeItem('${item.id}')" title="Eliminar producto">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/></svg>
                </button>
              </div>
            </div>
          </div>
        `).join("");
      }
    }
  }

  showToast(message, type = "info") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-pill toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>';
    } else if (type === 'warning') {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>';
    } else {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }

    toast.innerHTML = `
      <span class="toast-icon">${iconSvg}</span>
      <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("toast-show");
    }, 10);

    setTimeout(() => {
      toast.classList.remove("toast-show");
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  animateCartBadge() {
    const badges = document.querySelectorAll(".cart-btn-trigger");
    badges.forEach(btn => {
      btn.classList.add("cart-bounce");
      setTimeout(() => btn.classList.remove("cart-bounce"), 600);
    });
  }

  initListeners() {
    // Escuchar botón de checkout
    document.addEventListener("click", (e) => {
      if (e.target.closest("#cart-checkout-btn")) {
        this.checkoutWhatsApp();
      }
      if (e.target.closest("#cart-clear-all-btn")) {
        this.clearCart();
      }
    });
  }
}

// Instancia global
const cart = new CartManager();

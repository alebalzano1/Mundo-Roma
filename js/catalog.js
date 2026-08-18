// Lógica del Catálogo de Productos y Filtros - Mundo Roma
let currentCategory = "todos";
let currentSearchQuery = "";
let currentSort = "destacados";

// Inicializar Catálogo
function initCatalog() {
  renderCategoryPills();
  renderCategoryCards();
  renderFeaturedProducts();
  renderCatalog();
  initSearchAndFilters();
}

// 1. Renderizar Botones / Pills de Categorías en el Catálogo
function renderCategoryPills() {
  const container = document.getElementById("category-filter-pills");
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <button 
      class="filter-pill ${cat.id === currentCategory ? 'active' : ''}" 
      data-category="${cat.id}"
      onclick="selectCategory('${cat.id}')"
    >
      ${cat.name}
    </button>
  `).join("");
}

// 2. Renderizar Tarjetas de la Sección "Shop By Category"
function renderCategoryCards() {
  const container = document.getElementById("shop-categories-grid");
  if (!container) return;

  // Filtrar 'todos' para mostrar las categorías visuales principales
  const mainCategories = CATEGORIES.filter(c => c.id !== "todos");

  container.innerHTML = mainCategories.map(cat => `
    <div class="category-showcase-card" onclick="selectCategory('${cat.id}', true)">
      <div class="category-card-content">
        <span class="category-badge">${cat.badge || 'Colección'}</span>
        <h3 class="category-title">${cat.name}</h3>
        <p class="category-desc">${cat.description || 'Descubrí todos los productos disponibles.'}</p>
        <span class="category-link">
          Explorar categoría
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
      </div>
      <div class="category-card-img-wrap">
        <img src="${cat.image}" alt="${cat.name}" loading="lazy">
      </div>
    </div>
  `).join("");
}

// 3. Renderizar Sección de Productos Destacados (Top 4)
function renderFeaturedProducts() {
  const container = document.getElementById("featured-products-grid");
  if (!container) return;

  const featured = PRODUCTS.filter(p => p.featured).slice(0, 4);

  container.innerHTML = featured.map(prod => createProductCardHtml(prod)).join("");
}

// 4. Renderizar Catálogo General con Filtros y Búsqueda
function renderCatalog() {
  const container = document.getElementById("catalog-products-grid");
  const countBadge = document.getElementById("catalog-results-count");
  const emptyState = document.getElementById("catalog-empty-state");
  if (!container) return;

  let filtered = [...PRODUCTS];

  // Filtro por categoría
  if (currentCategory !== "todos") {
    if (currentCategory === "ofertas") {
      filtered = filtered.filter(p => p.oldPrice && p.oldPrice > p.price);
    } else {
      filtered = filtered.filter(p => p.category === currentCategory);
    }
  }

  // Filtro por búsqueda
  if (currentSearchQuery.trim() !== "") {
    const q = currentSearchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(q))
    );
  }

  // Ordenamiento
  if (currentSort === "precio-menor") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === "precio-mayor") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === "recientes") {
    filtered.sort((a, b) => b.id.localeCompare(a.id));
  } else {
    // Destacados por defecto
    filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  if (countBadge) {
    countBadge.textContent = `${filtered.length} producto${filtered.length !== 1 ? 's' : ''}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
  } else {
    if (emptyState) emptyState.classList.add("hidden");
    container.innerHTML = filtered.map(prod => createProductCardHtml(prod)).join("");
  }
}

// Generador de Tarjeta de Producto HTML
function createProductCardHtml(product) {
  const formattedPrice = (SITE_CONFIG.currency || "$") + product.price.toLocaleString("es-AR");
  const formattedOldPrice = product.oldPrice ? (SITE_CONFIG.currency || "$") + product.oldPrice.toLocaleString("es-AR") : null;
  
  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-card-top">
        <div class="product-card-badges">
          ${product.tag ? `<span class="badge-tag badge-${product.tag.toLowerCase().replace(/\s+/g, '-')}">${product.tag}</span>` : ''}
          ${product.discount ? `<span class="badge-discount">${product.discount}</span>` : ''}
        </div>
        <button class="product-quick-view-btn" onclick="openProductModal('${product.id}')" title="Ver detalle">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>

      <div class="product-card-img-wrap" onclick="openProductModal('${product.id}')">
        <img src="${product.image}" alt="${product.name}" loading="lazy" class="product-card-img">
      </div>

      <div class="product-card-body">
        <span class="product-card-category">${product.categoryName || 'Mundo Roma'}</span>
        <h3 class="product-card-title" onclick="openProductModal('${product.id}')" title="${product.name}">${product.name}</h3>
        
        <div class="product-card-rating">
          <div class="stars">
            ★ ★ ★ ★ ★
          </div>
          <span class="reviews-num">(${product.reviewsCount || 100})</span>
        </div>

        <div class="product-card-footer">
          <div class="product-price-block">
            <span class="price-current">${formattedPrice}</span>
            ${formattedOldPrice ? `<span class="price-old">${formattedOldPrice}</span>` : ''}
          </div>
          
          ${product.inStock ? `
            <button class="add-to-cart-btn" onclick="handleAddToCart('${product.id}', event)" title="Agregar al carrito">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>
            </button>
          ` : `
            <span class="out-of-stock-badge">Sin stock</span>
          `}
        </div>
      </div>
    </div>
  `;
}

// Acción de click en Agregar al Carrito desde la tarjeta
function handleAddToCart(productId, event) {
  if (event) event.stopPropagation();
  const product = PRODUCTS.find(p => p.id === productId);
  if (product && cart) {
    cart.addItem(product, 1);
  }
}

// Cambiar Categoría
function selectCategory(categoryId, scrollToCatalog = false) {
  currentCategory = categoryId;
  renderCategoryPills();
  renderCatalog();

  if (scrollToCatalog) {
    const catalogSection = document.getElementById("catalogo");
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

// Inicializar Búsqueda y Filtros
function initSearchAndFilters() {
  // Buscadores (Desktop y Mobile)
  const searchInputs = document.querySelectorAll(".site-search-input");
  searchInputs.forEach(input => {
    input.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value;
      // Sincronizar todos los inputs de búsqueda
      searchInputs.forEach(other => {
        if (other !== input) other.value = currentSearchQuery;
      });
      renderCatalog();
    });
  });

  // Selector de ordenamiento
  const sortSelect = document.getElementById("catalog-sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderCatalog();
    });
  }

  // Botón para resetear filtros en estado vacío
  const resetBtn = document.getElementById("reset-filters-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      currentCategory = "todos";
      currentSearchQuery = "";
      searchInputs.forEach(i => i.value = "");
      renderCategoryPills();
      renderCatalog();
    });
  }
}

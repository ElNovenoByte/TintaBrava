// ========== RENDERIZADO DE PRODUCTOS (SOLO PLAYERAS) ==========
function renderPlayeras() {
  const productsGrid = document.getElementById("products-grid");
  if (!productsGrid) return;
  productsGrid.innerHTML = "";

  // Filtrar productos con categoría "Playeras"
  const playeras = productostintabrava.filter(prod => prod.category === 'Playeras');

  playeras.forEach(playera => {
    const colDiv = document.createElement("div");
    colDiv.className = "col col-product show";
    colDiv.setAttribute("data-category", playera.subcategory);
    colDiv.setAttribute("data-id", playera.id); // Guardamos ID para identificar al hacer clic

    const badgeHTML = playera.tag ? `<span class="badge-tag">${playera.tag}</span>` : "";

    colDiv.innerHTML = `
      <div class="gorra-card-premium h-100">
        <div class="card-img-container">
          ${badgeHTML}
          <img src="${playera.image_front}" class="img-front" alt="${playera.name} Frontal" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
          <img src="${playera.image_back}" class="img-back" alt="${playera.name} Trasera" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
        </div>
        <div class="card-body-custom text-center">
          <h5 class="card-title-custom">${playera.name}</h5>
          <p class="card-text-custom">${playera.description}</p>
          <div class="price-box">$${playera.price} MXN</div>
          <button class="btn-brava-action btn-agregar-carrito">DETALLES</button>
        </div>
      </div>
    `;

    productsGrid.appendChild(colDiv);
  });
}

// ========== DELEGACIÓN DE EVENTOS PARA BOTONES "DETALLES" ==========
document.addEventListener("DOMContentLoaded", () => {
  renderPlayeras();

  const productsGrid = document.getElementById("products-grid");
  if (productsGrid) {
    productsGrid.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-agregar-carrito");
      if (!btn) return;

      const colProduct = btn.closest(".col-product");
      if (!colProduct) return;

      const productId = parseInt(colProduct.getAttribute("data-id"));
      const producto = productostintabrava.find(p => p.id === productId);
      if (producto) {
        // Guardar producto completo en localStorage
        localStorage.setItem("productoDetalle", JSON.stringify(producto));
        // Redirigir a la página de detalle (ajusta la ruta si es necesario)
        window.location.href = "prendadetalle.html";
      } else {
        console.error("Producto no encontrado");
      }
    });
  }
});

// ========== FILTROS (mejorados para mantener la delegación) ==========
function filterCategory(category, event) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }

  const products = document.querySelectorAll('.col-product');
  products.forEach(product => {
    const prodCat = product.getAttribute('data-category');
    if (category === 'todos') {
      product.classList.remove('hidden');
      product.classList.add('show');
    } else if (prodCat === category) {
      product.classList.remove('hidden');
      product.classList.add('show');
    } else {
      product.classList.remove('show');
      product.classList.add('hidden');
    }
  });
}

// Reemplazar los onclick de los botones de filtro por event listeners
document.querySelectorAll('.filter-btn').forEach(btn => {
  const originalOnclick = btn.getAttribute('onclick');
  if (originalOnclick) {
    btn.removeAttribute('onclick');
    btn.addEventListener('click', (e) => {
      const match = originalOnclick.match(/filterCategory\('(.+?)'\)/);
      if (match) {
        filterCategory(match[1], e);
      }
    });
  }
});
// ========== RENDERIZADO DE PRODUCTOS (GORRAS) ==========
function renderGorras() {
  const productsGrid = document.getElementById("products-grid");
  if (!productsGrid) return;
  productsGrid.innerHTML = "";

  const gorras = productostintabrava.filter(prod => prod.category === 'Gorras');

  gorras.forEach(gorra => {
    const colDiv = document.createElement("div");
    colDiv.className = "col col-product show";
    colDiv.setAttribute("data-category", gorra.subcategory);
    colDiv.setAttribute("data-id", gorra.id);

    const badgeHTML = gorra.tag ? `<span class="badge-tag">${gorra.tag}</span>` : "";

    colDiv.innerHTML = `
      <div class="gorra-card-premium h-100">
        <div class="card-img-container">
          ${badgeHTML}
          <img src="${gorra.image_front}" class="img-front" alt="${gorra.name} Frontal" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
          <img src="${gorra.image_back}" class="img-back" alt="${gorra.name} Trasera" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
        </div>
        <div class="card-body-custom text-center">
          <h5 class="card-title-custom">${gorra.name}</h5>
          <p class="card-text-custom">${gorra.description}</p>
          <div class="price-box">$${gorra.price} MXN</div>
          <button class="btn-brava-action btn-agregar-carrito">DETALLES</button>
        </div>
      </div>
    `;

    productsGrid.appendChild(colDiv);
  });
}

// ========== DELEGACIÓN PARA BOTONES "DETALLES" ==========
document.addEventListener("DOMContentLoaded", () => {
  renderGorras();

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
        localStorage.setItem("productoDetalle", JSON.stringify(producto));
        window.location.href = "prendadetalle.html";
      } else {
        console.error("Producto no encontrado");
      }
    });
  }
});

// ========== FILTROS (igual que en playeras) ==========
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

// Reemplazar los onclick de los botones de filtro
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
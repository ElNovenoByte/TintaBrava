const urlGorras = `http://127.0.0.1:8080/api/productos/get/gorras`; // Ajusta URL

async function renderGorras() {
  const productsGrid = document.getElementById("products-grid");
  if (!productsGrid) return;

  productsGrid.innerHTML = '<div class="text-center">Cargando productos...</div>';

  try {
    const response = await fetch(urlGorras);
    if (!response.ok) throw new Error('Error al cargar gorras');
    const gorras = await response.json();

    if (!gorras.length) {
      productsGrid.innerHTML = '<div class="text-center">No hay productos disponibles</div>';
      return;
    }

    productsGrid.innerHTML = '';

    gorras.forEach(gorra => {
      const colDiv = document.createElement("div");
      colDiv.className = "col col-product show";
      let subcat = gorra.idSubCategoria.nombre.toLowerCase();
      if (subcat === 'series/comics') subcat = 'series';
      colDiv.setAttribute("data-category", subcat);
      colDiv.setAttribute("data-id", gorra.idProducto);

      const badgeHTML = gorra.tag ? `<span class="badge-tag">${gorra.tag}</span>` : "";

      colDiv.innerHTML = `
        <div class="gorra-card-premium h-100">
          <div class="card-img-container">
            ${badgeHTML}
            <img src="${gorra.imagen1}" class="img-front" alt="${gorra.nombreProducto} Frontal" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
            <img src="${gorra.imagen2}" class="img-back" alt="${gorra.nombreProducto} Trasera" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
          </div>
          <div class="card-body-custom text-center">
            <h5 class="card-title-custom">${gorra.nombreProducto}</h5>
            <p class="card-text-custom">${gorra.descripcion}</p>
            <div class="price-box">$${gorra.precio} MXN</div>
            <button class="btn-brava-action btn-agregar-carrito">DETALLES</button>
          </div>
        </div>
      `;

      productsGrid.appendChild(colDiv);
    });
  } catch (error) {
    console.error(error);
    productsGrid.innerHTML = '<div class="text-center text-danger">Error al cargar productos</div>';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderGorras();

  const productsGrid = document.getElementById("products-grid");
  if (productsGrid) {
    productsGrid.addEventListener("click", async (e) => {
      const btn = e.target.closest(".btn-agregar-carrito");
      if (!btn) return;

      const colProduct = btn.closest(".col-product");
      if (!colProduct) return;

      const productId = parseInt(colProduct.getAttribute("data-id"));
      try {
        const response = await fetch(urlGorras);
        const gorras = await response.json();
        const producto = gorras.find(p => p.idProducto === productId);
        if (producto) {
          localStorage.setItem("productoDetalle", JSON.stringify(producto));
          window.location.href = "prendadetalle.html";
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
});

// Filtros (idéntico)
function filterCategory(category, event) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  if (event?.currentTarget) event.currentTarget.classList.add('active');

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

document.querySelectorAll('.filter-btn').forEach(btn => {
  const originalOnclick = btn.getAttribute('onclick');
  if (originalOnclick) {
    btn.removeAttribute('onclick');
    btn.addEventListener('click', (e) => {
      const match = originalOnclick.match(/filterCategory\('(.+?)'\)/);
      if (match) filterCategory(match[1], e);
    });
  }
});
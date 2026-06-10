// ========== CONFIGURACIÓN ==========
const urlPlayeras = `http://127.0.0.1:8080/api/productos/get/playeras`; // Ajusta la URL si es necesario

// ========== RENDERIZAR TARJETAS ==========
async function renderPlayeras() {
  const productsGrid = document.getElementById("products-grid");
  if (!productsGrid) return;

  productsGrid.innerHTML = '<div class="text-center">Cargando productos...</div>';

  try {
    const response = await fetch(urlPlayeras);
    if (!response.ok) throw new Error('Error al cargar playeras');
    const playeras = await response.json();

    if (!playeras.length) {
      productsGrid.innerHTML = '<div class="text-center">No hay productos disponibles</div>';
      return;
    }

    productsGrid.innerHTML = '';

    playeras.forEach(playera => {
      const colDiv = document.createElement("div");
      colDiv.className = "col col-product show";
      // Asignamos la subcategoría (en minúsculas para coincidir con los botones)
      let subcat = playera.idSubCategoria.nombre.toLowerCase();
      if (subcat === 'series/comics') subcat = 'series'; // Ajuste para que coincida con el botón "series"
      colDiv.setAttribute("data-category", subcat);
      colDiv.setAttribute("data-id", playera.idProducto);

      const badgeHTML = playera.tag ? `<span class="badge-tag">${playera.tag}</span>` : "";

      colDiv.innerHTML = `
        <div class="gorra-card-premium h-100">
          <div class="card-img-container">
            ${badgeHTML}
            <img src="${playera.imagen1}" class="img-front" alt="${playera.nombreProducto} Frontal" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
            <img src="${playera.imagen2}" class="img-back" alt="${playera.nombreProducto} Trasera" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
          </div>
          <div class="card-body-custom text-center">
            <h5 class="card-title-custom">${playera.nombreProducto}</h5>
            <p class="card-text-custom">${playera.descripcion}</p>
            <div class="price-box">$${playera.precio} MXN</div>
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

// ========== DELEGACIÓN PARA BOTONES "DETALLES" ==========
document.addEventListener("DOMContentLoaded", () => {
  renderPlayeras();

  const productsGrid = document.getElementById("products-grid");
  if (productsGrid) {
    productsGrid.addEventListener("click", async (e) => {
      const btn = e.target.closest(".btn-agregar-carrito");
      if (!btn) return;

      const colProduct = btn.closest(".col-product");
      if (!colProduct) return;

      const productId = parseInt(colProduct.getAttribute("data-id"));
      
      // Volvemos a obtener los productos para buscar el completo (o podríamos tenerlo en variable)
      try {
        const response = await fetch(urlPlayeras);
        const playeras = await response.json();
        const producto = playeras.find(p => p.idProducto === productId);
        if (producto) {
          localStorage.setItem("productoDetalle", JSON.stringify(producto));
          window.location.href = "prendadetalle.html";
        } else {
          console.error("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error al buscar producto", error);
      }
    });
  }
});

// ========== FILTROS (convierte onclick a event listeners) ==========
function filterCategory(category, event) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  if (event?.currentTarget) {
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

// Reemplazar onclick de botones de filtro (ya que usan onclick en el HTML)
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
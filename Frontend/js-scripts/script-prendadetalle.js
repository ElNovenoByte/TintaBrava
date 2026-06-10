// ========== AGREGAR AL CARRITO ==========
function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const productoExistente = carrito.find(item => item.idProducto === producto.idProducto);
  if (productoExistente) {
    productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
  } else {
    producto.cantidad = 1;
    producto.talla = "N/A";
    producto.colorSeleccionado = "N/A";
    carrito.push(producto);
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert(`🛒 Agregado al carrito:\n${producto.nombreProducto}\nPrecio: $${producto.precio}`);
}

// ========== ESCAPE HTML (seguridad) ==========
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// ========== RENDERIZAR PRODUCTO (GALERÍA CON 3 IMÁGENES) ==========
function renderizarProducto(producto) {
  const container = document.getElementById('productDetailRow');
  if (!container) return;

  // Construir array de imágenes (prioriza imagen1, imagen2, imagen3)
  let imagenes = [];
  if (producto.imagen1) imagenes.push(producto.imagen1);
  if (producto.imagen2) imagenes.push(producto.imagen2);
  if (producto.imagen3) imagenes.push(producto.imagen3);

  // Si no hay imágenes, usar placeholders
  if (imagenes.length === 0) {
    imagenes = ['https://via.placeholder.com/400x500?text=Sin+imagen'];
  }

  // Generar miniaturas (thumbnails)
  let thumbnailsHTML = '';
  imagenes.forEach((img, idx) => {
    thumbnailsHTML += `
      <div class="thumbnail-item">
        <img src="${img}" data-large="${img}" class="thumbnail-img ${idx === 0 ? 'active-thumb' : ''}" alt="Vista ${idx+1}">
      </div>
    `;
  });

  const htmlCompleto = `
    <div class="col-12 col-md-6 mb-4 mb-md-0">
      <div class="gallery-layout">
        <div class="thumbnail-vertical">
          ${thumbnailsHTML}
        </div>
        <div class="main-image-container">
          <img id="mainProductImage" class="main-product-img" src="${imagenes[0]}" alt="Vista principal">
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 d-flex align-items-center">
      <div class="details-card w-100">
        <h1 class="product-name">${escapeHTML(producto.nombreProducto)}</h1>
        <div class="product-price">$${producto.precio.toFixed(2)} MXN</div>
        <p class="product-description">${escapeHTML(producto.descripcion)}</p>
        <div class="mt-3">
          <button id="addToCartBtn" class="btn-add-cart">
            <i class="bi bi-cart-plus me-2"></i> Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = htmlCompleto;

  // --- Lógica de la galería (cambiar imagen principal al hacer clic en miniatura) ---
  const mainImage = document.getElementById('mainProductImage');
  const thumbImgs = document.querySelectorAll('.thumbnail-img');
  if (mainImage && thumbImgs.length) {
    thumbImgs.forEach(thumb => {
      thumb.addEventListener('click', function() {
        const largeSrc = this.getAttribute('data-large');
        if (largeSrc) mainImage.src = largeSrc;
        thumbImgs.forEach(t => t.classList.remove('active-thumb'));
        this.classList.add('active-thumb');
      });
    });
  }

  // --- Botón de añadir al carrito ---
  const addBtn = document.getElementById('addToCartBtn');
  if (addBtn) {
    const newBtn = addBtn.cloneNode(true);
    addBtn.parentNode.replaceChild(newBtn, addBtn);
    newBtn.addEventListener('click', () => agregarAlCarrito(producto));
  }
}

// ========== CARGA INICIAL: OBTENER PRODUCTO DESDE LOCALSTORAGE ==========
document.addEventListener('DOMContentLoaded', () => {
  const productoGuardado = localStorage.getItem('productoDetalle');
  if (productoGuardado) {
    const producto = JSON.parse(productoGuardado);
    renderizarProducto(producto);
    localStorage.removeItem('productoDetalle');
  } else {
    const container = document.getElementById('productDetailRow');
    if (container) {
      container.innerHTML = `
        <div class="col-12 text-center">
          <h3>No se encontró el producto</h3>
          <a href="playeras.html" class="btn btn-danger mt-3">Volver a la tienda</a>
        </div>
      `;
    }
  }
});
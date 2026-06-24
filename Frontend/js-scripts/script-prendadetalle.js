// ========== AGREGAR AL CARRITO ==========
function agregarAlCarrito(producto) {
  // Obtenemos el elemento del selector de tallas
  const tallaSelect = document.getElementById('tallaSelect');
  const tallaSeleccionada = tallaSelect ? tallaSelect.value : "";

  // Validación: Evitar que se agregue si no ha seleccionado una talla
  if (!tallaSeleccionada) {
    alert("Por favor, selecciona una talla antes de añadir al carrito.");
    return; // Detiene la ejecución si no hay talla
  }

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Buscamos si ya existe el producto con la MISMA TALLA en el carrito
  // Usamos (producto.idProducto || producto.sku) para asegurar compatibilidad con tus datos
  const idIdentificador = producto.idProducto || producto.sku;
  const productoExistente = carrito.find(item => (item.idProducto === idIdentificador || item.sku === idIdentificador) && item.talla === tallaSeleccionada);
  
  if (productoExistente) {
    productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
  } else {
    // Clonamos el objeto producto para asignarle la talla sin alterar el original
    const nuevoProducto = { ...producto };
    nuevoProducto.cantidad = 1;
    nuevoProducto.talla = tallaSeleccionada;
    nuevoProducto.colorSeleccionado = "N/A";
    carrito.push(nuevoProducto);
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));

   // Avisamos al carrito-sidebar (script-carrito.js) que el carrito cambió,
  // para que se vuelva a pintar sin necesidad de refrescar la página.
  document.dispatchEvent(new CustomEvent('carritoActualizado'));
  
  // FUNCIONALIDAD 3: Alerta con la talla incluida
  const nombreMostrar = producto.nombreProducto || producto.name;
  alert(`🛒 Agregado al carrito:\n${nombreMostrar}\nTalla: ${tallaSeleccionada}\nPrecio: $${parseFloat(producto.precio).toFixed(2)}`);

  // FUNCIONALIDAD 4: Redirección automática a la página index tras dar clic en "Aceptar"
  // window.location.href = 'index.html';
}

// ========== ESCAPE HTML (seguridad) ==========
function escapeHTML(str) {
  if (!str) return '';
  return str.toString().replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// ========== RENDERIZAR PRODUCTO ==========
function renderizarProducto(producto) {
  const container = document.getElementById('productDetailRow');
  if (!container) return;

  // Construir array de imágenes (compatible con urlimagenes o imagen1,2,3)
  let imagenes = [];
  if (producto.urlimagenes && producto.urlimagenes.length > 0) {
    imagenes = producto.urlimagenes;
  } else {
    if (producto.imagen1) imagenes.push(producto.imagen1);
    if (producto.imagen2) imagenes.push(producto.imagen2);
    if (producto.imagen3) imagenes.push(producto.imagen3);
  }

  if (imagenes.length === 0) {
    imagenes = ['https://via.placeholder.com/400x500?text=Sin+imagen'];
  }

  // Generar miniaturas
  let thumbnailsHTML = '';
  imagenes.forEach((img, idx) => {
    thumbnailsHTML += `
      <div class="thumbnail-item">
        <img src="${img}" data-large="${img}" class="thumbnail-img ${idx === 0 ? 'active-thumb' : ''}" alt="Vista ${idx+1}">
      </div>
    `;
  });

  // --- FUNCIONALIDAD 1: Breadcrumb Dinámico ---
  const categoriaNombre = producto.idCategoria.nombre || 'Categoría';
  const linkCategoria = categoriaNombre.toLowerCase() + '.html'; 
  const nombreMostrar = producto.nombreProducto || producto.name;

  const breadcrumbHTML = `
    <nav aria-label="breadcrumb" class="text-start mb-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.html" class="text-dark text-decoration-none">Inicio</a></li>
        <li class="breadcrumb-item"><a href="${linkCategoria}" class="text-dark text-decoration-none text-capitalize">${escapeHTML(categoriaNombre)}</a></li>
        <li class="breadcrumb-item active" aria-current="page">${escapeHTML(nombreMostrar)}</li>
      </ol>
    </nav>
  `;

  // Construcción del HTML Index
  const htmlCompleto = `
    <div> ${breadcrumbHTML} </div>
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
    
    <div class="col-12 col-md-6 d-flex align-items-center text-start">
      <div class="details-card w-100">
        <h1 class="product-name">${escapeHTML(nombreMostrar)}</h1>
        <div class="product-price">$${parseFloat(producto.precio).toFixed(2)} MXN</div>
        <p class="product-description">${escapeHTML(producto.descripcion)}</p>
        
        <p class="text-muted small mb-4">SKU: <span id="sku-display" class="fw-bold">Cargando...</span></p>

        <div class="mb-4">
          <select id="tallaSelect" class="form-select border-dark py-2 rounded-0">
            <option value="" selected disabled>Selecciona una talla</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <div class="mt-3">
          <button id="addToCartBtn" class="btn-add-cart w-100">
            <i class="bi bi-cart-plus me-2"></i> Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = htmlCompleto;

  // --- Lógica de la galería ---
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

  // --- Lógica del botón de añadir al carrito ---
  const addBtn = document.getElementById('addToCartBtn');
  if (addBtn) {
    const newBtn = addBtn.cloneNode(true);
    addBtn.parentNode.replaceChild(newBtn, addBtn);
    newBtn.addEventListener('click', () => agregarAlCarrito(producto));
  }

  // --- FUNCIONALIDAD 2: Insertar SKU desde Local Storage ---
  const skuDisplay = document.getElementById('sku-display');
  if (skuDisplay) {
    // Si el producto tiene el atributo sku, lo muestra; de lo contrario muestra 'N/D' (No Disponible)
    skuDisplay.textContent = producto.sku || 'N/D';
  }
}

// ========== CARGA INICIAL: OBTENER PRODUCTO DESDE LOCALSTORAGE ==========
document.addEventListener('DOMContentLoaded', () => {
  const productoGuardado = localStorage.getItem('productoDetalle');
  if (productoGuardado) {
    const producto = JSON.parse(productoGuardado);

    // Ésta línea permite ver la estructura de producto:
    // console.log("Datos del producto recibido:", producto);

    renderizarProducto(producto);
  } else {
    const container = document.getElementById('productDetailRow');
    if (container) {
      container.innerHTML = `
        <div class="col-12 text-center">
          <h3>No se encontró el producto</h3>
          <a href="index.html" class="btn btn-dark mt-3">Volver a la tienda</a>
        </div>
      `;
    }
  }
});
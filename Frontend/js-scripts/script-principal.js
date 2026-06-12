document.addEventListener('DOMContentLoaded', function () {
  cargarCarruselDinamico();
});

// Función para obtener todos los productos desde la API
async function obtenerTodosLosProductos() {
  try {
    const response = await fetch('http://127.0.0.1:8080/api/productos/get/todos');
    if (!response.ok) throw new Error('Error al cargar productos');
    const productos = await response.json();
    return productos;
  } catch (error) {
    console.error('Error en la API:', error);
    return [];
  }
}

// Función para mezclar array (Fisher-Yates)
function mezclarArray(array) {
  const mezclado = [...array];
  for (let i = mezclado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mezclado[i], mezclado[j]] = [mezclado[j], mezclado[i]];
  }
  return mezclado;
}

// Función para escapar HTML (seguridad)
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

async function cargarCarruselDinamico() {
  const carruselContainer = document.getElementById('carrusel-dinamico');
  if (!carruselContainer) return;

  // Mostrar loading
  carruselContainer.innerHTML = '<div class="text-center p-5">Cargando productos...</div>';

  const productos = await obtenerTodosLosProductos();
  if (!productos.length) {
    carruselContainer.innerHTML = '<div class="text-center p-5">No hay productos disponibles</div>';
    return;
  }

  // Mezclar y tomar 9 productos (o menos si hay menos)
  const productosMezclados = mezclarArray(productos);
  const productosDestacados = productosMezclados.slice(0, 9);

  let htmlContenido = '';
  
  // Generar grupos de 3 productos por slide
  for (let i = 0; i < productosDestacados.length; i += 3) {
    const isActive = i === 0 ? 'active' : '';
    const grupoProductos = productosDestacados.slice(i, i + 3);

    htmlContenido += `
      <div class="carousel-item ${isActive}">
        <div class="row justify-content-center g-4 px-5">
          ${grupoProductos.map(producto => `
            <div class="col-12 col-md-4">
              <div class="card product-card-custom carrusel-card-premium h-100 border-0 shadow-sm" style="background-color: #F5F5F5;">
                <div class="card-img-container-carrusel">
                  <img src="${producto.imagen1}" class="img-front-carrusel" alt="${escapeHTML(producto.nombreProducto)}" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
                  <img src="${producto.imagen2}" class="img-back-carrusel" alt="${escapeHTML(producto.nombreProducto)} Trasera" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
                </div>
                <div class="card-body text-center d-flex flex-column justify-content-between">
                  <div>
                    <h5 class="fw-bold m-0 text-dark" style="font-family: 'Roboto', sans-serif;">${escapeHTML(producto.nombreProducto)}</h5>
                    <p class="text-muted small mt-1">${escapeHTML(producto.descripcion)}</p>
                  </div>
                  <div>
                    <div class="fw-bold my-2" style="color: #A4161A; font-size: 1.25rem;">$${producto.precio} MXN</div>
                    <button class="btn btn-dark w-100 rounded-0 btn-brava-action" 
                      style="font-family: 'Bebas Neue', sans-serif; letter-spacing: 2px;"
                      data-id="${producto.idProducto}">
                      DETALLES
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  carruselContainer.innerHTML = htmlContenido;

  // Agregar event listeners a los botones DETALLES
  document.querySelectorAll('.btn-brava-action').forEach(btn => {
    btn.addEventListener('click', async function (e) {
      e.preventDefault();
      const id = parseInt(this.getAttribute('data-id'));
      
      // Buscar el producto completo (podría venir de la API o de la variable local)
      // Como ya tenemos los productos, podemos volver a obtenerlos o usar los ya cargados
      try {
        const response = await fetch('http://127.0.0.1:8080/api/productos/get/todos');
        const productos = await response.json();
        const producto = productos.find(p => p.idProducto === id);
        if (producto) {
          localStorage.setItem('productoDetalle', JSON.stringify(producto));
          // Ajusta la ruta según la ubicación de prendadetalle.html
          window.location.href = '../interfaces/prendadetalle.html';
        } else {
          console.error('Producto no encontrado');
        }
      } catch (error) {
        console.error('Error al buscar producto:', error);
      }
    });
  });
}
// ========== CONFIGURACIÓN DE LA API ==========
// NOTA PARA TI: Ajusta esta URL para que apunte al endpoint de tu API que devuelve TODOS los productos.
const urlTodosLosProductos = `http://127.0.0.1:8080/api/productos/get/todos`;

document.addEventListener('DOMContentLoaded', function () {
  cargarCarruselDinamico();
});

async function cargarCarruselDinamico() {
  const carruselContainer = document.getElementById('carrusel-dinamico');
  if (!carruselContainer) return;

  // Mostramos un mensaje de carga mientras la API responde
  carruselContainer.innerHTML = '<div class="text-center w-100 py-5">Cargando productos destacados...</div>';

  try {
    // 1. Obtener los productos desde la API
    const response = await fetch(urlTodosLosProductos);
    if (!response.ok) throw new Error('Error al conectar con la API de productos');
    const todosLosProductos = await response.json();

    if (!todosLosProductos || todosLosProductos.length === 0) {
      carruselContainer.innerHTML = '<div class="text-center w-100 py-5">No hay productos disponibles por el momento.</div>';
      return;
    }

    // 2. Mezclar el arreglo de manera aleatoria
    const productosMezclados = [...todosLosProductos];
    for (let i = productosMezclados.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [productosMezclados[i], productosMezclados[j]] = [productosMezclados[j], productosMezclados[i]];
    }

    // 3. Limitar a un máximo de 9 productos destacados
    const productosDestacados = productosMezclados.slice(0, 9);
    let htmlContenido = '';

    // 4. Recorrer el arreglo en bloques de 3 en 3 para armar el carrusel
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
                    ${producto.tag ? `<span class="badge-tag-carrusel">${producto.tag}</span>` : ''}
                    <img src="${producto.imagen1}" class="img-front-carrusel" alt="${producto.nombreProducto} Frontal" onerror="this.src='https://via.placeholder.com/400x400?text=Tinta+Brava+Front'">
                    <img src="${producto.imagen2}" class="img-back-carrusel" alt="${producto.nombreProducto} Trasera" onerror="this.src='https://via.placeholder.com/400x400?text=Tinta+Brava+Back'">
                  </div>

                  <div class="card-body text-center d-flex flex-column justify-content-between">
                    <div>
                      <h5 class="fw-bold m-0 text-dark" style="font-family: 'Roboto', sans-serif;">${producto.nombreProducto}</h5>
                      <p class="text-muted small mt-1">${producto.descripcion}</p>
                    </div>
                    <div>
                      <div class="fw-bold my-2" style="color: #A4161A; font-size: 1.25rem;">$${parseFloat(producto.precio).toFixed(2)} MXN</div>
                      <button 
                        class="btn btn-dark w-100 rounded-0 btn-brava-action" 
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

    // 5. Inyectar el HTML generado
    carruselContainer.innerHTML = htmlContenido;

    // 6. Asignar el evento a los botones "DETALLES" recién creados
    document.querySelectorAll('.btn-brava-action').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = parseInt(this.getAttribute('data-id'));
        
        // Buscamos el producto exacto dentro de la respuesta original de la API
        const producto = todosLosProductos.find(p => p.idProducto === id);
        
        if (!producto) return;

        // Guardamos el objeto COMPLETO en localStorage (sin perder la categoría, sku ni otros atributos de la API)
        localStorage.setItem('productoDetalle', JSON.stringify(producto));
        
        // Redirigir a la página de detalles (ajusta la ruta relativa si es necesario)
        window.location.href = '../interfaces/prendadetalle.html';
      });
    });

  } catch (error) {
    console.error("Error al poblar el carrusel:", error);
    carruselContainer.innerHTML = '<div class="text-center text-danger w-100 py-5">Hubo un problema al cargar los productos destacados.</div>';
  }
}
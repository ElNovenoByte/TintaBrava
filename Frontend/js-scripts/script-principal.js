document.addEventListener('DOMContentLoaded', function () {
  cargarCarruselDinamico();
});

function cargarCarruselDinamico() {
  const carruselContainer = document.getElementById('carrusel-dinamico');
  if (!carruselContainer) return;

  // Se clona el array global y se aplica un orden aleatorio para mezclar secciones
  const productosMezclados = [...productostintabrava];
  for (let i = productosMezclados.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [productosMezclados[i], productosMezclados[j]] = [productosMezclados[j], productosMezclados[i]];
  }

  // Limitar el carrusel a un máximo de productos destacados (funciona= 9 productos / 3 diapositivas)
  const productosDestacados = productosMezclados.slice(0, 9);

  let htmlContenido = '';
  
  // Se recorre el arreglo mezclado en bloques de 3 en 3
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
                  ${producto.tag ? `<span class="badge-tag-carrusel">${producto.tag}</span>` : ''}\
                  <img src="${producto.image_front}" class="img-front-carrusel" alt="${producto.name}" onerror="this.src='https://via.placeholder.com/400x400?text=Tinta+Brava+Front'">
                  <img src="${producto.image_back}" class="img-back-carrusel" alt="${producto.name} Trasera" onerror="this.src='https://via.placeholder.com/400x400?text=Tinta+Brava+Back'">
                </div>

                <div class="card-body text-center d-flex flex-column justify-content-between">
                  <div>
                    <h5 class="fw-bold m-0 text-dark" style="font-family: 'Roboto', sans-serif;">${producto.name}</h5>
                    <p class="text-muted small mt-1">${producto.description}</p>
                  </div>
                  <div>
                    <div class="fw-bold my-2" style="color: #A4161A; font-size: 1.25rem;">$${producto.price} MXN</div>
                    <button class="btn btn-dark w-100 rounded-0 aling-self-end btn-brava-action" style="font-family: 'Bebas Neue', sans-serif; letter-spacing: 2px;">COMPRAR</button>
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
}

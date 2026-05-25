document.addEventListener('DOMContentLoaded', function () {
  cargarCarruselDinamico();
});

function cargarCarruselDinamico() {
  const carruselContainer = document.getElementById('carrusel-dinamico');
  if (!carruselContainer) return;

  let htmlContenido = '';

  for (let i = 0; i < productostintabrava.length; i += 3) {
    const isActive = i === 0 ? 'active' : '';
    const grupoProductos = productostintabrava.slice(i, i + 3);

    htmlContenido += `
      <div class="carousel-item ${isActive}">
        <div class="row justify-content-center g-4 px-5">

          ${grupoProductos.map(producto => `
  <div class="col-12 col-md-4">
    <div class="card product-card-custom h-100 border-0 shadow-sm" style="background-color: #F5F5F5;">

      <div class="position-relative overflow-hidden" style="aspect-ratio: 1/1;">
        <img 
          src="${producto.image_front}"
          class="w-100 h-100"
          style="object-fit: cover;"
          alt="${producto.name}"
          onerror="this.src='https://via.placeholder.com/400x400?text=Tinta+Brava'"
        >
      </div>

      <div class="card-body text-center d-flex flex-column justify-content-between">

        <div>
          <h5 class="fw-bold m-0 text-dark">
            ${producto.name}
          </h5>

          <p class="text-muted small mt-1">
            ${producto.description}
          </p>
        </div>

        <div>
          <div class="fw-bold my-2" style="color: #A4161A; font-size: 1.25rem;">
            $${producto.price} MXN
          </div>

          <button class="btn btn-dark-brava w-100">
            VER DETALLES
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
}
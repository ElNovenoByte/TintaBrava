  function filterCategory(category) {
      // 1. Cambiar el botón activo en la interfaz
      const buttons = document.querySelectorAll('.filter-btn');
      buttons.forEach(btn => btn.classList.remove('active'));
      
      // Buscar el botón presionado y encenderlo
      event.currentTarget.classList.add('active');

      // 2. Filtrar las tarjetas de productos
      const products = document.querySelectorAll('.col-product');
      
      products.forEach(product => {
        const prodCat = product.getAttribute('data-category');
        
        if (category === 'todos') {
          // Si es 'todos', quitamos clases de ocultar y aplicamos la animación
          product.classList.remove('hidden');
          product.classList.add('show');
        } else if (prodCat === category) {
          // Si coincide la categoría elegida
          product.classList.remove('hidden');
          product.classList.add('show');
        } else {
          // Si no coincide, la ocultamos suavemente
          product.classList.remove('show');
          product.classList.add('hidden');
        }
      });
    }

    // Esperar a que el DOM esté completamente cargado para pintar los productos
document.addEventListener("DOMContentLoaded", () => {
  renderGorras();
});

function renderGorras() {
  const productsGrid = document.getElementById("products-grid");
  
  // Limpiamos el contenedor para eliminar las tarjetas estáticas previas
  productsGrid.innerHTML = "";

  // 1. Filtramos el array global 'productostintabrava' para renderizar solo Gorras
  const gorras = productostintabrava.filter(prod => prod.category === 'Gorras');

  // 2. Iteramos sobre cada gorra para estructurar su tarjeta premium
  gorras.forEach(gorra => {
    // Creamos el nodo de la columna de Bootstrap
    const colDiv = document.createElement("div");
    colDiv.className = "col col-product show"; // Visibles al inicio por defecto
    colDiv.setAttribute("data-category", gorra.subcategory);

    // Evaluamos dinámicamente si el objeto incluye un tag flotante (Badge)
    const badgeHTML = gorra.tag 
      ? `<span class="badge-tag">${gorra.tag}</span>` 
      : "";

    // Construcción del template HTML respetando las clases exactas de tus estilos
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
          <button class="btn-brava-action">COMPRAR</button>
        </div>
      </div>
    `;

    // Inyectamos el elemento estructurado al contenedor principal
    productsGrid.appendChild(colDiv);
  });
}

// Función encargada de manejar el filtrado interactivo por subcategorías
function filterCategory(category) {
  // 1. Cambiar el estado visual del botón activo
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }

  // 2. Evaluar y filtrar los productos renderizados en el DOM
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
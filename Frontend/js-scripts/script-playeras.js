
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

    // Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  renderPlayeras();
});

function renderPlayeras() {
  const productsGrid = document.getElementById("products-grid");
  
  // Limpiamos el grid estático que venía del HTML
  productsGrid.innerHTML = "";

  // 1. Filtramos el array global 'productostintabrava' para obtener solo Playeras
  // Nota: Asegúrate de que 'script-productos.js' se cargue antes que este archivo.
  const playeras = productostintabrava.filter(prod => prod.category === 'Playeras');

  // 2. Iteramos sobre cada playera para construir su estructura HTML idéntica
  playeras.forEach(playera => {
    // Crear el contenedor de la columna respetando las clases y el dataset para el filtro
    const colDiv = document.createElement("div");
    colDiv.className = "col col-product show"; // Inician visibles por defecto
    colDiv.setAttribute("data-category", playera.subcategory);

    // Renderizado condicional del Tag flotante (Badge) si existe en el objeto
    const badgeHTML = playera.tag 
      ? `<span class="badge-tag">${playera.tag}</span>` 
      : "";

    // Construcción del template de la tarjeta premium conservando las clases exactas
    colDiv.innerHTML = `
      <div class="gorra-card-premium h-100">
        <div class="card-img-container">
          ${badgeHTML}
          <img src="${playera.image_front}" class="img-front" alt="${playera.name} Frontal" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
          <img src="${playera.image_back}" class="img-back" alt="${playera.name} Trasera" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
        </div>
        <div class="card-body-custom text-center">
          <h5 class="card-title-custom">${playera.name}</h5>
          <p class="card-text-custom">${playera.description}</p>
          <div class="price-box">$${playera.price} MXN</div>
          <button class="btn-brava-action" style="display: none;">COMPRAR</button>
          <button class="btn-brava-action btn-agregar-carrito">AGREGAR AL CARRITO</button>
        </div>
      </div>
    `;

    // Inyectar la tarjeta estructurada al grid principal
    productsGrid.appendChild(colDiv);
  });
}

// Conservamos tu función de filtrado original abajo para que los botones sigan respondiendo
function filterCategory(category) {
  // 1. Cambiar el botón activo en la interfaz
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  // Buscar el botón presionado y encenderlo
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }

  // 2. Filtrar las tarjetas de productos dinámicas
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
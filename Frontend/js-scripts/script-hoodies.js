
    function filterCategory(category) {
      // 1. Cambiar el botón activo en la interfaz
      const buttons = document.querySelectorAll('.filter-btn');
      buttons.forEach(btn => btn.classList.remove('active'));
      
      // Buscar el botón presionado y encenderlo
      if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
      }

      // 2. Filtrar las tarjetas de productos
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


    // Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  renderHoodies();
});

function renderHoodies() {
  const productsGrid = document.getElementById("products-grid");
  
  // Limpiamos el grid estático que venía del HTML
  productsGrid.innerHTML = "";

  // 1. Filtramos el array global 'productostintabrava' para obtener solo Hoodies
  // Nota: Asegúrate de que 'script-productos.js' se cargue antes que este archivo.
  const hoodies = productostintabrava.filter(prod => prod.category === 'Hoodies');

  // 2. Iteramos sobre cada hoodie para construir su estructura HTML idéntica
  hoodies.forEach(hoodie => {
    // Crear el contenedor de la columna respetando las clases y el dataset para el filtro
    const colDiv = document.createElement("div");
    colDiv.className = "col col-product show"; // Inician visibles por defecto
    colDiv.setAttribute("data-category", hoodie.subcategory);

    // Renderizado condicional del Tag flotante (Badge) si existe en el objeto
    const badgeHTML = hoodie.tag 
      ? `<span class="badge-tag">${hoodie.tag}</span>` 
      : "";

    // Construcción del template de la tarjeta premium conservando las clases exactas
    colDiv.innerHTML = `
      <div class="gorra-card-premium h-100">
        <div class="card-img-container">
          ${badgeHTML}
          <!-- Imagen Frontal -->
          <img src="${hoodie.image_front}" class="img-front" alt="${hoodie.name} Frontal" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
          <!-- Imagen Trasera -->
          <img src="${hoodie.image_back}" class="img-back" alt="${hoodie.name} Trasera" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
        </div>
        <div class="card-body-custom text-center">
          <h5 class="card-title-custom">${hoodie.name}</h5>
          <p class="card-text-custom">${hoodie.description}</p>
          <div class="price-box">$${hoodie.price} MXN</div>
          <button class="btn-brava-action">COMPRAR</button>
        </div>
      </div>
    `;

    // Inyectar la tarjeta estructurada al grid principal
    productsGrid.appendChild(colDiv);
  });
}
  
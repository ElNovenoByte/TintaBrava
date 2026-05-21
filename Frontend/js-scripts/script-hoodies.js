
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
  
document.addEventListener('DOMContentLoaded', function () {
    // 1. La función que genera el carrusel
    function renderCarousel(products, containerId) {
        const container = document.getElementById(containerId);
        if (!container || !products) return;

        let htmlContent = '';
        const groupSize = 3; // Grupos de 3 para el carrusel

        for (let i = 0; i < products.length; i += groupSize) {
            const group = products.slice(i, i + groupSize);
            const isActive = i === 0 ? 'active' : '';

            htmlContent += `
                <div class="carousel-item ${isActive}">
                    <div class="row row-cols-1 row-cols-md-3 g-4">
                        ${group.map(p => `
                            <div class="col">
                                <div class="card h-100 product-card-custom shadow-sm border-0">
                                    <img src="${p.image || 'https://via.placeholder.com/300x300?text=Tinta+Brava'}" 
                                         class="card-img-top p-3" alt="${p.name}"
                                         onerror="this.src='https://via.placeholder.com/300x300?text=Tinta+Brava'">
                                    <div class="card-body text-center">
                                        <h5 class="card-title brand-text">${p.name}</h5>
                                        <p class="price-text">$${p.price.toLocaleString()} MXN</p>
                                        <button class="btn btn-dark-brava w-100" onclick="console.log('ID: ${p.id}')">
                                            DETALLES
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
        }
        container.innerHTML = htmlContent;
    }

    // 2. Llamamos a la función usando tu array del otro script
    // Nota: 'productostintabrava' debe estar cargado antes en el HTML
    if (typeof productostintabrava !== 'undefined') {
        renderCarousel(productostintabrava, 'carrusel-dinamico');
    }
});
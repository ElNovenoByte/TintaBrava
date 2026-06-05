// Producto de ejemplo pa ver cómo se visualiza
const ejemploProducto = {
    SKU: Math.floor(Math.random() * 1000000),
    name: 'Essential Cap Homero',
    price: 240,
    category: 'Gorras',
    subcategory: 'otros',
    color: ["Rojo"],
    description: 'Gorra lisa de alta resistencia con estampado de los Simpsons, ajuste cómodo y estilo único.',
    size: ["Default"],
    urlimagenes: [
        "../imagenes/productos/gorras/gorrasotros/gorrassimples/gorra1.jpg",
        "../imagenes/productos/gorras/gorrasotros/gorrassimples/gorra1-2.jpg",
        "../imagenes/productos/gorras/gorrasotros/gorrassimples/gorra1-3.jpg"
    ]
};

function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Mapeo de nombres de color a valores hex (o bueno del css)
function mapColorName(colorName) {
    const map = {
        'Negro': '#000000',
        'Rojo': '#ff1024',
        'Azul': '#1E6091',
        'Blanco': '#F8F9FA',
        'Verde': '#2A9D8F'
    };
    return map[colorName] || colorName;
}

function renderizarProducto(producto) {
    const container = document.getElementById('productDetailRow');
    if (!container) return;

    const tieneDefault = producto.color.some(c => c.toLowerCase() === 'default');
    const tallas = producto.size || ["Unitalla"];
    const imagenes = producto.urlimagenes.slice(0, 3); 

    let thumbnailsHTML = '';
    imagenes.forEach((img, idx) => {
        thumbnailsHTML += `
            <div class="thumbnail-item">
                <img src="${img}" data-large="${img}" class="thumbnail-img ${idx === 0 ? 'active-thumb' : ''}" alt="Vista ${idx+1}">
            </div>
        `;
    });

    let coloresHTML = '';
    if (tieneDefault) {
        coloresHTML = `
            <div class="rainbow-swatch">
                <div class="rainbow-box"></div>
                <span class="rainbow-text">Default</span>
            </div>
        `;
    } else {
        coloresHTML = `<div class="d-flex flex-wrap gap-3" id="colorCirclesWrapper">`;
        producto.color.forEach(color => {
            const bgColor = mapColorName(color);
            coloresHTML += `
                <div class="color-option" data-color="${escapeHTML(color)}" style="background-color: ${bgColor};"></div>
            `;
        });
        coloresHTML += `</div><small class="text-muted mt-1 d-block">Selecciona un color</small>`;
    }

    const htmlCompleto = `
        <!-- Columna izquierda: galería -->
        <div class="col-12 col-md-6 mb-4 mb-md-0">
            <div class="gallery-layout">
                <div class="thumbnail-vertical">
                    ${thumbnailsHTML}
                </div>
                <div class="main-image-container">
                    <img id="mainProductImage" class="main-product-img" src="${imagenes[0] || ''}" alt="Vista principal">
                </div>
            </div>
        </div>
        <!-- Columna derecha: detalles -->
        <div class="col-12 col-md-6 d-flex align-items-center">
            <div class="details-card w-100">
                <h1 class="product-name">${escapeHTML(producto.name)}</h1>
                <div class="product-price">$${producto.price.toFixed(2)} MXN</div>
                <p class="product-description">${escapeHTML(producto.description)}</p>
                
                <!-- Selector de talla -->
                <div class="mb-4">
                    <label class="section-label d-block">Talla disponible</label>
                    <select id="sizeSelector" class="form-select form-select-custom w-100">
                        ${tallas.map(t => `<option value="${escapeHTML(t)}">${escapeHTML(t)}</option>`).join('')}
                    </select>
                </div>
                
                <!-- Selector de colores -->
                <div class="mb-4">
                    <div class="section-label d-block">Color / Diseño</div>
                    <div id="colorSelectorContainer" class="d-flex flex-wrap align-items-center gap-3 mt-2">
                        ${coloresHTML}
                    </div>
                </div>
                
                <!-- Botón añadir al carrito -->
                <div class="mt-3">
                    <button id="addToCartBtn" class="btn-add-cart">
                        <i class="bi bi-cart-plus me-2"></i> Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = htmlCompleto;

    // ---------- Galería ----------
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

    // ---------- Parte de mostrar los colores (aunque si es default va rainbow) ----------
    if (!tieneDefault) {
        const colorOptions = document.querySelectorAll('.color-option');
        let selectedColor = producto.color[0] || null;
        if (colorOptions.length) {
            colorOptions[0].classList.add('selected-color');
            selectedColor = producto.color[0];
        }
        colorOptions.forEach(opt => {
            opt.addEventListener('click', function() {
                selectedColor = this.getAttribute('data-color');
                colorOptions.forEach(c => c.classList.remove('selected-color'));
                this.classList.add('selected-color');
            });
        });
        window.getSelectedColor = () => selectedColor;
    } else {
        window.getSelectedColor = () => "Default (diseño único)";
    }

    // ---------- Añadir al carrito ----------
    const addBtn = document.getElementById('addToCartBtn');
    if (addBtn) {
        const newBtn = addBtn.cloneNode(true);
        addBtn.parentNode.replaceChild(newBtn, addBtn);
        newBtn.addEventListener('click', () => {
            const sizeSelect = document.getElementById('sizeSelector');
            const tallaElegida = sizeSelect ? sizeSelect.value : (producto.size[0] || 'Unitalla');
            let colorElegido = window.getSelectedColor ? window.getSelectedColor() : 'No definido';
            alert(`🛒 Agregado al carrito:\nProducto: ${producto.name}\nTalla: ${tallaElegida}\nColor: ${colorElegido}\nPrecio: $${producto.price}`);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarProducto(ejemploProducto);
});
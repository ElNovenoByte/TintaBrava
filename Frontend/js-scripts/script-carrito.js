document.addEventListener("DOMContentLoaded", function() {

    // Referencias a elementos clave del DOM para manipulación dinámica
    const listaItems = document.getElementById("lista-items");
    const montoTotalHTML = document.getElementById("monto-total");
    const btnPagar = document.getElementById("btn-pagar");
    const contenedorCarritoActivo = document.getElementById("contenedor-carrito-activo");
    const seccionVacía = document.getElementById("seccion-vacía");

    
    const modalElemento = document.getElementById("modalConfirmacion");
    const bootstrapModal = new bootstrap.Modal(modalElemento);
    const btnModalOK = document.getElementById("btn-modal-ok");

    // Variables de control global de la sesión del carrito
    let itemSeleccionadoParaEliminar = null;
    let nombreProductoAEliminar = null;
    let productosEnCarrito = [];

    // Función para obtener el estado actual del carrito desde localStorage
    function obtenerCarrito() {
        productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    }

    // Función para actualizar el estado del carrito en localStorage después de cualquier cambio
    function actualizarLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
    }

    // Función principal para renderizar el carrito en la interfaz de usuario
    function renderizarCarrito() {
        obtenerCarrito();
        listaItems.innerHTML = ""; // Limpia contenedor para evitar duplicados

        if (productosEnCarrito.length === 0) {
            contenedorCarritoActivo.style.display = "none";
            seccionVacía.style.display = "block";
            return;
        }

        contenedorCarritoActivo.style.display = "block";
        seccionVacía.style.display = "none";

        productosEnCarrito.forEach((producto) => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "item-producto";
            // Agregamos atributos personalizados para facilitar futuras manipulaciones (como cantidad y precio base)
            itemDiv.setAttribute("data-nombre", producto.name);
            itemDiv.setAttribute("data-precio-base", producto.price);

            const subtotalItem = producto.price * producto.cantidad;

            // Construcción del template HTML para cada producto en el carrito
            itemDiv.innerHTML = `
                <div class="bloque-izquierdo">
                    <input type="checkbox" class="check-producto" checked>
                    <a href="../interfaces/prendadetalle.html" class="link-producto">
                        <img src="${producto.image_front}" class="imagen-cuadro" alt="${producto.name}" style="width:80px; height:80px; object-fit:cover; border-radius:4px;" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
                    </a>
                </div>
                
                <div class="bloque-centro">
                    <a class="descripcion-producto" href="../interfaces/prendadetalle.html" class="link-producto"> 
                        ${producto.description || "Descripción no disponible"}
                    </a>
                </div>
                
                <div class="bloque-derecho">
                    <div class="control-cantidad">
                        <span class="texto-etiqueta">Cantidad</span>
                        <div class="opciones-cantidad">
                            <span class="link-eliminar">Eliminar</span>
                            <div class="grupo-contador">
                                <button class="btn-menos">-</button>
                                <input type="text" class="input-numero" value="${producto.cantidad}" readonly>
                                <button class="btn-mas">+</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="control-precio">
                        <span class="texto-etiqueta">Precio</span>
                        <p class="precio-texto">$${subtotalItem.toFixed(2)}</p>
                    </div>
                </div>
            `;

            listaItems.appendChild(itemDiv);
        });

        calcularTotales();
    }

    // Función para calcular el total acumulado de los productos seleccionados en el carrito
    function calcularTotales() {
        let totalAcumulado = 0;
        const items = document.querySelectorAll(".item-producto");

        items.forEach(function(item) {
            const checkbox = item.querySelector(".check-producto");
            const precioBase = parseFloat(item.getAttribute("data-precio-base"));
            const inputCantidad = item.querySelector(".input-numero");
            const precioTextoHTML = item.querySelector(".precio-texto");
            
            let cantidadActual = parseInt(inputCantidad.value);
            let subtotalItem = cantidadActual * precioBase;
            
            precioTextoHTML.innerText = "$" + subtotalItem.toFixed(2);

            if (checkbox.checked) {
                totalAcumulado += subtotalItem;
                item.classList.remove("item-desactivado");
            } else {
                item.classList.add("item-desactivado");
            }
        });

        montoTotalHTML.innerText = "$" + totalAcumulado.toFixed(2);
        btnPagar.disabled = (totalAcumulado === 0);
    }

    // Listener de eventos para la interacción con los productos listados en el carrito
    listaItems.addEventListener("click", function(evento) {
        const item = evento.target.closest(".item-producto");
        if (!item) return;

        const nombreProd = item.getAttribute("data-nombre");
        // Buscamos la referencia del objeto dentro de nuestro arreglo local de memoria
        const productoEnArreglo = productosEnCarrito.find(p => p.name === nombreProd);

        if (!productoEnArreglo) return;

        // Incrementar unidades (+)
        if (evento.target.classList.contains("btn-mas")) {
            productoEnArreglo.cantidad++;
            actualizarLocalStorage();
            renderizarCarrito(); // Re-renderiza para actualizar vistas y precios de forma limpia
        }

        // Decrementar unidades (-)
        else if (evento.target.classList.contains("btn-menos")) {
            if (productoEnArreglo.cantidad > 1) {
                productoEnArreglo.cantidad--;
                actualizarLocalStorage();
                renderizarCarrito();
            } else {
                // Si intenta bajar de 1, levanta el modal de confirmación
                itemSeleccionadoParaEliminar = item;
                nombreProductoAEliminar = nombreProd;
                bootstrapModal.show();
            }
        }

        // Quitar producto (Eliminar)
        else if (evento.target.classList.contains("link-eliminar")) {
            itemSeleccionadoParaEliminar = item;
            nombreProductoAEliminar = nombreProd;
            bootstrapModal.show();
        }
    });

    // Escuchador para el botón de confirmación del modal de eliminación
    btnModalOK.addEventListener("click", function() {
        if (nombreProductoAEliminar && itemSeleccionadoParaEliminar) {
            // Animación visual de desvanecimiento
            itemSeleccionadoParaEliminar.style.transition = "opacity 0.3s ease";
            itemSeleccionadoParaEliminar.style.opacity = "0";
            
            setTimeout(function() {
                // Filtrar el arreglo para remover el producto
                productosEnCarrito = productosEnCarrito.filter(p => p.name !== nombreProductoAEliminar);
                actualizarLocalStorage();
                
                // Limpiar variables de control
                itemSeleccionadoParaEliminar = null;
                nombreProductoAEliminar = null;
                
                // Volver a evaluar el estado general de la vista
                renderizarCarrito();
            }, 300);
        }
        bootstrapModal.hide();
    });

    // Escuchador para el cambio de estado de los checkboxes para recalcular totales en tiempo real
    listaItems.addEventListener("change", function(evento) {
        if (evento.target.classList.contains("check-producto")) {
            calcularTotales();
        }
    });

    // Renderizamos el carrito al cargar la página para mostrar el estado actual de los productos seleccionados
    renderizarCarrito();
});
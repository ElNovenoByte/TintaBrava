document.addEventListener("DOMContentLoaded", function() {

    // Referencias a elementos clave del DOM
    const listaItems = document.getElementById("lista-items");
    const montoTotalHTML = document.getElementById("monto-total");
    const btnPagar = document.getElementById("btn-pagar");
    const contenedorCarritoActivo = document.getElementById("contenedor-carrito-activo");
    const seccionVacía = document.getElementById("seccion-vacía");

    const modalElemento = document.getElementById("modalConfirmacion");
    const bootstrapModal = new bootstrap.Modal(modalElemento);
    const btnModalOK = document.getElementById("btn-modal-ok");

    // Variables de control
    let itemSeleccionadoParaEliminar = null;
    let nombreProductoAEliminar = null;
    let idProductoAEliminar = null;
    let productosEnCarrito = [];

    // =========================
    // NORMALIZAR PRODUCTO
    // =========================
    function normalizarProducto(prod) {
        return {
            id: prod.idProducto || prod.id,
            name: prod.nombreProducto || prod.name,
            price: prod.precio || prod.price,
            description: prod.descripcion || prod.description,
            category: prod.idCategoria?.nombre || prod.category,
            subcategory: prod.idSubCategoria?.nombre || prod.subcategory,
            image_front: prod.imagen1 || prod.image_front,
            image_back: prod.imagen2 || prod.image_back,
            urlimagenes:
                prod.urlimagenes ||
                [prod.imagen1, prod.imagen2, prod.imagen3].filter(Boolean),
            cantidad: prod.cantidad || 1,

            seleccionado:
                prod.seleccionado !== undefined
                    ? prod.seleccionado
                    : true
        };
    }

    // =========================
    // OBTENER CARRITO
    // =========================
    function obtenerCarrito() {
        const rawCarrito =
            JSON.parse(localStorage.getItem("carrito")) || [];

        productosEnCarrito =
            rawCarrito.map(prod => normalizarProducto(prod));
    }

    // =========================
    // ACTUALIZAR STORAGE
    // =========================
    function actualizarLocalStorage() {
        localStorage.setItem(
            "carrito",
            JSON.stringify(productosEnCarrito)
        );
    }

    // =========================
    // RENDERIZAR CARRITO
    // =========================
    function renderizarCarrito() {

        obtenerCarrito();

        listaItems.innerHTML = "";

        if (productosEnCarrito.length === 0) {

            contenedorCarritoActivo.style.display = "none";
            seccionVacía.style.display = "block";

            montoTotalHTML.innerText = "$0.00";
            btnPagar.disabled = true;

            return;
        }

        contenedorCarritoActivo.style.display = "block";
        seccionVacía.style.display = "none";

        productosEnCarrito.forEach((producto) => {

            const itemDiv = document.createElement("div");

            itemDiv.className = "item-producto";
            itemDiv.setAttribute("data-precio-base", producto.price);
            itemDiv.setAttribute("data-id", producto.id);

            const subtotalItem =
                producto.price * producto.cantidad;

            itemDiv.innerHTML = `
                <div class="bloque-izquierdo">
                    <input
                        type="checkbox"
                        class="check-producto"
                        ${producto.seleccionado ? "checked" : ""}
                    >

                    <a href="../interfaces/prendadetalle.html" class="link-producto">
                        <img
                            src="${producto.image_front}"
                            class="imagen-cuadro"
                            alt="${producto.name}"
                            style="width:80px;height:80px;object-fit:cover;border-radius:4px;"
                            
                            onerror="this.src='../imagenes/logo/TintaBrava_SinFondo.webp'"
                        >
                    </a>
                </div>

                <div class="bloque-centro">
                    <a
                        class="nombre-producto link-producto"
                        href="../interfaces/prendadetalle.html"
                    >
                        ${producto.name}
                    </a>

                    <a
                        class="descripcion-producto link-producto"
                        href="../interfaces/prendadetalle.html"
                    >
                        ${producto.description || "Descripción no disponible"}
                    </a>
                </div>

                <div class="bloque-derecho">

                    <div class="control-cantidad">

                        <span class="texto-etiqueta">
                            Cantidad
                        </span>

                        <div class="opciones-cantidad">

                            <span class="link-eliminar">
                                Eliminar
                            </span>

                            <div class="grupo-contador">

                                <button class="btn-menos">
                                    -
                                </button>

                                <input
                                    type="text"
                                    class="input-numero"
                                    value="${producto.cantidad}"
                                    readonly
                                >

                                <button class="btn-mas">
                                    +
                                </button>

                            </div>

                        </div>

                    </div>

                    <div class="control-precio">

                        <span class="texto-etiqueta">
                            Precio
                        </span>

                        <p class="precio-texto">
                            $${subtotalItem.toFixed(2)}
                        </p>

                    </div>

                </div>
            `;

            listaItems.appendChild(itemDiv);
        });

        calcularTotales();
    }

    // =========================
    // CALCULAR TOTALES
    // =========================
    function calcularTotales() {

        let totalAcumulado = 0;

        const items =
            document.querySelectorAll(".item-producto");

        items.forEach(function(item) {

            const checkbox =
                item.querySelector(".check-producto");

            const precioBase =
                parseFloat(
                    item.getAttribute("data-precio-base")
                );

            const inputCantidad =
                item.querySelector(".input-numero");

            const precioTextoHTML =
                item.querySelector(".precio-texto");

            const cantidadActual =
                parseInt(inputCantidad.value);

            const subtotalItem =
                cantidadActual * precioBase;

            precioTextoHTML.innerText =
                "$" + subtotalItem.toFixed(2);

            if (checkbox.checked) {

                totalAcumulado += subtotalItem;

                item.classList.remove(
                    "item-desactivado"
                );

            } else {

                item.classList.add(
                    "item-desactivado"
                );
            }
        });

        montoTotalHTML.innerText =
            "$" + totalAcumulado.toFixed(2);

        btnPagar.disabled =
            totalAcumulado === 0;
    }

    // =========================
    // CLICK EN BOTONES
    // =========================
    listaItems.addEventListener("click", function(evento) {

        const item =
            evento.target.closest(".item-producto");

        if (!item) return;

        const idProducto =
            parseInt(item.getAttribute("data-id"));

        const productoEnArreglo =
            productosEnCarrito.find(
                p => p.id === idProducto
            );

        if (!productoEnArreglo) return;

        // Aumentar cantidad
        if (evento.target.classList.contains("btn-mas")) {

            productoEnArreglo.cantidad++;

            actualizarLocalStorage();
            renderizarCarrito();
        }

        // Disminuir cantidad
        else if (evento.target.classList.contains("btn-menos")) {

            if (productoEnArreglo.cantidad > 1) {

                productoEnArreglo.cantidad--;

                actualizarLocalStorage();
                renderizarCarrito();

            } else {

                itemSeleccionadoParaEliminar =
                    item;

                nombreProductoAEliminar =
                    productoEnArreglo.name;

                idProductoAEliminar =
                    idProducto;

                bootstrapModal.show();
            }
        }

        // Eliminar producto
        else if (
            evento.target.classList.contains(
                "link-eliminar"
            )
        ) {

            itemSeleccionadoParaEliminar =
                item;

            nombreProductoAEliminar =
                productoEnArreglo.name;

            idProductoAEliminar =
                idProducto;

            bootstrapModal.show();
        }
    });

    // =========================
    // CONFIRMAR ELIMINACIÓN
    // =========================
    btnModalOK.addEventListener("click", function() {

        if (
            idProductoAEliminar &&
            itemSeleccionadoParaEliminar
        ) {

            itemSeleccionadoParaEliminar.style.transition =
                "opacity 0.3s ease";

            itemSeleccionadoParaEliminar.style.opacity =
                "0";

            setTimeout(function() {

                productosEnCarrito =
                    productosEnCarrito.filter(
                        p =>
                            p.id !==
                            idProductoAEliminar
                    );

                actualizarLocalStorage();

                itemSeleccionadoParaEliminar =
                    null;

                nombreProductoAEliminar =
                    null;

                idProductoAEliminar =
                    null;

                renderizarCarrito();

            }, 300);
        }

        bootstrapModal.hide();
    });

    // =========================
    // CHECKBOXES
    // =========================
    listaItems.addEventListener("change", function(evento) {

        if (
            evento.target.classList.contains(
                "check-producto"
            )
        ) {

            const item =
                evento.target.closest(
                    ".item-producto"
                );

            const idProducto =
                parseInt(
                    item.getAttribute("data-id")
                );

            const producto =
                productosEnCarrito.find(
                    p => p.id === idProducto
                );

            if (producto) {

                producto.seleccionado =
                    evento.target.checked;

                actualizarLocalStorage();
            }

            calcularTotales();
        }
    });

    
    // BOTÓN PAGAR
    // =========================
    btnPagar.addEventListener("click", async function () {

        try {

            // Obtener usuario logueado
            const usuarioLogueado = JSON.parse(
                localStorage.getItem("usuarioLogueado")
            );

            if (!usuarioLogueado) {

                Swal.fire({
                    icon: "error",
                    title: "Debes iniciar sesión",
                    text: "Inicia sesión para realizar tu compra"
                });

                return;
            }

            const idUsuario = usuarioLogueado.idUsuario;

            // Buscar cliente asociado
            const responseCliente = await fetch(
                `http://localhost:8080/api/clientes/usuario/${idUsuario}`
            );

            if (!responseCliente.ok) {
                throw new Error("No se encontró el cliente");
            }

            const cliente = await responseCliente.json();

            const idCliente = cliente.idCliente;

            // =========================
            // VALIDAR DIRECCIÓN
            // =========================
            if (!cliente.direccion || cliente.direccion.trim() === "") {

                const { value: direccion } = await Swal.fire({
                    title: "Dirección de entrega",
                    input: "text",
                    inputLabel: "Ingresa tu dirección",
                    inputPlaceholder: "Ej. Av. Insurgentes 123",
                    confirmButtonText: "Guardar",
                    allowOutsideClick: false,
                    inputValidator: (value) => {
                        if (!value) {
                            return "Debes ingresar una dirección";
                        }
                    }
                });

                const responseUpdate = await fetch(
                    `http://localhost:8080/api/clientes/${idCliente}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            direccion: direccion
                        })
                    }
                );

                if (!responseUpdate.ok) {
                    throw new Error(
                        "No se pudo guardar la dirección"
                    );
                }

                cliente.direccion = direccion;
            }

            // =========================
            // CREAR PEDIDO
            // =========================
            const responsePedido = await fetch(
                `http://localhost:8080/api/pedidos/cliente/${idCliente}`,
                {
                    method: "POST"
                }
            );

            if (!responsePedido.ok) {
                throw new Error("No se pudo crear el pedido");
            }

            const pedido = await responsePedido.json();

            const idPedido = pedido.idPedido;

            console.log("Pedido creado:", idPedido);

            // Productos seleccionados
            const productosSeleccionados =
                productosEnCarrito.filter(
                    p => p.seleccionado
                );

            // Guardar cada detalle
            for (const producto of productosSeleccionados) {

                const detallePedido = {

                    pedido: {
                        idPedido: idPedido
                    },

                    producto: {
                        idProducto: producto.id
                    },

                    cantidadProducto: producto.cantidad,

                    total:
                        producto.price *
                        producto.cantidad
                };

                const responseDetalle = await fetch(
                    "http://localhost:8080/api/detalles-pedido/crear/detalle-pedido",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(
                            detallePedido
                        )
                    }
                );

                if (!responseDetalle.ok) {

                    throw new Error(
                        `Error guardando producto ${producto.name}`
                    );
                }
            }

            // Vaciar carrito
            localStorage.removeItem("carrito");

            renderizarCarrito();

            Swal.fire({
                icon: "success",
                title: "Pedido realizado",
                text: "Tu pedido ha sido creado correctamente",
                confirmButtonText: "Aceptar"
            }).then(() => {

                window.location.href =
                    "principal.html";
            });

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message
            });
        }
    });

    // =========================
    // INICIO
    // =========================
    renderizarCarrito();
});
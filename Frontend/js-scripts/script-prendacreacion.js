(() => {
    'use strict';

    const form = document.getElementById('product-form');
    if (!form) return;

    // Validación en tiempo real (Bootstrap)
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            } else {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
            }
        });
    });

    // Envío del formulario
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        // Validar que se hayan seleccionado 3 imágenes
        const img1 = document.getElementById('imagen-1');
        const img2 = document.getElementById('imagen-2');
        const img3 = document.getElementById('imagen-3');
        if (!img1.files[0] || !img2.files[0] || !img3.files[0]) {
            alert('Debes seleccionar las 3 imágenes del producto.');
            return;
        }

        // Obtener valores del formulario
        const nombre = document.getElementById('form-nombre').value.trim();
        const precio = parseFloat(document.getElementById('form-precio').value);
        const idCategoria = parseInt(document.getElementById('form-categoria').value);
        const idSubCategoria = parseInt(document.getElementById('form-subcategoria').value);
        const descripcion = document.getElementById('form-descripcion').value.trim();

        // Preparar FormData con los datos
        const formData = new FormData();
        formData.append('nombreProducto', nombre);
        formData.append('precio', precio);
        formData.append('descripcion', descripcion);
        formData.append('idCategoria', idCategoria);
        formData.append('idSubCategoria', idSubCategoria);
        formData.append('imagen1', img1.files[0]);
        formData.append('imagen2', img2.files[0]);
        formData.append('imagen3', img3.files[0]);

        // Enviar al backend
        try {
            const response = await fetch('http://localhost:8080/api/productos/post/nuevo-producto', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            alert('Producto creado correctamente');
            console.log('Respuesta del servidor:', data);
            form.reset();
            form.classList.remove('was-validated');
            inputs.forEach(i => i.classList.remove('is-valid', 'is-invalid'));
        } catch (error) {
            console.error('Error al crear producto:', error);
            alert('Error al crear el producto. Revisa la consola para más detalles.');
        }
    });
})();
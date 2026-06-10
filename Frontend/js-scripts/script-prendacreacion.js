// ========================
// 1. Elementos del DOM y variables globales
// ========================
const form = document.querySelector('form');
const submitBtn = document.getElementById('submit');
const imagenesContainer = document.getElementById('imagen-1');
const btnAgregar = document.getElementById('btnAgregarImagen');

let contadorImagenes = 1;   // Empezamos con 1 input

// Lista de campos fijos (para reactivar botón)
const camposFijos = [
    document.getElementById('nombre'),
    document.getElementById('categoria'),
    document.getElementById('subcategoria'),
    document.getElementById('descripcion'),
    document.getElementById('precio'),
    document.getElementById('colores')
];

// ========================
// 2. Funciones de validación (igual que antes)
// ========================

function noVacio(valor, nombreCampo) {
    if (!valor || valor.trim() === '') {
        return `El campo "${nombreCampo}" no puede estar vacío.`;
    }
    return null;
}

function maxLength(valor, max, nombreCampo) {
    if (valor.length > max) {
        return `El campo "${nombreCampo}" excede los ${max} caracteres (actual: ${valor.length}).`;
    }
    return null;
}

function validarPrecio(precioStr) {
    let precio = precioStr.replace(',', '.');
    const regex = /^\d+(\.\d{1,2})?$/;
    if (!regex.test(precio)) {
        return 'El precio debe ser un número positivo con hasta 2 decimales (ej: 10, 10.5, 10.99).';
    }
    const num = parseFloat(precio);
    if (num <= 0) {
        return 'El precio debe ser mayor que 0.';
    }
    return null;
}

function validarColores(selectElement) {
    const opcionesSeleccionadas = Array.from(selectElement.selectedOptions);
    const valores = opcionesSeleccionadas.map(opt => opt.value);
    
    if (valores.length === 0) {
        return { error: 'Debes seleccionar al menos un color. Si no eliges ninguno, selecciona "Default".', coloresValidos: null };
    }
    
    if (valores.includes('Default')) {
        if (valores.length > 1) {
            return { error: 'Si seleccionas "Default", no puedes elegir otros colores.', coloresValidos: null };
        } else {
            return { error: null, coloresValidos: ['Default'] };
        }
    }
    
    const unicos = [...new Set(valores)];
    return { error: null, coloresValidos: unicos };
}

// Nueva función para validar las imágenes dinámicas
function validarImagenesDinamicas() {
    const inputsImagen = document.querySelectorAll('.imagen-item input[type="file"]');
    let archivosValidos = [];
    let errores = [];
    
    if (inputsImagen.length === 0) {
        return { error: 'Debe haber al menos una imagen.', archivosValidos: [] };
    }
    
    for (let i = 0; i < inputsImagen.length; i++) {
        const input = inputsImagen[i];
        const archivo = input.files[0];
        
        if (!archivo) {
            errores.push(`Imagen ${i+1}: no se ha seleccionado ningún archivo.`);
            continue;
        }
        
        // Validar tipo
        const tiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!tiposPermitidos.includes(archivo.type)) {
            errores.push(`Imagen ${i+1} (${archivo.name}): formato no válido. Solo JPG, JPEG, PNG.`);
            continue;
        }
        
        // Validar tamaño (2MB)
        const maxSizeBytes = 2 * 1024 * 1024;
        if (archivo.size > maxSizeBytes) {
            errores.push(`Imagen ${i+1} (${archivo.name}): supera el tamaño máximo de 2 MB.`);
            continue;
        }
        
        archivosValidos.push(archivo);
    }
    
    if (archivosValidos.length === 0) {
        return { error: 'No se ha subido ninguna imagen válida. Debes subir al menos una imagen correcta.', archivosValidos: [] };
    }
    
    if (archivosValidos.length < 1) {
        return { error: 'Debes subir al menos 1 imagen.', archivosValidos: [] };
    }
    
    if (archivosValidos.length > 3) {
        return { error: `Máximo 3 imágenes. Has subido ${archivosValidos.length}.`, archivosValidos: [] };
    }
    
    if (errores.length > 0) {
        return { error: errores.join(' '), archivosValidos: [] };
    }
    
    return { error: null, archivosValidos: archivosValidos };
}

// Validación completa del formulario (incluye imágenes dinámicas)
function validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const subcategoria = document.getElementById('subcategoria').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const selectColores = document.getElementById('colores');
    
    const errores = {};
    
    let err = noVacio(nombre, 'Nombre');
    if (!err) err = maxLength(nombre, 100, 'Nombre');
    if (err) errores.nombre = err;
    
    err = noVacio(categoria, 'Categoría');
    if (err) errores.categoria = err;
    
    err = noVacio(subcategoria, 'Subcategoría');
    if (err) errores.subcategoria = err;
    
    err = noVacio(descripcion, 'Descripción');
    if (!err) err = maxLength(descripcion, 500, 'Descripción');
    if (err) errores.descripcion = err;
    
    err = validarPrecio(precio);
    if (err) errores.precio = err;
    
    const { error: errorColores, coloresValidos } = validarColores(selectColores);
    if (errorColores) errores.colores = errorColores;
    
    const { error: errorImagenes, archivosValidos } = validarImagenesDinamicas();
    if (errorImagenes) errores.imagenes = errorImagenes;
    
    const valido = Object.keys(errores).length === 0;
    
    return {
        valido,
        errores,
        coloresValidos,
        precioNumerico: valido ? parseFloat(precio.replace(',', '.')) : null,
        archivosImagen: archivosValidos  // array de File objects
    };
}

// ========================
// 3. Funciones UI para errores
// ========================
function limpiarErroresUI() {
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    document.querySelectorAll('.invalid-feedback').forEach(el => el.innerHTML = '');
    const globalDiv = document.getElementById('globalError');
    globalDiv.style.display = 'none';
    globalDiv.innerHTML = '';
}

function mostrarErroresUI(errores) {
    limpiarErroresUI();
    
    for (const [campo, mensaje] of Object.entries(errores)) {
        let input = document.getElementById(campo);
        if (!input && campo === 'imagenes') {
            // Mostrar error debajo del contenedor de imágenes
            const feedbackDiv = document.getElementById(`error-${campo}`);
            if (feedbackDiv) feedbackDiv.innerHTML = mensaje;
            // También marcamos el contenedor como inválido? No es un input, pero ponemos clase a un div
            const container = document.getElementById('imagenes-container');
            if (container) container.classList.add('is-invalid');
            continue;
        }
        if (input) {
            input.classList.add('is-invalid');
            const feedbackDiv = document.getElementById(`error-${campo}`);
            if (feedbackDiv) feedbackDiv.innerHTML = mensaje;
        }
    }
    
    if (Object.keys(errores).length > 0) {
        const globalDiv = document.getElementById('globalError');
        globalDiv.style.display = 'block';
        globalDiv.innerHTML = `<div class="error-summary"><strong>No se pudo guardar:</strong><ul>${Object.values(errores).map(e => `<li>${e}</li>`).join('')}</ul></div>`;
    }
}

// ========================
// 4. Reactivar botón al editar
// ========================
function habilitarBoton() {
    submitBtn.disabled = false;
}

function onCampoEditado(event) {
    habilitarBoton();
    const target = event.target;
    // Limpiar error del campo específico
    if (target.id) {
        target.classList.remove('is-invalid');
        const feedbackDiv = document.getElementById(`error-${target.id}`);
        if (feedbackDiv) feedbackDiv.innerHTML = '';
    } else if (target.type === 'file') {
        // Es un input de imagen sin id específico, borrar error global de imágenes
        const feedbackDiv = document.getElementById('error-imagenes');
        if (feedbackDiv) feedbackDiv.innerHTML = '';
        const container = document.getElementById('imagenes-container');
        if (container) container.classList.remove('is-invalid');
    }
    const globalDiv = document.getElementById('globalError');
    if (globalDiv) globalDiv.style.display = 'none';
}

// ========================
// 5. Gestión dinámica de imágenes
// ========================
function actualizarBotonesEliminar() {
    const items = document.querySelectorAll('.imagen-item');
    items.forEach((item, index) => {
        const btnEliminar = item.querySelector('.btn-eliminar-imagen');
        if (btnEliminar) {
            // Si es la única imagen que queda, deshabilitamos el botón eliminar (opcional)
            // Pero permitimos eliminar y luego el usuario tendrá que añadir otra.
            // Mejor dejar que se pueda eliminar siempre, pero validaremos cantidad.
            btnEliminar.disabled = false;
        }
    });
}

function agregarInputImagen() {
    if (contadorImagenes >= 3) {
        btnAgregar.disabled = true;
        return;
    }
    
    const nuevoId = `imagen-${Date.now()}-${contadorImagenes}`;
    const div = document.createElement('div');
    div.className = 'imagen-item';
    div.innerHTML = `
        <input type="file" class="form-control" accept="image/jpeg,image/png,image/jpg" data-index="${contadorImagenes}">
        <button type="button" class="btn btn-danger btn-sm btn-eliminar-imagen">Eliminar</button>
    `;
    imagenesContainer.appendChild(div);
    
    // Asignar evento change al nuevo input
    const fileInput = div.querySelector('input[type="file"]');
    fileInput.addEventListener('change', onCampoEditado);
    
    // Asignar evento al botón eliminar
    const btnEliminar = div.querySelector('.btn-eliminar-imagen');
    btnEliminar.addEventListener('click', function() {
        div.remove();
        contadorImagenes--;
        if (contadorImagenes < 3) {
            btnAgregar.disabled = false;
        }
        // Disparar reactivación del botón
        habilitarBoton();
        // Limpiar error de imágenes si lo había
        const feedbackDiv = document.getElementById('error-imagenes');
        if (feedbackDiv) feedbackDiv.innerHTML = '';
    });
    
    contadorImagenes++;
    if (contadorImagenes >= 3) {
        btnAgregar.disabled = true;
    }
}

// Inicializar con un input de imagen
function inicializarImagenes() {
    imagenesContainer.innerHTML = ''; // Limpiar por si acaso
    contadorImagenes = 0;
    agregarInputImagen(); // primera imagen
}

// ========================
// 6. Lógica colores (Default)
// ========================
function manejarSeleccionColores() {
    const select = document.getElementById('colores');
    const selectedOptions = Array.from(select.selectedOptions);
    const tieneDefault = selectedOptions.some(opt => opt.value === 'Default');
    
    if (tieneDefault) {
        for (let opt of select.options) {
            if (opt.value !== 'Default' && opt.selected) {
                opt.selected = false;
            }
        }
    }
}

// ========================
// 7. Evento submit
// ========================
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const resultado = validarFormulario();
    
    if (!resultado.valido) {
        mostrarErroresUI(resultado.errores);
        submitBtn.disabled = true;
        return;
    }
    
    // Construir objeto producto (simulado)
    const producto = {
        sku: Math.floor(Math.random() * 9000000000) + 1000000000,
        name: document.getElementById('nombre').value.trim(),
        categoria: document.getElementById('categoria').value,
        subcategoria: document.getElementById('subcategoria').value,
        descripcion: document.getElementById('descripcion').value.trim(),
        precio: resultado.precioNumerico,
        colores: resultado.coloresValidos,
        urlimagenes: []
    };
    
    // Generar URLs simuladas
    for (let i = 0; i < resultado.archivosImagen.length; i++) {
        const archivo = resultado.archivosImagen[i];
        const extension = archivo.name.split('.').pop();
        const url = `../imagenes/${producto.categoria}/${producto.subcategoria}/${producto.sku}/${producto.sku}-${i+1}.${extension}`;
        producto.urlimagenes.push(url);
    }
    
    alert('✅ Producto válido. Datos:\n' + JSON.stringify(producto, null, 2));
    console.log('Producto guardado:', producto);
});

// ========================
// 8. Asignar event listeners iniciales
// ========================
document.getElementById('colores').addEventListener('change', manejarSeleccionColores);
btnAgregar.addEventListener('click', agregarInputImagen);

// Campos fijos para reactivar botón
camposFijos.forEach(campo => {
    if (campo) {
        campo.addEventListener('input', onCampoEditado);
        campo.addEventListener('change', onCampoEditado);
    }
});

// Inicializar imágenes
inicializarImagenes();

// Botón activo al inicio
submitBtn.disabled = false;
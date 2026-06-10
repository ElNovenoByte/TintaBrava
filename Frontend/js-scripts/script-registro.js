// TELEFONO: Permite solo números en el campo de teléfono
// Agrega un event listener al campo de teléfono para permitir solo números
const inputTelefono = document.getElementById('telefono');

if (inputTelefono) { // Verifica que el elemento exista antes de agregar el event listener
    inputTelefono.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');  // Reemplaza cualquier carácter que no sea un número con una cadena vacía
    });
}
const formulario = document.getElementById("registroForm");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");

const errorNombre = document.getElementById("errorNombre");
const errorApellido = document.getElementById("errorApellido");

const correo = document.getElementById("correo");

const errorCorreo = document.getElementById("errorCorreo");

const telefono = document.getElementById("telefono");

const errorTelefono = document.getElementById("errorTelefono");

const passwordInput = document.getElementById('passwordInput');
const passwordInputconfirm = document.getElementById('passwordInputconfirm');
const errorPassword = document.getElementById("errorPassword");
const errorPasswordConfirm = document.getElementById("errorPasswordConfirm");






formulario.addEventListener("submit", function (e) {

    e.preventDefault();
    let valido = true;
    const regexTexto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

/* VALIDACIÓN NOMBRE */

const valorNombre = nombre.value.trim();

if (valorNombre === "") {

    errorNombre.style.display = "block";
    errorNombre.textContent = "El nombre es obligatorio";

    nombre.classList.add("input-error");

    valido = false;

}
else if (!regexTexto.test(valorNombre)) {

    errorNombre.style.display = "block";
    errorNombre.textContent = "El nombre solo puede contener letras";

    nombre.classList.add("input-error");

    valido = false;

}
else {

    errorNombre.style.display = "none";

    nombre.classList.remove("input-error");
}

/* VALIDACIÓN APELLIDO */

const valorApellido = apellido.value.trim();

if (valorApellido === "") {

    errorApellido.style.display = "block";
    errorApellido.textContent = "El apellido es obligatorio";

    apellido.classList.add("input-error");

    valido = false;

}
else if (!regexTexto.test(valorApellido)) {

    errorApellido.style.display = "block";
    errorApellido.textContent = "El apellido solo puede contener letras";

    apellido.classList.add("input-error");

    valido = false;

}
else {

    errorApellido.style.display = "none";

    apellido.classList.remove("input-error");
}

    const valorCorreo = correo.value.trim();

    if (valorCorreo === "") {

        errorCorreo.style.display = "block";
        errorCorreo.textContent = "El correo es obligatorio";

        correo.classList.add("input-error");
        valido = false;

    }
    else if (!valorCorreo.includes("@")) {

        errorCorreo.style.display = "block";
        errorCorreo.textContent = "Debes ingresar un correo válido";

        correo.classList.add("input-error");
        valido = false;

    }
    else {

        errorCorreo.style.display = "none";

        correo.classList.remove("input-error");

    }

    //TELÉFONO: Validación para el campo de teléfono

    const valorTelefono = telefono.value.trim();
    if (valorTelefono === "") {

        errorTelefono.style.display = "block";
        errorTelefono.textContent = "El teléfono es obligatorio";

        telefono.classList.add("input-error");
        valido = false;

    }
    else if (valorTelefono.length !== 10) {

        errorTelefono.style.display = "block";
        errorTelefono.textContent = "Debes ingresar un teléfono de 10 dígitos";

        telefono.classList.add("input-error");
        valido = false;

    }
    else {

        errorTelefono.style.display = "none";

        telefono.classList.remove("input-error");

    }

//CONTRASEÑA: Validación para el campo de contraseña
    const valorPassword = passwordInput.value.trim();
    const valorPasswordConfirm = passwordInputconfirm.value.trim();
    if (valorPassword === "") {

        errorPassword.style.display = "block";
        errorPassword.textContent = "La contraseña es obligatoria";
        valido = false;
    }
    else {
        errorPassword.style.display = "none";
    }

    if (valorPasswordConfirm === "") {
        errorPasswordConfirm.style.display = "block";
        errorPasswordConfirm.textContent = "Debes confirmar la contraseña";
        valido = false;
    }
    else if (valorPassword !== valorPasswordConfirm) {
        errorPasswordConfirm.style.display = "block";
        errorPasswordConfirm.textContent = "Las contraseñas no coinciden";
        valido = false;
    }
    else {
        errorPasswordConfirm.style.display = "none";
    }

    //Se añade validacion para que si algo falla se detenga ahi
    if (!valido) {
        return;
    }

    // Crear objeto para enviar al backend
    const user = {
        nombre: nombre.value.trim(),
        apellido: apellido.value.trim(),
        correo: correo.value.trim(),
        telefono: telefono.value.trim(),
        contrasena: passwordInput.value.trim()
    };

    // Llamada al backend
    fetch("http://localhost:8080/api/usuarios/post/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Error al registrar el usuario");
        }
        return response.json();        
    })
    .then(data => {
        alert("Usuario registrado correctamente");
        console.log(data);
        formulario.reset();
    })
    .catch(error => {
        console.error(error);
        alert(error.message);
    });
});

//BOTÓN DE MOSTRAR CONTRASENA
const togglePassword = document.getElementById('togglePassword');

// Funciones para mostrar y ocultar la contraseña, además de cambiar el ícono del ojo
function mostrarContrasena() {
    passwordInput.type = 'text'; // Cambia el tipo de input a text para mostrar la contraseña
    togglePassword.src = '../imagenes/iconos/ojo_abierto.png';
    togglePassword.alt = 'Ocultar contraseña';
}
// Función para ocultar la contraseña y cambiar el ícono de nuevo al ojo cerrado
function ocultarContrasena() {
    passwordInput.type = 'password'; // Cambia el tipo de input a password para ocultar la contraseña
    togglePassword.src = '../imagenes/iconos/ojo_cerrado.png';
    togglePassword.alt = 'Mostrar contraseña';
}

//EVENTOS PARA MOSTRAR/OCULTAR CONTRASEÑA
// Agrega event listeners para manejar el comportamiento del botón de mostrar/ocultar contraseña
togglePassword.addEventListener('mousedown', mostrarContrasena);

// Para que cuando el usuario suelte el botón del mouse, se oculte la contraseña.
togglePassword.addEventListener('mouseup', ocultarContrasena);

// También se puede ocultar la contraseña si el usuario mueve el mouse fuera del área del botón mientras lo mantiene presionado.
togglePassword.addEventListener('mouseleave', ocultarContrasena);


//BOTÓN DE MOSTRAR CONTRASEÑA CONFIRMAR
const togglePasswordconfirm = document.getElementById('togglePasswordconfirm');

// Funciones para mostrar y ocultar la contraseña, además de cambiar el ícono del ojo
function mostrarContrasenaconfirm() {
    passwordInputconfirm.type = 'text'; // Cambia el tipo de input a text para mostrar la contraseña
    togglePasswordconfirm.src = '../imagenes/iconos/ojo_abierto.png';
    togglePasswordconfirm.alt = 'Ocultar contraseña';
}
// Función para ocultar la contraseña y cambiar el ícono de nuevo al ojo cerrado
function ocultarContrasenaconfirm() {
    passwordInputconfirm.type = 'password'; // Cambia el tipo de input a password para ocultar la contraseña
    togglePasswordconfirm.src = '../imagenes/iconos/ojo_cerrado.png';
    togglePasswordconfirm.alt = 'Mostrar contraseña';
}

// Botón Volver
const btnVolver = document.getElementById('btnVolver');

if (btnVolver) {
    btnVolver.addEventListener('click', function() {
        if (document.referrer) {
            window.history.back();
        } else {
            // Si entraron directo por URL
            window.location.href = "../interfaces/principal.html";
        }
    });
}

//EVENTOS PARA MOSTRAR/OCULTAR CONTRASEÑA
// Agrega event listeners para manejar el comportamiento del botón de mostrar/ocultar contraseña
togglePasswordconfirm.addEventListener('mousedown', mostrarContrasenaconfirm);

// Para que cuando el usuario suelte el botón del mouse, se oculte la contraseña.
togglePasswordconfirm.addEventListener('mouseup', ocultarContrasenaconfirm);

// También se puede ocultar la contraseña si el usuario mueve el mouse fuera del área del botón mientras lo mantiene presionado.
togglePasswordconfirm.addEventListener('mouseleave', ocultarContrasenaconfirm);



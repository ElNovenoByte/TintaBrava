// TELEFONO: Permite solo números en el campo de teléfono
// Agrega un event listener al campo de teléfono para permitir solo números
const inputTelefono = document.getElementById('telefono');

if (inputTelefono) { // Verifica que el elemento exista antes de agregar el event listener
    inputTelefono.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');  // Reemplaza cualquier carácter que no sea un número con una cadena vacía
    });
}
const formulario = document.getElementById("registroForm");

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

    const valorCorreo = correo.value.trim();

    if (valorCorreo === "") {

        errorCorreo.style.display = "block";
        errorCorreo.textContent = "El correo es obligatorio";

        correo.classList.add("input-error");

    }
    else if (!valorCorreo.includes("@")) {

        errorCorreo.style.display = "block";
        errorCorreo.textContent = "Debes ingresar un correo válido";

        correo.classList.add("input-error");

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

        correo.classList.add("input-error");

    }
    else if (valorTelefono.length !== 10) {

        errorTelefono.style.display = "block";
        errorTelefono.textContent = "Debes ingresar un teléfono de 10 dígitos";

        telefono.classList.add("input-error");

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
    }
    else {
        errorPassword.style.display = "none";
    }

    if (valorPasswordConfirm === "") {
        errorPasswordConfirm.style.display = "block";
        errorPasswordConfirm.textContent = "Debes confirmar la contraseña";
    }
    else if (valorPassword !== valorPasswordConfirm) {
        errorPasswordConfirm.style.display = "block";
        errorPasswordConfirm.textContent = "Las contraseñas no coinciden";
    }
    else {
        errorPasswordConfirm.style.display = "none";
    }
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

//EVENTOS PARA MOSTRAR/OCULTAR CONTRASEÑA
// Agrega event listeners para manejar el comportamiento del botón de mostrar/ocultar contraseña
togglePasswordconfirm.addEventListener('mousedown', mostrarContrasenaconfirm);

// Para que cuando el usuario suelte el botón del mouse, se oculte la contraseña.
togglePasswordconfirm.addEventListener('mouseup', ocultarContrasenaconfirm);

// También se puede ocultar la contraseña si el usuario mueve el mouse fuera del área del botón mientras lo mantiene presionado.
togglePasswordconfirm.addEventListener('mouseleave', ocultarContrasenaconfirm);


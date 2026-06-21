document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let valido = true;

    const correo = document.getElementById("correo");
    const password = document.getElementById("passwordInput");
    const errorCorreo = document.getElementById("errorCorreo");
    const errorPassword = document.getElementById("errorPassword");

    // Limpiar errores anteriores
    [correo, password].forEach(input => input.classList.remove("input-error"));

    [errorCorreo, errorPassword].forEach(msg => {
        msg.style.display = "none";
        msg.textContent = "";
    });

    // Validar correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (correo.value.trim() === "") {
        mostrarError(correo, errorCorreo, "El correo es obligatorio.");
        valido = false;
    } else if (!regexCorreo.test(correo.value.trim())) {
        mostrarError(correo, errorCorreo, "Ingresa un correo válido. Ejemplo: usuario@correo.com");
        valido = false;
    }

    // Validar contraseña
    if (password.value.trim() === "") {
        mostrarError(password, errorPassword, "La contraseña es obligatoria.");
        valido = false;
    }

    if (!valido) return;

    // LOGIN FLOW
    fetch(`http://localhost:8080/api/usuarios/get/${encodeURIComponent(correo.value.trim())}`)
        .then(response => {

            if (!response.ok) {
                throw new Error("Usuario no encontrado");
            }

            return response.json();
        })
        .then(data => {

            console.log("USER FROM BACKEND:", data);

            // SEGURIDAD BÁSICA: evitar null
            if (!data) {
                mostrarError(correo, errorCorreo, "Usuario no encontrado.");
                return;
            }

            // Validación de contraseña
            if (
                data.correo === correo.value.trim() &&
                data.contrasena === password.value.trim()
            ) {

                localStorage.setItem(
                    "usuarioLogueado",
                    JSON.stringify(data)
                );

                window.location.href = "../interfaces/principal.html";

            } else {
                mostrarError(password, errorPassword, "Contraseña incorrecta.");
            }

        })
        .catch(error => {
            console.error(error);
            mostrarError(correo, errorCorreo, "Error al iniciar sesión.");
        });

});


// Función reutilizable para mostrar errores
function mostrarError(input, mensaje, texto) {
    input.classList.add("input-error");
    mensaje.textContent = texto;
    mensaje.style.display = "block";
}


// Toggle mostrar/ocultar contraseña
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('passwordInput');

if (togglePassword && passwordInput) {

    function mostrarContrasena() {
        passwordInput.type = 'text';
        togglePassword.src = '../imagenes/iconos/ojo_abierto.png';
    }

    function ocultarContrasena() {
        passwordInput.type = 'password';
        togglePassword.src = '../imagenes/iconos/ojo_cerrado.png';
    }

    togglePassword.addEventListener('mousedown', mostrarContrasena);
    togglePassword.addEventListener('mouseup', ocultarContrasena);
    togglePassword.addEventListener('mouseleave', ocultarContrasena);
}


// Botón Volver
const btnVolver = document.getElementById('btnVolver');

if (btnVolver) {
    btnVolver.addEventListener('click', function () {
        if (document.referrer) {
            window.history.back();
        } else {
            window.location.href = "../interfaces/principal.html";
        }
    });
}
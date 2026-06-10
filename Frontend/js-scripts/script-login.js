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

    // Si todo es válido, conectar con la API
    if (valido) {
        fetch(`http://localhost:8080/api/usuarios/get/${encodeURIComponent(correo.value.trim())}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                mostrarError(correo, errorCorreo, "Correo no registrado.");
            }
        })
        .then(data => {
            if (data) {
                if (data.correo === correo.value.trim()) {
                    // Si el correo coincide
                    window.location.href = "../interfaces/principal.html";
                } else {
                    // Si no son iguales
                    mostrarError(correo, errorCorreo, "Correo no registrado.");
                }
            }
        })
        .catch(error => {
            mostrarError(correo, errorCorreo, "Correo no registado.");
            console.error(error);
        });
    }
});
// Función reutilizable para mostrar errores
function mostrarError(input, mensaje, texto) {
    input.classList.add("input-error");
    mensaje.textContent = texto;
    mensaje.style.display = "block";
}

// Toggle mostrar/ocultar contraseña
// DESPUÉS
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('passwordInput');

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



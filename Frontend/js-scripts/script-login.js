document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    let valido = true;

    const correo = document.getElementById("correo");
    const password = document.getElementById("passwordInput");

    const errorCorreo = document.getElementById("errorCorreo");
    const errorPassword = document.getElementById("errorPassword");

    // Reset errores
    [correo, password].forEach(input => input.classList.remove("input-error"));

    [errorCorreo, errorPassword].forEach(msg => {
        msg.style.display = "none";
        msg.textContent = "";
    });

    // Validación correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correo.value.trim()) {
        mostrarError(correo, errorCorreo, "El correo es obligatorio.");
        valido = false;
    } else if (!regexCorreo.test(correo.value.trim())) {
        mostrarError(correo, errorCorreo, "Ingresa un correo válido.");
        valido = false;
    }

    // Validación password
    if (!password.value.trim()) {
        mostrarError(password, errorPassword, "La contraseña es obligatoria.");
        valido = false;
    }

    if (!valido) return;

    try {
        console.log("🔵 Iniciando login...");

        const response = await fetch(
            `http://localhost:8080/api/usuarios/get/${encodeURIComponent(correo.value.trim())}`
        );

        console.log("Status backend:", response.status);

        if (!response.ok) {
            mostrarError(correo, errorCorreo, "Usuario no encontrado.");
            return;
        }

        const data = await response.json();
        console.log("Usuario recibido:", data);

        if (!data || !data.correo) {
            mostrarError(correo, errorCorreo, "Usuario inválido.");
            return;
        }

        //  Validación segura de credenciales
        const correoInput = correo.value.trim().toLowerCase();
        const correoBD = data.correo.trim().toLowerCase();

        const passInput = password.value.trim();
        const passBD = (data.contrasena || "").trim();

        if (correoInput !== correoBD) {
            mostrarError(correo, errorCorreo, "Correo incorrecto.");
            return;
        }

        if (passInput !== passBD) {
            mostrarError(password, errorPassword, "Contraseña incorrecta.");
            return;
        }

        console.log("✔ Login correcto");

        //  Obtener cliente (si existe)
        let cliente = null;

        try {
            const resCliente = await fetch(
                `http://localhost:8080/api/clientes/usuario/${data.idUsuario}`
            );

            if (resCliente.ok) {
                cliente = await resCliente.json();
            } else {
                console.warn("Cliente no encontrado, pero login continúa");
            }
        } catch (err) {
            console.warn("Error obteniendo cliente:", err);
        }

        //  Guardar sesión
        localStorage.setItem("usuarioLogueado", JSON.stringify(data));

        if (cliente) {
            localStorage.setItem("clienteLogueado", JSON.stringify(cliente));
        }


    } catch (error) {
        console.error("Error en login:", error);
        mostrarError(correo, errorCorreo, "Error de conexión con el servidor.");
    }
});


// Función reutilizable
function mostrarError(input, mensaje, texto) {
    input.classList.add("input-error");
    mensaje.textContent = texto;
    mensaje.style.display = "block";
}
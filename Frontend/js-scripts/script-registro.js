const formulario = document.getElementById("registroForm");

const correo = document.getElementById("correo");

const errorCorreo = document.getElementById("errorCorreo");

// Campos para la validacion de contraseña
const contrasena = document.getElementById("contrasena");
const confirmarContrasena = document.getElementById("confirmarContrasena");
const errorContrasena = document.getElementById("errorContrasena");

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    const valorCorreo = correo.value.trim();

    if(valorCorreo === ""){

        errorCorreo.style.display = "block";
        errorCorreo.textContent = "El correo es obligatorio";

        correo.classList.add("input-error");

    }
    else if(!valorCorreo.includes("@")){

        errorCorreo.style.display = "block";
        errorCorreo.textContent = "Debes ingresar un correo válido";

        correo.classList.add("input-error");

    }
    else{

        errorCorreo.style.display = "none";

        correo.classList.remove("input-error");

    }

// Parte de la validación de contraeña 
const valorContrasena = contrasena.value;
const valorConfirmar = confirmarContrasena.value;

// En esta parte lo que hace es cuando el usuairo limpie los campos se quiete la alerta
contrasena.addEventListener("input", function() {
    errorContrasena.style.display = "none";
    contrasena.classList.remove("input-error");
    confirmarContrasena.classList.remove("input-error");
});

confirmarContrasena.addEventListener("input", function() {
    errorContrasena.style.display = "none";
    confirmarContrasena.classList.remove("input-error");
    contrasena.classList.remove("input-error");
});

    if (valorContrasena === "") {
        errorContrasena.style.display = "block";
        errorContrasena.textContent = "Porfavor Ingrese la contraseña Obligatoria";
        contrasena.classList.add("input-error");
        valido = false;
    } else if (valorContrasena !== valorConfirmar) {
        errorContrasena.style.display = "block";
        errorContrasena.textContent = "Ingrese de nuevo su contraseña correcta";
        confirmarContrasena.classList.add("input-error");
        valido = false;
    } else {
        errorContrasena.style.display = "none";
        confirmarContrasena.classList.remove("input-error");
        contrasena.classList.remove("input-error");
    }
    // Si todo coincide entoces pasa a esto
    if (valido) {
       
console.log("Formulario válido, proceder con el registro");
 window.location.href = "Frontend/interfaces/login.html";
    }

});
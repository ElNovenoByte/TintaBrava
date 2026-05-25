// TELEFONO: Permite solo números en el campo de teléfono
// Agrega un event listener al campo de teléfono para permitir solo números
const inputTelefono = document.getElementById('telefono');

if (inputTelefono) { // Verifica que el elemento exista antes de agregar el event listener
    inputTelefono.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');  // Reemplaza cualquier carácter que no sea un número con una cadena vacía
    });
}
const formulario = document.getElementById("registroForm");

const correo = document.getElementById("correo");

const errorCorreo = document.getElementById("errorCorreo");

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

});

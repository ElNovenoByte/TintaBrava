// TELEFONO: Permite solo números en el campo de teléfono
// Agrega un event listener al campo de teléfono para permitir solo números
const inputTelefono = document.getElementById('telefono');

if (inputTelefono) { // Verifica que el elemento exista antes de agregar el event listener
    inputTelefono.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');  // Reemplaza cualquier carácter que no sea un número con una cadena vacía
    });
}

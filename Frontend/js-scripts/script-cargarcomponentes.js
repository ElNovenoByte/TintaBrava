//Le ponemos de mientras a las interfaces "navbar-placeholder" para que se pueda
//inyectar en esa parte cada componente que utilicemos.

//Empzamos con la navbar
function cargarNavbar() {
  fetch('../componentes/navbar.html')
    .then(response => {
      if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
      return response.text();
    })
    .then(html => {
      const placeholder = document.getElementById('navbar-placeholder');
      if (placeholder) placeholder.innerHTML = html;
      else console.warn('No se encontró el elemento con id "navbar-placeholder"');
    })
    .catch(error => console.error('Error al cargar la navbar:', error));
}

//Seguimos con el Footer
function cargarFooter() {
  fetch('../componentes/footer.html')
    .then(response => {
      if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
      return response.text();
    })
    .then(html => {
      const placeholder = document.getElementById('footer-placeholder');
      if (placeholder) placeholder.innerHTML = html;
      else console.warn('No se encontró el elemento con id "footer-placeholder"');
    })
    .catch(error => console.error('Error al cargar el footer:', error));
}

// Finalmente con esto cargamos todos los componentes cuando el DOM esté listo
// 15-mayo: De momento tenemos navbar y footer. Otros que se nos ocurren son
// el modal del carrito de compras y quizá la parte de login dependiendo de 
// cómo lo manejemos.
document.addEventListener('DOMContentLoaded', () => {
  cargarNavbar();
  cargarFooter();
});
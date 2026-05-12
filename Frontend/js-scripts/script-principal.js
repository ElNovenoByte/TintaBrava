document.addEventListener('DOMContentLoaded', function () {
  console.log("Tinta Brava - Home Cargado");
  // Se eliminó la generación automática del modal para evitar textos residuales.
});

document.addEventListener('DOMContentLoaded', function () {
  console.log("Tinta Brava - Home Cargado con Carrusel y Parallax");

  // Opcional: Configuración manual del carrusel si quieres controlar la velocidad
  const myCarousel = document.querySelector('#productCarousel');
  const carousel = new bootstrap.Carousel(myCarousel, {
    interval: 5000, // Cambia cada 5 segundos
    wrap: true
  });
});

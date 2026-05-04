// Script para modales en la sección "Conoce al equipo"

document.addEventListener('DOMContentLoaded', function () {
  // 1. CREAR LA ESTRUCTURA DEL MODAL (si no existe)
  if (!document.querySelector('.modal-overlay')) {
    const modalHTML = `
      <div class="modal-overlay" id="miModal">
        <div class="modal-container">
          <span class="modal-close">&times;</span>
          <h2 id="modalNombre">Integrante</h2>
          <p id="modalBio">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Obtener referencias a los elementos del modal
  const modal = document.getElementById('miModal');
  const closeBtn = document.querySelector('.modal-close');
  const modalNombre = document.getElementById('modalNombre');
  const modalBio = document.getElementById('modalBio');

  // 2. SELECCIONAR TODAS LAS IMÁGENES CON CLASE .team-img
  const imagenes = document.querySelectorAll('.team-img');

  // 3. ASIGNAR EVENTO CLICK A CADA IMAGEN
  imagenes.forEach(img => {
    img.addEventListener('click', function (e) {
      e.stopPropagation();

      // Leer atributos personalizados (data-name y data-bio)
      let nombre = this.getAttribute('data-name');
      let bio = this.getAttribute('data-bio');

      // Si no tienen data-name, buscar el título de la tarjeta (card-title)
      if (!nombre) {
        const card = this.closest('.team-card, .card');
        if (card) {
          const titulo = card.querySelector('.card-title');
          nombre = titulo ? titulo.innerText : 'Miembro del equipo';
        } else {
          nombre = 'Integrante';
        }
      }

      // Si no hay bio personalizada, usar texto Lorem
      if (!bio) {
        bio = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';
      }

      // Actualizar el contenido del modal
      modalNombre.innerText = nombre;
      modalBio.innerText = bio;

      // Mostrar el modal
      modal.style.display = 'flex';
    });
  });

  // 4. CERRAR MODAL CON LA X
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  }

  // 5. CERRAR MODAL HACIENDO CLIC FUERA DEL CONTENEDOR (fondo)
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // 6. CERRAR CON TECLA ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
    }
  });
});


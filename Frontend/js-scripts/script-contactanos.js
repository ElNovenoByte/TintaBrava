// Script para el formulario de contacto con Formspree (AJAX)
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const statusDiv = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  const ENDPOINT = 'https://formspree.io/f/xgodkvyb'; // tu endpoint

  // Función para mostrar mensajes de estado
  function showMessage(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `alert alert-${type} mb-4`; // success, danger, warning
    statusDiv.classList.remove('d-none');
    // Ocultar automáticamente después de 5 segundos
    setTimeout(() => {
      statusDiv.classList.add('d-none');
    }, 5000);
  }

  // Función para limpiar mensajes previos
  function clearMessage() {
    statusDiv.classList.add('d-none');
    statusDiv.textContent = '';
  }

  // Escuchar evento submit del formulario
  form.addEventListener('submit', async function (e) {
    e.preventDefault(); // Evita la recarga de la página

    // Limpiar mensaje anterior
    clearMessage();

    // Deshabilitar botón y cambiar texto (feedback visual)
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Enviando...';

    // Obtener los datos del formulario
    const formData = new FormData(form);

    try {
      // Enviar a Formspree mediante fetch
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Éxito: mostrar mensaje verde y resetear formulario
        showMessage('¡Mensaje enviado con éxito! Te responderemos pronto.', 'success');
        form.reset(); // Limpia todos los campos
      } else {
        // Error en la respuesta (ej. 422, 500)
        const errorData = await response.json();
        let errorMsg = 'Ocurrió un error al enviar el mensaje. ';
        if (errorData.errors) {
          errorMsg += errorData.errors.map(e => e.message).join(', ');
        } else {
          errorMsg += 'Por favor, verifica tus datos e intenta de nuevo.';
        }
        showMessage(errorMsg, 'danger');
      }
    } catch (error) {
      // Error de red o de conexión
      console.error('Fetch error:', error);
      showMessage('Error de conexión. Revisa tu red e intenta más tarde.', 'danger');
    } finally {
      // Restaurar botón
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
});
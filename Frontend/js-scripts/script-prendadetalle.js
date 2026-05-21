// script-prendadetalle.js - Galería para la columna de Óscar
document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail-img');

    if (!mainImage || thumbnails.length === 0) return;

    function updateMainImage(thumbnailElement) {
        const largeSrc = thumbnailElement.getAttribute('data-large');
        if (largeSrc) {
            mainImage.src = largeSrc;
        }
        thumbnails.forEach(thumb => thumb.classList.remove('active-thumb'));
        thumbnailElement.classList.add('active-thumb');
    }

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            updateMainImage(this);
        });
    });

    // Sincronizar miniatura activa inicial
    const activeThumb = document.querySelector('.thumbnail-img.active-thumb');
    if (!activeThumb && thumbnails.length > 0) {
        thumbnails[0].classList.add('active-thumb');
        const firstLarge = thumbnails[0].getAttribute('data-large');
        if (firstLarge) mainImage.src = firstLarge;
    } else if (activeThumb && activeThumb.getAttribute('data-large') !== mainImage.src) {
        const currentLarge = activeThumb.getAttribute('data-large');
        if (currentLarge) mainImage.src = currentLarge;
    }
});
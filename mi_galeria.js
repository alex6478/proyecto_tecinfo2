document.addEventListener('DOMContentLoaded', function() {
    const imagenes = document.querySelectorAll('.imagen-item');

    imagenes.forEach(imagen => {
        imagen.addEventListener('click', function() {
            const imageUrl = this.querySelector('img').src;
            alert(`Has hecho clic en: ${imageUrl}`);
            // Aquí puedes agregar funcionalidades más avanzadas, como abrir un modal con la imagen
        });
    });
});
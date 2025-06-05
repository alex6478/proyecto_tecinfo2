document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('downloadReportButton');

    if (downloadButton) {
        downloadButton.addEventListener('click', (event) => {
            // Aquí puedes añadir lógica JavaScript adicional antes de la descarga
            // Por ejemplo, enviar un evento a Google Analytics, mostrar un mensaje, etc.
            console.log('Botón "Descargar Nuestro Informe" clickeado.');
            // Si el 'href' del botón es un archivo, el navegador lo descargará automáticamente.
            // Si necesitas una descarga programática o una acción más compleja,
            // puedes usar fetch API o crear un Blob.
            // Por ahora, el 'download' atributo en el HTML es suficiente para una descarga simple.
        });
    }

    // Ejemplo de un efecto interactivo adicional si quisieras:
    // Cambiar el color de fondo del botón cuando se mantiene presionado (solo un ejemplo)
    // downloadButton.addEventListener('mousedown', () => {
    //     downloadButton.style.backgroundColor = '#1e7e34'; // Un verde más oscuro
    // });
    // downloadButton.addEventListener('mouseup', () => {
    //     downloadButton.style.backgroundColor = '#28a745'; // Vuelve al color original
    // });
});

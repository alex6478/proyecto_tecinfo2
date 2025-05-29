document.addEventListener('DOMContentLoaded', () => {
    const videoCards = document.querySelectorAll('.video-card');
    const modal = document.getElementById('modal-video');
    const closeButton = document.querySelector('.close-button');
    const videoPlayerContainer = document.querySelector('.video-player-container');

    // 1. Handle Modal for Video Playback
    videoCards.forEach(card => {
        const videoId = card.dataset.videoId;
        const watchButton = card.querySelector('.watch-video-btn');
        const playOverlay = card.querySelector('.play-overlay');

        const openModal = () => {
            if (videoId) {
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                iframe.setAttribute('allowfullscreen', '');
                videoPlayerContainer.innerHTML = ''; // Clear any previous video
                videoPlayerContainer.appendChild(iframe);
                modal.style.display = 'flex'; // Use flex for centering
            } else {
                console.error('No video ID found for this card.');
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar video',
                    text: 'Lo sentimos, no pudimos cargar este video en este momento.',
                    confirmButtonColor: '#6a994e'
                });
            }
        };

        watchButton.addEventListener('click', openModal);
        playOverlay.addEventListener('click', openModal);
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        videoPlayerContainer.innerHTML = ''; // Stop video on modal close
    });

    // Close modal by clicking outside the content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            videoPlayerContainer.innerHTML = ''; // Stop video on modal close
        }
    });

    // 2. Share Functionality (Web Share API or fallback)
    const shareButtons = document.querySelectorAll('.share-btn');

    shareButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const videoTitle = button.dataset.title;
            const videoUrl = button.dataset.url;

            if (navigator.share) {
                // Use Web Share API if available
                try {
                    await navigator.share({
                        title: videoTitle,
                        url: videoUrl
                    });
                    console.log('Content shared successfully');
                } catch (error) {
                    console.error('Error sharing:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al compartir',
                        text: 'No se pudo compartir el contenido. Por favor, inténtalo de nuevo.',
                        confirmButtonColor: '#6a994e'
                    });
                }
            } else {
                // Fallback for browsers that don't support Web Share API
                // Offer to copy link to clipboard
                navigator.clipboard.writeText(`${videoTitle}: ${videoUrl}`)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: '¡Enlace copiado!',
                            text: 'El enlace del video ha sido copiado a tu portapapeles. ¡Ahora puedes compartirlo!',
                            confirmButtonColor: '#6a994e'
                        });
                    })
                    .catch(err => {
                        console.error('Error copying link:', err);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al copiar',
                            text: 'No pudimos copiar el enlace automáticamente. Por favor, cópialo manualmente.',
                            confirmButtonColor: '#6a994e'
                        });
                    });
            }
        });
    });

    // 3. Entrance Animation for Video Cards
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // When 10% of the element is visible
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once it has appeared
            }
        });
    }, observerOptions);

    videoCards.forEach(card => {
        card.style.opacity = 0; // Start invisible
        card.style.transform = 'translateY(20px)'; // Slightly below
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        cardObserver.observe(card);
    });
});

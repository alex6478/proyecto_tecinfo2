document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Optional: Update active link class
            document.querySelectorAll('.main-nav a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Initial active link for the current section on load (optional)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    sections.forEach(section => {
        observer.observe(section);
    });

    // Dynamic "Explore Data" button on Hero section
    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.querySelector('#introduccion').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Simulate fetching dynamic statistics for "Introduccion" section
    const affectedMillions = document.getElementById('affected-millions');
    const malnourishedChildren = document.getElementById('malnourished-children');
    const economicImpact = document.getElementById('economic-impact');

    const updateStats = () => {
        let currentAffected = 0;
        let currentMalnourished = 0;
        let currentEconomic = 0;

        const targetAffected = 735; // Example: Millions
        const targetMalnourished = 45; // Example: Millions
        const targetEconomic = 3.5; // Example: Trillions

        const duration = 2000; // milliseconds
        const steps = 100;
        let step = 0;

        const interval = setInterval(() => {
            step++;
            currentAffected = (targetAffected / steps) * step;
            currentMalnourished = (targetMalnourished / steps) * step;
            currentEconomic = (targetEconomic / steps) * step;

            if (affectedMillions) affectedMillions.textContent = `${Math.round(currentAffected)}M`;
            if (malnourishedChildren) malnourishedChildren.textContent = `${Math.round(currentMalnourished)}M`;
            if (economicImpact) economicImpact.textContent = `$${currentEconomic.toFixed(1)}T`;

            if (step >= steps) {
                clearInterval(interval);
                if (affectedMillions) affectedMillions.textContent = `${targetAffected}M`;
                if (malnourishedChildren) malnourishedChildren.textContent = `${targetMalnourished}M`;
                if (economicImpact) economicImpact.textContent = `$${targetEconomic}T`;
            }
        }, duration / steps);
    };

    // Trigger stat update when the section is in view
    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                updateStats();
                entry.target.dataset.animated = 'true'; // Mark as animated
            }
        });
    }, { threshold: 0.5 }); // When 50% of the element is visible

    const infoSection = document.getElementById('introduccion');
    if (infoSection) {
        statsObserver.observe(infoSection);
    }

    // Modal functionality for Data Cards
    const modal = document.getElementById('modal');
    const closeModalBtn = document.querySelector('.close-button');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const modalImage = document.getElementById('modal-image');

    const regionData = {
        'africa': {
            title: 'África Subsahariana: Desafíos Críticos',
            text: 'En África Subsahariana, la inseguridad alimentaria es endémica, exacerbada por conflictos, inestabilidad climática y pobreza extrema. Millones de personas, especialmente niños, sufren de desnutrición aguda y crónica. La falta de infraestructura, el acceso limitado a mercados y la dependencia de la agricultura de subsistencia contribuyen a la vulnerabilidad. Es fundamental invertir en resiliencia climática y programas de desarrollo sostenibles.',
            image: 'https://via.placeholder.com/600x400?text=Mapa+Africa'
        },
        'asia': {
            title: 'Asia Meridional: Paradoja del Crecimiento',
            text: 'A pesar del rápido crecimiento económico en muchas partes de Asia Meridional, la región sigue albergando la mayor proporción de personas subalimentadas. La desigualdad de ingresos, el acceso limitado a servicios básicos y la vulnerabilidad a desastres naturales son factores clave. Los esfuerzos se centran en mejorar los sistemas de distribución de alimentos, la nutrición materna e infantil, y la educación sobre dietas saludables.',
            image: 'https://via.placeholder.com/600x400?text=Mapa+Asia'
        },
        'latin-america': {
            title: 'América Latina y el Caribe: Retrocesos Recientes',
            text: 'Después de décadas de progreso, América Latina y el Caribe han visto un preocupante aumento en la subalimentación, impulsado por recesiones económicas, conflictos sociales y el impacto del cambio climático. Fenómenos extremos como sequías e inundaciones afectan la producción de alimentos y la seguridad hídrica. Las estrategias buscan fortalecer las redes de seguridad social, diversificar la producción agrícola y promover la adaptación al cambio climático.',
            image: 'https://via.placeholder.com/600x400?text=Mapa+Latam'
        }
    };

    viewDetailsBtns.forEach(button => {
        button.addEventListener('click', () => {
            const region = button.closest('.data-card').dataset.region;
            const data = regionData[region];
            if (data) {
                modalTitle.textContent = data.title;
                modalText.textContent = data.text;
                modalImage.src = data.image;
                modal.style.display = 'flex';
            }
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal if clicked outside of modal content
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // "Start Now" button in video creation section
    const createVideoBtn = document.querySelector('.create-video-btn');
    if (createVideoBtn) {
        createVideoBtn.addEventListener('click', () => {
            alert('¡Fantástico! Aquí podrías redirigir a una página de herramientas o recursos para la creación de videos.');
        });
    }
});

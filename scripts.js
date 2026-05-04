document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SEAMLESS SLIDER LOGIC ---
    // We use DOMContentLoaded but wait for images to ensure widths are correct
    window.addEventListener('load', () => {
        document.querySelectorAll('.slider-track').forEach(track => {
            const isRight = track.classList.contains('track-right');
            const scrollResetPoint = track.scrollWidth / 2;
            const speed = 1; 
            let scrollPos = isRight ? -scrollResetPoint : 0;

            function animate() {
                scrollPos += isRight ? speed : -speed;

                if (isRight && scrollPos >= 0) {
                    scrollPos = -scrollResetPoint;
                } else if (!isRight && Math.abs(scrollPos) >= scrollResetPoint) {
                    scrollPos = 0;
                }

                track.style.transform = `translateX(${scrollPos}px)`;
                requestAnimationFrame(animate);
            }
            animate();
        });
    });

    // --- 2. HEADER SCROLL EFFECT ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 3. REVEAL ON SCROLL LOGIC ---
    const revealSections = document.querySelectorAll('section:not(.jumbotron)');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealSections.forEach(section => {
        // Prepare sections for animation
        section.classList.add('reveal-init');
        revealObserver.observe(section);
    });
});

// Cerrar el menú móvil al hacer clic en cualquier enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        // 1. Cerrar menú móvil
        const checkbox = document.getElementById('check');
        if (checkbox) checkbox.checked = false;

        // 2. Obtener destino
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80; // Espacio para el header
            const targetPosition = targetElement.offsetTop - headerOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            
            // CONFIGURACIÓN DE TIEMPO (en milisegundos)
            const duration = 1500; // 1.5 segundos para un viaje suave
            let start = null;

            // 3. Función de animación paso a paso
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                
                // Función matemática "EaseInOutQuad" (suave al inicio y al final)
                const run = ease(timeElapsed, startPosition, distance, duration);
                
                window.scrollTo(0, run);
                
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }
    });
});

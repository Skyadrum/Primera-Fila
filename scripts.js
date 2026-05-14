document.addEventListener('DOMContentLoaded', () => {
    
    const header = document.querySelector('header');

    // --- 1. SEAMLESS SLIDER LOGIC ---
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
    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    }, { passive: true });

    // --- 3. REVEAL ON SCROLL LOGIC ---
    const revealSections = document.querySelectorAll('.reveal, .reveal-init');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.10 }); 

    revealSections.forEach(section => {
        revealObserver.observe(section);
    });

    
    // --- 4. DESPLAZAMIENTO ULTRA-SUAVE PERSONALIZADO Y LENTO (INCLUYE LOGO) ---
    // Añadimos el selector del logo (#logo-link) a la escucha del clic
    document.querySelectorAll('.nav-links a, #logo-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId) return;

            e.preventDefault();

            // Cierra el menú móvil si estuviera abierto
            const checkbox = document.getElementById('check');
            if (checkbox) checkbox.checked = false;

            const startPosition = window.scrollY;
            let distance = 0;

            if (targetId === '#') {
                // Si es el logo, la distancia es regresar al tope de la página (0)
                distance = 0 - startPosition;
            } else {
                // Si es un enlace normal, busca la sección correspondiente
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;

                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + startPosition - headerHeight;
                distance = targetPosition - startPosition;
            }
            
            if (Math.abs(distance) < 5) return;

            // Mantenemos tu duración lenta y cinematográfica (Ajusta a 3000 o 3500 si lo deseas)
            const duration = 3200; 
            let startTime = null;

            function easeInOutQuint(t) {
                return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
            }

            function scrollAnimation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                
                const curveValue = easeInOutQuint(progress);
                window.scrollTo(0, startPosition + (distance * curveValue));
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(scrollAnimation);
                }
            }

            requestAnimationFrame(scrollAnimation);
        });
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

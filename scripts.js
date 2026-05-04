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

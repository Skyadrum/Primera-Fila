// Use window.onload instead of DOMContentLoaded to ensure images are fully loaded
window.onload = () => {
    document.querySelectorAll('.slider-track').forEach(track => {
        const isRight = track.classList.contains('track-right');
        
        // Use the actual measured width of half the track
        const scrollResetPoint = track.scrollWidth / 2;
        
        const speed = 1; 
        let scrollPos = isRight ? -scrollResetPoint : 0;

        function animate() {
            scrollPos += isRight ? speed : -speed;
            
            // Seamless Reset Logic
            if (isRight && scrollPos >= 0) {
                // If it hits 0, it snaps back to the middle (identical frame)
                scrollPos = -scrollResetPoint;
            } 
            else if (!isRight && Math.abs(scrollPos) >= scrollResetPoint) {
                // If it hits the end of the first set, it snaps back to 0
                scrollPos = 0;
            }
            
            track.style.transform = `translateX(${scrollPos}px)`;
            requestAnimationFrame(animate);
        }
        
        animate();
    });

    window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    // If you scroll more than 50px, add the visible background class
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
};

/* ==========================================================================
   KITZUNE DIVISION - ANIMACIÓN #8 (SCROLL REVEAL & HUD GLOW)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.anim-8');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Dispara la animación cuando el 15% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Aplica un ligero desfase (stagger) si hay múltiples tarjetas juntas
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                
                // Deja de observar una vez animado
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
});

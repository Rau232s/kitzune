/* ==========================================================================
   KITZUNE DIVISION - PRELOADER CONTROL
   ========================================================================== */

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // Oculta el preloader tras la carga total
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('fade-out');
        }
    }, 1200); // Mantiene brevemente para asegurar una transición suave
});
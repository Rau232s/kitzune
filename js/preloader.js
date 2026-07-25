window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Asegura que el preloader desaparezca fluidamente al cargar todo
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 600);
    }
});

// Respaldo por si la carga del video demora más de lo esperado
setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('fade-out')) {
        preloader.classList.add('fade-out');
    }
}, 3000);
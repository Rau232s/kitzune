/* ==========================================================================
   KITZUNE DIVISION - SHOWCASE INTERACTIVO CON TRANSICIÓN SUAVE
   Archivo: js/horizontal-scroll.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('roster-track');
    if (!track) return;

    // 1. Configuración del Autoscroll Infinito
    const speed = 1;
    let isPaused = false;

    track.innerHTML += track.innerHTML; // Duplicado dinámico

    function autoScroll() {
        if (!isPaused) {
            track.scrollLeft += speed;
            if (track.scrollLeft >= track.scrollWidth / 2) {
                track.scrollLeft = 0;
            }
        }
        requestAnimationFrame(autoScroll);
    }
    autoScroll();

    // 2. Manejo de Tarjetas y Transición Suave
    const cards = track.querySelectorAll('.roster-card');

    cards.forEach(card => {
        let hoverTimer = null;
        let rotateInterval = null;
        let currentIndex = 0;

        const playerItems = card.querySelectorAll('.team-list li');
        if (playerItems.length === 0) return;

        // Construcción dinámica de datos desde data-*
        const players = Array.from(playerItems).map(item => ({
            name: item.dataset.name || item.childNodes[0].textContent.trim(),
            role: item.dataset.role || item.querySelector('.player-role')?.textContent || '',
            photo: item.dataset.photo || 'assets/default.jpg'
        }));

        const showcase = card.querySelector('.player-showcase');
        const showcaseImg = card.querySelector('.player-photo');
        const showcaseName = card.querySelector('.player-name');
        const showcaseRole = card.querySelector('.player-role-badge');

        // Función con transición suave (Fade Out -> Cambiar Datos -> Fade In)
        function changePlayerWithFade(newIndex) {
            if (!showcase) return;

            // 1. Inicia el desvanecimiento (Fade Out)
            showcase.classList.add('is-transitioning');

            // 2. Espera a que termine la opacidad a 0 (300ms) para cambiar datos
            setTimeout(() => {
                currentIndex = newIndex;
                const player = players[currentIndex];

                if (player) {
                    if (showcaseImg) {
                        showcaseImg.src = player.photo;
                        showcaseImg.alt = player.name;
                    }
                    if (showcaseName) showcaseName.textContent = player.name;
                    if (showcaseRole) showcaseRole.textContent = player.role;
                }

                // 3. Quita la clase para volver a mostrar con animación (Fade In)
                showcase.classList.remove('is-transitioning');
            }, 300);
        }

        // --- HOVER SOBRE LA TARJETA COMPLETA ---
        card.addEventListener('mouseenter', () => {
            isPaused = true;

            hoverTimer = setTimeout(() => {
                card.classList.add('showcase-active');
                changePlayerWithFade(0);

                // Rotación automática cada 3 segundos
                rotateInterval = setInterval(() => {
                    const nextIndex = (currentIndex + 1) % players.length;
                    changePlayerWithFade(nextIndex);
                }, 3000);

            }, 250);
        });

        card.addEventListener('mouseleave', () => {
            isPaused = false;
            clearTimeout(hoverTimer);
            clearInterval(rotateInterval);
            card.classList.remove('showcase-active');
            if (showcase) showcase.classList.remove('is-transitioning');
        });

        // --- HOVER INDIVIDUAL EN CADA JUGADOR DE LA LISTA ---
        playerItems.forEach((item, index) => {
            item.addEventListener('mouseenter', (e) => {
                e.stopPropagation();
                if (currentIndex !== index) {
                    changePlayerWithFade(index);
                }
            });
        });
    });
});
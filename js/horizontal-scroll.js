/* ==========================================================================
   KITZUNE DIVISION - CARRUSEL INFINITO Y SHOWCASE INTERACTIVO DE JUGADORES
   Archivo: js/horizontal-scroll.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('roster-track');
    if (!track) return;

    // 1. Configuración del Autoscroll
    const speed = 1;
    let isPaused = false;

    track.innerHTML += track.innerHTML; // Duplicado para bucle continuo

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

    // 2. Datos de Jugadores por Nomenclatura (3 Caracteres)
    const rosterData = {
        'VG': [
            { img: 'VG1.jpg', name: 'PLAYER 1', role: 'DUELISTA' },
            { img: 'VG2.jpg', name: 'PLAYER 2', role: 'INICIADOR' },
            { img: 'VG3.jpg', name: 'PLAYER 3', role: 'CENTINELA' },
            { img: 'VG4.jpg', name: 'PLAYER 4', role: 'CONTROLADOR' },
            { img: 'VG5.jpg', name: 'PLAYER 5', role: 'IGL' }
        ],
        'VM': [
            { img: 'VM1.jpg', name: 'PLAYER 1', role: 'DUELISTA' },
            { img: 'VM2.jpg', name: 'PLAYER 2', role: 'INICIADOR' },
            { img: 'VM3.jpg', name: 'PLAYER 3', role: 'CENTINELA' },
            { img: 'VM4.jpg', name: 'PLAYER 4', role: 'CONTROLADOR' },
            { img: 'VM5.jpg', name: 'PLAYER 5', role: 'IGL' }
        ],
        'LE': [
            { img: 'LE1.jpg', name: 'PLAYER 1', role: 'TOP' },
            { img: 'LE2.jpg', name: 'PLAYER 2', role: 'JUNGLE' },
            { img: 'LE3.jpg', name: 'PLAYER 3', role: 'MID' },
            { img: 'LE4.jpg', name: 'PLAYER 4', role: 'ADC' },
            { img: 'LE5.jpg', name: 'PLAYER 5', role: 'SUPPORT' }
        ],
        'LF': [
            { img: 'LF1.jpg', name: 'PLAYER 1', role: 'TOP' },
            { img: 'LF2.jpg', name: 'PLAYER 2', role: 'JUNGLE' },
            { img: 'LF3.jpg', name: 'PLAYER 3', role: 'MID' },
            { img: 'LF4.jpg', name: 'PLAYER 4', role: 'ADC' },
            { img: 'LF5.jpg', name: 'PLAYER 5', role: 'SUPPORT' }
        ]
    };

    // 3. Manejo de Hover y Rotación
    const cards = track.querySelectorAll('.roster-card');

    cards.forEach(card => {
        let hoverTimer = null;
        let rotateInterval = null;
        let currentIndex = 0;

        const code = card.getAttribute('data-roster');
        const players = rosterData[code];

        if (!players) return;

        const showcaseImg = card.querySelector('.player-photo');
        const showcaseName = card.querySelector('.player-name');
        const showcaseRole = card.querySelector('.player-role-badge');

        card.addEventListener('mouseenter', () => {
            isPaused = true;

            // Activa el showcase tras un pequeño retraso de intencionalidad
            hoverTimer = setTimeout(() => {
                card.classList.add('showcase-active');
                currentIndex = 0;
                updatePlayerInfo();

                // Inicia la rotación continua cada 2.5 segundos
                rotateInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % players.length;
                    
                    // Efecto de desvanecimiento
                    showcaseImg.classList.remove('active');
                    setTimeout(() => {
                        updatePlayerInfo();
                        showcaseImg.classList.add('active');
                    }, 250);

                }, 2500);

            }, 350);
        });

        card.addEventListener('mouseleave', () => {
            isPaused = false;
            clearTimeout(hoverTimer);
            clearInterval(rotateInterval);
            card.classList.remove('showcase-active');
        });

        function updatePlayerInfo() {
            const player = players[currentIndex];
            showcaseImg.src = `assets/${player.img}`;
            showcaseName.textContent = player.name;
            showcaseRole.textContent = player.role;
        }
    });
});
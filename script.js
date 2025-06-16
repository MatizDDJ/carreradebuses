document.addEventListener('DOMContentLoaded', () => {
    const bus1 = document.getElementById('bus1');
    const bus2 = document.getElementById('bus2');
    const bus3 = document.getElementById('bus3');
    const bus4 = document.getElementById('bus4');
    const bus5 = document.getElementById('bus5');
    const bus6 = document.getElementById('bus6');
    const bus7 = document.getElementById('bus7');
    const bus8 = document.getElementById('bus8');
    const bus9 = document.getElementById('bus9');

    const startButton = document.getElementById('startButton');
    const winnerMessage = document.getElementById('winnerMessage');
    const startSound = document.getElementById('startSound');

    const buses = [bus1, bus2, bus3, bus4, bus5, bus6, bus7, bus8, bus9];

    // URLs de las imágenes de los autobuses
    const imageUrls = [
        'https://i.imgur.com/MRUJw5f.png',
        'https://i.imgur.com/KQGQa5R.png'
    ];

    const raceDuration = 12000; // 12 segundos en milisegundos

    // --- Nueva función para asignar imágenes una sola vez ---
    function assignBusImages() {
        buses.forEach(bus => {
            const randomIndex = Math.floor(Math.random() * imageUrls.length);
            bus.src = imageUrls[randomIndex];
        });
    }

    function resetBuses() {
        buses.forEach(bus => {
            bus.style.left = '0';
            bus.style.transitionDuration = '0s';
        });
        void bus1.offsetWidth;
    }

    function startRace() {
        startButton.disabled = true;
        winnerMessage.textContent = '';
        resetBuses(); // Solo reinicia la posición, las imágenes ya están asignadas

        if (startSound) {
            startSound.currentTime = 0;
            startSound.play().catch(e => console.error("Error al reproducir el sonido:", e));
        }

        buses.forEach((bus) => {
            const randomDuration = (Math.random() * (14 - 10) + 10).toFixed(2);
            bus.style.transitionDuration = `${randomDuration}s`;
            // Asegúrate de que este valor coincida con el ancho de tus imágenes + un margen
            bus.style.left = 'calc(100% - 110px)'; // Ancho de la imagen (100px) + un margen de 10px
        });

        setTimeout(determineWinner, raceDuration + 1000);
    }

    function determineWinner() {
        let maxLeft = -1;
        let winnerBus = null;

        buses.forEach(bus => {
            const currentLeft = bus.getBoundingClientRect().left;
            if (currentLeft > maxLeft) {
                maxLeft = currentLeft;
                winnerBus = bus;
            }
        });

        if (winnerBus) {
            winnerMessage.textContent = `¡El ganador es el autobús ${winnerBus.id.replace('bus', '')}!`;
        } else {
            winnerMessage.textContent = 'Parece que no hubo ganador claro. ¡Inténtalo de nuevo!';
        }
        startButton.disabled = false;
    }

    startButton.addEventListener('click', startRace);

    // --- Llama a la nueva función una sola vez al cargar la página ---
    assignBusImages();
    resetBuses(); // Resetea las posiciones iniciales
});
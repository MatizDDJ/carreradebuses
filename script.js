document.addEventListener('keydown', function(event) {
    if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I') || (event.ctrlKey && event.shiftKey && event.key === 'C')) {
        alert("no me mires el codigo fuente <:c");
        event.preventDefault();
    }
});

document.addEventListener('contextmenu', function(event) {
    alert("no me mires el codigo fuente <:c");
    event.preventDefault();
});
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

    const imageUrls = [
        'https://i.imgur.com/MRUJw5f.png',
        'https://i.imgur.com/KQGQa5R.png'
    ];

    const raceDuration = 12000; // 12 segundos en milisegundos

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
        resetBuses();

        if (startSound) {
            startSound.currentTime = 0;
            startSound.play().catch(e => {
                console.error("Error al reproducir el sonido:", e);
                // alert("El audio no pudo reproducirse automáticamente. Por favor, asegúrate de que el sonido esté activado en tu dispositivo.");
            });
        }

        buses.forEach((bus) => {
            const randomDuration = (Math.random() * (14 - 10) + 10).toFixed(2);
            bus.style.transitionDuration = `${randomDuration}s`;
            
            // --- ¡IMPORTANTE CAMBIO AQUÍ! ---
            // Obtener el ancho actual del autobús para un movimiento responsive
            // Usamos offsetWidth o clientWidth para obtener el ancho renderizado.
            const busWidth = bus.offsetWidth; 
            // Calcula la posición final restando el ancho del bus más un pequeño margen (ej. 20px)
            bus.style.left = `calc(100% - ${busWidth + 20}px)`; 
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

    assignBusImages();
    resetBuses();
});
const toggleChatButton = document.getElementById('toggleChatButton');
const chatContainer = document.getElementById('chatContainer');

toggleChatButton.addEventListener('click', () => {
    chatContainer.classList.toggle('visible');
    chatContainer.classList.toggle('hidden');
});
function openTab(event, tabName) {
    // Declara variables
    let i, tabcontent, tabbuttons;

    // Obtiene todos los elementos con la clase "tab-content" y los oculta
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Obtiene todos los elementos con la clase "tab-button" y elimina la clase "active"
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }

    // Muestra la pestaña actual y añade la clase "active" al botón que la abrió
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}

// Llama a la función para abrir la primera pestaña por defecto al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // ... (Tu código de la carrera de autobuses) ...
    
    // Activa la primera pestaña al cargar la página
    document.getElementById('juegos').style.display = 'block';
    document.querySelector('.tab-button').classList.add('active');
});
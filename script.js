// Espera a que todo el contenido de la página se cargue
window.addEventListener('load', function() {

    // --- Elementos de la PANTALLA DE ENTRADA ---
    const pantallaEntrada = document.getElementById('pantalla-entrada');
    const botonAbrir = document.getElementById('abrir-invitacion');
    
    // --- Elementos de la INVITACIÓN PRINCIPAL ---
    const cancion = document.getElementById('cancion-boda');
    const controlMusica = document.getElementById('control-musica');
    const iconoMusica = controlMusica.querySelector('i');

    // --- Lógica de la PANTALLA DE ENTRADA ---
    botonAbrir.addEventListener('click', function() {
        // Inicia la música
        cancion.play();
        // Oculta la pantalla de entrada con una transición suave
        pantallaEntrada.classList.add('oculto');
        // Asegúrate de que el ícono de música muestre 'pausa'
        actualizarIconoMusica();
        // Elimina la clase 'no-scroll' del body para activar el scroll
        document.body.classList.remove('no-scroll');
    });
    
    
    // --- Lógica de la INVITACIÓN PRINCIPAL ---

    // Función para actualizar el icono de play/pausa
    function actualizarIconoMusica() {
        if (cancion.paused) {
            iconoMusica.classList.remove('fa-pause');
            iconoMusica.classList.add('fa-play');
        } else {
            iconoMusica.classList.remove('fa-play');
            iconoMusica.classList.add('fa-pause');
        }
    }

    // Evento para el botón de control de música principal
    controlMusica.addEventListener('click', function() {
        if (cancion.paused) {
            cancion.play();
        } else {
            cancion.pause();
        }
        actualizarIconoMusica();
    });

    // --- Lógica del CONTADOR REGRESIVO ---
    
    // ¡IMPORTANTE! Coloca la fecha de tu boda aquí.
    const fechaBoda = new Date("Dec 18, 2025 16:00:00").getTime();

    const countdownInterval = setInterval(function() {
        const ahora = new Date().getTime();
        const distancia = fechaBoda - ahora;

        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        document.getElementById("dias").innerText = dias.toString().padStart(2, '0');
        document.getElementById("horas").innerText = horas.toString().padStart(2, '0');
        document.getElementById("minutos").innerText = minutos.toString().padStart(2, '0');
        document.getElementById("segundos").innerText = segundos.toString().padStart(2, '0');

        if (distancia < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown-timer").innerHTML = "<p class='fecha-boda'>¡LLEGÓ EL GRAN DÍA!</p>";
        }
    }, 1000);
});
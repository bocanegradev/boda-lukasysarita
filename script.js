// Espera a que todo el contenido de la página se cargue
window.addEventListener('load', function() {

    // --- LÓGICA DE PERSONALIZACIÓN ---
    function personalizarInvitacion() {
        // 1. Obtener el código desde los parámetros de la URL
        const params = new URLSearchParams(window.location.search);
        const codigoInvitado = params.get('g');

        // 2. Buscar al invitado en la lista
        const invitado = listaInvitados[codigoInvitado];

        // 3. Si el invitado no existe o no hay código, mostrar error y detener la carga
        if (!invitado) {
            const siteWrapper = document.querySelector('.site-wrapper');
            if (siteWrapper) siteWrapper.style.display = 'none'; // Oculta todo el contenido

            // Muestra un mensaje de error simple
            document.body.innerHTML = '<p style="text-align:center; font-family: sans-serif; margin-top: 40px; color: #333;">Invitación no encontrada :(</p>';
            document.body.style.backgroundColor = '#f9f8f6';
            return; // Detiene la ejecución del resto del script
        }

        // 4. Si el invitado existe, actualizar los elementos en el HTML
        const nombreInvitadoSpan = document.getElementById('nombre-invitado');
        const numeroPuestosSpan = document.getElementById('numero-puestos');
        const nombreInvitadoCuerpoSpan = document.getElementById('nombre-invitado-cuerpo');
        const botonConfirmarLukas = document.querySelector('.boton-confirmar-lukas');
        const botonConfirmarSarita = document.querySelector('.boton-confirmar-sarita');

        if (nombreInvitadoSpan) nombreInvitadoSpan.innerText = invitado.nombre;
        if (numeroPuestosSpan) numeroPuestosSpan.innerText = invitado.puestos;
        if (nombreInvitadoCuerpoSpan) nombreInvitadoCuerpoSpan.innerText = invitado.nombre + ":";
        
        // Opcional: Personalizar el link de confirmación de WhatsApp
        if (botonConfirmarLukas) {
            const mensajeWhatsApp = `¡Hola Lukas! Soy ${invitado.nombre}. Confirmo la asistencia (${invitado.puestos} puestos) a su boda. ¡Nos vemos allí!`;
            botonConfirmarLukas.href = `https://wa.me/573506854921?text=${encodeURIComponent(mensajeWhatsApp)}`;
        }

        if (botonConfirmarSarita) {
            const mensajeWhatsApp = `¡Hola Sarita! Soy ${invitado.nombre}. Confirmo la asistencia (${invitado.puestos} puestos) a su boda. ¡Nos vemos allí!`;
            botonConfirmarSarita.href = `https://wa.me/573506854921?text=${encodeURIComponent(mensajeWhatsApp)}`;
        }
    }

    // Ejecutar la personalización tan pronto como la página cargue
    personalizarInvitacion();


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
    const fechaBoda = new Date("Nov 22, 2025 15:00:00").getTime();

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
            document.getElementById("countdown-timer").innerHTML = "<p class='fecha-boda'>¡LLEGÓ EL MOMENTO!</p>";
            document.getElementById("texto-faltan").innerHTML = "";
        }
    }, 1000);
});
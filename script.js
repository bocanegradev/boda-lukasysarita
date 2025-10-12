// Espera a que todo el contenido de la página se cargue
window.addEventListener('load', function() {
    function personalizarInvitacion() {
        // 1. Obtener el código alfanumérico desde los parámetros de la URL
        const params = new URLSearchParams(window.location.search);
        const codigoInvitado = params.get('g');
        // 2. Buscar al invitado en la lista
        const invitado = listaInvitados[codigoInvitado];
        // 3. Si el invitado no existe o no hay código, mostrar error y detener la carga
        if (!invitado) {
            const siteWrapper = document.querySelector('.site-wrapper'); // Selecciona el contenedor principal
            if (siteWrapper) siteWrapper.style.display = 'none'; // Oculta todo el contenido
            // Muestra un mensaje de error simple
            document.body.innerHTML = '<p style="text-align:center; font-family: sans-serif; margin-top: 40px; color: #333;">Invitación no encontrada :(</p>';
            document.body.style.backgroundColor = '#f9f8f6';
            return; // Detiene la ejecución del resto del script
        }
        // 4. Si el invitado existe, actualizar los elementos en el HTML
        const nombreInvitadoSpan = document.getElementById('nombre-invitado');
        const textoReservaCompleto = document.querySelector('.texto-reserva'); // Seleccionamos el párrafo completo
        const textoInvitacionP = document.querySelector('.seccion-texto-invitacion .texto-invitacion'); // Seleccionamos el párrafo
        const textoConfirmacionP = document.getElementById('texto-confirmacion');
        const textoObsequioP = document.getElementById('texto-obsequio');
        const botonConfirmarLukas = document.querySelector('.boton-confirmar-lukas');
        const botonConfirmarSarita = document.querySelector('.boton-confirmar-sarita');

        // Determinar si es singular o plural
        const esSingular = (invitado.puestos === 1);
        // --- Personalizar textos ---
        // Texto de la pantalla de entrada
        if (textoReservaCompleto) {
            const texto = esSingular ? textosPersonalizados.reserva.singular : textosPersonalizados.reserva.plural.replace('{puestos}', invitado.puestos);
            textoReservaCompleto.innerHTML = `<b>${invitado.nombre}</b>, ${texto}`;
        }
        // Texto de la sección de invitación
        if (textoInvitacionP) {
            const texto = esSingular ? textosPersonalizados.invitacion.singular : textosPersonalizados.invitacion.plural;
            textoInvitacionP.innerHTML = `<b>${invitado.nombre}:</b> ${texto}`;
        }
        // Texto de la sección de obsequio
        if (textoObsequioP) {
            const texto = esSingular ? textosPersonalizados.obsequio.singular : textosPersonalizados.obsequio.plural;
            textoObsequioP.innerHTML = `${texto}`;
        }
        // Texto de la sección de confirmación
        if (textoConfirmacionP) {
            const texto = esSingular ? textosPersonalizados.confirmacion.singular : textosPersonalizados.confirmacion.plural;
            textoConfirmacionP.innerHTML = `${texto}`;
        }
        // --- Botones Confirmar Asistencia ---
        if (botonConfirmarLukas && botonConfirmarSarita) {
            // 1. Seleccionar la plantilla del cuerpo del mensaje (singular o plural)
            const mensajeBodyTemplate = esSingular 
                ? textosPersonalizados.whatsapp.singular 
                : textosPersonalizados.whatsapp.plural;
            // 2. Reemplazar los marcadores de posición para crear el cuerpo del mensaje final
            const mensajeBody = mensajeBodyTemplate
                .replace('{nombre}', invitado.nombre)
                .replace('{puestos}', invitado.puestos);
            // 3. Construir y asignar el mensaje completo para cada botón
            botonConfirmarLukas.href = `https://wa.me/573506854921?text=${encodeURIComponent('¡Hola, Lukas! ' + mensajeBody)}`;
            botonConfirmarSarita.href = `https://wa.me/573123243483?text=${encodeURIComponent('¡Hola, Sarita! ' + mensajeBody)}`;
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

    // --- Lógica de la GALERÍA DEL FOOTER ---
    function inicializarGaleria() {
        const track = document.querySelector('.galeria-track');
        if (!track) return;

        // Lista de tus fotos en la carpeta /galeria
        const nombresFotos = [
            '1.jpg'
            ,'2.jpg'
            ,'3.jpg'
            ,'4.jpg'
            ,'5.jpg'
            ,'6.jpg'
            ,'7.jpg'
            ,'8.jpg'
            ,'9.jpg'
            ,'10.jpg'
            ,'11.jpg'
            ,'12.jpg'
        ];

        // Duplicamos la lista de fotos para crear el efecto de bucle infinito
        const fotosParaGaleria = [...nombresFotos, ...nombresFotos];

        // Creamos y añadimos los elementos <img> al track
        fotosParaGaleria.forEach(nombreFoto => {
            const img = document.createElement('img');
            img.src = `images/galeria/${nombreFoto}`;
            img.alt = "Recuerdo de Lukas y Sarita";
            track.appendChild(img);
        });

        // Calculamos la duración de la animación basada en el número de fotos
        const duracionAnimacion = nombresFotos.length * 5; // 5 segundos por foto (ajusta si quieres)

        // Aplicamos la animación
        track.style.animation = `scroll ${duracionAnimacion}s linear infinite`;
    }

    inicializarGaleria();
});
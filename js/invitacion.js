"use strict";


document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;


    /* =====================================================
       BOLA DISCO RESPONSIVA

       COMPUTADORA:
       - Carga y reproduce el video WebM.

       TELÉFONO:
       - Utiliza solamente la imagen WebP.
       - No descarga el video WebM.
    ===================================================== */

    const esMovil =
        window.matchMedia("(max-width: 768px)").matches;

    const bolaVideo =
        document.querySelector(".bola-disco-web");

    const bolaImagen =
        document.querySelector(".bola-disco-movil");


    /* =====================================================
       TELÉFONO
    ===================================================== */

    if (esMovil) {

        if (bolaVideo) {

            bolaVideo.pause();

            /* Eliminar cualquier src del video */
            bolaVideo.removeAttribute("src");


            /* Eliminar src del <source>, si existe */
            const sourceVideo =
                bolaVideo.querySelector("source");

            if (sourceVideo) {

                sourceVideo.removeAttribute("src");

            }


            /* Evitar que quede cargado en memoria */
            bolaVideo.load();

            bolaVideo.style.display = "none";

        }


        if (bolaImagen) {

            bolaImagen.style.display = "block";

        }

    }


    /* =====================================================
       COMPUTADORA
    ===================================================== */

    else {

        if (bolaImagen) {

            bolaImagen.style.display = "none";

        }


        if (bolaVideo) {

            bolaVideo.style.display = "block";


            /* ---------------------------------------------
               BUSCAR EL SOURCE DEL VIDEO
            --------------------------------------------- */

            const sourceVideo =
                bolaVideo.querySelector("source");


            if (sourceVideo) {

                /*
                   Primero busca data-src.

                   Si el HTML todavía tiene src,
                   también lo acepta.
                */

                const rutaVideo =
                    sourceVideo.dataset.src
                    || sourceVideo.getAttribute("src");


                if (rutaVideo) {

                    sourceVideo.src =
                        rutaVideo;

                    bolaVideo.load();

                }

            }

            else {

                /*
                   Por si la ruta estuviera directamente
                   en el elemento <video>.
                */

                const rutaVideo =
                    bolaVideo.dataset.src
                    || bolaVideo.getAttribute("src");


                if (rutaVideo) {

                    bolaVideo.src =
                        rutaVideo;

                    bolaVideo.load();

                }

            }


            /* ---------------------------------------------
               REPRODUCIR VIDEO
            --------------------------------------------- */

            const reproducirVideo = () => {

                bolaVideo
                    .play()
                    .catch(() => {

                        /*
                           Algunos navegadores pueden esperar
                           interacción del usuario.

                           Como el video está muted,
                           normalmente autoplay funcionará.
                        */

                    });

            };


            reproducirVideo();


            /*
               Si el navegador no permitió autoplay,
               intentar nuevamente con el primer clic/toque.
            */

            document.addEventListener(
                "pointerdown",
                reproducirVideo,
                {
                    once: true
                }
            );

        }

    }



    /* =====================================================
       1. MOSTRAR LA INVITACIÓN
    ===================================================== */

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            body.classList.add(
                "invitacion-visible"
            );

        });

    });



    /* =====================================================
       2. MOSTRAR EL MURO Y LAS FLORES
       Entrada casi inmediata
    ===================================================== */

    window.setTimeout(() => {

        body.classList.add(
            "pared-visible"
        );

    }, 100);



    /* =====================================================
       3. MOSTRAR EL MARCO
    ===================================================== */

    window.setTimeout(() => {

        body.classList.add(
            "marco-visible"
        );

    }, 250);



    /* =====================================================
       4. MOSTRAR LA BOLA DISCO
       Y LA PORTADA
    ===================================================== */

    window.setTimeout(() => {

        body.classList.add(
            "bola-visible"
        );

    }, 400);



    /* =====================================================
       5. FINALIZAR ESTADO DE CARGA
    ===================================================== */

    window.setTimeout(() => {

        body.classList.remove(
            "cargando-invitacion"
        );

        body.classList.add(
            "invitacion-lista"
        );

    }, 550);



    /* =====================================================
       6. INICIAR CUENTA REGRESIVA
    ===================================================== */

    iniciarCuentaRegresiva();

});



/* =========================================================
   CUENTA REGRESIVA
========================================================= */

function iniciarCuentaRegresiva() {

    const dias =
        document.getElementById("dias");

    const horas =
        document.getElementById("horas");

    const minutos =
        document.getElementById("minutos");

    const segundos =
        document.getElementById("segundos");


    if (
        !dias
        || !horas
        || !minutos
        || !segundos
    ) {

        console.warn(
            "No se encontraron los elementos de la cuenta regresiva."
        );

        return;

    }



    /*
       Fecha del evento:

       24 de octubre de 2026
       7:00 p. m.
       Zona horaria de Guatemala
    */

    const fechaEvento =
        new Date(
            "2026-10-24T19:00:00-06:00"
        );



    /* =====================================================
       ACTUALIZAR CONTADOR
    ===================================================== */

    function actualizarContador() {

        const ahora =
            new Date();


        const diferencia =
            fechaEvento.getTime()
            - ahora.getTime();



        /* =================================================
           SI EL EVENTO YA COMENZÓ
        ================================================= */

        if (diferencia <= 0) {

            dias.textContent =
                "00";

            horas.textContent =
                "00";

            minutos.textContent =
                "00";

            segundos.textContent =
                "00";

            return;

        }



        /* =================================================
           CONVERTIR DIFERENCIA A SEGUNDOS
        ================================================= */

        const totalSegundos =
            Math.floor(
                diferencia / 1000
            );



        /* =================================================
           DÍAS
        ================================================= */

        const cantidadDias =
            Math.floor(
                totalSegundos / 86400
            );



        /* =================================================
           HORAS
        ================================================= */

        const cantidadHoras =
            Math.floor(
                (
                    totalSegundos % 86400
                )
                / 3600
            );



        /* =================================================
           MINUTOS
        ================================================= */

        const cantidadMinutos =
            Math.floor(
                (
                    totalSegundos % 3600
                )
                / 60
            );



        /* =================================================
           SEGUNDOS
        ================================================= */

        const cantidadSegundos =
            totalSegundos % 60;



        /* =================================================
           MOSTRAR DÍAS
        ================================================= */

        dias.textContent =
            String(
                cantidadDias
            ).padStart(
                2,
                "0"
            );



        /* =================================================
           MOSTRAR HORAS
        ================================================= */

        horas.textContent =
            String(
                cantidadHoras
            ).padStart(
                2,
                "0"
            );



        /* =================================================
           MOSTRAR MINUTOS
        ================================================= */

        minutos.textContent =
            String(
                cantidadMinutos
            ).padStart(
                2,
                "0"
            );



        /* =================================================
           MOSTRAR SEGUNDOS
        ================================================= */

        segundos.textContent =
            String(
                cantidadSegundos
            ).padStart(
                2,
                "0"
            );

    }



    /* =====================================================
       EJECUTAR INMEDIATAMENTE
    ===================================================== */

    actualizarContador();



    /* =====================================================
       ACTUALIZAR CADA SEGUNDO
    ===================================================== */

    const intervalo =
        window.setInterval(
            actualizarContador,
            1000
        );



    /* =====================================================
       CUANDO SE REGRESA A LA PESTAÑA,
       ACTUALIZAR INMEDIATAMENTE EL CONTADOR
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState
                === "visible"
            ) {

                actualizarContador();

            }

        }
    );



    /* =====================================================
       GUARDAR EL INTERVALO
    ===================================================== */

    window.intervaloCuentaRegresiva =
        intervalo;

}
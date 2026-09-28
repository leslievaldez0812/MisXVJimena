"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("intro");
    const escena = document.getElementById("escenaPuerta");
    const boton = document.getElementById("botonAbrir");
    const musica = document.getElementById("musica");

    if (!intro || !escena || !boton) {
        console.error(
            "No se encontraron los elementos principales."
        );
        return;
    }

    let iniciada = false;

    /* ==========================================
       1. PREPARAR CONTENEDOR DE LA INVITACIÓN
       ========================================== */

    const contenedor = document.createElement("div");

    contenedor.className =
        "contenedor-invitacion-final";

    const iframe = document.createElement("iframe");

    iframe.className =
        "iframe-invitacion";

    /*
       Al principio NO cargamos invitacion.html.
       Primero dejamos que cargue la portada.
    */

    iframe.src = "about:blank";

    iframe.title =
        "Invitación de XV años de Jimena";

    iframe.setAttribute(
        "allow",
        "autoplay"
    );

    contenedor.appendChild(iframe);

    document.body.appendChild(contenedor);


    /* ==========================================
       2. PRECARGA RETRASADA
       ========================================== */

    let precargaIniciada = false;
    let invitacionCargada = false;

    function precargarInvitacion() {

        if (precargaIniciada) {
            return;
        }

        precargaIniciada = true;

        /*
           URL estable para permitir que
           el navegador utilice la caché.
        */

        iframe.src = "invitacion.html";
    }


    /*
       Detectamos cuándo termina de cargar
       realmente invitacion.html.
    */

    iframe.addEventListener(
        "load",
        () => {

            /*
               Ignoramos la carga inicial
               de about:blank.
            */

            if (!precargaIniciada) {
                return;
            }

            invitacionCargada = true;

            document.body.classList.add(
                "invitacion-precargada"
            );

        }
    );


    /*
       Esperamos a que la portada haya
       terminado de cargar.

       Después esperamos 1.5 segundos
       antes de cargar la invitación.
    */

    window.addEventListener(
        "load",
        () => {

            window.setTimeout(
                precargarInvitacion,
                1500
            );

        }
    );


    /* ==========================================
       3. REPRODUCIR MÚSICA
       ========================================== */

    function reproducirMusica() {

        if (!musica) {
            return;
        }

        musica.volume = 0.45;

        musica.play().catch((error) => {

            console.warn(
                "No se pudo iniciar la música:",
                error
            );

        });

    }


    /* ==========================================
       4. MOSTRAR LA INVITACIÓN
       ========================================== */

    function mostrarInvitacion() {

        document.body.classList.add(
            "invitacion-abierta"
        );


        /*
           Esta función hace visible
           el iframe suavemente.
        */

        const hacerVisible = () => {

            requestAnimationFrame(() => {

                requestAnimationFrame(() => {

                    contenedor.classList.add(
                        "visible"
                    );

                });

            });

        };


        /*
           Si ya cargó, la mostramos
           inmediatamente.

           Si todavía está cargando,
           esperamos al evento load.
        */

        if (invitacionCargada) {

            hacerVisible();

        } else {

            iframe.addEventListener(
                "load",
                hacerVisible,
                { once: true }
            );

        }


        /*
           Agregamos #invitacion a la URL
           sin recargar la página.
        */

        if (
            window.location.hash !==
            "#invitacion"
        ) {

            window.history.pushState(
                {
                    invitacion: true
                },
                "",
                "#invitacion"
            );

        }

    }


    /* ==========================================
       5. ABRIR LA PUERTA
       ========================================== */

    function entrarPorLaPuerta() {

        if (iniciada) {
            return;
        }

        iniciada = true;


        /*
           Si el visitante toca la puerta
           antes de los 1.5 segundos,
           comenzamos a cargar la invitación
           inmediatamente.
        */

        precargarInvitacion();


        /*
           Iniciar música.
        */

        reproducirMusica();


        /*
           Iniciar transición.
        */

        document.body.classList.add(
            "transicion-activa"
        );

        intro.classList.add(
            "abriendo"
        );

        escena.classList.add(
            "abierta"
        );


        /*
           Movimiento de acercamiento.
        */

        window.setTimeout(
            () => {

                intro.classList.add(
                    "avanzando"
                );

            },
            900
        );


        /*
           Conservamos los 2.35 segundos
           de la animación original.
        */

        window.setTimeout(
            () => {

                mostrarInvitacion();

            },
            2350
        );

    }


    /* ==========================================
       6. EVENTOS DE LA PUERTA
       ========================================== */

    boton.addEventListener(
        "click",
        entrarPorLaPuerta
    );

    escena.addEventListener(
        "click",
        entrarPorLaPuerta
    );


    /*
       Permitir abrir también utilizando
       Enter o barra espaciadora.
    */

    boton.addEventListener(
        "keydown",
        (evento) => {

            if (
                evento.key === "Enter"
                ||
                evento.key === " "
            ) {

                evento.preventDefault();

                entrarPorLaPuerta();

            }

        }
    );


    /* ==========================================
       7. BOTÓN ATRÁS DEL NAVEGADOR
       ========================================== */

    window.addEventListener(
        "popstate",
        () => {

            if (
                window.location.hash ===
                "#invitacion"
            ) {

                return;
            }


            /*
               Ocultamos la invitación.
            */

            contenedor.classList.remove(
                "visible"
            );

            document.body.classList.remove(
                "invitacion-abierta"
            );


            /*
               Restauramos la portada,
               pero NO eliminamos el iframe.

               Así invitacion.html permanece
               cargada y volver a entrar
               será prácticamente inmediato.
            */

            window.setTimeout(
                () => {

                    iniciada = false;

                    intro.classList.remove(
                        "abriendo",
                        "avanzando"
                    );

                    escena.classList.remove(
                        "abierta"
                    );

                    document.body.classList.remove(
                        "transicion-activa"
                    );

                },
                900
            );

        }
    );

});
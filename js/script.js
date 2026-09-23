"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const intro =
        document.getElementById("intro");

    const escena =
        document.getElementById("escenaPuerta");

    const boton =
        document.getElementById("botonAbrir");

    const musica =
        document.getElementById("musica");


    if (!intro || !escena || !boton) {

        console.error(
            "No se encontraron los elementos principales."
        );

        return;
    }


    let iniciada = false;


    /* ==========================================
       REPRODUCIR MÚSICA
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
       MOSTRAR INVITACIÓN SIN CAMBIAR DE PÁGINA
    ========================================== */

    function mostrarInvitacion() {

        const contenedorExistente =
            document.querySelector(
                ".contenedor-invitacion-final"
            );

        if (contenedorExistente) {
            return;
        }


        const contenedor =
            document.createElement("div");

        contenedor.className =
            "contenedor-invitacion-final";


        const iframe =
            document.createElement("iframe");

        iframe.className =
            "iframe-invitacion";

        iframe.src =
        "invitacion.html?v=" + Date.now();

        iframe.title =
            "Invitación de XV años de Jimena";

        iframe.setAttribute(
            "allow",
            "autoplay"
        );


        contenedor.appendChild(iframe);

        document.body.appendChild(
            contenedor
        );


        document.body.classList.add(
            "invitacion-abierta"
        );


        iframe.addEventListener(
            "load",
            () => {

                requestAnimationFrame(() => {

                    requestAnimationFrame(() => {

                        contenedor.classList.add(
                            "visible"
                        );

                    });

                });

            },
            { once:true }
        );


        window.history.pushState(
            { invitacion:true },
            "",
            "#invitacion"
        );

    }


    /* ==========================================
       ABRIR LA PUERTA
    ========================================== */

    function entrarPorLaPuerta() {

        if (iniciada) {
            return;
        }

        iniciada = true;

        reproducirMusica();

        document.body.classList.add(
            "transicion-activa"
        );

        intro.classList.add(
            "abriendo"
        );

        escena.classList.add(
            "abierta"
        );


        /* Ligero avance hacia la puerta */

        window.setTimeout(() => {

            intro.classList.add(
                "avanzando"
            );

        }, 900);


        /* Mostrar la invitación sobre el index */

        window.setTimeout(() => {

            mostrarInvitacion();

        }, 2350);

    }


    /* ==========================================
       EVENTOS
    ========================================== */

    boton.addEventListener(
        "click",
        entrarPorLaPuerta
    );

    escena.addEventListener(
        "click",
        entrarPorLaPuerta
    );

    boton.addEventListener(
        "keydown",
        (evento) => {

            if (
                evento.key === "Enter"
                || evento.key === " "
            ) {

                evento.preventDefault();

                entrarPorLaPuerta();

            }

        }
    );


    /* ==========================================
       BOTÓN ATRÁS DEL NAVEGADOR
    ========================================== */

    window.addEventListener(
        "popstate",
        () => {

            const contenedor =
                document.querySelector(
                    ".contenedor-invitacion-final"
                );

            if (!contenedor) {
                return;
            }

            contenedor.classList.remove(
                "visible"
            );

            document.body.classList.remove(
                "invitacion-abierta"
            );

            window.setTimeout(() => {

                contenedor.remove();

                iniciada = false;

            }, 900);

        }
    );

});
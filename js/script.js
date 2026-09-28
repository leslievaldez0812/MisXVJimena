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
       1. PRECARGAR LA INVITACIÓN
       ========================================== */

    const contenedor = document.createElement("div");

    contenedor.className =
        "contenedor-invitacion-final";


    const iframe = document.createElement("iframe");

    iframe.className =
        "iframe-invitacion";

    /*
       IMPORTANTE:
       Ya no usamos Date.now().
       Así el navegador puede aprovechar la caché.
    */

    iframe.src = "invitacion.html";

    iframe.title =
        "Invitación de XV años de Jimena";

    iframe.setAttribute(
        "allow",
        "autoplay"
    );


    contenedor.appendChild(iframe);

    document.body.appendChild(contenedor);


    /*
       Guardamos si la invitación
       ya terminó de cargar.
    */

    let invitacionCargada = false;


    iframe.addEventListener(
        "load",
        () => {

            invitacionCargada = true;

            document.body.classList.add(
                "invitacion-precargada"
            );

        },
        { once: true }
    );



    /* ==========================================
       2. REPRODUCIR MÚSICA
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
       3. MOSTRAR LA INVITACIÓN
       ========================================== */

    function mostrarInvitacion() {

        document.body.classList.add(
            "invitacion-abierta"
        );


        /*
           Esta función hace visible
           el iframe ya precargado.
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
           Si ya cargó, aparece inmediatamente.

           Si todavía está terminando de cargar,
           esperamos únicamente el evento load.
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
           Agregar #invitacion a la dirección
           para conservar el funcionamiento
           del botón atrás.
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
       4. ABRIR LA PUERTA
       ========================================== */

    function entrarPorLaPuerta() {

        if (iniciada) {
            return;
        }


        iniciada = true;


        /*
           Iniciar música
        */

        reproducirMusica();


        /*
           Activar transición
        */

        document.body.classList.add(
            "transicion-activa"
        );


        /*
           Abrir portada
        */

        intro.classList.add(
            "abriendo"
        );


        /*
           Abrir puertas
        */

        escena.classList.add(
            "abierta"
        );



        /* ======================================
           AVANCE HACIA LA PUERTA
           ====================================== */

        window.setTimeout(() => {

            intro.classList.add(
                "avanzando"
            );

        }, 900);



        /* ======================================
           MOSTRAR INVITACIÓN

           Conservamos tus 2.35 segundos
           para no modificar la animación.

           La diferencia es que invitacion.html
           YA SE ESTÁ CARGANDO desde que abrió
           index.html.
           ====================================== */

        window.setTimeout(() => {

            mostrarInvitacion();

        }, 2350);

    }



    /* ==========================================
       5. EVENTO CLICK DEL BOTÓN
       ========================================== */

    boton.addEventListener(
        "click",
        entrarPorLaPuerta
    );



    /* ==========================================
       6. CLICK SOBRE LA PUERTA
       ========================================== */

    escena.addEventListener(
        "click",
        entrarPorLaPuerta
    );



    /* ==========================================
       7. TECLADO
       ========================================== */

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
       8. BOTÓN ATRÁS DEL NAVEGADOR
       ========================================== */

    window.addEventListener(
        "popstate",
        () => {


            /*
               Si seguimos en #invitacion,
               no hacemos nada.
            */

            if (
                window.location.hash ===
                "#invitacion"
            ) {

                return;

            }


            /*
               Ocultar invitación
            */

            contenedor.classList.remove(
                "visible"
            );


            document.body.classList.remove(
                "invitacion-abierta"
            );



            window.setTimeout(() => {


                /*
                   IMPORTANTE:

                   Ya NO eliminamos el iframe.

                   Esto permite que si la persona
                   vuelve a entrar, la invitación
                   aparezca inmediatamente.
                */

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


            }, 900);

        }
    );

});
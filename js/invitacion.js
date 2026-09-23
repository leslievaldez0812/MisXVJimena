"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const body =
        document.body;


    /* ======================================
       1. MOSTRAR LA INVITACIÓN
    ====================================== */

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            body.classList.add(
                "invitacion-visible"
            );

        });

    });


    /* ======================================
       2. MOSTRAR EL MURO Y LAS FLORES
    ====================================== */

    window.setTimeout(() => {

        body.classList.add(
            "pared-visible"
        );

    }, 1800);


    /* ======================================
       3. MOSTRAR EL MARCO
    ====================================== */

    window.setTimeout(() => {

        body.classList.add(
            "marco-visible"
        );

    }, 2900);


    /* ======================================
       4. MOSTRAR LA BOLA DISCO
       Y LA PORTADA
    ====================================== */

    window.setTimeout(() => {

        body.classList.add(
            "bola-visible"
        );

    }, 3900);


    /* ======================================
       5. FINALIZAR ESTADO DE CARGA
    ====================================== */

    window.setTimeout(() => {

        body.classList.remove(
            "cargando-invitacion"
        );

        body.classList.add(
            "invitacion-lista"
        );

    }, 5000);


    /* ======================================
       6. INICIAR CUENTA REGRESIVA
    ====================================== */

    iniciarCuentaRegresiva();

});



/* ==========================================
   CUENTA REGRESIVA
========================================== */

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


    function actualizarContador() {

        const ahora =
            new Date();

        const diferencia =
            fechaEvento.getTime()
            - ahora.getTime();


        /* Si el evento ya comenzó */

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


        const totalSegundos =
            Math.floor(
                diferencia / 1000
            );


        const cantidadDias =
            Math.floor(
                totalSegundos / 86400
            );


        const cantidadHoras =
            Math.floor(
                (
                    totalSegundos % 86400
                )
                / 3600
            );


        const cantidadMinutos =
            Math.floor(
                (
                    totalSegundos % 3600
                )
                / 60
            );


        const cantidadSegundos =
            totalSegundos % 60;


        dias.textContent =
            String(
                cantidadDias
            ).padStart(
                2,
                "0"
            );


        horas.textContent =
            String(
                cantidadHoras
            ).padStart(
                2,
                "0"
            );


        minutos.textContent =
            String(
                cantidadMinutos
            ).padStart(
                2,
                "0"
            );


        segundos.textContent =
            String(
                cantidadSegundos
            ).padStart(
                2,
                "0"
            );

    }


    /* Ejecutar inmediatamente */

    actualizarContador();


    /* Actualizar cada segundo */

    const intervalo =
        window.setInterval(
            actualizarContador,
            1000
        );


    /*
       Si la página deja de estar visible,
       evitamos cálculos innecesarios.
       Al volver, el contador se actualiza.
    */

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


    /*
       Guardamos el identificador por si más
       adelante necesitas detener el contador.
    */

    window.intervaloCuentaRegresiva =
        intervalo;

}


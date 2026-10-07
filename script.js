/* =====================================================
   RED ELÉCTRICA CDMX
   JavaScript
===================================================== */


/* ================= ELEMENTOS ================= */

const searchForm = document.getElementById("searchForm");

const searchInput = document.getElementById("searchInput");

const zoneName = document.getElementById("zoneName");

const zoneCity = document.getElementById("zoneCity");


/* ================= DATOS ================= */

const zonas = {

    "narvarte": {
        nombre: "Narvarte Poniente",
        alcaldia: "Benito Juárez",
        riesgo: "Riesgo medio"
    },

    "benito juarez": {
        nombre: "Narvarte Poniente",
        alcaldia: "Benito Juárez",
        riesgo: "Riesgo medio"
    },

    "coyoacan": {
        nombre: "Coyoacán",
        alcaldia: "Coyoacán",
        riesgo: "Riesgo bajo"
    },

    "iztapalapa": {
        nombre: "Iztapalapa",
        alcaldia: "Iztapalapa",
        riesgo: "Riesgo alto"
    },

    "tlalpan": {
        nombre: "Tlalpan",
        alcaldia: "Tlalpan",
        riesgo: "Riesgo bajo"
    },

    "cuauhtemoc": {
        nombre: "Cuauhtémoc",
        alcaldia: "Cuauhtémoc",
        riesgo: "Riesgo medio"
    }

};


/* ================= BUSCADOR ================= */

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const texto = searchInput.value
        .trim()
        .toLowerCase();


    if (texto === "") {

        mostrarMensaje(
            "Escribe una colonia o alcaldía para realizar la consulta."
        );

        searchInput.focus();

        return;
    }


    let resultado = null;


    for (const clave in zonas) {

        if (texto.includes(clave)) {

            resultado = zonas[clave];

            break;
        }

    }


    if (resultado) {

        actualizarZona(resultado);

    } else {

        actualizarZona({
            nombre: searchInput.value,
            alcaldia: "Ciudad de México",
            riesgo: "Riesgo no disponible"
        });

        mostrarMensaje(
            "No encontramos información específica. Mostrando una consulta informativa."
        );

    }

});


/* ================= ACTUALIZAR ZONA ================= */

function actualizarZona(zona) {

    zoneName.textContent = zona.nombre;

    zoneCity.textContent = zona.alcaldia;


    const riskStatus =
        document.querySelector(".risk-status");


    const riskMessage =
        riskStatus.querySelector("span");


    riskMessage.textContent = zona.riesgo;


    /*
        Cambiar visualmente el color
        dependiendo del nivel.
    */

    if (zona.riesgo === "Riesgo alto") {

        riskStatus.style.background = "#ffebec";

        riskStatus.style.color = "#c83238";

    }

    else if (zona.riesgo === "Riesgo bajo") {

        riskStatus.style.background = "#dff4e9";

        riskStatus.style.color = "#087443";

    }

    else {

        riskStatus.style.background = "#fff5dc";

        riskStatus.style.color = "#a36d00";

    }


    /*
        Animación de actualización
    */

    const card =
        document.querySelector(".zone-card");


    card.animate(
        [
            {
                transform: "scale(.98)",
                opacity: ".5"
            },
            {
                transform: "scale(1)",
                opacity: "1"
            }
        ],
        {
            duration: 300,
            easing: "ease-out"
        }
    );

}


/* ================= MENSAJE ================= */

function mostrarMensaje(texto) {

    const mensaje =
        document.createElement("div");


    mensaje.textContent = texto;


    mensaje.style.position = "fixed";

    mensaje.style.bottom = "25px";

    mensaje.style.left = "50%";

    mensaje.style.transform =
        "translateX(-50%)";


    mensaje.style.background =
        "#17231e";

    mensaje.style.color =
        "white";

    mensaje.style.padding =
        "13px 20px";

    mensaje.style.borderRadius =
        "10px";

    mensaje.style.fontSize =
        "12px";

    mensaje.style.fontWeight =
        "600";

    mensaje.style.zIndex =
        "9999";

    mensaje.style.boxShadow =
        "0 8px 25px rgba(0,0,0,.2)";


    document.body.appendChild(mensaje);


    setTimeout(() => {

        mensaje.style.opacity = "0";

        mensaje.style.transition =
            "opacity .3s";

        setTimeout(() => {

            mensaje.remove();

        }, 300);

    }, 2500);

}


/* ================= TABS DEL MAPA ================= */

const mapTabs =
    document.querySelectorAll(".map-tab");


mapTabs.forEach(tab => {

    tab.addEventListener("click", function() {

        mapTabs.forEach(item => {

            item.classList.remove("active");

        });


        this.classList.add("active");


        mostrarMensaje(
            `Vista "${this.textContent.trim()}" seleccionada.`
        );

    });

});


/* ================= BOTONES DEL MAPA ================= */

const mapControls =
    document.querySelectorAll(".map-controls button");


mapControls.forEach((button, index) => {

    button.addEventListener("click", () => {

        if (index === 0) {

            mostrarMensaje("Acercando mapa...");

        }

        else if (index === 1) {

            mostrarMensaje("Alejando mapa...");

        }

        else {

            mostrarMensaje(
                "Centrando mapa en tu ubicación."
            );

        }

    });

});


/* ================= MARCADORES ================= */

const markers =
    document.querySelectorAll(".map-pin");


markers.forEach(marker => {

    marker.addEventListener("click", () => {

        marker.animate(
            [
                { transform: "scale(1)" },
                { transform: "scale(1.3)" },
                { transform: "scale(1)" }
            ],
            {
                duration: 350
            }
        );


        mostrarMensaje(
            "Incidencia seleccionada en el mapa."
        );

    });

});


/* ================= NAVEGACIÓN ================= */

const navLinks =
    document.querySelectorAll(".nav-link");


navLinks.forEach(link => {

    link.addEventListener("click", function(event) {

        const href =
            this.getAttribute("href");


        if (href === "#") {

            event.preventDefault();

            return;
        }


        navLinks.forEach(item => {

            item.classList.remove("active");

        });


        this.classList.add("active");

    });

});


/* ================= BOTÓN CFE ================= */

const accountButton =
    document.querySelector(".account-button");


accountButton.addEventListener("click", () => {

    mostrarMensaje(
        "Acceso al portal personal CFE."
    );

});


/* ================= DETALLES ================= */

const detailsButton =
    document.querySelector(".details-button");


detailsButton.addEventListener("click", () => {

    mostrarMensaje(
        "Abriendo detalles del reporte..."
    );

});


/* ================= CARGA ================= */

window.addEventListener("load", () => {

    console.log(
        "Red Eléctrica CDMX cargada correctamente."
    );

});
/* =====================================================
   RED ELÉCTRICA CDMX
   JavaScript
===================================================== */


/* ================= ELEMENTOS ================= */

const searchForm = document.getElementById("searchForm");

const searchInput = document.getElementById("searchInput");

const searchButton = searchForm.querySelector("button[type='submit']");

const zoneName = document.getElementById("zoneName");

const zoneCity = document.getElementById("zoneCity");

const zoneCard = document.querySelector(".zone-card");

const riskStatus = document.querySelector(".risk-status");

const riskPosition = document.querySelector(".risk-position");

const reportMessage = document.querySelector(".report-message");

const updatedLabel = document.querySelector(".updated");

const activeReport = document.querySelector(".active-report");


/* ================= DATOS ================= */

/*
    Datos de demostración (maqueta).

    Van primero las colonias y después las alcaldías, para que
    una búsqueda como "Narvarte Poniente, Benito Juárez" regrese
    la colonia y no la alcaldía completa.

    claves = textos (sin acentos y en minúsculas) con los que
    se puede encontrar la zona: nombre, alcaldía o código postal.
*/

const zonas = [

    {
        nombre: "Narvarte Poniente",
        alcaldia: "Benito Juárez",
        mapa: "Benito Juárez",
        riesgo: "Riesgo medio",
        reportes: 1,
        reporte: {
            titulo: "Falla en línea de distribución",
            ubicacion: "Col. Narvarte Poniente"
        },
        claves: ["narvarte poniente", "narvarte", "03020"]
    },

    {
        nombre: "Del Valle Centro",
        alcaldia: "Benito Juárez",
        mapa: "Benito Juárez",
        riesgo: "Riesgo bajo",
        reportes: 0,
        reporte: null,
        claves: ["del valle", "03100"]
    },

    {
        nombre: "Roma Norte",
        alcaldia: "Cuauhtémoc",
        mapa: "Cuauhtémoc",
        riesgo: "Riesgo medio",
        reportes: 2,
        reporte: {
            titulo: "Variación de voltaje",
            ubicacion: "Col. Roma Norte"
        },
        claves: ["roma norte", "roma", "06700"]
    },

    {
        nombre: "Condesa",
        alcaldia: "Cuauhtémoc",
        mapa: "Cuauhtémoc",
        riesgo: "Riesgo bajo",
        reportes: 0,
        reporte: null,
        claves: ["condesa", "06140"]
    },

    {
        nombre: "Coyoacán Centro",
        alcaldia: "Coyoacán",
        mapa: "Coyoacán",
        riesgo: "Riesgo bajo",
        reportes: 0,
        reporte: null,
        claves: ["coyoacan centro", "04000"]
    },


    /* ----- Alcaldías ----- */

    {
        nombre: "Benito Juárez",
        alcaldia: "Ciudad de México",
        mapa: "Benito Juárez",
        riesgo: "Riesgo medio",
        reportes: 3,
        reporte: {
            titulo: "Falla en línea de distribución",
            ubicacion: "Col. Narvarte Poniente"
        },
        claves: ["benito juarez"]
    },

    {
        nombre: "Coyoacán",
        alcaldia: "Ciudad de México",
        mapa: "Coyoacán",
        riesgo: "Riesgo bajo",
        reportes: 1,
        reporte: {
            titulo: "Mantenimiento programado",
            ubicacion: "Col. Santo Domingo"
        },
        claves: ["coyoacan"]
    },

    {
        nombre: "Iztapalapa",
        alcaldia: "Ciudad de México",
        mapa: "Iztapalapa",
        riesgo: "Riesgo alto",
        reportes: 8,
        reporte: {
            titulo: "Sobrecarga en transformador",
            ubicacion: "Col. Santa Martha Acatitla"
        },
        claves: ["iztapalapa"]
    },

    {
        nombre: "Tlalpan",
        alcaldia: "Ciudad de México",
        mapa: "Tlalpan",
        riesgo: "Riesgo bajo",
        reportes: 1,
        reporte: {
            titulo: "Mantenimiento programado",
            ubicacion: "Col. Tlalpan Centro"
        },
        claves: ["tlalpan"]
    },

    {
        nombre: "Cuauhtémoc",
        alcaldia: "Ciudad de México",
        mapa: "Cuauhtémoc",
        riesgo: "Riesgo medio",
        reportes: 4,
        reporte: {
            titulo: "Variación de voltaje",
            ubicacion: "Col. Roma Norte"
        },
        claves: ["cuauhtemoc"]
    },

    {
        nombre: "Gustavo A. Madero",
        alcaldia: "Ciudad de México",
        mapa: "Gustavo A. Madero",
        riesgo: "Riesgo alto",
        reportes: 6,
        reporte: {
            titulo: "Corte por falla en subestación",
            ubicacion: "Col. Lindavista"
        },
        claves: ["gustavo a madero", "gustavo madero"]
    },

    {
        nombre: "Azcapotzalco",
        alcaldia: "Ciudad de México",
        mapa: "Azcapotzalco",
        riesgo: "Riesgo bajo",
        reportes: 0,
        reporte: null,
        claves: ["azcapotzalco"]
    },

    {
        nombre: "Miguel Hidalgo",
        alcaldia: "Ciudad de México",
        mapa: "Miguel Hidalgo",
        riesgo: "Riesgo medio",
        reportes: 2,
        reporte: {
            titulo: "Variación de voltaje",
            ubicacion: "Col. Anáhuac"
        },
        claves: ["miguel hidalgo"]
    },

    {
        nombre: "Venustiano Carranza",
        alcaldia: "Ciudad de México",
        mapa: "Venustiano Carranza",
        riesgo: "Riesgo bajo",
        reportes: 0,
        reporte: null,
        claves: ["venustiano carranza"]
    }

];


/*
    Colores, ícono y posición del indicador
    para cada nivel de riesgo.
*/

const estilosRiesgo = {

    "Riesgo alto": {
        fondo: "#ffebec",
        texto: "#c83238",
        posicion: "88%",
        icono: "fa-solid fa-triangle-exclamation"
    },

    "Riesgo medio": {
        fondo: "#fff5dc",
        texto: "#a36d00",
        posicion: "58%",
        icono: "fa-solid fa-triangle-exclamation"
    },

    "Riesgo bajo": {
        fondo: "#dff4e9",
        texto: "#087443",
        posicion: "18%",
        icono: "fa-solid fa-circle-check"
    },

    "Riesgo no disponible": {
        fondo: "#eef1ef",
        texto: "#718078",
        posicion: "50%",
        icono: "fa-solid fa-circle-question"
    }

};


/* Zona que se está mostrando (la inicial es Narvarte Poniente) */

let zonaActual = zonas[0];

let consultando = false;


/* ================= UTILIDADES ================= */

/*
    Quita acentos, signos y mayúsculas para que
    "Coyoacán", "coyoacan" y "COYOACÁN" sean lo mismo.
*/

function normalizar(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[.,;:]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}


function buscarZona(texto) {

    /* 1. Coincidencia: lo escrito contiene el nombre o el CP */

    for (const zona of zonas) {

        for (const clave of zona.claves) {

            if (texto.includes(clave)) {

                return zona;
            }

        }

    }


    /* 2. Coincidencia parcial: "nar" -> Narvarte */

    if (texto.length >= 3) {

        for (const zona of zonas) {

            for (const clave of zona.claves) {

                if (clave.includes(texto)) {

                    return zona;
                }

            }

        }

    }

    return null;

}


/* ================= BUSCADOR ================= */

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();


    if (consultando) {

        return;
    }


    const textoOriginal = searchInput.value.trim();

    const texto = normalizar(textoOriginal);


    if (texto === "") {

        mostrarMensaje(
            "Escribe una colonia, alcaldía o código postal para realizar la consulta."
        );

        searchInput.focus();

        return;
    }


    iniciarCarga();


    /* Pequeña espera para simular la consulta al sistema */

    setTimeout(() => {

        ejecutarConsulta(textoOriginal, texto);

        terminarCarga();

    }, 700);

});


function ejecutarConsulta(textoOriginal, texto) {

    /* Número de servicio CFE (12 dígitos) */

    if (/^\d{12}$/.test(texto.replace(/\s/g, ""))) {

        mostrarMensaje(
            "La consulta por número de servicio aún no está disponible. Prueba con colonia, alcaldía o código postal."
        );

        return;
    }


    const resultado = buscarZona(texto);


    if (resultado) {

        actualizarZona(resultado);

        mostrarMensaje(
            `Consulta realizada: ${resultado.nombre}.`
        );

    } else {

        actualizarZona({
            nombre: textoOriginal,
            alcaldia: "Ciudad de México",
            mapa: "",
            riesgo: "Riesgo no disponible",
            reportes: null,
            reporte: null
        });

        mostrarMensaje(
            "No encontramos información específica. Mostrando una consulta informativa."
        );

    }


    /* Si "Tu zona" no está a la vista, se baja hasta ella */

    zoneCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}


/* ================= ESTADO DEL BOTÓN ================= */

const textoBoton = searchButton.innerHTML;


function iniciarCarga() {

    consultando = true;

    searchButton.disabled = true;

    searchButton.style.opacity = ".8";

    searchButton.style.cursor = "wait";

    searchButton.innerHTML =
        'Consultando <i class="fa-solid fa-spinner fa-spin"></i>';

}


function terminarCarga() {

    consultando = false;

    searchButton.disabled = false;

    searchButton.style.opacity = "";

    searchButton.style.cursor = "";

    searchButton.innerHTML = textoBoton;

}


/* ================= SUGERENCIAS ================= */

const sugerencias =
    document.querySelectorAll(".search-suggestions button");


sugerencias.forEach(boton => {

    boton.addEventListener("click", () => {

        searchInput.value = boton.dataset.consulta;

        searchForm.requestSubmit();

    });

});


/* ================= ACTUALIZAR ZONA ================= */

function actualizarZona(zona) {

    zonaActual = zona;


    const estilo =
        estilosRiesgo[zona.riesgo] ||
        estilosRiesgo["Riesgo no disponible"];


    /* Nombre y alcaldía */

    zoneName.textContent = zona.nombre;

    zoneCity.textContent = zona.alcaldia;


    /* Etiqueta de riesgo */

    riskStatus.style.background = estilo.fondo;

    riskStatus.style.color = estilo.texto;

    riskStatus.querySelector("i").className = estilo.icono;

    riskStatus.querySelector("span").textContent = zona.riesgo;


    /* Indicador de la barra de nivel */

    riskPosition.style.left = estilo.posicion;


    /* Mensaje de reportes */

    if (zona.reportes === null) {

        reportMessage.textContent =
            "No hay información de reportes para esta zona.";

    } else if (zona.reportes === 0) {

        reportMessage.textContent =
            "No hay reportes activos en tu zona.";

    } else {

        const palabra =
            zona.reportes === 1 ? "reporte" : "reportes";

        const verbo =
            zona.reportes === 1 ? "activo" : "activos";

        reportMessage.innerHTML =
            `Hay <strong style="color:${estilo.texto}">${zona.reportes} ${palabra}</strong> ${verbo} en tu zona.`;

    }


    /* Hora de actualización */

    const hora = new Date().toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit"
    });

    updatedLabel.innerHTML =
        `<i class="fa-regular fa-clock"></i> Actualizado a las ${hora}`;


    /* Reporte activo (solo si existe) */

    if (zona.reporte) {

        activeReport.style.display = "";

        activeReport.querySelector("p").innerHTML =
            `${zona.reporte.titulo}<br>${zona.reporte.ubicacion}`;

    } else {

        activeReport.style.display = "none";

    }


    /* Resaltar la alcaldía en el mapa */

    resaltarAlcaldia(zona.mapa);


    /*
        Animación de actualización
    */

    zoneCard.animate(
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


function resaltarAlcaldia(alcaldia) {

    const etiquetas = document.querySelectorAll(".map-label");

    const buscada = normalizar(alcaldia || "");


    etiquetas.forEach(etiqueta => {

        const coincide =
            buscada !== "" &&
            normalizar(etiqueta.textContent) === buscada;

        etiqueta.classList.toggle("label-active", coincide);

    });

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


/* ================= LOGIN CFE ================= */

/*
    OJO: esto es una maqueta. Las credenciales están en el
    código, así que cualquiera puede verlas. Un login real
    debe validarse en un servidor (con contraseñas cifradas).
*/

const USUARIOS_DEMO = [

    {
        usuario: "cfe1001",
        password: "demo1234",
        nombre: "Operador CFE"
    }

];

const MAX_INTENTOS = 3;

const SEGUNDOS_BLOQUEO = 30;


const accountButton =
    document.querySelector(".account-button");

const accountMenu =
    document.getElementById("accountMenu");

const accountMenuName =
    document.getElementById("accountMenuName");

const logoutButton =
    document.getElementById("logoutButton");

const loginModal =
    document.getElementById("loginModal");

const loginForm =
    document.getElementById("loginForm");

const loginUser =
    document.getElementById("loginUser");

const loginPass =
    document.getElementById("loginPass");

const loginError =
    document.getElementById("loginError");

const loginSubmit =
    document.getElementById("loginSubmit");

const togglePass =
    document.getElementById("togglePass");

const closeLogin =
    document.getElementById("closeLogin");


let sesion = null;

let intentosFallidos = 0;

let bloqueadoHasta = 0;

let verificando = false;

const textoLogin = loginSubmit.innerHTML;


/* Recuperar la sesión si ya había una en esta pestaña */

try {

    sesion = JSON.parse(
        sessionStorage.getItem("sesionCFE")
    );

} catch (error) {

    sesion = null;

}


/* ---------- Abrir y cerrar ---------- */

function abrirLogin() {

    loginModal.classList.add("open");

    loginModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    setTimeout(() => loginUser.focus(), 50);

}


function cerrarLogin() {

    loginModal.classList.remove("open");

    loginModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    loginForm.reset();

    mostrarErrorLogin("");

    loginPass.type = "password";

    togglePass.innerHTML = '<i class="fa-regular fa-eye"></i>';

    accountButton.focus();

}


closeLogin.addEventListener("click", cerrarLogin);


/* Clic fuera de la tarjeta */

loginModal.addEventListener("click", event => {

    if (event.target === loginModal) {

        cerrarLogin();
    }

});


document.addEventListener("keydown", event => {

    if (!loginModal.classList.contains("open")) {

        accountMenu.classList.remove("open");

        return;
    }


    if (event.key === "Escape") {

        cerrarLogin();

        return;
    }


    /* Mantener el Tab dentro de la ventana */

    if (event.key === "Tab") {

        const enfocables = loginModal.querySelectorAll(
            "button:not([disabled]), input"
        );

        const primero = enfocables[0];

        const ultimo = enfocables[enfocables.length - 1];


        if (event.shiftKey && document.activeElement === primero) {

            event.preventDefault();

            ultimo.focus();

        } else if (!event.shiftKey && document.activeElement === ultimo) {

            event.preventDefault();

            primero.focus();

        }

    }

});


/* ---------- Mostrar / ocultar contraseña ---------- */

togglePass.addEventListener("click", () => {

    const oculta = loginPass.type === "password";

    loginPass.type = oculta ? "text" : "password";

    togglePass.innerHTML = oculta
        ? '<i class="fa-regular fa-eye-slash"></i>'
        : '<i class="fa-regular fa-eye"></i>';

    togglePass.setAttribute(
        "aria-label",
        oculta ? "Ocultar contraseña" : "Mostrar contraseña"
    );

    loginPass.focus();

});


/* ---------- Errores ---------- */

function mostrarErrorLogin(texto) {

    loginError.textContent = texto;

    loginError.classList.toggle("visible", texto !== "");

}


/* ---------- Enviar formulario ---------- */

loginForm.addEventListener("submit", event => {

    event.preventDefault();


    if (verificando) {

        return;
    }


    /* Bloqueo temporal por demasiados intentos */

    const restante = Math.ceil((bloqueadoHasta - Date.now()) / 1000);

    if (restante > 0) {

        mostrarErrorLogin(
            `Demasiados intentos. Intenta de nuevo en ${restante} s.`
        );

        return;
    }


    const usuario = loginUser.value.trim().toLowerCase();

    const password = loginPass.value;


    if (usuario === "" || password === "") {

        mostrarErrorLogin(
            "Escribe tu número de empleado y tu contraseña."
        );

        (usuario === "" ? loginUser : loginPass).focus();

        return;
    }


    mostrarErrorLogin("");

    verificando = true;

    loginSubmit.disabled = true;

    loginSubmit.innerHTML =
        'Verificando <i class="fa-solid fa-spinner fa-spin"></i>';


    /* Pequeña espera para simular la validación en el servidor */

    setTimeout(() => {

        const encontrado = USUARIOS_DEMO.find(item =>
            item.usuario === usuario &&
            item.password === password
        );


        verificando = false;

        loginSubmit.disabled = false;

        loginSubmit.innerHTML = textoLogin;


        if (encontrado) {

            iniciarSesion(encontrado);

            return;
        }


        intentosFallidos++;

        loginPass.value = "";

        loginPass.focus();


        if (intentosFallidos >= MAX_INTENTOS) {

            bloqueadoHasta =
                Date.now() + SEGUNDOS_BLOQUEO * 1000;

            intentosFallidos = 0;

            mostrarErrorLogin(
                `Demasiados intentos. Intenta de nuevo en ${SEGUNDOS_BLOQUEO} s.`
            );

        } else {

            mostrarErrorLogin(
                "Número de empleado o contraseña incorrectos."
            );

        }

    }, 800);

});


/* ---------- Sesión ---------- */

function iniciarSesion(usuario) {

    sesion = { nombre: usuario.nombre };

    sessionStorage.setItem(
        "sesionCFE",
        JSON.stringify(sesion)
    );

    intentosFallidos = 0;

    cerrarLogin();

    actualizarBotonCuenta();

    mostrarMensaje(`Bienvenido, ${sesion.nombre}.`);

}


function cerrarSesion() {

    sesion = null;

    sessionStorage.removeItem("sesionCFE");

    accountMenu.classList.remove("open");

    actualizarBotonCuenta();

    mostrarMensaje("Sesión cerrada correctamente.");

}


function actualizarBotonCuenta() {

    const icono = accountButton.querySelector("i");

    const texto = accountButton.querySelector("span");


    if (sesion) {

        icono.className = "fa-solid fa-user-check";

        texto.textContent = sesion.nombre;

        accountMenuName.textContent = sesion.nombre;

    } else {

        icono.className = "fa-regular fa-user";

        texto.textContent = "Acceso personal CFE";

    }

}


accountButton.addEventListener("click", event => {

    event.stopPropagation();


    if (sesion) {

        accountMenu.classList.toggle("open");

    } else {

        abrirLogin();

    }

});


logoutButton.addEventListener("click", cerrarSesion);


/* Cerrar el menú al hacer clic en cualquier otro lado */

document.addEventListener("click", event => {

    if (!accountMenu.contains(event.target)) {

        accountMenu.classList.remove("open");
    }

});


actualizarBotonCuenta();


/* ================= DETALLES ================= */

const detailsButton =
    document.querySelector(".details-button");


detailsButton.addEventListener("click", () => {

    if (zonaActual.reporte) {

        mostrarMensaje(
            `Abriendo detalles: ${zonaActual.reporte.titulo}...`
        );

    } else {

        mostrarMensaje(
            "No hay reportes activos en esta zona."
        );

    }

});


/* ================= CARGA ================= */

window.addEventListener("load", () => {

    resaltarAlcaldia(zonaActual.mapa);

    console.log(
        "Red Eléctrica CDMX cargada correctamente."
    );

});

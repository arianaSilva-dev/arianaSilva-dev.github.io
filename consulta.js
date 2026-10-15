/* =====================================================
   RED ELÉCTRICA CDMX · CONSULTA
   JavaScript (maqueta: simula la consulta, no usa servidor)
===================================================== */


/* ================= DATOS DE DEMOSTRACIÓN ================= */

/*
    Todo lo que aparece aquí es de ejemplo.

    Estados (los mismos que usa el proyecto):
      - normal  : operación normal
      - riesgo  : alerta preventiva del análisis periódico
      - apagon  : hay un reporte activo de falla de suministro

    tipoFalla (valores controlados del diccionario de datos):
      sobrecarga | caida_arbol | falla_interna | otro

    estatus (valores controlados del reporte):
      registrado | asignado | en_proceso | cerrado

    origen: "preventivo" (lo genera el sistema) o
            "servicio" / "ubicacion" (reporte recibido).
*/

const ALCALDIAS = [
    "Álvaro Obregón",
    "Azcapotzalco",
    "Benito Juárez",
    "Coyoacán",
    "Cuajimalpa de Morelos",
    "Cuauhtémoc",
    "Gustavo A. Madero",
    "Iztacalco",
    "Iztapalapa",
    "La Magdalena Contreras",
    "Miguel Hidalgo",
    "Milpa Alta",
    "Tláhuac",
    "Tlalpan",
    "Venustiano Carranza",
    "Xochimilco"
];


const COLONIAS = [

    {
        nombre: "Lindavista",
        alcaldia: "Gustavo A. Madero",
        estado: "apagon",
        reportes: 1,
        tipoFalla: "falla_interna",
        estatus: "en_proceso",
        origen: "servicio"
    },

    {
        nombre: "Zacatenco",
        alcaldia: "Gustavo A. Madero",
        estado: "apagon",
        reportes: 1,
        tipoFalla: "caida_arbol",
        estatus: "registrado",
        origen: "ubicacion"
    },

    {
        nombre: "Santa Martha Acatitla",
        alcaldia: "Iztapalapa",
        estado: "riesgo",
        reportes: 1,
        motivo: "Carga elevada del transformador",
        tipoFalla: "sobrecarga",
        estatus: "asignado",
        origen: "preventivo"
    },

    {
        nombre: "Leyes de Reforma",
        alcaldia: "Iztapalapa",
        estado: "normal",
        reportes: 0
    },

    {
        nombre: "Narvarte Poniente",
        alcaldia: "Benito Juárez",
        estado: "riesgo",
        reportes: 1,
        motivo: "Mantenimiento vencido",
        tipoFalla: "otro",
        estatus: "registrado",
        origen: "preventivo"
    },

    {
        nombre: "Del Valle Centro",
        alcaldia: "Benito Juárez",
        estado: "normal",
        reportes: 0
    },

    {
        nombre: "Roma Norte",
        alcaldia: "Cuauhtémoc",
        estado: "riesgo",
        reportes: 1,
        motivo: "Carga elevada del transformador",
        tipoFalla: "sobrecarga",
        estatus: "registrado",
        origen: "preventivo"
    },

    {
        nombre: "Condesa",
        alcaldia: "Cuauhtémoc",
        estado: "normal",
        reportes: 0
    },

    {
        nombre: "Coyoacán Centro",
        alcaldia: "Coyoacán",
        estado: "normal",
        reportes: 0
    },

    {
        nombre: "Santo Domingo",
        alcaldia: "Coyoacán",
        estado: "normal",
        reportes: 0
    },

    {
        nombre: "Anáhuac",
        alcaldia: "Miguel Hidalgo",
        estado: "normal",
        reportes: 0
    },

    {
        nombre: "Tlalpan Centro",
        alcaldia: "Tlalpan",
        estado: "normal",
        reportes: 0
    }

];


/*
    Números de servicio de ejemplo y la colonia a la que
    pertenece el transformador que los alimenta.
*/

const SERVICIOS = {
    "010000000001": "Lindavista",
    "010000000002": "Lindavista",
    "010000000003": "Zacatenco",
    "020000000001": "Santa Martha Acatitla",
    "030000000001": "Narvarte Poniente",
    "040000000001": "Del Valle Centro"
};


const ESTADOS = {

    normal: {
        titulo: "Operación normal",
        corto: "Normal",
        clase: "state-normal",
        icono: "fa-solid fa-circle-check",
        texto:
            "No hay reportes activos ni alertas preventivas en tu zona. " +
            "En el último análisis, la carga de los transformadores y su " +
            "mantenimiento estuvieron dentro de lo esperado."
    },

    riesgo: {
        titulo: "En riesgo de apagón",
        corto: "En riesgo",
        clase: "state-riesgo",
        icono: "fa-solid fa-triangle-exclamation",
        texto:
            "El análisis periódico detectó condiciones que podrían provocar " +
            "un apagón. Personal de CFE puede visitar los servicios conectados " +
            "al transformador para revisar antes de que ocurra la falla."
    },

    apagon: {
        titulo: "Apagón reportado",
        corto: "Apagón",
        clase: "state-apagon",
        icono: "fa-solid fa-bolt-lightning",
        texto:
            "Hay un reporte activo de falla de suministro en tu zona. " +
            "Abajo puedes ver en qué etapa de atención se encuentra."
    }

};


const TIPOS_FALLA = {
    sobrecarga: "Sobrecarga",
    caida_arbol: "Caída de árbol",
    falla_interna: "Falla interna",
    otro: "Otro"
};


const ORIGENES = {
    preventivo: "Alerta preventiva del sistema",
    servicio: "Reporte recibido por servicio",
    ubicacion: "Reporte recibido por ubicación"
};


const ETAPAS = [
    { clave: "registrado", nombre: "Registrado" },
    { clave: "asignado", nombre: "Cuadrilla asignada" },
    { clave: "en_proceso", nombre: "En proceso" },
    { clave: "cerrado", nombre: "Cerrado" }
];


const ORDEN_GRAVEDAD = { normal: 0, riesgo: 1, apagon: 2 };


/* ================= ELEMENTOS ================= */

const formColonia = document.getElementById("formColonia");

const formServicio = document.getElementById("formServicio");

const selAlcaldia = document.getElementById("selAlcaldia");

const inpColonia = document.getElementById("inpColonia");

const inpServicio = document.getElementById("inpServicio");

const listaColonias = document.getElementById("listaColonias");

const formHint = document.getElementById("formHint");

const resultCard = document.getElementById("resultCard");

const nearbyCard = document.getElementById("nearbyCard");

const nearbyTitle = document.getElementById("nearbyTitle");

const nearbyList = document.getElementById("nearbyList");

const analysisChip = document.getElementById("analysisChip");

const recientes = document.getElementById("recientes");

const tabs = document.querySelectorAll(".consulta-tab");

let consultando = false;


/* ================= UTILIDADES ================= */

function normalizar(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[.,;:]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}


/* Evita que lo que escribe la persona se interprete como HTML */

function esc(texto) {

    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

}


function dosDigitos(n) {

    return String(n).padStart(2, "0");

}


function buscarColonia(texto, alcaldia) {

    const buscada = normalizar(texto);

    if (buscada === "") {

        return null;
    }

    const candidatas = COLONIAS.filter(c =>
        !alcaldia || normalizar(c.alcaldia) === normalizar(alcaldia)
    );

    /* 1. Nombre exacto */

    let encontrada = candidatas.find(c =>
        normalizar(c.nombre) === buscada
    );

    /* 2. Coincidencia parcial: "narvarte" -> Narvarte Poniente */

    if (!encontrada && buscada.length >= 3) {

        encontrada = candidatas.find(c =>
            normalizar(c.nombre).includes(buscada)
        );
    }

    return encontrada || null;

}


function buscarAlcaldia(texto) {

    const buscada = normalizar(texto);

    if (buscada === "") {

        return null;
    }

    return ALCALDIAS.find(a => normalizar(a) === buscada) ||
        (buscada.length >= 4
            ? ALCALDIAS.find(a => normalizar(a).includes(buscada))
            : null) ||
        null;

}


/* ================= ÚLTIMO ANÁLISIS (cada 3 h) ================= */

/*
    El análisis corre a las 00, 03, 06, 09, 12, 15, 18 y 21 h.
    Se calcula con la hora de tu computadora para que la maqueta
    siempre muestre el ciclo vigente.
*/

function infoAnalisis() {

    const ahora = new Date();

    const ultima = Math.floor(ahora.getHours() / 3) * 3;

    const siguiente = ultima + 3;

    return {
        ultima: `${dosDigitos(ultima)}:00`,
        siguiente: `${dosDigitos(siguiente % 24)}:00`,
        siguienteDia: siguiente >= 24 ? "mañana " : ""
    };

}


function pintarAnalisis() {

    const a = infoAnalisis();

    analysisChip.textContent =
        `Último análisis: hoy ${a.ultima} · próximo: ${a.siguienteDia}${a.siguiente}`;

}


/* ================= MODO DE BÚSQUEDA ================= */

function cambiarModo(modo) {

    tabs.forEach(tab => {

        const activa = tab.dataset.modo === modo;

        tab.classList.toggle("active", activa);

        tab.setAttribute("aria-selected", activa);

    });

    formColonia.hidden = modo !== "colonia";

    formServicio.hidden = modo !== "servicio";

    mostrarAviso("");

    (modo === "colonia" ? inpColonia : inpServicio).focus();

}


tabs.forEach(tab => {

    tab.addEventListener("click", () => cambiarModo(tab.dataset.modo));

});


function mostrarAviso(texto) {

    formHint.textContent = texto;

    inpColonia.classList.toggle("invalid", texto !== "" && !formColonia.hidden);

    inpServicio.classList.toggle("invalid", texto !== "" && !formServicio.hidden);

}


/* ================= LISTAS DEL FORMULARIO ================= */

ALCALDIAS.forEach(nombre => {

    const opcion = document.createElement("option");

    opcion.value = nombre;

    opcion.textContent = nombre;

    selAlcaldia.appendChild(opcion);

});


/* Las sugerencias de colonia dependen de la alcaldía elegida */

function llenarColonias() {

    listaColonias.innerHTML = "";

    COLONIAS
        .filter(c => !selAlcaldia.value || c.alcaldia === selAlcaldia.value)
        .forEach(c => {

            const opcion = document.createElement("option");

            opcion.value = c.nombre;

            listaColonias.appendChild(opcion);

        });

}


selAlcaldia.addEventListener("change", llenarColonias);

llenarColonias();


/* Solo números en el campo de servicio */

inpServicio.addEventListener("input", () => {

    inpServicio.value = inpServicio.value.replace(/\D/g, "").slice(0, 12);

    mostrarAviso("");

});


inpColonia.addEventListener("input", () => mostrarAviso(""));


/* ================= ENVÍO DE FORMULARIOS ================= */

formColonia.addEventListener("submit", event => {

    event.preventDefault();

    if (consultando) {

        return;
    }

    const alcaldia = selAlcaldia.value;

    const colonia = inpColonia.value.trim();


    if (alcaldia === "" && colonia === "") {

        mostrarAviso("Elige una alcaldía o escribe el nombre de tu colonia.");

        inpColonia.focus();

        return;
    }

    mostrarAviso("");

    consultar(() => resolverColonia(alcaldia, colonia));

});


formServicio.addEventListener("submit", event => {

    event.preventDefault();

    if (consultando) {

        return;
    }

    const numero = inpServicio.value.replace(/\D/g, "");


    if (numero.length !== 12) {

        mostrarAviso(
            "El número de servicio tiene 12 dígitos. Revisa tu recibo e inténtalo de nuevo."
        );

        inpServicio.focus();

        return;
    }

    mostrarAviso("");

    consultar(() => resolverServicio(numero));

});


/* Botones de "Prueba con" */

document.querySelectorAll(".search-suggestions button[data-q]")
    .forEach(boton => {

        boton.addEventListener("click", () => buscarLibre(boton.dataset.q));

    });


/*
    Búsqueda de texto libre. Sirve para los botones de ejemplo y
    para recibir una consulta desde otra página:

        consulta.html?q=Narvarte%20Poniente
*/

function buscarLibre(texto) {

    const limpio = texto.trim();

    if (consultando || limpio === "") {

        return;
    }

    if (/^\d{12}$/.test(limpio.replace(/\s/g, ""))) {

        cambiarModoSinFoco("servicio");

        inpServicio.value = limpio.replace(/\s/g, "");

        mostrarAviso("");

        consultar(() => resolverServicio(inpServicio.value));

        return;
    }

    cambiarModoSinFoco("colonia");

    const colonia = buscarColonia(limpio, "");

    const alcaldia = colonia ? colonia.alcaldia : buscarAlcaldia(limpio);

    selAlcaldia.value = alcaldia || "";

    llenarColonias();

    inpColonia.value = colonia ? colonia.nombre : (alcaldia ? "" : limpio);

    mostrarAviso("");

    consultar(() => resolverColonia(selAlcaldia.value, inpColonia.value));

}


function cambiarModoSinFoco(modo) {

    tabs.forEach(tab => {

        const activa = tab.dataset.modo === modo;

        tab.classList.toggle("active", activa);

        tab.setAttribute("aria-selected", activa);

    });

    formColonia.hidden = modo !== "colonia";

    formServicio.hidden = modo !== "servicio";

}


/* ================= CONSULTA SIMULADA ================= */

function consultar(resolver) {

    consultando = true;

    const botones = document.querySelectorAll(".consulta-submit");

    botones.forEach(b => { b.disabled = true; });

    nearbyCard.hidden = true;

    resultCard.innerHTML = `
        <div class="loading-state">
            <i class="fa-solid fa-spinner fa-spin spin"></i>
            <h2>Consultando…</h2>
            <p>Revisando el resultado del último análisis de la red.</p>
        </div>
    `;


    /* Pequeña espera para simular la consulta al sistema */

    setTimeout(() => {

        resolver();

        consultando = false;

        botones.forEach(b => { b.disabled = false; });

        resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });

    }, 750);

}


function resolverColonia(alcaldia, texto) {

    /* Solo alcaldía: resumen de la alcaldía */

    if (texto === "") {

        pintarAlcaldia(alcaldia);

        return;
    }


    const colonia = buscarColonia(texto, alcaldia);

    if (colonia) {

        pintarColonia(colonia, null);

        guardarReciente(colonia);

        return;
    }

    pintarSinDatos(
        texto,
        alcaldia
            ? `en ${alcaldia}`
            : "en la ciudad"
    );

}


function resolverServicio(numero) {

    const nombreColonia = SERVICIOS[numero];

    const colonia = COLONIAS.find(c => c.nombre === nombreColonia);

    if (!colonia) {

        resultCard.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fa-solid fa-circle-question"></i>
                </div>
                <h2>No encontramos ese número de servicio</h2>
                <p>
                    En esta demostración solo existen algunos números de
                    ejemplo, como <strong>010000000001</strong> o
                    <strong>020000000001</strong>.
                </p>
            </div>
        `;

        return;
    }

    /* Se enmascara el número: solo se muestran los últimos 4 dígitos */

    pintarColonia(colonia, `••••••••${numero.slice(-4)}`);

}


/* ================= PINTAR RESULTADOS ================= */

function pintarColonia(colonia, servicioEnmascarado) {

    const estado = ESTADOS[colonia.estado];

    const analisis = infoAnalisis();

    const hayReporte = colonia.estado !== "normal";


    /* ----- Datos del recuadro ----- */

    let items = "";

    if (colonia.estado === "riesgo") {

        items += itemInfo("Motivo del análisis", colonia.motivo);
    }

    if (hayReporte) {

        items += itemInfo("Tipo de falla", TIPOS_FALLA[colonia.tipoFalla]);

        items += itemInfo("Origen", ORIGENES[colonia.origen]);

    } else {

        items += itemInfo("Reportes activos", "Ninguno");

        items += itemInfo("Último análisis", `Hoy ${analisis.ultima}`);

        items += itemInfo("Próximo análisis", `${analisis.siguienteDia}${analisis.siguiente}`);

    }


    /* ----- Avance del reporte ----- */

    let avance = "";

    if (hayReporte) {

        const actual = ETAPAS.findIndex(e => e.clave === colonia.estatus);

        const pasos = ETAPAS.map((etapa, i) => {

            const clase =
                i < actual ? "done" :
                i === actual ? "current" : "";

            const marca = i < actual
                ? '<i class="fa-solid fa-check"></i>'
                : "";

            return `
                <li class="${clase}">
                    <span class="dot">${marca}</span>
                    ${etapa.nombre}
                </li>
            `;

        }).join("");

        avance = `
            <div class="progress-title">Avance de la atención</div>
            <ol class="stepper">${pasos}</ol>
        `;

    }


    const etiquetaServicio = servicioEnmascarado
        ? `Servicio ${servicioEnmascarado}`
        : colonia.alcaldia;


    resultCard.innerHTML = `
        <div class="result-head ${estado.clase}">
            <div class="state-icon">
                <i class="${estado.icono}"></i>
            </div>
            <div>
                <small>Estado de la zona</small>
                <h2>${estado.titulo}</h2>
            </div>
            <span class="zone-tag">${esc(etiquetaServicio)}</span>
        </div>

        <div class="result-body">

            <div class="zone-title">
                <div class="location-icon">
                    <i class="fa-solid fa-location-dot"></i>
                </div>
                <div>
                    <h3>${esc(colonia.nombre)}</h3>
                    <span>${esc(colonia.alcaldia)}</span>
                </div>
            </div>

            <p class="state-text">${estado.texto}</p>

            <div class="info-grid">${items}</div>

            ${avance}

            <div class="result-actions">
                <button type="button" class="btn-primary" id="btnNueva">
                    <i class="fa-solid fa-rotate-left"></i>
                    Nueva consulta
                </button>
                <a class="btn-secondary" href="index.html#mapa">
                    <i class="fa-regular fa-map"></i>
                    Ver en el mapa
                </a>
                <span class="source-note">
                    Resultado del análisis de las ${analisis.ultima} h · datos de ejemplo
                </span>
            </div>

        </div>
    `;

    activarNuevaConsulta();

    pintarVecinas(colonia);

}


function itemInfo(titulo, valor) {

    return `
        <div class="info-item">
            <small>${titulo}</small>
            <strong>${esc(valor)}</strong>
        </div>
    `;

}


function pintarAlcaldia(alcaldia) {

    const colonias = COLONIAS.filter(c => c.alcaldia === alcaldia);

    if (colonias.length === 0) {

        resultCard.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fa-solid fa-circle-question"></i>
                </div>
                <h2>${esc(alcaldia)}</h2>
                <p>
                    En esta demostración no hay colonias de ejemplo para esta
                    alcaldía. Prueba con Gustavo A. Madero, Iztapalapa,
                    Benito Juárez o Cuauhtémoc.
                </p>
            </div>
        `;

        return;
    }


    const conteo = { normal: 0, riesgo: 0, apagon: 0 };

    let peor = "normal";

    colonias.forEach(c => {

        conteo[c.estado]++;

        if (ORDEN_GRAVEDAD[c.estado] > ORDEN_GRAVEDAD[peor]) {

            peor = c.estado;
        }

    });


    const estado = ESTADOS[peor];

    const analisis = infoAnalisis();


    resultCard.innerHTML = `
        <div class="result-head ${estado.clase}">
            <div class="state-icon">
                <i class="${estado.icono}"></i>
            </div>
            <div>
                <small>Estado general de la alcaldía</small>
                <h2>${estado.titulo}</h2>
            </div>
            <span class="zone-tag">${colonias.length} colonias de ejemplo</span>
        </div>

        <div class="result-body">

            <div class="zone-title">
                <div class="location-icon">
                    <i class="fa-solid fa-location-dot"></i>
                </div>
                <div>
                    <h3>${esc(alcaldia)}</h3>
                    <span>Resumen por colonia</span>
                </div>
            </div>

            <p class="state-text">
                El estado general corresponde a la colonia en peor situación.
                Elige una colonia de la lista para ver su detalle.
            </p>

            <div class="alcaldia-counts">
                <div class="count-box state-normal">
                    <strong>${conteo.normal}</strong>
                    <span>Operación normal</span>
                </div>
                <div class="count-box state-riesgo">
                    <strong>${conteo.riesgo}</strong>
                    <span>En riesgo</span>
                </div>
                <div class="count-box state-apagon">
                    <strong>${conteo.apagon}</strong>
                    <span>Apagón reportado</span>
                </div>
            </div>

            <div class="result-actions">
                <button type="button" class="btn-primary" id="btnNueva">
                    <i class="fa-solid fa-rotate-left"></i>
                    Nueva consulta
                </button>
                <a class="btn-secondary" href="index.html#mapa">
                    <i class="fa-regular fa-map"></i>
                    Ver en el mapa
                </a>
                <span class="source-note">
                    Resultado del análisis de las ${analisis.ultima} h · datos de ejemplo
                </span>
            </div>

        </div>
    `;

    activarNuevaConsulta();

    pintarListaColonias(colonias, `Colonias de ${alcaldia}`);

}


function pintarSinDatos(texto, donde) {

    resultCard.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">
                <i class="fa-solid fa-circle-question"></i>
            </div>
            <h2>Sin información para “${esc(texto)}”</h2>
            <p>
                No encontramos esa colonia ${esc(donde)} en la demostración.
                Revisa el nombre o prueba con una de las colonias de ejemplo.
            </p>
        </div>
    `;

}


/* ================= COLONIAS CERCANAS ================= */

function pintarVecinas(colonia) {

    const vecinas = COLONIAS.filter(c =>
        c.alcaldia === colonia.alcaldia && c.nombre !== colonia.nombre
    );

    if (vecinas.length === 0) {

        nearbyCard.hidden = true;

        return;
    }

    pintarListaColonias(vecinas, `Otras colonias de ${colonia.alcaldia}`);

}


function pintarListaColonias(lista, titulo) {

    nearbyTitle.textContent = titulo;

    nearbyList.innerHTML = "";

    lista.forEach(c => {

        const estado = ESTADOS[c.estado];

        const punto =
            c.estado === "normal" ? "normal" :
            c.estado === "riesgo" ? "medium" : "high";

        const item = document.createElement("li");

        item.innerHTML = `
            <button type="button">
                <i class="legend-dot ${punto}"></i>
                ${esc(c.nombre)}
                <span class="state-label">${estado.corto}</span>
            </button>
        `;

        item.querySelector("button").addEventListener("click", () => {

            buscarLibre(c.nombre);

        });

        nearbyList.appendChild(item);

    });

    nearbyCard.hidden = false;

}


/* ================= NUEVA CONSULTA ================= */

function activarNuevaConsulta() {

    document.getElementById("btnNueva").addEventListener("click", () => {

        resultCard.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fa-solid fa-magnifying-glass-location"></i>
                </div>
                <h2>¿Cómo está tu zona?</h2>
                <p>
                    Elige una alcaldía y escribe tu colonia, o ingresa
                    tu número de servicio.
                </p>
            </div>
        `;

        nearbyCard.hidden = true;

        inpColonia.value = "";

        inpServicio.value = "";

        selAlcaldia.value = "";

        llenarColonias();

        window.scrollTo({ top: 0, behavior: "smooth" });

        (formColonia.hidden ? inpServicio : inpColonia).focus();

    });

}


/* ================= CONSULTAS RECIENTES ================= */

/*
    Solo se guardan colonias (nunca números de servicio) y solo
    mientras la pestaña esté abierta.
*/

function leerRecientes() {

    try {

        return JSON.parse(sessionStorage.getItem("consultasRecientes")) || [];

    } catch (error) {

        return [];
    }

}


function guardarReciente(colonia) {

    const lista = leerRecientes()
        .filter(nombre => nombre !== colonia.nombre);

    lista.unshift(colonia.nombre);

    try {

        sessionStorage.setItem(
            "consultasRecientes",
            JSON.stringify(lista.slice(0, 4))
        );

    } catch (error) {

        /* Sin almacenamiento: simplemente no se recuerdan */
    }

    pintarRecientes();

}


function pintarRecientes() {

    const lista = leerRecientes();

    recientes.querySelectorAll("button").forEach(b => b.remove());

    lista.forEach(nombre => {

        const boton = document.createElement("button");

        boton.type = "button";

        boton.textContent = nombre;

        boton.addEventListener("click", () => buscarLibre(nombre));

        recientes.appendChild(boton);

    });

    recientes.hidden = lista.length === 0;

}


/* ================= MENSAJE ================= */

function mostrarMensaje(texto) {

    const mensaje = document.createElement("div");

    mensaje.textContent = texto;

    mensaje.style.position = "fixed";
    mensaje.style.bottom = "25px";
    mensaje.style.left = "50%";
    mensaje.style.transform = "translateX(-50%)";
    mensaje.style.background = "#17231e";
    mensaje.style.color = "white";
    mensaje.style.padding = "13px 20px";
    mensaje.style.borderRadius = "10px";
    mensaje.style.fontSize = "12px";
    mensaje.style.fontWeight = "600";
    mensaje.style.zIndex = "9999";
    mensaje.style.boxShadow = "0 8px 25px rgba(0,0,0,.2)";

    document.body.appendChild(mensaje);

    setTimeout(() => {

        mensaje.style.opacity = "0";

        mensaje.style.transition = "opacity .3s";

        setTimeout(() => mensaje.remove(), 300);

    }, 2500);

}


/* ================= LOGIN CFE ================= */

/*
    OJO: esto es una maqueta. Las credenciales están en el
    código, así que cualquiera puede verlas. Un login real
    debe validarse en un servidor (con contraseñas cifradas).

    Usa la misma clave de sesión que index.html, así que si ya
    iniciaste sesión allá, aquí también aparece iniciada.
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


const accountButton = document.querySelector(".account-button");

const accountMenu = document.getElementById("accountMenu");

const accountMenuName = document.getElementById("accountMenuName");

const logoutButton = document.getElementById("logoutButton");

const loginModal = document.getElementById("loginModal");

const loginForm = document.getElementById("loginForm");

const loginUser = document.getElementById("loginUser");

const loginPass = document.getElementById("loginPass");

const loginError = document.getElementById("loginError");

const loginSubmit = document.getElementById("loginSubmit");

const togglePass = document.getElementById("togglePass");

const closeLogin = document.getElementById("closeLogin");


let sesion = null;

let intentosFallidos = 0;

let bloqueadoHasta = 0;

let verificando = false;

const textoLogin = loginSubmit.innerHTML;


try {

    sesion = JSON.parse(sessionStorage.getItem("sesionCFE"));

} catch (error) {

    sesion = null;
}


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


function mostrarErrorLogin(texto) {

    loginError.textContent = texto;

    loginError.classList.toggle("visible", texto !== "");

}


loginForm.addEventListener("submit", event => {

    event.preventDefault();

    if (verificando) {

        return;
    }

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

            bloqueadoHasta = Date.now() + SEGUNDOS_BLOQUEO * 1000;

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


function iniciarSesion(usuario) {

    sesion = { nombre: usuario.nombre };

    sessionStorage.setItem("sesionCFE", JSON.stringify(sesion));

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


document.addEventListener("click", event => {

    if (!accountMenu.contains(event.target)) {

        accountMenu.classList.remove("open");
    }

});


actualizarBotonCuenta();


/* ================= CARGA ================= */

window.addEventListener("load", () => {

    pintarAnalisis();

    pintarRecientes();

    /* Consulta que llega desde otra página: consulta.html?q=Lindavista */

    const q = new URLSearchParams(window.location.search).get("q");

    if (q) {

        buscarLibre(q);
    }

});

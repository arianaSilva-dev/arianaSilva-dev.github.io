/* =====================================================
   RED ELÉCTRICA CDMX · CONSULTA (MAQUETA VISUAL)
===================================================== */

const ESTADOS = {
    normal: {
        titulo: "Operación normal",
        corto: "Normal",
        clase: "state-normal",
        icono: "fa-solid fa-circle-check",
        texto: "No hay reportes activos ni alertas preventivas en tu zona. En el último análisis, la carga de los transformadores estuvo dentro de lo esperado."
    },
    riesgo: {
        titulo: "En riesgo de apagón",
        corto: "En riesgo",
        clase: "state-riesgo",
        icono: "fa-solid fa-triangle-exclamation",
        texto: "El análisis periódico detectó condiciones que podrían provocar un apagón. Personal de CFE puede visitar los servicios conectados para revisar la zona."
    },
    apagon: {
        titulo: "Apagón reportado",
        corto: "Apagón",
        clase: "state-apagon",
        icono: "fa-solid fa-bolt-lightning",
        texto: "Hay un reporte activo de falla de suministro en tu zona. Abajo puedes ver en qué etapa de atención se encuentra."
    }
};

const ETAPAS = [
    { clave: "registrado", nombre: "Registrado" },
    { clave: "asignado", nombre: "Cuadrilla asignada" },
    { clave: "en_proceso", nombre: "En proceso" },
    { clave: "cerrado", nombre: "Cerrado" }
];

/* ================= CARGA AUTOMÁTICA DE LA VISTA VISUAL ================= */

window.addEventListener("load", () => {
    // Datos falsos predefinidos para la demo visual
    const datosDemo = {
        nombre: "Narvarte Poniente",
        alcaldia: "Benito Juárez",
        estado: "riesgo",
        motivo: "Mantenimiento vencido y alta demanda",
        tipoFalla: "Sobrecarga",
        origen: "Alerta preventiva del sistema",
        estatus: "registrado"
    };

    pintarVistaDemo(datosDemo, "••••••••0302");
    
    console.log("Maqueta visual de consulta cargada correctamente.");
});

function pintarVistaDemo(colonia, servicioEnmascarado) {
    const estado = ESTADOS[colonia.estado];
    const resultCard = document.getElementById("resultCard");
    const nearbyCard = document.getElementById("nearbyCard");
    const nearbyTitle = document.getElementById("nearbyTitle");
    const nearbyList = document.getElementById("nearbyList");

    if (!resultCard) return;

    // 1. Generar los cuadros de información
    let items = `
        <div class="info-item">
            <small>Motivo del análisis</small>
            <strong>${colonia.motivo}</strong>
        </div>
        <div class="info-item">
            <small>Tipo de falla</small>
            <strong>${colonia.tipoFalla}</strong>
        </div>
        <div class="info-item">
            <small>Origen</small>
            <strong>${colonia.origen}</strong>
        </div>
    `;

    // 2. Generar el avance por pasos (Stepper)
    const actual = ETAPAS.findIndex(e => e.clave === colonia.estatus);
    const pasos = ETAPAS.map((etapa, i) => {
        const clase = i < actual ? "done" : i === actual ? "current" : "";
        const marca = i < actual ? '<i class="fa-solid fa-check"></i>' : "";
        return `
            <li class="${clase}">
                <span class="dot">${marca}</span>
                ${etapa.nombre}
            </li>
        `;
    }).join("");

    const avance = `
        <div class="progress-title">Avance de la atención</div>
        <ol class="stepper">${pasos}</ol>
    `;

    // 3. Pintar la tarjeta principal de resultados
    resultCard.innerHTML = `
        <div class="result-head ${estado.clase}">
            <div class="state-icon">
                <i class="${estado.icono}"></i>
            </div>
            <div>
                <small>Estado de la zona (Vista Demo)</small>
                <h2>${estado.titulo}</h2>
            </div>
            <span class="zone-tag">Servicio ${servicioEnmascarado}</span>
        </div>

        <div class="result-body">
            <div class="zone-title">
                <div class="location-icon">
                    <i class="fa-solid fa-location-dot"></i>
                </div>
                <div>
                    <h3>${colonia.nombre}</h3>
                    <span>${colonia.alcaldia}</span>
                </div>
            </div>

            <p class="state-text">${estado.texto}</p>

            <div class="info-grid">${items}</div>

            ${avance}

            <div class="result-actions">
                <button type="button" class="btn-primary" onclick="location.reload()">
                    <i class="fa-solid fa-rotate-left"></i>
                    Reiniciar Demo
                </button>
                <span class="source-note">
                    Simulación visual generada para presentación · Datos de ejemplo
                </span>
            </div>
        </div>
    `;

    // 4. Pintar colonias vecinas falsas para adornar la vista
    if (nearbyCard && nearbyList && nearbyTitle) {
        nearbyTitle.textContent = `Otras colonias de ${colonia.alcaldia}`;
        nearbyList.innerHTML = `
            <li><button type="button"><i class="legend-dot normal"></i> Del Valle Centro <span class="state-label">Normal</span></button></li>
            <li><button type="button"><i class="legend-dot medium"></i> Nápoles <span class="state-label">En riesgo</span></button></li>
        `;
        nearbyCard.hidden = false;
    }
}

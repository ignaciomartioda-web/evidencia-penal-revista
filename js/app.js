/**
 * app.js - Concatenated and Non-Modularized Application Bundle
 * Campaña Ferraro CABA 2026 - Fully Offline & Local Compatible
 */

// ─── START OF FILE: data.js ───
/**
 * data.js - Propuestas de Campaña de Maxi Ferraro (Contenido Unificado)
 * Plataforma Maxi Ferraro - Campaña 2026
 */

const PROPUESTAS_FERRARO = {
    "doc1": {
        title: "Revolución Educativa Digital: Conectividad y Habilidades para la Economía del Conocimiento",
        author: "Maxi Ferraro | Eje Educación",
        category: "Educación y Futuro",
        date: "Mayo 2026",
        abstract: "Propuesta de modernización educativa integral para la Ciudad. Blinda el presupuesto de conectividad escolar mediante ley, garantiza fibra óptica simétrica y actualiza los currículos con programación e inteligencia artificial. Integra un flujo automatizado de recolección de voluntariados y feedback a través de un pipeline CRM digital.",
        keywords: ["Conectividad Escolar", "Habilidades Digitales", "CRM Integrado"],
        marginalia: [
            {
                type: "note",
                label: "AUTOMATIZACIÓN CRM",
                text: "Captura de contactos multicanal: disparo por palabra clave 'GUÍA' en Instagram (Manychat/Node.js Webhook) a Google Sheets, sincronizado vía Google Contacts con People API."
            },
            {
                type: "quote",
                text: "La conectividad escolar y la alfabetización digital son los derechos básicos de ciudadanía del siglo XXI."
            }
        ],
        body: `
            <h3>1. Presupuesto Blindado e Infraestructura Tecnológica</h3>
            <p>La escuela pública debe ser la plataforma de despegue para la economía del conocimiento. Proponemos una ley de financiamiento que proteja los recursos de infraestructura digital, asegurando conectividad por fibra óptica simétrica en el 100% de los establecimientos escolares de la Ciudad de Buenos Aires.</p>
            <p>Este piso tecnológico permitirá la implementación de laboratorios de innovación interactivos e interconectados.</p>
            <h3>2. Integración de Habilidades y Formación Docente en CRM</h3>
            <p>Actualizaremos los planes de estudio para incorporar pensamiento computacional, programación y uso ético de la inteligencia artificial desde la escuela primaria. Acompañamos esta transformación con un portal de formación continua docente. Además, el seguimiento del desempeño escolar y el feedback de la comunidad se gestionará mediante un pipeline automatizado, conectando las inquietudes locales de padres y docentes directamente a las bases de datos de planificación escolar.</p>
        `
    },
    "doc2": {
        title: "Ficha Limpia y Transparencia Activa: Auditoría Ciudadana de Cuentas Públicas",
        author: "Maxi Ferraro | Eje Democracia",
        category: "Transparencia",
        date: "Junio 2026",
        abstract: "Establece la obligatoriedad de Ficha Limpia para cargos electivos y ministeriales. Introduce la plataforma 'Auditor Ciudadano', un portal interactivo de control de contrataciones estatales con blockchain y un categorizador de denuncias vecinales basado en IA y OCR de Workspace.",
        keywords: ["Ficha Limpia", "Auditor Ciudadano", "Democracia Abierta"],
        marginalia: [
            {
                type: "note",
                label: "AUDITORÍA CON IA",
                text: "Categorización automática de reclamos mediante modelos de lenguaje que analizan correos vecinales (Gmail Workspace MCP Server) y cargan datos normalizados a la base central."
            },
            {
                type: "quote",
                text: "El control en tiempo real de los fondos públicos desmantela la corrupción antes de que ocurra."
            }
        ],
        body: `
            <h3>1. Ficha Limpia como Requisito de Acceso</h3>
            <p>Impulsamos la inhabilitación para ejercer cargos públicos a toda persona con condena confirmada en segunda instancia por delitos contra la administración pública. Este estándar ético asegura que quienes administran el Estado cuenten con idoneidad moral y técnica probada frente a la ciudadanía.</p>
            <h3>2. Portal 'Auditor Ciudadano' e Integración OCR</h3>
            <p>Crearemos un portal público respaldado por tecnología blockchain donde se registrarán el 100% de las compras, licitaciones y adjudicaciones del Estado. Sumado a esto, implementaremos un canal de comunicación directa por correo electrónico donde un sistema de IA procesará los reclamos locales. Mediante OCR en la nube, el sistema extraerá nombres, barrios y problemas (como baches o luminarias apagadas) para volcarlos directamente en el mapa de gestión pública abierta, permitiendo a los vecinos realizar un seguimiento directo desde sus celulares.</p>
        `
    },
    "doc3": {
        title: "Plan de Transición Energética y Economía Circular para el Desarrollo Urbano",
        author: "Maxi Ferraro | Eje Ambiente",
        category: "Economía y Ambiente",
        date: "Julio 2026",
        abstract: "Propuesta de reconversión ecológica de la Ciudad mediante microrredes solares comunitarias en terrazas residenciales y la tecnificación y formalización de las cooperativas de recicladores urbanos en el circuito productivo de la economía circular.",
        keywords: ["Energías Limpias", "Recicladores Urbanos", "Economía Circular"],
        marginalia: [
            {
                type: "note",
                label: "METAS VERDES",
                text: "Objetivo de inyectar energía limpia a la red y alcanzar un 30% de generación eléctrica renovable local en la Ciudad para el año 2030."
            },
            {
                type: "quote",
                text: "Las microrredes solares en los consorcios democratizan el acceso a la energía y reducen la huella de carbono metropolitana."
            }
        ],
        body: `
            <h3>1. Descentralización Energética en Consorcios y Comercios</h3>
            <p>Proponemos un marco regulatorio de microrredes solares comunitarias para facilitar la instalación de paneles solares fotovoltaicos en terrazas de edificios y locales comerciales de CABA. Los consorcios podrán inyectar el excedente energético a la red pública, obteniendo créditos impositivos directos y abaratando las expensas de los vecinos.</p>
            <h3>2. Tecnificación y Formalización del Reciclado Urbano</h3>
            <p>Transformaremos el sistema de recolección diferenciada mediante la digitalización y equipamiento de los centros verdes de la Ciudad. Promovemos la integración formal de las cooperativas de recicladores con incentivos a la industria local que utilice insumos reciclados certificados, garantizando empleo verde formal y trazabilidad ambiental.</p>
        `
    },
    "doc-seguridad": {
        title: "Seguridad de Proximidad: Trazabilidad y Combate al Robo de Tecnología en las Comunas",
        author: "Maxi Ferraro | Eje Seguridad",
        category: "Seguridad",
        date: "Agosto 2026",
        abstract: "Propuesta legislativa para descentralizar la prevención en CABA, enfocando la fiscalización y clausura de locales clandestinos de reventa de celulares y repuestos tecnológicos en las Comunas 7, 10 y 11, auditando la labor de los inspectores de la AGC.",
        keywords: ["Seguridad Ciudadana", "Comunas 7, 10, 11", "Trazabilidad AGC"],
        marginalia: [
            {
                type: "note",
                label: "FOCO EN COMUNAS",
                text: "Operativos conjuntos y georreferenciados para auditar e inspeccionar la cadena de trazabilidad de dispositivos móviles en el corredor comercial de las comunas del oeste."
            },
            {
                type: "quote",
                text: "Desarmar el mercado de tecnología robada es la forma más directa de proteger al vecino del arrebato en el espacio público."
            }
        ],
        body: `
            <h3>1. Asfixia Económica al Mercado Negro de Celulares</h3>
            <p>El robo de celulares en CABA se sostiene gracias a las cuevas de reducción y reventa informal. Proponemos un protocolo estricto de trazabilidad obligatoria por número de serie e IMEI para todo comercio de tecnología usada, con clausura inmediata y denuncia penal a quienes compren o vendan dispositivos sin origen comprobable.</p>
            <h3>2. Control y Auditoría de Inspectores de la AGC</h3>
            <p>Para evitar la discrecionalidad y proteger a los comerciantes honestos de las comunas del oeste, impulsamos una auditoría pública sobre el cuerpo de inspectores de la AGC. Toda inspección y clausura deberá documentarse digitalmente en tiempo real en una base georreferenciada para evitar extorsiones y asegurar la transparencia operativa.</p>
        `
    },
    "doc-impuestos": {
        title: "Alivio Tributario PyME: Incentivos Sostenibles y Auditoría del Gasto Comunal",
        author: "Maxi Ferraro | Eje Economía",
        category: "Impuestos",
        date: "Septiembre 2026",
        abstract: "Propone exenciones en Ingresos Brutos a PyMEs con procesos de huella de carbono cero y simplificación en habilitaciones comerciales. Plantea la fiscalización descentralizada del gasto de obras comunales mediante una PWA offline con base en Supabase.",
        keywords: ["Alivio Fiscal PyME", "Gasto Comunal", "App Offline Supabase"],
        marginalia: [
            {
                type: "note",
                label: "PWA TERRITORIAL",
                text: "Aplicación móvil Progressive Web App (PWA) de descarga rápida para militantes con base de datos offline-first en Supabase (plan gratuito de 50k usuarios)."
            },
            {
                type: "quote",
                text: "Aliviar impositivamente a quien invierte en su barrio y permitirle controlar adónde van sus tasas comunales reactiva el comercio local."
            }
        ],
        body: `
            <h3>1. Exenciones Impositivas PyME de Impacto Verde</h3>
            <p>Estableceremos exenciones de hasta el 100% en Ingresos Brutos durante el primer año para nuevos comercios de proximidad y PyMEs locales que certifiquen procesos sustentables (economía circular o huella de carbono neutro). Esta rebaja busca promover la reactivación de locales vacíos en los centros comerciales de barrio.</p>
            <h3>2. Control Territorial Georreferenciado del Gasto Público</h3>
            <p>Cada obra pública de mantenimiento urbano (veredas, asfalto, plazas) estará publicada en formato abierto y georreferenciado. Mediante una aplicación web progresiva (PWA) de recolección de datos offline-first, los vecinos y activistas de la comuna podrán auditar directamente en el territorio el estado real del avance físico de las obras, reportando desvíos que se sincronizarán inmediatamente con Supabase y alertarán a los legisladores.</p>
        `
    }
};

const ARTICULOS_REVISTA = PROPUESTAS_FERRARO;

// ─── END OF FILE: data.js ───

// ─── START OF FILE: dashboard.js ───
/**
 * dashboard.js - Gestión de Tablero de Control, Tab Switching y Gráficos Custom HTML5 Canvas
 * Plataforma Maxi Ferraro - Campaña 2026
 */

const dbChartModels = {
    swot: 'radar',
    barrios: 'trend',
    bench: 'bar'
};

function initDashboard() {
    console.log("Dashboard - Inicializando listeners y controles...");

    // Tab switching del tablero
    const dbNavItems = document.querySelectorAll('.db-nav-item');
    const dbPanels = document.querySelectorAll('.db-panel');
    const dbHeaderTitle = document.getElementById('db-header-title');

    dbNavItems.forEach(item => {
        item.addEventListener('click', () => {
            dbNavItems.forEach(i => i.classList.remove('active'));
            dbPanels.forEach(p => p.classList.remove('active'));

            item.classList.add('active');
            const targetPanel = document.getElementById(item.getAttribute('data-db-tab'));
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
            if (dbHeaderTitle) {
                // Remover emoji y espacios al inicio para el título del header
                dbHeaderTitle.textContent = item.textContent.replace(/^[\p{Emoji}\s]+/u, '').trim();
            }
            
            // Re-dibujar gráficos con un breve retraso para asegurar visibilidad en pantalla
            setTimeout(() => {
                renderDbCharts();
            }, 50);
        });
    });

    // Listeners globales para redibujar en cambio de tamaño de ventana
    window.addEventListener('resize', renderDbCharts);
    window.addEventListener('load', renderDbCharts);

    // Renderizado inicial
    renderDbCharts();
}

function setDbChartModel(chartId, model) {
    dbChartModels[chartId] = model;
    
    // Actualizar botones activos en el DOM del panel visible
    let tabId = '';
    if (chartId === 'swot') tabId = 'db-tab-resumen';
    else if (chartId === 'barrios') tabId = 'db-tab-seguridad';
    else if (chartId === 'bench') tabId = 'db-tab-benchmarking';
    
    const panel = document.getElementById(tabId);
    if (panel) {
        const buttons = panel.querySelectorAll('.db-btn-toggle');
        buttons.forEach(btn => {
            const btnText = btn.textContent.toLowerCase();
            const targetText = (model === 'trend' ? 'línea' : model === 'radar' ? 'radar' : 'barras');
            if (btnText === targetText) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    renderDbCharts();
}

// Motores de dibujo custom HTML5 Canvas
function drawDbRadarChart(ctx, width, height, labels, values, maxVal, color) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.38;

    ctx.clearRect(0, 0, width, height);

    // Polígonos de la cuadrícula de fondo
    const levels = 4;
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (let l = 1; l <= levels; l++) {
        ctx.beginPath();
        const currentRadius = radius * (l / levels);
        for (let i = 0; i < labels.length; i++) {
            const angle = (i * Math.PI * 2) / labels.length - Math.PI / 2;
            const x = centerX + Math.cos(angle) * currentRadius;
            const y = centerY + Math.sin(angle) * currentRadius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }

    // Ejes radiales y etiquetas de variables
    ctx.fillStyle = '#64748b';
    ctx.font = '9px "Share Tech Mono", monospace';
    ctx.textAlign = 'center';
    for (let i = 0; i < labels.length; i++) {
        const angle = (i * Math.PI * 2) / labels.length - Math.PI / 2;
        const axisX = centerX + Math.cos(angle) * radius;
        const axisY = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(axisX, axisY);
        ctx.stroke();

        const labelX = centerX + Math.cos(angle) * (radius + 20);
        const labelY = centerY + Math.sin(angle) * (radius + 15);
        ctx.fillText(labels[i], labelX, labelY);
    }

    // Polígono de valores de datos
    ctx.beginPath();
    for (let i = 0; i < values.length; i++) {
        const valRatio = values[i] / maxVal;
        const angle = (i * Math.PI * 2) / labels.length - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius * valRatio;
        const y = centerY + Math.sin(angle) * radius * valRatio;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = color.replace('1)', '0.15)');
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Puntos / Nodos en los extremos
    for (let i = 0; i < values.length; i++) {
        const valRatio = values[i] / maxVal;
        const angle = (i * Math.PI * 2) / labels.length - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius * valRatio;
        const y = centerY + Math.sin(angle) * radius * valRatio;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }
}

function drawDbBarChart(ctx, width, height, labels, values, maxVal, color) {
    ctx.clearRect(0, 0, width, height);
    const paddingLeft = 50;
    const paddingBottom = 40;
    const paddingTop = 30;
    const paddingRight = 30;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    // Líneas horizontales de cuadrícula y etiquetas eje Y
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
        const y = paddingTop + (chartHeight * (i / gridLines));
        ctx.beginPath();
        ctx.moveTo(paddingLeft, y);
        ctx.lineTo(width - paddingRight, y);
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = '9px "Share Tech Mono", monospace';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        const labelVal = Math.round(maxVal * (1 - (i / gridLines)));
        ctx.fillText(labelVal, paddingLeft - 8, y);
    }

    // Barras de datos
    const barSpacing = chartWidth / labels.length;
    const barWidth = barSpacing * 0.5;

    for (let i = 0; i < labels.length; i++) {
        const barHeight = chartHeight * (values[i] / maxVal);
        const x = paddingLeft + (barSpacing * i) + (barSpacing - barWidth) / 2;
        const y = paddingTop + chartHeight - barHeight;

        const grad = ctx.createLinearGradient(x, y, x, y + barHeight);
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'rgba(0,0,0,0.1)');

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, barHeight);
        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, barWidth, barHeight);

        // Etiquetas eje X (etiquetas inferiores de variables)
        ctx.fillStyle = '#64748b';
        ctx.font = '9px "Share Tech Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(labels[i], x + barWidth / 2, paddingTop + chartHeight + 8);
    }
}

function drawDbLineChart(ctx, width, height, labels, dataset, maxVal, color) {
    ctx.clearRect(0, 0, width, height);
    const paddingLeft = 50;
    const paddingBottom = 40;
    const paddingTop = 30;
    const paddingRight = 30;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    // Líneas horizontales de cuadrícula y etiquetas eje Y
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
        const y = paddingTop + (chartHeight * (i / gridLines));
        ctx.beginPath();
        ctx.moveTo(paddingLeft, y);
        ctx.lineTo(width - paddingRight, y);
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = '9px "Share Tech Mono", monospace';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        const labelVal = Math.round(maxVal * (1 - (i / gridLines)));
        ctx.fillText(labelVal, paddingLeft - 8, y);
    }

    const stepX = chartWidth / (labels.length - 1);
    
    // Trazado de la línea conectora principal
    ctx.beginPath();
    for (let i = 0; i < dataset.length; i++) {
        const x = paddingLeft + (stepX * i);
        const y = paddingTop + chartHeight - (chartHeight * (dataset[i] / maxVal));
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Relleno degradado debajo de la línea
    ctx.lineTo(paddingLeft + (stepX * (dataset.length - 1)), paddingTop + chartHeight);
    ctx.lineTo(paddingLeft, paddingTop + chartHeight);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, paddingTop, 0, paddingTop + chartHeight);
    grad.addColorStop(0, color.replace('1)', '0.2)'));
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Nodos de datos y etiquetas de categorías
    for (let i = 0; i < dataset.length; i++) {
        const x = paddingLeft + (stepX * i);
        const y = paddingTop + chartHeight - (chartHeight * (dataset[i] / maxVal));
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = '9px "Share Tech Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(labels[i], x, paddingTop + chartHeight + 8);
    }
}

function renderDbCharts() {
    // 1. Gráfico SWOT
    const swotCanvas = document.getElementById('db-swot-chart');
    if (swotCanvas && swotCanvas.offsetParent !== null) {
        const ctx = swotCanvas.getContext('2d');
        swotCanvas.width = swotCanvas.clientWidth;
        swotCanvas.height = swotCanvas.clientHeight;
        const labels = ['Trayectoria', 'Perfil Ético', 'Consensos', 'Redes', 'Populismo'];
        const values = [8.5, 9.5, 8.0, 7.5, 4.0];
        if (dbChartModels.swot === 'radar') {
            drawDbRadarChart(ctx, swotCanvas.width, swotCanvas.height, labels, values, 10, 'rgba(50, 205, 50, 1)');
        } else {
            drawDbBarChart(ctx, swotCanvas.width, swotCanvas.height, labels, values, 10, '#32CD32');
        }
    }

    // 2. Gráfico Barrios / Corredores (Seguridad)
    const barriosCanvas = document.getElementById('db-barrios-chart');
    if (barriosCanvas && barriosCanvas.offsetParent !== null) {
        const ctx = barriosCanvas.getContext('2d');
        barriosCanvas.width = barriosCanvas.clientWidth;
        barriosCanvas.height = barriosCanvas.clientHeight;
        const labels = ['Centro', 'Norte', 'Sur', 'Oeste', 'C. Oeste'];
        const values = [90, 85, 78, 65, 72];
        if (dbChartModels.barrios === 'trend') {
            drawDbLineChart(ctx, barriosCanvas.width, barriosCanvas.height, labels, values, 100, 'rgba(230, 57, 70, 1)');
        } else {
            drawDbBarChart(ctx, barriosCanvas.width, barriosCanvas.height, labels, values, 100, '#E63946');
        }
    }

    // 3. Gráfico Benchmarking Costo-Impacto
    const benchCanvas = document.getElementById('db-bench-chart');
    if (benchCanvas && benchCanvas.offsetParent !== null) {
        const ctx = benchCanvas.getContext('2d');
        benchCanvas.width = benchCanvas.clientWidth;
        benchCanvas.height = benchCanvas.clientHeight;
        const labels = ['Town Halls', 'Ludopatía', 'En Bici', 'Plaza Ideas'];
        const values = [80, 95, 70, 75];
        if (dbChartModels.bench === 'bar') {
            drawDbBarChart(ctx, benchCanvas.width, benchCanvas.height, labels, values, 100, '#FFD700');
        } else {
            drawDbRadarChart(ctx, benchCanvas.width, benchCanvas.height, labels, values, 100, 'rgba(255, 215, 0, 1)');
        }
    }
}

// Exponer en window para retrocompatibilidad con controladores inline 'onclick' en HTML
window.setDbChartModel = setDbChartModel;
window.renderDbCharts = renderDbCharts;

// ─── END OF FILE: dashboard.js ───

// ─── START OF FILE: router.js ───
/**
 * router.js - Enrutador basado en Hash para la navegación SPA
 * Plataforma Maxi Ferraro - Campaña 2026
 */


let activePageId = '';
let currentActiveDoc = 'doc1';

// Enrutador basado en Hash (Historia y Deep-linking)
function router() {
    const hash = window.location.hash || '#inicio';
    console.log("SPA Router - Hash activo:", hash);

    if (hash === '#inicio' || hash === '#radiografia-politica') {
        showPage('page-inicio');
    } else if (hash === '#publicaciones' || hash === '#secciones' || hash === '#visor-seccion') {
        const wasOtherPage = (activePageId !== 'page-publicaciones');
        showPage('page-publicaciones', wasOtherPage);
        cargarArticuloLocal(currentActiveDoc).then(() => {
            if (hash === '#visor-seccion') {
                const target = document.getElementById('visor-seccion');
                if (target) {
                    if (wasOtherPage) {
                        target.scrollIntoView({ behavior: 'instant', block: 'start' });
                    } else {
                        const rect = target.getBoundingClientRect();
                        if (Math.abs(rect.top) > 50) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                }
            }
        });
    } else if (hash === '#nosotros' || hash === '#sobre-nosotros' || hash === '#biografia-seccion' || hash === '#ejes-partidarios' || hash === '#voluntariado') {
        showPage('page-nosotros');
    } else if (hash === '#dashboard') {
        showPage('page-dashboard');
        setTimeout(() => {
            renderDbCharts();
        }, 50);
    } else if (hash.startsWith('#doc')) {
        const docId = hash.substring(1);
        if (ARTICULOS_REVISTA[docId]) {
            const wasOtherPage = (activePageId !== 'page-publicaciones');
            showPage('page-publicaciones', wasOtherPage);
            currentActiveDoc = docId;
            
            // Esperar que finalice el renderizado antes de calcular posiciones
            cargarArticuloLocal(docId).then(() => {
                const target = document.getElementById('visor-seccion');
                if (target) {
                    if (wasOtherPage) {
                        target.scrollIntoView({ behavior: 'instant', block: 'start' });
                    } else {
                        const rect = target.getBoundingClientRect();
                        if (Math.abs(rect.top) > 50) {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                }
            });
        } else {
            showPage('page-inicio');
        }
    } else {
        showPage('page-inicio');
    }
}

// Intercambio limpio de vistas de página
function showPage(pageId, preventScrollReset = false) {
    if (activePageId === pageId) return;
    activePageId = pageId;

    console.log("SPA Router - Transición a página:", pageId);

    // Ocultar vistas no activas
    const pages = document.querySelectorAll('.page-view');
    pages.forEach(page => page.classList.remove('active'));

    // Activar vista objetivo
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Actualizar estados del Navbar
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });

    // Reset de scroll al cambiar de página
    if (!preventScrollReset) {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Restablecer el navbar visible en transiciones
    const navbar = document.querySelector('.apple-navbar');
    if (navbar) {
        navbar.classList.remove('navbar-hidden');
    }

    // Calibrar y mostrar/ocultar el faro
    const beam = document.getElementById('page-beam');
    if (beam) {
        if (pageId === 'page-inicio') {
            beam.classList.add('active');
            calibrateBeam();
            setTimeout(calibrateBeam, 50);
            setTimeout(calibrateBeam, 300);
        } else {
            beam.classList.remove('active');
        }
    }
}

function cargarArticuloLocal(docId) {
    const articulo = ARTICULOS_REVISTA[docId];
    if (!articulo) return Promise.resolve();

    const visor = document.getElementById('articulo-visor');
    return new Promise((resolve) => {
        if (visor) {
            if (visor.dataset.currentDoc !== docId) {
                visor.classList.add('loading-fade');
                setTimeout(() => {
                    renderArticle(articulo);
                    visor.dataset.currentDoc = docId;
                    visor.classList.remove('loading-fade');
                    resolve();
                }, 200); // Transición suave
            } else {
                renderArticle(articulo);
                resolve();
            }
        } else {
            resolve();
        }
    }).then(() => {
        // Sincronizar TOC (Tabla de Contenidos)
        document.querySelectorAll('.toc-item').forEach(item => {
            item.classList.remove('active');
        });
        const activeItem = document.getElementById(`toc-${docId}`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    });
}

function renderArticle(data) {
    const titleEl = document.getElementById('dyn-title');
    const authorEl = document.getElementById('dyn-author');
    const abstractEl = document.getElementById('dyn-abstract');
    const bodyEl = document.getElementById('dyn-body');
    const badgeEl = document.getElementById('dyn-category-badge');
    const keywordsContainer = document.getElementById('dyn-keywords');
    const marginaliaContainer = document.getElementById('dyn-marginalia');

    if (titleEl) titleEl.innerText = data.title;
    if (authorEl) authorEl.innerText = `${data.author} | ${data.date}`;
    if (badgeEl) badgeEl.innerText = data.category;
    if (abstractEl) abstractEl.innerText = data.abstract;
    if (bodyEl) bodyEl.innerHTML = data.body;

    if (keywordsContainer) {
        keywordsContainer.innerHTML = '';
        data.keywords.forEach(kw => {
            const span = document.createElement('span');
            span.className = 'keyword-tag';
            span.innerText = kw;
            keywordsContainer.appendChild(span);
        });
    }

    if (marginaliaContainer && data.marginalia) {
        marginaliaContainer.innerHTML = '';
        data.marginalia.forEach((item, index) => {
            const block = document.createElement('div');
            if (item.type === 'note') {
                block.className = 'marginalia-block';
                block.innerHTML = `
                    <span class="marginalia-number">${item.label || `NOTA 0${index + 1}`}</span>
                    <p>${item.text}</p>
                `;
            } else if (item.type === 'quote') {
                block.className = 'marginalia-block highlight-quote';
                block.innerHTML = `
                    <p>${item.text}</p>
                `;
            }
            marginaliaContainer.appendChild(block);
        });
    }
}

// Retrocompatibilidad con enlaces antiguos de navegación directa
function navigateTo(pageId) {
    if (pageId === 'page-inicio') window.location.hash = '#inicio';
    else if (pageId === 'page-publicaciones') window.location.hash = '#publicaciones';
    else if (pageId === 'page-nosotros') window.location.hash = '#nosotros';
    else if (pageId === 'page-dashboard') window.location.hash = '#dashboard';
    else window.location.hash = '#inicio';
}

// Exponer navigateTo de forma global para compatibilidad con código HTML inline anterior
window.navigateTo = navigateTo;

function calibrateBeam() {
    // El overlay es fixed en CSS, no requiere calibración dinámica
}

function initRouter() {
    // Escuchar historial de navegación (Back/Forward)
    window.addEventListener('hashchange', router);
}

// ─── END OF FILE: router.js ───

// ─── START OF FILE: animations.js ───
/**
 * animations.js - Animaciones del Faro, Partículas HTML5 Canvas, Spring Physics e Intersection Observers
 * Plataforma Maxi Ferraro - Campaña 2026
 */

function initAnimations() {
    console.log("Animations - Inicializando fluidos dinámicos y partículas...");

    // 1. Animación de revelación en scroll (Intersection Observer)
    initScrollReveals();

    // 2. Comportamiento auto-ocultable del Navbar
    initNavbarAutoHide();

    // 3. Apertura de puerta del faro y micro-parallax del widget
    initNanaBananaFaro();

    // 4. Haz de luz del héroe con inercia física (Spring Physics)
    initHeroCursorBeam();

    // 5. Constelación de nodos y escape de partículas por la puerta abierta
    initFaroConstellationAndParticles();

    // 6. Grid interactiva de la Radiografía Política
    initRadiografiaInteractiva();

    // 7. Navbar de campaña (suave scroll y menú móvil)
    initCampaniaNavbar();
}

function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '-5% 0px -5% 0px',
        threshold: 0.05
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => observer.observe(el));
}

function initNavbarAutoHide() {
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let navbarTicking = false;

    window.addEventListener('scroll', () => {
        if (!navbarTicking) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
                const navbar = document.querySelector('.apple-navbar');
                
                if (navbar) {
                    const scrollDelta = currentScrollY - lastScrollY;
                    if (scrollDelta > 5 && currentScrollY > 80) {
                        navbar.classList.add('navbar-hidden');
                    } else if (scrollDelta < -3 || currentScrollY < 80) {
                        navbar.classList.remove('navbar-hidden');
                    }
                }
                
                lastScrollY = currentScrollY;
                navbarTicking = false;
            });
            navbarTicking = true;
        }
    }, { passive: true });
}

function initNanaBananaFaro() {
    const puerta = document.getElementById('puerta-faro');
    const faroContenedor = document.getElementById('faro-animado');
    const lighthouseWrapper = document.querySelector('.lighthouse-widget-wrapper');

    if (!faroContenedor) return;

    faroContenedor.classList.add('faro-respirando');

    function abrirPuerta() {
        if (puerta) {
            puerta.classList.remove('door-open');
            void puerta.offsetWidth; // Forzar reflow para reiniciar transición
            puerta.classList.add('door-open');
        }
    }

    if (puerta) {
        const faroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(abrirPuerta, 900);
                    faroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        faroObserver.observe(faroContenedor);

        faroContenedor.addEventListener('click', (e) => {
            e.preventDefault();
            puerta.classList.remove('door-open');
            void puerta.offsetWidth;
            setTimeout(abrirPuerta, 400);
        });
    }

    if (lighthouseWrapper) {
        lighthouseWrapper.addEventListener('mousemove', (e) => {
            const rect = lighthouseWrapper.getBoundingClientRect();
            const xPos = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const yPos = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            faroContenedor.style.transform = `rotateX(${-yPos * 5}deg) rotateY(${xPos * 5}deg) translateZ(5px)`;
            faroContenedor.style.transition = 'transform 0.12s ease-out';
        });

        lighthouseWrapper.addEventListener('mouseleave', () => {
            faroContenedor.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
            faroContenedor.style.transition = 'transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    }
}

function initHeroCursorBeam() {
    const heroSection = document.querySelector('.hero-monolith');
    const beamCones = document.querySelectorAll('.hero-beam-cone');
    const externalBeam = document.querySelector('.external-light-beam');

    if (!heroSection || beamCones.length === 0) return;

    let faroOriginX = 0;
    let faroOriginY = 0;
    let rafId = null;

    const spring = {
        current: 0,
        target: 0,
        velocity: 0,
        stiffness: 0.045,
        damping: 0.82,
    };

    function updateFaroOrigin() {
        const wrapper = document.querySelector('.lighthouse-widget-wrapper');
        if (!wrapper) return;
        const rect = wrapper.getBoundingClientRect();
        faroOriginX = rect.left + rect.width * 0.5;
        faroOriginY = rect.top + rect.height * 0.28;
    }

    function shortestAngle(current, target) {
        let delta = target - current;
        while (delta > 180)  delta -= 360;
        while (delta < -180) delta += 360;
        return current + delta;
    }

    function stepSpring() {
        const normalizedTarget = shortestAngle(spring.current, spring.target);
        const force = (normalizedTarget - spring.current) * spring.stiffness;
        spring.velocity = (spring.velocity + force) * spring.damping;
        spring.current += spring.velocity;
    }

    function animateBeam() {
        stepSpring();

        beamCones.forEach((cone) => {
            cone.style.transform = `translateY(-50%) rotate(${spring.current}deg)`;
        });

        if (externalBeam) {
            externalBeam.style.transform =
                `translate(-15px, -60px) rotate(${spring.current * 0.75}deg) scaleY(1)`;
        }

        const isMoving = Math.abs(spring.velocity) > 0.005 ||
                         Math.abs(spring.target - spring.current) > 0.01;
        if (isMoving) {
            rafId = requestAnimationFrame(animateBeam);
        } else {
            rafId = null;
        }
    }

    function startLoop() {
        if (!rafId) {
            rafId = requestAnimationFrame(animateBeam);
        }
    }

    heroSection.addEventListener('mousemove', (e) => {
        updateFaroOrigin();
        const dx = e.clientX - faroOriginX;
        const dy = e.clientY - faroOriginY;
        spring.target = Math.atan2(dy, dx) * (180 / Math.PI);
        startLoop();
    });

    heroSection.addEventListener('mouseleave', () => {
        spring.target = 0;
        startLoop();
    });

    window.addEventListener('resize', updateFaroOrigin);
    updateFaroOrigin();
}

function initRadiografiaInteractiva() {
    const nodes = document.querySelectorAll('.network-node');
    const cards = document.querySelectorAll('.info-card');
    const lines = {
        'info-edu': document.getElementById('line-edu'),
        'info-transp': document.getElementById('line-transp'),
        'info-amb': document.getElementById('line-amb'),
        'info-estruc': document.getElementById('line-estruc'),
        'info-electoral': document.getElementById('line-electoral')
    };
    const hub = document.querySelector('.network-hub');
    
    if (nodes.length === 0) return;

    const colors = {
        'info-edu': 'rgba(255, 107, 0, 0.4)',
        'info-transp': 'rgba(0, 229, 163, 0.4)',
        'info-amb': 'rgba(230, 0, 122, 0.4)',
        'info-estruc': 'rgba(26, 98, 255, 0.4)',
        'info-electoral': 'rgba(230, 0, 122, 0.4)'
    };
    
    const borders = {
        'info-edu': 'var(--color-naranja)',
        'info-transp': 'var(--color-verde)',
        'info-amb': 'var(--color-fucsia)',
        'info-estruc': 'var(--color-azul-anchor)',
        'info-electoral': 'var(--color-fucsia)'
    };

    nodes.forEach(node => {
        node.addEventListener('click', () => {
            const targetId = node.getAttribute('data-target');
            
            nodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');
            
            Object.values(lines).forEach(line => {
                if (line) {
                    line.classList.remove('active');
                    line.setAttribute('stroke-width', '1.5');
                    line.setAttribute('opacity', '0.5');
                }
            });
            const activeLine = lines[targetId];
            if (activeLine) {
                activeLine.classList.add('active');
                activeLine.setAttribute('stroke', borders[targetId]);
                activeLine.setAttribute('stroke-width', '2.5');
                activeLine.setAttribute('opacity', '0.95');
            }
            
            if (hub) {
                hub.style.borderColor = borders[targetId];
                hub.style.boxShadow = `0 0 30px ${colors[targetId]}`;
                hub.style.transition = 'all 0.5s ease';
            }
            
            cards.forEach(card => {
                if (card.id === targetId) {
                    card.style.display = 'block';
                    void card.offsetWidth;
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                    card.style.display = 'none';
                }
            });
        });
    });

    const initialActiveNode = document.querySelector('.network-node.active');
    if (initialActiveNode) {
        initialActiveNode.click();
    }
}

function initCampaniaNavbar() {
    const mobileToggle = document.getElementById('navbar-mobile-toggle');
    const allLinks = document.querySelectorAll(
        '.navbar-links .nav-link, .navbar-dropdown .dropdown-item, .mobile-drawer-links .mobile-drawer-link, .mobile-drawer-links .mobile-drawer-sub-link'
    );
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = document.body.classList.toggle('navbar-mobile-open');
            mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    function smoothScrollTo(elementId) {
        const target = document.getElementById(elementId);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    }

    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetHash = link.getAttribute('href');
            if (!targetHash) return;
            
            document.body.classList.remove('navbar-mobile-open');
            if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');

            if (targetHash.startsWith('#') && targetHash !== '#inicio' && targetHash !== '#publicaciones' && targetHash !== '#nosotros' && targetHash !== '#dashboard') {
                const elementId = targetHash.substring(1);
                smoothScrollTo(elementId);
            }
        });
    });

    function syncNavbarWithRoute() {
        const currentHash = window.location.hash || '#inicio';
        
        let activePage = 'page-inicio';
        if (currentHash === '#inicio' || currentHash === '#radiografia-politica') {
            activePage = 'page-inicio';
        } else if (currentHash === '#publicaciones' || currentHash.startsWith('#doc') || currentHash === '#visor-seccion') {
            activePage = 'page-publicaciones';
        } else if (currentHash === '#nosotros' || currentHash === '#sobre-nosotros' || currentHash === '#biografia-seccion' || currentHash === '#ejes-partidarios' || currentHash === '#voluntariado' || currentHash === '#iniciativas-legislativas' || currentHash === '#agenda-charlas' || currentHash === '#contacto-seccion') {
            activePage = 'page-nosotros';
        } else if (currentHash === '#dashboard') {
            activePage = 'page-dashboard';
        }

        allLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            link.classList.remove('active');
            
            if (linkPage && linkPage === activePage) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('hashchange', syncNavbarWithRoute);
    syncNavbarWithRoute();

    function handleAnchorScrolling() {
        const hash = window.location.hash;
        if (!hash) return;
        
        const anchors = [
            '#radiografia-politica', 
            '#biografia-seccion', 
            '#ejes-partidarios', 
            '#voluntariado', 
            '#iniciativas-legislativas', 
            '#agenda-charlas', 
            '#contacto-seccion'
        ];
        if (anchors.includes(hash)) {
            const elementId = hash.substring(1);
            smoothScrollTo(elementId);
        }
    }

    window.addEventListener('hashchange', handleAnchorScrolling);
    window.addEventListener('load', handleAnchorScrolling);
}

function initFaroConstellationAndParticles() {
    const constellationCanvas = document.getElementById('faro-constellation-canvas');
    const bgParticlesCanvas = document.getElementById('hero-bg-particles-canvas');
    const lighthouseWrapper = document.querySelector('.lighthouse-widget-wrapper');
    const faroContenedor = document.getElementById('faro-animado');
    const heroSection = document.querySelector('.hero-monolith');

    if (!constellationCanvas || !bgParticlesCanvas || !lighthouseWrapper || !heroSection) return;

    const ctxConst = constellationCanvas.getContext('2d');
    const ctxBg = bgParticlesCanvas.getContext('2d');

    let constWidth, constHeight;
    let bgWidth, bgHeight;

    let constParticles = [];
    let bgParticles = [];

    const CONST_PARTICLE_COUNT = 40;
    const CONST_CONNECTION_DIST = 90;
    const BG_MAX_PARTICLES = 80;

    let mouse = { x: null, y: null, active: false };

    function resizeConstellation() {
        constWidth = constellationCanvas.width = faroContenedor.clientWidth;
        constHeight = constellationCanvas.height = faroContenedor.clientHeight;
    }

    function resizeBgParticles() {
        bgWidth = bgParticlesCanvas.width = heroSection.clientWidth;
        bgHeight = bgParticlesCanvas.height = heroSection.clientHeight;
    }

    function handleResize() {
        resizeConstellation();
        resizeBgParticles();
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    class ConstellationParticle {
        constructor() {
            this.reset(true);
        }

        reset(init = false) {
            this.x = init ? Math.random() * constWidth : (Math.random() * 0.2 + 0.4) * constWidth;
            this.y = init ? Math.random() * constHeight : (Math.random() * 0.2 + 0.4) * constHeight;
            this.vx = (Math.random() - 0.5) * 0.35;
            this.vy = (Math.random() - 0.5) * 0.35;
            this.radius = Math.random() * 2 + 1.5;
            this.baseAlpha = Math.random() * 0.4 + 0.2;
            this.alpha = this.baseAlpha;
            this.color = Math.random() > 0.4 ? 'var(--color-verde)' : 'var(--color-fucsia)';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 15 || this.x > constWidth - 15) this.vx *= -1;
            if (this.y < 15 || this.y > constHeight - 15) this.vy *= -1;

            if (mouse.active && mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.hypot(dx, dy);
                if (dist < 110) {
                    const force = (110 - dist) / 110;
                    this.x += (dx / dist) * force * 1.6;
                    this.y += (dy / dist) * force * 1.6;
                    this.alpha = Math.min(1.0, this.baseAlpha + force * 0.6);
                } else {
                    this.alpha += (this.baseAlpha - this.alpha) * 0.1;
                }
            } else {
                this.alpha += (this.baseAlpha - this.alpha) * 0.1;
            }
        }

        draw() {
            ctxConst.beginPath();
            ctxConst.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctxConst.fillStyle = this.color.includes('verde') ? '#00e5a3' : '#e6007a';
            ctxConst.globalAlpha = this.alpha;
            if (mouse.active) {
                ctxConst.shadowBlur = 8;
                ctxConst.shadowColor = ctxConst.fillStyle;
            }
            ctxConst.fill();
            ctxConst.shadowBlur = 0;
        }
    }

    class EscapedBgParticle {
        constructor(startX, startY) {
            this.x = startX;
            this.y = startY;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 0.8 + 0.3;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.radius = Math.random() * 1.5 + 0.8;
            this.alpha = 1.0;
            this.decay = Math.random() * 0.005 + 0.002;
            this.color = Math.random() > 0.4 ? '#00e5a3' : '#e6007a';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vx += Math.sin(this.y * 0.01) * 0.02;
            this.vy += Math.cos(this.x * 0.01) * 0.02;
            this.alpha -= this.decay;
        }

        draw() {
            ctxBg.beginPath();
            ctxBg.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctxBg.fillStyle = this.color;
            ctxBg.globalAlpha = Math.max(0, this.alpha * 0.45);
            ctxBg.fill();
        }
    }

    for (let i = 0; i < CONST_PARTICLE_COUNT; i++) {
        constParticles.push(new ConstellationParticle());
    }

    lighthouseWrapper.addEventListener('mousemove', (e) => {
        const rect = faroContenedor.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
    });

    lighthouseWrapper.addEventListener('mouseleave', () => {
        mouse.active = false;
        mouse.x = null;
        mouse.y = null;
    });

    function getFaroHeroOrigin() {
        const wrapperRect = lighthouseWrapper.getBoundingClientRect();
        const heroRect = heroSection.getBoundingClientRect();
        return {
            x: (wrapperRect.left + wrapperRect.width / 2) - heroRect.left,
            y: (wrapperRect.top + wrapperRect.height / 2) - heroRect.top
        };
    }

    function loop() {
        ctxConst.clearRect(0, 0, constWidth, constHeight);
        ctxBg.clearRect(0, 0, bgWidth, bgHeight);

        constParticles.forEach(p => {
            p.update();
            p.draw();
        });

        for (let i = 0; i < constParticles.length; i++) {
            for (let j = i + 1; j < constParticles.length; j++) {
                const p1 = constParticles[i];
                const p2 = constParticles[j];
                const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

                if (dist < CONST_CONNECTION_DIST) {
                    const alpha = (1 - dist / CONST_CONNECTION_DIST) * 0.22 * (p1.alpha + p2.alpha) / 2;
                    ctxConst.beginPath();
                    ctxConst.moveTo(p1.x, p1.y);
                    ctxConst.lineTo(p2.x, p2.y);

                    const color1 = p1.color.includes('verde') ? '#00e5a3' : '#e6007a';
                    const color2 = p2.color.includes('verde') ? '#00e5a3' : '#e6007a';
                    const grad = ctxConst.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                    grad.addColorStop(0, color1);
                    grad.addColorStop(1, color2);

                    ctxConst.strokeStyle = grad;
                    ctxConst.globalAlpha = alpha;
                    ctxConst.lineWidth = (1 - dist / CONST_CONNECTION_DIST) * 1.2;
                    ctxConst.stroke();
                }
            }
        }

        const origin = getFaroHeroOrigin();
        const puerta = document.getElementById('puerta-faro');
        const isDoorOpen = puerta && puerta.classList.contains('door-open');

        if (isDoorOpen && Math.random() < 0.2 && bgParticles.length < BG_MAX_PARTICLES) {
            bgParticles.push(new EscapedBgParticle(origin.x, origin.y));
        }

        for (let i = bgParticles.length - 1; i >= 0; i--) {
            const p = bgParticles[i];
            p.update();
            if (p.alpha <= 0 || p.x < 0 || p.x > bgWidth || p.y < 0 || p.y > bgHeight) {
                bgParticles.splice(i, 1);
            } else {
                p.draw();
            }
        }

        requestAnimationFrame(loop);
    }

    loop();
}

// ─── END OF FILE: animations.js ───

// ─── START OF FILE: app.js ───
/**
 * app.js - Entrada principal del sistema SPA modularizado
 * Plataforma Maxi Ferraro - Campaña 2026
 */


// Inicialización de la aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log("SPA - Inicializando sistema modular...");

    // 1. Configurar navegación por links con hashes en el navbar
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const pageId = link.getAttribute('data-page');
        if (pageId) {
            if (pageId === 'page-inicio') link.setAttribute('href', '#inicio');
            else if (pageId === 'page-publicaciones') link.setAttribute('href', '#publicaciones');
            else if (pageId === 'page-nosotros') link.setAttribute('href', '#nosotros');
            else if (pageId === 'page-dashboard') link.setAttribute('href', '#dashboard');
        }
    });

    // 2. Formulario de voluntariado de Campaña
    const volunteerForm = document.getElementById('volunteer-form');
    const formFeedback = document.getElementById('form-feedback');
    if (volunteerForm && formFeedback) {
        volunteerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formFeedback.style.display = 'block';
            const name = document.getElementById('form-name')?.value || 'voluntario';
            formFeedback.innerText = `¡Gracias por sumarte, ${name}! Nos pondremos en contacto con vos a la brevedad.`;
            volunteerForm.reset();
            setTimeout(() => {
                formFeedback.style.display = 'none';
            }, 6000);
        });
    }

    // 3. Inicializar módulos
    initAnimations();
    initDashboard();
    if (document.getElementById('page-inicio')) {
        initRouter();
        router();
    }
});

// ─── END OF FILE: app.js ───

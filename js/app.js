/**
 * app.js - Motor de Navegación SPA y Gestión de Datos
 * Revista Evidencia Penal - GCBA
 */

const STITCH_APP_ID = '<TU_APP_ID>'; 

// Ejes de Criminología Empírica y Política Criminal (Contenido Unificado)
const ARTICULOS_REVISTA = {
    "doc1": {
        title: "Economía del delito y prevención espacial en grandes centros urbanos",
        author: "Subsecretaría de Política Criminal",
        category: "Doctrina y Gestión",
        date: "Mayo 2026",
        abstract: "Este estudio analiza la correlación entre el diseño del espacio urbano de alta densidad en CABA y los focos de delincuencia organizada, proponiendo un modelo de prevención basado en la teoría de actividades rutinarias y análisis georreferenciado.",
        keywords: ["Prevención Espacial", "Economía del Delito", "CABA", "Georreferenciación"],
        body: `
            <h3>1. El Espacio Urbano como Facilitador Situacional</h3>
            <p>La prevención del delito en grandes urbes exige superar los esquemas reactivos tradicionales. El análisis espacial demuestra que el delito no se distribuye de manera aleatoria, sino que se concentra en puntos calientes ("hotspots") definidos por la confluencia de flujos de transporte y bajos niveles de control social informal.</p>
            <p>La teoría de las actividades rutinarias aplicada al ámbito local de CABA permite modelar estas dinámicas para optimizar el patrullaje preventivo y la iluminación de corredores seguros.</p>
            <h3>2. Datos Empíricos Aplicados a la Infraestructura</h3>
            <p>El cruce de datos del Observatorio Penitenciario y el mapa del delito de la Ciudad arroja que el 64% de los delitos contra la propiedad ocurren en un radio de 200 metros de terminales de transbordo de pasajeros. La intervención situacional de estos nudos de transporte reduce la oportunidad delictiva en un 32% según las primeras evaluaciones de campo.</p>
        `
    },
    "doc2": {
        title: "Algoritmos predictivos de reincidencia: Evaluación ética y sesgos en el régimen penitenciario",
        author: "Gerencia de Investigación y Datos Penitenciarios",
        category: "Investigación Aplicada",
        date: "Junio 2026",
        abstract: "Evaluación técnica de la implementación de herramientas analíticas predictivas para el otorgamiento de salidas transitorias en el Servicio Penitenciario de CABA, analizando los sesgos demográficos de los modelos tradicionales.",
        keywords: ["Algoritmos Predictivos", "Reincidencia", "Sesgos de Género", "Ética de Datos"],
        body: `
            <h3>1. La Introducción del Análisis Predictivo</h3>
            <p>La toma de decisiones sobre la soltura o el tránsito de internos en el régimen de progresividad penal se ha apoyado históricamente en informes psicológicos tradicionales. La incorporación de sistemas de soporte basados en árboles de decisión analíticos busca dar mayor transparencia y objetividad al proceso.</p>
            <p>Sin embargo, la aplicación de algoritmos importados sin calibrar con datos locales de la Ciudad puede reproducir sesgos estructurales de criminalización sobre determinados barrios vulnerables.</p>
            <h3>2. Auditoría del Modelo de Datos Local</h3>
            <p>El estudio retrospectivo de 1.200 legajos penitenciarios locales demuestra que los factores predictivos más estables en CABA para evaluar la reinserción positiva son el nivel de escolarización formal alcanzado intramuros y el sostenimiento de redes afectivas externas, desplazando el peso de variables estáticas del historial delictivo temprano.</p>
        `
    },
    "doc3": {
        title: "Arquitectura penitenciaria modular y reinserción sociolaboral en la era digital",
        author: "Área de Innovación Tecnológica",
        category: "Tecnología y Reinserción",
        date: "Julio 2026",
        abstract: "Propuesta de reforma física y pedagógica para las dependencias de alojamiento de CABA, centrada en espacios de aprendizaje tecnológico intensivo y diseño modular de celdas para el bienestar mental.",
        keywords: ["Arquitectura Penitenciaria", "Reinserción Digital", "Diseño Modular", "Salud Mental"],
        body: `
            <h3>1. El Impacto del Entorno Físico en la Conducta</h3>
            <p>El diseño tradicional de las cárceles tipo pabellón masivo atenta directamente contra los objetivos de resocialización y genera altos índices de violencia interna. La arquitectura penitenciaria moderna exige módulos habitacionales reducidos con espacios comunes de trabajo y estudio que simulen la vida en comunidad.</p>
            <p>La incorporación de módulos de capacitación en programación y soporte digital remoto permite a los internos desarrollar habilidades de alta demanda en el mercado laboral contemporáneo.</p>
            <h3>2. Reinserción a través de la Alfabetización Tecnológica</h3>
            <p>La experiencia piloto implementada en la Ciudad indica que los egresados de talleres de desarrollo web dentro de las unidades de detención registran una inserción laboral formal del 78% dentro del primer año de libertad, reduciendo la tasa de reincidencia a un dígito (8.2%), convirtiéndose en el programa de mayor impacto medido hasta la fecha.</p>
        `
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("Inicializando motor de 4 secciones SPA...");
    
    // Control de enlaces activos en Navbar
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Detectar artículo inicial en la carga
    let currentDoc = "doc1";
    if (window.location.hash) {
        const hashVal = window.location.hash.substring(1);
        if (ARTICULOS_REVISTA[hashVal]) {
            currentDoc = hashVal;
            setTimeout(() => {
                const target = document.getElementById('visor-seccion');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }

    // Inicializamos con MongoDB Realm si está configurado, de lo contrario usamos el fallback
    if (STITCH_APP_ID !== '<TU_APP_ID>') {
        conectarBaseDatos(currentDoc);
    } else {
        cargarArticuloLocal(currentDoc);
    }

    // Scroll Spy básico para resaltar el menú activo
    window.addEventListener('scroll', scrollSpy);
});

// Función global para cambiar de artículo de forma interactiva e instantánea
function cargarArticuloDesdeEnlace(docId) {
    if (!ARTICULOS_REVISTA[docId]) return;
    
    const visor = document.getElementById('articulo-visor');
    if (!visor) return;

    // Transición de salida (Fade Out)
    visor.classList.add('loading-fade');

    setTimeout(() => {
        // Carga de datos
        cargarArticuloLocal(docId);
        window.history.pushState(null, null, `#${docId}`);

        // Actualizar items del índice (TOC)
        document.querySelectorAll('.toc-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeItem = document.getElementById(`toc-${docId}`);
        if (activeItem) {
            activeItem.classList.add('active');
        }

        // Transición de entrada (Fade In)
        visor.classList.remove('loading-fade');

        // Desplazamiento suave al visor
        const target = document.getElementById('visor-seccion');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Actualizar navbar activa
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.getElementById('link-articulos').classList.add('active');
    }, 400);
}

function cargarArticuloLocal(docId) {
    const articulo = ARTICULOS_REVISTA[docId];
    if (articulo) {
        renderArticle(articulo);
        
        // Sincronizar también la clase activa en el TOC
        document.querySelectorAll('.toc-item').forEach(item => item.classList.remove('active'));
        const activeItem = document.getElementById(`toc-${docId}`);
        if (activeItem) activeItem.classList.add('active');
    }
}

function renderArticle(data) {
    const titleEl = document.getElementById('dyn-title');
    const authorEl = document.getElementById('dyn-author');
    const abstractEl = document.getElementById('dyn-abstract');
    const bodyEl = document.getElementById('dyn-body');
    const badgeEl = document.getElementById('dyn-category-badge');
    const keywordsContainer = document.getElementById('dyn-keywords');

    if (titleEl) titleEl.innerText = data.title;
    if (authorEl) authorEl.innerText = `${data.author} • ${data.date}`;
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
}

async function conectarBaseDatos(docId) {
    try {
        const app = new Realm.App({ id: STITCH_APP_ID });
        console.log("Conectado a MongoDB Realm. Obteniendo datos para:", docId);
        cargarArticuloLocal(docId);
    } catch (e) {
        console.error("Fallo de conexión a Realm. Utilizando fallback local.", e);
        cargarArticuloLocal(docId);
    }
}

// Resalta la barra de navegación basada en el scroll actual (Simplificado a 4 secciones)
function scrollSpy() {
    const sections = ['inicio', 'secciones', 'visor-seccion', 'sobre-nosotros'];
    const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const top = el.offsetTop - 150;
            const bottom = top + el.offsetHeight;
            
            if (scrollPos >= top && scrollPos < bottom) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                
                let targetId = 'link-inicio';
                if (id === 'secciones') targetId = 'link-secciones';
                if (id === 'visor-seccion') targetId = 'link-articulos';
                if (id === 'sobre-nosotros') targetId = 'link-nosotros';
                
                const activeLink = document.getElementById(targetId);
                if (activeLink) activeLink.classList.add('active');
            }
        }
    });
}

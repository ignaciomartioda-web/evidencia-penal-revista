/**
 * app.js - Motor de Navegación SPA y Gestión de Datos
 * Plataforma Maxi Ferraro - Campaña 2026
 */

// Propuestas de Campaña de Maxi Ferraro (Contenido Unificado)
const PROPUESTAS_FERRARO = {
    "doc1": {
        title: "Revolución Educativa Digital: Financiamiento y conectividad para las aulas del futuro",
        author: "Maxi Ferraro | Eje Educación",
        category: "Educación y Futuro",
        date: "Mayo 2026",
        abstract: "Propuesta legislativa integral para actualizar el sistema educativo público. Se enfoca en garantizar financiamiento sostenido, conectividad de alta velocidad en todos los establecimientos, reformas curriculares con foco en habilidades digitales y la formación continua docente para preparar a los estudiantes ante la economía del conocimiento.",
        keywords: ["Educación Pública", "Alfabetización Digital", "Formación Docente"],
        marginalia: [
            {
                type: "note",
                label: "PROPUESTA 01",
                text: "El presupuesto de conectividad escolar estará blindado por ley, garantizando fibra óptica simétrica en el 100% de las escuelas públicas."
            },
            {
                type: "quote",
                text: "La educación pública de calidad es el único puente real hacia la igualdad de oportunidades en el siglo XXI."
            }
        ],
        body: `
            <h3>1. El desafío del financiamiento educativo y la infraestructura</h3>
            <p>La escuela no puede seguir enseñando en el siglo XX a estudiantes que vivirán en el siglo XXII. Proponemos una reforma legislativa de financiamiento educativo que blinde los recursos para tecnología escolar y asigne una partida específica a la modernización de los entornos de aprendizaje.</p>
            <p>Garantizar conectividad simétrica a internet en todas las aulas no es un lujo técnico, sino un piso de ciudadanía básico para combatir la brecha digital.</p>
            <h3>2. Reforma curricular y formación continua docente</h3>
            <p>La conectividad sin contenido carece de impacto pedagógico. Proponemos actualizar los planes de estudio integrando programación, inteligencia artificial aplicada y habilidades de pensamiento crítico desde el nivel primario. Paralelamente, impulsamos el Programa Nacional de Formación Docente Continua en Tecnologías de la Información, asegurando incentivos profesionales para los educadores que lideren este proceso en las aulas.</p>
        `
    },
    "doc2": {
        title: "Ficha Limpia y Transparencia Activa: Fortalecimiento del control ciudadano sobre el poder político",
        author: "Maxi Ferraro | Eje Democracia",
        category: "Transparencia",
        date: "Junio 2026",
        abstract: "Proyecto de ley nacional y local para instituir la Ficha Limpia de forma obligatoria en cargos electivos y ministeriales. Plantea la automatización del control de declaraciones juradas, la digitalización total de las compras del Estado y la creación de un portal interactivo de auditoría ciudadana para eliminar los focos de opacidad estatal.",
        keywords: ["Ficha Limpia", "Transparencia Activa", "Control Ciudadano"],
        marginalia: [
            {
                type: "note",
                label: "PROPUESTA 02",
                text: "Inhabilitación automática para presentarse a cargos públicos para aquellas personas con condenas confirmadas en segunda instancia por delitos de corrupción."
            },
            {
                type: "quote",
                text: "La transparencia no es una concesión del gobernante, es un derecho del ciudadano que fortalece la democracia."
            }
        ],
        body: `
            <h3>1. Ficha Limpia como estándar ético ineludible</h3>
            <p>Es momento de elevar la vara ética de la representación política. La iniciativa de Ficha Limpia busca asegurar que nadie que tenga una condena firme en segunda instancia por delitos de malversación de fondos públicos, cohecho o enriquecimiento ilícito pueda postularse a cargos públicos ni ser designado en la función ejecutiva.</p>
            <p>Esta medida restaura la confianza social en las instituciones y garantiza que el Estado sea gestionado por personas idóneas éticamente.</p>
            <h3>2. Portal digital de auditoría y compras abiertas</h3>
            <p>La mejor vacuna contra la corrupción es la luz pública. Proponemos digitalizar el 100% de las contrataciones y licitaciones del Estado a través de blockchain y formatos abiertos. Cualquier ciudadano podrá auditar en tiempo real qué se compra, a quién y a qué precio, comparando los valores automáticamente con el mercado para evitar sobreprecios.</p>
        `
    },
    "doc3": {
        title: "Plan de Transición Energética y Economía Verde para las Áreas Urbanas",
        author: "Maxi Ferraro | Eje Ambiente",
        category: "Economía y Ambiente",
        date: "Julio 2026",
        abstract: "Propuesta de reconversión metropolitana sustentable. Incluye la creación de incentivos impositivos para industrias limpias, el fomento de la economía circular con recicladores urbanos tecnificados, el desarrollo de microrredes solares comunitarias y la expansión obligatoria de los pulmones verdes en áreas de alta densidad urbana.",
        keywords: ["Transición Energética", "Economía Circular", "Espacios Verdes"],
        marginalia: [
            {
                type: "note",
                label: "PROPUESTA 03",
                text: "Exenciones de Ingresos Brutos a pymes locales que certifiquen procesos de huella de carbono cero y reciclado total de sus insumos."
            },
            {
                type: "quote",
                text: "No hay desarrollo económico sustentable si seguimos consumiendo los recursos del mañana a expensas de la habitabilidad del hoy."
            }
        ],
        body: `
            <h3>1. Descarbonización y microrredes urbanas</h3>
            <p>Las ciudades son responsables del 70% de las emisiones de carbono a nivel global. Proponemos un marco regulatorio que incentive la instalación de paneles solares residenciales y comerciales en terrazas metropolitanas, inyectando excedentes a la red pública. El objetivo es que la Ciudad produzca el 30% de su energía eléctrica de fuentes renovables para el año 2030.</p>
            <p>Este cambio estructural generará miles de empleos verdes dedicados a la instalación, mantenimiento y desarrollo de tecnologías limpias.</p>
            <h3>2. Economía circular y valorización de residuos</h3>
            <p>Los residuos deben dejar de ser considerados basura para convertirse en recursos productivos. Impulsamos un plan de tecnificación y formalización de las cooperativas de recicladores urbanos, creando plantas de clasificación inteligente y centros de economía circular. El Estado priorizará la compra de materiales reciclados en su obra pública, cerrando el ciclo sustentable.</p>
        `
    }
};

// Alias por retrocompatibilidad interna
const ARTICULOS_REVISTA = PROPUESTAS_FERRARO;

let activePageId = '';
let currentActiveDoc = 'doc1';

// Variables de control de navbar (Auto-hide)
let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
let navbarTicking = false;

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
    const navbar = document.querySelector('.global-navbar');
    if (navbar) {
        navbar.classList.remove('navbar-hidden');
    }
    lastScrollY = 0;

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
        // Sincronizar TOC
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
window.navigateTo = function(pageId) {
    if (pageId === 'page-inicio') window.location.hash = '#inicio';
    else if (pageId === 'page-publicaciones') window.location.hash = '#publicaciones';
    else if (pageId === 'page-nosotros') window.location.hash = '#nosotros';
    else window.location.hash = '#inicio';
};

// El haz del faro ahora es posicionado por CSS (fixed)
// calibrateBeam se mantiene por retrocompatibilidad pero ya no modifica coordenadas
function calibrateBeam() {
    // El overlay es fixed en CSS, no requiere calibración dinámica
    // Se deja el método para no romper la cadena de llamadas
}

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    console.log("SPA Router - Inicializando enrutamiento por hash...");

    // Enlazar botones de navegación principal
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const pageId = link.getAttribute('data-page');
        if (pageId) {
            if (pageId === 'page-inicio') link.setAttribute('href', '#inicio');
            else if (pageId === 'page-publicaciones') link.setAttribute('href', '#publicaciones');
            else if (pageId === 'page-nosotros') link.setAttribute('href', '#nosotros');
        }
    });

    // Formulario de voluntariado de Campaña
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

    // Inicializar animaciones de entrada en scroll (Intersection Observer)
    initScrollReveals();

    // Escuchar historial de navegación (Back/Forward)
    window.addEventListener('hashchange', router);

    // Arrancar primer ciclo del router
    router();
});

// Calibración del faro con throttle/debounce al redimensionar
if (document.readyState === 'complete') {
    calibrateBeam();
} else {
    window.addEventListener('load', calibrateBeam);
}

let resizeDebounce;
window.addEventListener('resize', () => {
    clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(calibrateBeam, 100);
});

// =============================================================================
// NAVBAR AUTO-HIDE — Sensible al scroll
// =============================================================================
window.addEventListener('scroll', () => {
    if (!navbarTicking) {
        window.requestAnimationFrame(() => {
            const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
            const navbar = document.querySelector('.global-navbar');
            
            if (navbar) {
                // Umbral más generoso: solo ocultar cuando el usuario baje más de 80px
                // y la diferencia de desplazamiento sea significativa
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

// =============================================================================
// REGISTRO DE ELEMENTOS CON REVELACIÓN EN SCROLL (ENTRY ANIMATIONS)
// =============================================================================
function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '-5% 0px -5% 0px', // Prevenir disparos falsos en los bordes
        threshold: 0.05
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Revelación permanente para rendimiento
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => observer.observe(el));
}

// =============================================================================
// PUERTA ÚNICA DEL FARO: APERTURA ORGÁNICA + MICRO-PARALLAX
// =============================================================================
(function initNanaBananaFaro() {
    const puerta = document.getElementById('puerta-faro');
    const faroContenedor = document.getElementById('faro-animado');
    const lighthouseWrapper = document.querySelector('.lighthouse-widget-wrapper');

    if (!faroContenedor) return;

    // Animación de respiración orgánica del faro
    faroContenedor.classList.add('faro-respirando');

    function abrirPuerta() {
        if (puerta) {
            puerta.classList.remove('door-open');
            // Forzar reflow para que la animación se reinicie limpiamente
            void puerta.offsetWidth;
            puerta.classList.add('door-open');
        }
    }

    // Activar al entrar en pantalla
    if (puerta) {
        const faroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Breve pausa para que el usuario vea la puerta cerrada
                    setTimeout(abrirPuerta, 900);
                    faroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        faroObserver.observe(faroContenedor);

        // Click: re-abre la puerta
        faroContenedor.addEventListener('click', (e) => {
            e.preventDefault();
            puerta.classList.remove('door-open');
            void puerta.offsetWidth;
            setTimeout(abrirPuerta, 400);
        });
    }

    // Micro-Parallax del faro al mover el cursor
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
})();

// =============================================================================
// HAZ DE LUZ DEL FARO QUE SIGUE EL CURSOR DENTRO DEL HERO
// Spring Physics: stiffness + damping para movimiento con inercia real
// =============================================================================
(function initHeroCursorBeam() {
    const heroSection = document.querySelector('.hero-monolith');
    const beamCones = document.querySelectorAll('.hero-beam-cone');
    const externalBeam = document.querySelector('.external-light-beam');

    if (!heroSection || beamCones.length === 0) return;

    let faroOriginX = 0;
    let faroOriginY = 0;
    let rafId = null;

    // === SPRING PHYSICS STATE ===
    // El haz tiene masa, resorte y amortiguación — como un péndulo con fluido
    const spring = {
        current: 0,      // Ángulo actual (°)
        target: 0,       // Ángulo objetivo (°)
        velocity: 0,     // Velocidad angular (°/frame)
        stiffness: 0.045, // Qué tan fuerte tira el resorte hacia el target
        damping: 0.82,   // Cuánto se frena la velocidad (1 = sin rozamiento, 0 = frenado total)
    };

    function updateFaroOrigin() {
        const wrapper = document.querySelector('.lighthouse-widget-wrapper');
        if (!wrapper) return;
        const rect = wrapper.getBoundingClientRect();
        faroOriginX = rect.left + rect.width * 0.5;
        faroOriginY = rect.top + rect.height * 0.28;
    }

    // Normaliza el ángulo para evitar saltos de -180° a +180°
    function shortestAngle(current, target) {
        let delta = target - current;
        while (delta > 180)  delta -= 360;
        while (delta < -180) delta += 360;
        return current + delta;
    }

    function stepSpring() {
        // Fuerza del resorte: proporcional a la distancia al objetivo
        const normalizedTarget = shortestAngle(spring.current, spring.target);
        const force = (normalizedTarget - spring.current) * spring.stiffness;

        // Actualizar velocidad con la fuerza y aplicar amortiguación
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

        // Continúa el loop solo si hay movimiento perceptible
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
        // El resorte vuelve suavemente a 0° con la misma física
        spring.target = 0;
        startLoop();
    });

    window.addEventListener('resize', updateFaroOrigin);
    updateFaroOrigin();
})();

// =============================================================================
// INTERACTIVIDAD DE RADIOGRAFÍA POLÍTICA
// =============================================================================
(function initRadiografiaInteractiva() {
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
            
            // 1. Activar el nodo seleccionado
            nodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');
            
            // 2. Activar la línea correspondiente
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
            
            // 3. Reactividad de color del Hub Central
            if (hub) {
                hub.style.borderColor = borders[targetId];
                hub.style.boxShadow = `0 0 30px ${colors[targetId]}`;
                hub.style.transition = 'all 0.5s ease';
            }
            
            // 4. Intercambiar tarjetas de información con transición suave
            cards.forEach(card => {
                if (card.id === targetId) {
                    card.style.display = 'block';
                    // Forzar reflow para reiniciar la animación CSS
                    void card.offsetWidth;
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                    card.style.display = 'none';
                }
            });
        });
    });

    // Inicializar el primer nodo activo (Educación)
    const initialActiveNode = document.querySelector('.network-node.active');
    if (initialActiveNode) {
        initialActiveNode.click();
    }
})();

// =============================================================================
// SISTEMA DE NAVEGACIÓN Y MENÚ SUPERIOR ANCLADO (STICKY APPLE NAVBAR)
// =============================================================================
(function initCampaniaNavbar() {
    const mobileToggle = document.getElementById('navbar-mobile-toggle');
    // Nota: mobileDrawer se controla vía body.navbar-mobile-open en CSS
    
    // Seleccionar todos los posibles enlaces de navegación
    const allLinks = document.querySelectorAll(
        '.navbar-links .nav-link, .navbar-dropdown .dropdown-item, .mobile-drawer-links .mobile-drawer-link, .mobile-drawer-links .mobile-drawer-sub-link'
    );
    
    // Toggle para menú móvil
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = document.body.classList.toggle('navbar-mobile-open');
            mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    // Scroll suave y navegación
    function smoothScrollTo(elementId) {
        const target = document.getElementById(elementId);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300); // Pequeño margen para la transición SPA
        }
    }

    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetHash = link.getAttribute('href');
            if (!targetHash) return;
            
            // Cerrar menú móvil al hacer clic
            document.body.classList.remove('navbar-mobile-open');
            if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');

            // Si es un enlace de ancla interno (mismo hash, scroll local)
            if (targetHash.startsWith('#') && targetHash !== '#inicio' && targetHash !== '#publicaciones' && targetHash !== '#nosotros') {
                const elementId = targetHash.substring(1);
                smoothScrollTo(elementId);
            }
        });
    });

    // Sincronización de links activos con enrutamiento
    function syncNavbarWithRoute() {
        const currentHash = window.location.hash || '#inicio';
        
        // Determinar qué página principal está activa
        let activePage = 'page-inicio';
        if (currentHash === '#inicio' || currentHash === '#radiografia-politica') {
            activePage = 'page-inicio';
        } else if (currentHash === '#publicaciones' || currentHash.startsWith('#doc') || currentHash === '#visor-seccion') {
            activePage = 'page-publicaciones';
        } else if (currentHash === '#nosotros' || currentHash === '#sobre-nosotros' || currentHash === '#biografia-seccion' || currentHash === '#ejes-partidarios' || currentHash === '#voluntariado' || currentHash === '#iniciativas-legislativas' || currentHash === '#agenda-charlas' || currentHash === '#contacto-seccion') {
            activePage = 'page-nosotros';
        }

        allLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            link.classList.remove('active');
            
            // Si el link coincide con la página activa, se marca como activo
            if (linkPage && linkPage === activePage) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('hashchange', syncNavbarWithRoute);
    syncNavbarWithRoute();

    // Interceptar navegación para scroll suave en subsecciones locales al cargar
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
})();

// =============================================================================
// CONSTELLACIÓN NEURONAL INTERACTIVA & EFECTO DE ESCAPE DE PARTICULAS (MODULE 4)
// =============================================================================
(function initFaroConstellationAndParticles() {
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

    // Resize handlers
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

    // Particle Classes
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

            // Bounce on boundaries
            if (this.x < 15 || this.x > constWidth - 15) this.vx *= -1;
            if (this.y < 15 || this.y > constHeight - 15) this.vy *= -1;

            // Cursor attraction physics
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

    // Initialize constellation
    for (let i = 0; i < CONST_PARTICLE_COUNT; i++) {
        constParticles.push(new ConstellationParticle());
    }

    // Event listeners
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

    // Animation Loop
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
})();

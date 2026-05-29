/**
 * router.js - Enrutador basado en Hash para la navegación SPA
 * Plataforma Maxi Ferraro - Campaña 2026
 */


let activePageId = '';
let currentActiveDoc = 'doc-analisis-politico';

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
    } else if (hash === '#nosotros' || hash === '#sobre-nosotros' || hash === '#biografia-seccion' || hash === '#ejes-partidarios' || hash === '#iniciativas-legislativas') {
        const wasOtherPage = (activePageId !== 'page-nosotros');
        const isSubAnchor = hash !== '#nosotros' && hash !== '#sobre-nosotros';
        showPage('page-nosotros', isSubAnchor);
        if (isSubAnchor) {
            const targetId = hash.substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                if (wasOtherPage) {
                    target.scrollIntoView({ behavior: 'instant', block: 'start' });
                } else {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
    } else if (hash === '#radiografia' || hash === '#radiografia-red' || hash === '#radiografia-analisis' || hash === '#radiografia-territorio') {
        const wasOtherPage = (activePageId !== 'page-radiografia');
        const isSubAnchor = hash !== '#radiografia';
        showPage('page-radiografia', isSubAnchor);
        if (isSubAnchor) {
            const targetId = hash.substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                if (wasOtherPage) {
                    target.scrollIntoView({ behavior: 'instant', block: 'start' });
                } else {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
    } else if (hash === '#participacion' || hash === '#voluntariado' || hash === '#agenda-charlas' || hash === '#contacto-seccion') {
        showPage('page-radiografia');
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
                    renderArticle(articulo, docId);
                    visor.dataset.currentDoc = docId;
                    visor.classList.remove('loading-fade');
                    resolve();
                }, 200); // Transición suave
            } else {
                renderArticle(articulo, docId);
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

function transformBodyIntoCollapsibles(docId, bodyHtml) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = bodyHtml;

    const children = Array.from(tempDiv.childNodes);
    const resultFragment = document.createDocumentFragment();

    let introNodes = [];
    let currentSection = null;
    let foundFirstHeading = false;

    for (let i = 0; i < children.length; i++) {
        const node = children[i];

        if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'h3') {
            foundFirstHeading = true;

            if (currentSection) {
                resultFragment.appendChild(currentSection.details);
            }

            const details = document.createElement('details');
            details.className = 'premium-details';
            
            const summary = document.createElement('summary');
            summary.innerHTML = node.innerHTML;
            details.appendChild(summary);

            const contentDiv = document.createElement('div');
            contentDiv.className = 'details-content';
            details.appendChild(contentDiv);

            currentSection = { details, contentDiv };
        } else {
            if (!foundFirstHeading) {
                introNodes.push(node);
            } else {
                if (currentSection) {
                    currentSection.contentDiv.appendChild(node.cloneNode(true));
                }
            }
        }
    }

    if (currentSection) {
        resultFragment.appendChild(currentSection.details);
    }

    const wrapper = document.createElement('div');
    
    introNodes.forEach(node => {
        wrapper.appendChild(node.cloneNode(true));
    });

    const summaryCardHtml = getSummaryCardHtml(docId);
    if (summaryCardHtml) {
        const cardContainer = document.createElement('div');
        cardContainer.innerHTML = summaryCardHtml;
        wrapper.appendChild(cardContainer.firstElementChild);
    }

    wrapper.appendChild(resultFragment);

    return wrapper.innerHTML;
}

function getSummaryCardHtml(docId) {
    if (docId === 'doc-automatizacion') {
        return `
     <div class="summary-card premium-card" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem;">
         <h4 style="margin-top: 0; color: var(--color-naranja); display: flex; align-items: center; gap: 0.5rem; font-size: 1.2rem;">
             <span>📊</span> Resumen Ejecutivo de Módulos (CRM y Automatización)
         </h4>
         <p style="font-size: 0.95rem; line-height: 1.6; color: var(--color-texto-dm); margin-bottom: 1.2rem;">
             Esta sección describe la arquitectura técnica de automatización y centralización de la información para optimizar el contacto con los ciudadanos. A continuación se detallan los módulos clave:
         </p>
         <ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 1rem; font-size: 0.95rem; color: var(--color-texto-muted);">
             <li style="display: flex; gap: 0.8rem; margin-bottom: 0.5rem;"><strong style="color: #fff; min-width: 90px; display: inline-block;">Módulo 1:</strong> Captura Digital en redes sociales (Meta, X) optimizada mediante Google Antigravity y webhooks gratuitos.</li>
             <li style="display: flex; gap: 0.8rem; margin-bottom: 0.5rem;"><strong style="color: #fff; min-width: 90px; display: inline-block;">Módulo 2:</strong> Captura Física (O2O) y digitalización de planillas en territorio sin uso de papel.</li>
             <li style="display: flex; gap: 0.8rem; margin-bottom: 0.5rem;"><strong style="color: #fff; min-width: 90px; display: inline-block;">Módulo 3:</strong> Centralización y normalización de contactos en Google Sheets y People API.</li>
             <li style="display: flex; gap: 0.8rem; margin-bottom: 0.5rem;"><strong style="color: #fff; min-width: 90px; display: inline-block;">Módulo 4:</strong> Segmentación y nutrición de mensajes adaptados a barrios e intereses.</li>
             <li style="display: flex; gap: 0.8rem; margin-bottom: 0.5rem;"><strong style="color: #fff; min-width: 90px; display: inline-block;">Módulo 5:</strong> Gestión y enrutamiento inteligente de reclamos de vecinos (Kanban y Drive).</li>
             <li style="display: flex; gap: 0.8rem; margin-bottom: 0.5rem;"><strong style="color: #fff; min-width: 90px; display: inline-block;">Módulo 6:</strong> Motor tecnológico (Workspace, Firebase, Supabase y APIs vía MCP).</li>
             <li style="display: flex; gap: 0.8rem; margin-bottom: 0.5rem;"><strong style="color: #fff; min-width: 90px; display: inline-block;">Módulo 7:</strong> Base de conocimiento legislativo local-first utilizando Obsidian.</li>
             <li style="display: flex; gap: 0.8rem; margin-bottom: 0.5rem;"><strong style="color: #fff; min-width: 90px; display: inline-block;">Módulo 8:</strong> Manual operativo, rutinas de control y protocolos semanales de mantenimiento.</li>
         </ul>
     </div>
        `;
    }
    if (docId === 'doc-campana-austera') {
        return `
     <div class="summary-card premium-card" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem;">
         <h4 style="margin-top: 0; color: var(--color-naranja); display: flex; align-items: center; gap: 0.5rem; font-size: 1.2rem;">
             <span>🌱</span> Resumen Ejecutivo: Campaña Austera y Modelos de Impacto
         </h4>
         <p style="font-size: 0.95rem; line-height: 1.6; color: var(--color-texto-dm); margin-bottom: 1.2rem;">
             Análisis estratégico de campañas electorales de bajo costo y alto retorno, centrado en la viabilidad de replicar modelos exitosos de guerrilla comunicacional y debate de ideas en la Ciudad Autónoma de Buenos Aires. Puntos principales:
         </p>
         <ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 1rem; font-size: 0.95rem; color: var(--color-texto-muted);">
             <li style="display: flex; gap: 0.8rem; margin-bottom: 0.5rem;"><strong style="color: #fff; min-width: 90px; display: inline-block;">Sección 1:</strong> Evolución de los paradigmas electorales y encuadre del perfil urbano-progresista en CABA.</li>
             <li style="display: flex; gap: 0.8rem; margin-bottom: 0.5rem;"><strong style="color: #fff; min-width: 90px; display: inline-block;">Sección 2:</strong> El fenómeno del partido español Ciudadanos y la disrupción del cartel desnudo de Albert Rivera.</li>
             <li style="display: flex; gap: 0.8rem; margin-bottom: 0.5rem;"><strong style="color: #fff; min-width: 90px; display: inline-block;">Sección 3:</strong> Análisis comparado y benchmarking de 15 perfiles políticos análogos internacionales.</li>
         </ul>
     </div>
        `;
    }
    if (docId === 'doc-estrategia-caba') {
        return `
     <div class="summary-card premium-card" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem;">
         <h4 style="margin-top: 0; color: var(--color-naranja); display: flex; align-items: center; gap: 0.5rem; font-size: 1.2rem;">
             <span>📍</span> Resumen Ejecutivo: Estrategia CABA y Plan de Acción
         </h4>
         <p style="font-size: 0.95rem; line-height: 1.6; color: var(--color-texto-dm); margin-bottom: 1.2rem;">
             Propuesta táctica y metodológica para reposicionar a Maximiliano Ferraro como un "Auditor Ciudadano" activo en el territorio de CABA. Los ejes principales a desplegar en formato de títulos interactivos son:
         </p>
         <ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 1rem; font-size: 0.95rem; color: var(--color-texto-muted);">
             <li style="display: flex; gap: 0.8rem; margin-bottom: 0.5rem;"><strong style="color: #fff; min-width: 90px; display: inline-block;">Sección 1:</strong> Matriz de perfil, diagnóstico exhaustivo de fortalezas y debilidades de comunicación.</li>
             <li style="display: flex; gap: 0.8rem; margin-bottom: 0.5rem;"><strong style="color: #fff; min-width: 90px; display: inline-block;">Sección 2:</strong> Mapeo de reclamos y hotspots en las 15 comunas de la Ciudad (Código Urbanístico, Higiene, Obras).</li>
             <li style="display: flex; gap: 0.8rem; margin-bottom: 0.5rem;"><strong style="color: #fff; min-width: 90px; display: inline-block;">Sección 3:</strong> Plan operativo semanal detallado para el despliegue del Auditor en territorio.</li>
         </ul>
     </div>
        `;
    }
    return '';
}

function renderArticle(data, docId) {
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

    if (bodyEl) {
        const id = docId || currentActiveDoc;
        if (id === 'doc-automatizacion' || id === 'doc-campana-austera' || id === 'doc-estrategia-caba') {
            bodyEl.innerHTML = transformBodyIntoCollapsibles(id, data.body);
        } else {
            bodyEl.innerHTML = data.body;
        }
    }

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
    else if (pageId === 'page-participacion' || pageId === 'page-radiografia') window.location.hash = '#radiografia';
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

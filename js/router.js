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
    } else if (hash === '#nosotros' || hash === '#sobre-nosotros' || hash === '#biografia-seccion' || hash === '#ejes-partidarios' || hash === '#voluntariado' || hash === '#iniciativas-legislativas' || hash === '#agenda-charlas' || hash === '#contacto-seccion') {
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

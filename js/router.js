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

    if (hash === '#inicio') {
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
    } else if (hash === '#radiografia' || hash === '#radiografia-politica' || hash === '#radiografia-red' || hash === '#radiografia-analisis' || hash === '#radiografia-territorio') {
        const wasOtherPage = (activePageId !== 'page-radiografia');
        const isSubAnchor = hash !== '#radiografia';
        showPage('page-radiografia', isSubAnchor);
        if (isSubAnchor) {
            let targetId = hash.substring(1);
            if (targetId === 'radiografia-politica') {
                targetId = 'radiografia-red';
            }
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
        if (DOCUMENTOS_CAMPANA[docId]) {
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
    const articulo = DOCUMENTOS_CAMPANA[docId];
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

function getHeaderMetadata(docId, rawHtml) {
    const cleanText = rawHtml.replace(/<[^>]*>/g, '').trim(); // strip HTML tags
    const text = cleanText.toLowerCase();
    
    if (docId === 'doc-analisis-politico') {
        if (text.includes('resumen ejecutivo')) {
            return {
                title: 'Resumen Ejecutivo y Marco Contextual',
                summary: 'Síntesis estratégica de la trayectoria, posicionamiento legislativo, interbloque Unidos y huella institucional de Maximiliano Ferraro en el panorama político de 2026.'
            };
        }
        if (text.includes('módulo 1') || text.includes('labor parlamentaria') || text.includes('trayectoria y')) {
            return {
                title: 'Trayectoria y Labor Parlamentaria',
                summary: 'Detalle de su gestión en la Legislatura CABA (2011-2019), Ley de Sangre, UniCABA, y su labor en el Congreso de la Nación (Caso $LIBRA, DNU SIDE, ludopatía).'
            };
        }
        if (text.includes('módulo 2') || text.includes('auditoría mediática') || text.includes('posicionamiento')) {
            return {
                title: 'Auditoría Mediática y Posicionamiento',
                summary: 'Análisis de sus temas bandera (corrupción, ludopatía adolescente, derechos LGTBIQ+), presencia en prensa y tono discursivo en debates clave.'
            };
        }
        if (text.includes('módulo 3') || text.includes('redes sociales') || text.includes('social media')) {
            return {
                title: 'Auditoría y Estrategia de Redes Sociales',
                summary: 'Métricas, alcance orgánico, gestión de crisis digitales y trolls en Meta (Instagram, Facebook), Twitter/X y YouTube.'
            };
        }
        if (text.includes('módulo 4') || text.includes('comparado internacional') || text.includes('perfiles políticos')) {
            return {
                title: 'Análisis Comparado Internacional de Perfiles Políticos',
                summary: 'Análisis comparado detallado de líderes internacionales (Pete Buttigieg, Claudia López, Raphaël Glucksmann, etc.) y su extrapolación a CABA.'
            };
        }
        if (text.includes('módulo 5') || text.includes('propuestas de campaña') || text.includes('guerrilla')) {
            return {
                title: 'Propuestas de Campañas de Guerrilla Comunicacional',
                summary: 'Lineamientos tácticos para la guerrilla comunicacional en CABA basada en shock semántico y rigor técnico.'
            };
        }
        if (text.includes('conclusiones') || text.includes('perfil político estratégico') || text.includes('módulo 6')) {
            return {
                title: 'Conclusiones y Perfil Político Estratégico',
                summary: 'Evaluación táctica final del posicionamiento de Ferraro frente al oficialismo de LLA y la reorganización de la oposición moderada.'
            };
        }
        if (text.includes('cuadro analítico') || text.includes('fortalezas y debilidades') || text.includes('módulo 7')) {
            return {
                title: 'Cuadro Analítico: Fortalezas y Debilidades',
                summary: 'FODA interactivo detallando su capital político ético, capacidad de consensos y vulnerabilidades frente a campañas de desprestigio.'
            };
        }
    }
    
    if (docId === 'doc-automatizacion') {
        if (text.includes('módulo 1')) {
            return {
                title: 'Módulo 1: Captura Digital (Redes y Canales)',
                summary: 'Captura automática de interacciones en Meta y X/Twitter mediante webhooks gratuitos y Scheduled Tasks programadas con Google Antigravity.'
            };
        }
        if (text.includes('módulo 2')) {
            return {
                title: 'Módulo 2: Captura en Territorio (O2O)',
                summary: 'Digitalización de contactos y reclamos vecinales mediante formularios web móviles y códigos QR para eliminar el papel en caminatas.'
            };
        }
        if (text.includes('módulo 3')) {
            return {
                title: 'Módulo 3: Sincronización Automática de Contactos (Sheets)',
                summary: 'Normalización y limpieza automática de datos de contactos unificados en Google Sheets mediante integraciones de API.'
            };
        }
        if (text.includes('módulo 4')) {
            return {
                title: 'Módulo 4: Segmentación Dinámica y Nutrición de Contenidos',
                summary: 'Envíos segmentados por Comuna, barrio y temas de interés mediante integraciones directas a bajo costo.'
            };
        }
        if (text.includes('módulo 5')) {
            return {
                title: 'Módulo 5: Enrutamiento y Seguimiento de Reclamos Vecinales',
                summary: 'Gestión y visualización de denuncias en tableros Kanban y almacenamiento de fotos de baches u obras en Drive.'
            };
        }
        if (text.includes('módulo 6')) {
            return {
                title: 'Módulo 6: Infraestructura de Datos a Costo Cero (Firebase/Supabase)',
                summary: 'Diseño y despliegue de base de datos relacional Postgres gratuita en Supabase y hosting en Firebase.'
            };
        }
        if (text.includes('módulo 7')) {
            return {
                title: 'Módulo 7: Base de Conocimiento Local-First (Obsidian Integration)',
                summary: 'Integración del Vault de Obsidian del Auditor con expedientes legislativos y mapeo de relaciones locales.'
            };
        }
        if (text.includes('módulo 8')) {
            return {
                title: 'Módulo 8: Manual de Operaciones y Mantenimiento Técnico',
                summary: 'Protocolo semanal de limpieza de la base, backups automáticos de Supabase y rutinas técnicas sin costo de personal.'
            };
        }
    }
    
    if (docId === 'doc-campana-austera') {
        if (text.includes('evolución del paradigma')) {
            return {
                title: 'Evolución del Paradigma Electoral y el Arquetipo Urbano-Progresista',
                summary: 'Encuadre del perfil urbano-progresista y la adaptabilidad de campañas no tradicionales en el distrito electoral de CABA.'
            };
        }
        if (text.includes('fenómeno de ciudadanos') || text.includes('el fenómeno de ciudadanos')) {
            return {
                title: 'El Fenómeno de Ciudadanos y la Revolución del Marketing Político en España',
                summary: 'Lecciones del cartel desnudo de Albert Rivera, oratoria competitiva y carpas ciudadanas como modelo disruptivo de bajo presupuesto.'
            };
        }
        if (text.includes('benchmarking global') || text.includes('políticos comparados') || text.includes('casos globales')) {
            return {
                title: 'Políticos Comparados y Benchmarking Global',
                summary: 'Análisis comparado detallado de 10 líderes internacionales (Pete Buttigieg, Claudia López, Raphaël Glucksmann, etc.) y su extrapolación a CABA.'
            };
        }
        if (text.includes('conclusión: hacia') || text.includes('modelo de guerrilla') || text.includes('conclusión')) {
            return {
                title: 'Conclusión: Hacia la Guerrilla Comunicacional en CABA',
                summary: 'Lineamientos para la adaptabilidad del esquema de bajo presupuesto combinando shock semántico y rigor técnico.'
            };
        }
    }
    
    if (docId === 'doc-estrategia-caba') {
        if (text.includes('fortalezas y debilidades') || text.includes('matriz de perfil') || text.includes('1. análisis de')) {
            return {
                title: 'Análisis de Fortalezas y Debilidades (Matriz de Perfil)',
                summary: 'Diagnóstico del perfil del candidato, capitalización de su narrativa de alquiler/transporte y mitigación del síndrome de tecnócrata.'
            };
        }
        if (text.includes('mapeo de reclamos') || text.includes('hotspots') || text.includes('2. mapeo de')) {
            return {
                title: 'Mapeo de Reclamos y Hotspots por Comunas',
                summary: 'Identificación georreferenciada de las problemáticas críticas de las 15 comunas de CABA (CUR, higiene urbana, arbolado y SUACI).'
            };
        }
        if (text.includes('plan operativo semanal') || text.includes('protocolo del auditor') || text.includes('3. plan operativo')) {
            return {
                title: 'Plan Operativo Semanal y Protocolo del Auditor',
                summary: 'Rutinas semanales de recorridas de auditoría, guiones de interacción cívica y protocolo del Auditor Ciudadano.'
            };
        }
    }
    
    return null;
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
            const metadata = getHeaderMetadata(docId, node.innerHTML);
            if (metadata) {
                foundFirstHeading = true;

                if (currentSection) {
                    resultFragment.appendChild(currentSection.details);
                }

                const details = document.createElement('details');
                details.className = 'premium-details';
                
                const summary = document.createElement('summary');
                summary.innerHTML = `
                    <div class="summary-header">
                        <span class="summary-title">${metadata.title}</span>
                        <span class="summary-desc">${metadata.summary}</span>
                    </div>
                `;
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
    if (docId === 'doc-analisis-politico') {
        return `
     <div class="summary-card premium-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: var(--radius-lg); padding: 1.25rem 1.5rem; margin-bottom: 2rem; border-left: 3px solid var(--color-naranja);">
          <p style="font-size: 0.92rem; line-height: 1.6; color: var(--color-texto-dm); margin: 0;">
              <strong>🔍 Índice Interactivo:</strong> A continuación se presenta el estudio de inteligencia política de Maximiliano Ferraro. Despliegue cada sección para acceder al informe completo.
          </p>
     </div>
        `;
    }
    if (docId === 'doc-automatizacion') {
        return `
     <div class="summary-card premium-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: var(--radius-lg); padding: 1.25rem 1.5rem; margin-bottom: 2rem; border-left: 3px solid var(--color-verde);">
          <p style="font-size: 0.92rem; line-height: 1.6; color: var(--color-texto-dm); margin: 0;">
              <strong>📊 Índice Interactivo:</strong> Plan técnico de automatización y CRM territorial de bajo costo. Despliegue cada módulo para explorar la documentación.
          </p>
     </div>
        `;
    }
    if (docId === 'doc-campana-austera') {
        return `
     <div class="summary-card premium-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: var(--radius-lg); padding: 1.25rem 1.5rem; margin-bottom: 2rem; border-left: 3px solid var(--color-fucsia);">
          <p style="font-size: 0.92rem; line-height: 1.6; color: var(--color-texto-dm); margin: 0;">
              <strong>🌱 Índice Interactivo:</strong> Análisis comparado de campañas de guerrilla electoral y benchmarking global. Despliegue cada sección para ver los detalles.
          </p>
     </div>
        `;
    }
    if (docId === 'doc-estrategia-caba') {
        return `
     <div class="summary-card premium-card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: var(--radius-lg); padding: 1.25rem 1.5rem; margin-bottom: 2rem; border-left: 3px solid var(--color-azul-anchor);">
          <p style="font-size: 0.92rem; line-height: 1.6; color: var(--color-texto-dm); margin: 0;">
              <strong>📍 Índice Interactivo:</strong> Mapeo territorial y plan operativo del Auditor en CABA. Despliegue las secciones para ver el despliegue detallado.
          </p>
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
        if (id === 'doc-analisis-politico' || id === 'doc-automatizacion' || id === 'doc-campana-austera' || id === 'doc-estrategia-caba') {
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

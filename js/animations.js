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
    const canvas = document.getElementById('network-canvas');
    const tabTitle = document.getElementById('obsidian-tab-title');
    
    // SVG lines list
    const allSvgLines = document.querySelectorAll('.network-links line');
    
    // Store original stroke colors on initialization
    allSvgLines.forEach(line => {
        if (!line.getAttribute('data-original-stroke')) {
            line.setAttribute('data-original-stroke', line.getAttribute('stroke') || 'rgba(255,255,255,0.3)');
        }
    });
    
    // Graph topology definition (neighbor nodes and linking SVG lines)
    const graphConnections = {
        'info-edu': {
            neighbors: ['info-transp', 'info-amb', 'info-electoral'],
            lines: ['line-edu', 'line-edu-transp', 'line-edu-amb', 'line-electoral-edu']
        },
        'info-transp': {
            neighbors: ['info-edu', 'info-estruc'],
            lines: ['line-transp', 'line-edu-transp', 'line-transp-estruc']
        },
        'info-amb': {
            neighbors: ['info-edu', 'info-electoral', 'info-estruc'],
            lines: ['line-amb', 'line-edu-amb', 'line-amb-electoral', 'line-amb-estruc']
        },
        'info-estruc': {
            neighbors: ['info-transp', 'info-electoral', 'info-amb'],
            lines: ['line-estruc', 'line-transp-estruc', 'line-estruc-electoral', 'line-amb-estruc']
        },
        'info-electoral': {
            neighbors: ['info-edu', 'info-amb', 'info-estruc'],
            lines: ['line-electoral', 'line-electoral-edu', 'line-amb-electoral', 'line-estruc-electoral']
        }
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
            if (!targetId) return;
            
            // Set canvas focus mode
            if (canvas) {
                canvas.classList.add('has-focus');
            }

            // Update active node status
            nodes.forEach(n => {
                n.classList.remove('active');
                n.classList.remove('highlighted');
            });
            node.classList.add('active');
            
            // Highlight neighbors in local graph
            const connections = graphConnections[targetId];
            if (connections) {
                connections.neighbors.forEach(neighborId => {
                    const neighborNode = document.querySelector(`.network-node[data-target="${neighborId}"]`);
                    if (neighborNode) {
                        neighborNode.classList.add('highlighted');
                    }
                });
            }

            // Manage SVG lines opacity and stroke-width
            allSvgLines.forEach(line => {
                const lineId = line.getAttribute('id');
                const originalStroke = line.getAttribute('data-original-stroke');
                if (connections && connections.lines.includes(lineId)) {
                    line.classList.add('highlighted');
                    // Give active line or its neighbor lines high visibility
                    if (lineId === `line-${targetId.replace('info-', '')}`) {
                        // Direct connection to core hub
                        line.setAttribute('stroke', borders[targetId] || originalStroke);
                        line.setAttribute('stroke-width', '2.5');
                    } else {
                        // Inter-node connection
                        line.setAttribute('stroke', originalStroke);
                        line.setAttribute('stroke-width', '1.8');
                    }
                } else {
                    line.classList.remove('highlighted');
                    line.setAttribute('stroke', originalStroke);
                    line.setAttribute('stroke-width', '1');
                }
            });
            
            // Update central hub styling based on active node color
            if (hub) {
                hub.style.borderColor = borders[targetId] || '';
                hub.style.boxShadow = colors[targetId] ? `0 0 30px ${colors[targetId]}` : '';
                hub.style.transition = 'all 0.5s ease';
            }
            
            // Update the sidebar information cards
            cards.forEach(card => {
                if (card.id === targetId) {
                    card.style.display = 'block';
                    void card.offsetWidth;
                    card.classList.add('active');
                    
                    // Update Obsidian editor tab title
                    if (tabTitle) {
                        const tabName = card.getAttribute('data-tab-name') || 'vault://notes/untitled.md';
                        tabTitle.textContent = tabName;
                    }
                } else {
                    card.classList.remove('active');
                    card.style.display = 'none';
                }
            });
        });
    });

    // Make Double-bracket Wiki-links interactive
    document.addEventListener('click', (e) => {
        const wikiLink = e.target.closest('.obsidian-wiki-link');
        if (wikiLink) {
            const targetWiki = wikiLink.getAttribute('data-wiki');
            if (targetWiki) {
                const targetNode = document.querySelector(`.network-node[data-target="${targetWiki}"]`);
                if (targetNode) {
                    targetNode.click();
                    
                    // Smooth scroll to the network canvas if on mobile / small screen
                    if (window.innerWidth < 992) {
                        const graphSection = document.getElementById('radiografia-red');
                        if (graphSection) {
                            window.scrollTo({
                                top: graphSection.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }
                    }
                }
            }
        }
    });

    const initialActiveNode = document.querySelector('.network-node.active');
    if (initialActiveNode) {
        initialActiveNode.click();
    }

    // Base positions of nodes
    const nodeBases = {
        'node-edu': { x: 200, y: 80, speedX: 0.0012, speedY: 0.0010, ampX: 7, ampY: 7, phase: 0 },
        'node-transp': { x: 310, y: 150, speedX: 0.0009, speedY: 0.0014, ampX: 6, ampY: 8, phase: 1.5 },
        'node-amb': { x: 270, y: 290, speedX: 0.0011, speedY: 0.0008, ampX: 8, ampY: 6, phase: 3.1 },
        'node-estruc': { x: 130, y: 290, speedX: 0.0013, speedY: 0.0011, ampX: 7, ampY: 7, phase: 4.8 },
        'node-electoral': { x: 90, y: 150, speedX: 0.0010, speedY: 0.0012, ampX: 8, ampY: 8, phase: 0.8 },
        'network-hub': { x: 200, y: 200, speedX: 0.0006, speedY: 0.0007, ampX: 3, ampY: 3, phase: 2.1 }
    };

    function updateGraphPhysics() {
        const time = Date.now();
        const currentPositions = {};

        // Calculate new positions with floating effect
        for (const [key, base] of Object.entries(nodeBases)) {
            const dx = Math.sin(time * base.speedX + base.phase) * base.ampX;
            const dy = Math.cos(time * base.speedY + base.phase) * base.ampY;
            currentPositions[key] = {
                x: base.x + dx,
                y: base.y + dy
            };

            // Update DOM element position
            let el;
            if (key === 'network-hub') {
                el = hub;
            } else {
                el = canvas ? canvas.querySelector(`.${key}`) : null;
            }
            
            if (el) {
                el.style.left = `${base.x + dx}px`;
                el.style.top = `${base.y + dy}px`;
            }
        }

        // Update SVG line coordinates
        const hubPos = currentPositions['network-hub'];
        const eduPos = currentPositions['node-edu'];
        const transpPos = currentPositions['node-transp'];
        const ambPos = currentPositions['node-amb'];
        const estrucPos = currentPositions['node-estruc'];
        const electoralPos = currentPositions['node-electoral'];

        const setLineCoords = (id, x1, y1, x2, y2) => {
            const line = document.getElementById(id);
            if (line) {
                line.setAttribute('x1', x1);
                line.setAttribute('y1', y1);
                line.setAttribute('x2', x2);
                line.setAttribute('y2', y2);
            }
        };

        if (hubPos) {
            if (eduPos) setLineCoords('line-edu', hubPos.x, hubPos.y, eduPos.x, eduPos.y);
            if (transpPos) setLineCoords('line-transp', hubPos.x, hubPos.y, transpPos.x, transpPos.y);
            if (ambPos) setLineCoords('line-amb', hubPos.x, hubPos.y, ambPos.x, ambPos.y);
            if (estrucPos) setLineCoords('line-estruc', hubPos.x, hubPos.y, estrucPos.x, estrucPos.y);
            if (electoralPos) setLineCoords('line-electoral', hubPos.x, hubPos.y, electoralPos.x, electoralPos.y);
        }

        if (eduPos && transpPos) setLineCoords('line-edu-transp', eduPos.x, eduPos.y, transpPos.x, transpPos.y);
        if (eduPos && ambPos) setLineCoords('line-edu-amb', eduPos.x, eduPos.y, ambPos.x, ambPos.y);
        if (transpPos && estrucPos) setLineCoords('line-transp-estruc', transpPos.x, transpPos.y, estrucPos.x, estrucPos.y);
        if (ambPos && electoralPos) setLineCoords('line-amb-electoral', ambPos.x, ambPos.y, electoralPos.x, electoralPos.y);
        if (electoralPos && eduPos) setLineCoords('line-electoral-edu', electoralPos.x, electoralPos.y, eduPos.x, eduPos.y);
        if (estrucPos && electoralPos) setLineCoords('line-estruc-electoral', estrucPos.x, estrucPos.y, electoralPos.x, electoralPos.y);
        if (ambPos && estrucPos) setLineCoords('line-amb-estruc', ambPos.x, ambPos.y, estrucPos.x, estrucPos.y);

        requestAnimationFrame(updateGraphPhysics);
    }

    // Start loop
    requestAnimationFrame(updateGraphPhysics);
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

    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('navbar-mobile-open');
            if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        });
    });

    function syncNavbarWithRoute() {
        const currentHash = window.location.hash || '#inicio';
        
        let activePage = 'page-inicio';
        if (currentHash === '#inicio') {
            activePage = 'page-inicio';
        } else if (currentHash === '#publicaciones' || currentHash.startsWith('#doc') || currentHash === '#visor-seccion') {
            activePage = 'page-publicaciones';
        } else if (currentHash === '#nosotros' || currentHash === '#sobre-nosotros' || currentHash === '#biografia-seccion' || currentHash === '#ejes-partidarios' || currentHash === '#iniciativas-legislativas') {
            activePage = 'page-nosotros';
        } else if (currentHash === '#radiografia' || currentHash === '#radiografia-politica' || currentHash === '#radiografia-red' || currentHash === '#radiografia-analisis' || currentHash === '#radiografia-territorio') {
            activePage = 'page-radiografia';
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
}

function initFaroConstellationAndParticles() {
    const constellationCanvas = document.getElementById('faro-constellation-canvas');
    const bgParticlesCanvas = document.getElementById('hero-bg-particles-canvas');
    const lighthouseWrapper = document.querySelector('.lighthouse-widget-wrapper');
    const faroContenedor = document.getElementById('faro-animado');
    const heroSection = document.querySelector('.hero-monolith');

    if (!constellationCanvas || !bgParticlesCanvas || !lighthouseWrapper || !heroSection || !faroContenedor) return;

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
            ctxConst.fillStyle = this.color.includes('verde') ? '#00ffd2' : '#ff0844';
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
            this.color = Math.random() > 0.4 ? '#00ffd2' : '#ff0844';
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

                    const color1 = p1.color.includes('verde') ? '#00ffd2' : '#ff0844';
                    const color2 = p2.color.includes('verde') ? '#00ffd2' : '#ff0844';
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

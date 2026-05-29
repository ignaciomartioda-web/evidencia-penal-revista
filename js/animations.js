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

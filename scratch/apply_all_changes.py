import re

def apply_index_changes():
    index_path = r"c:\Users\23353247239\Desktop\antigravity\campaña ferraro\index.html"
    with open(index_path, "r", encoding="utf-8") as f:
        html = f.read()

    # 1. Update Participación nav link
    old_part_link = '<a href="#nosotros" class="nav-link" data-page="page-nosotros">Participación <span class="chevron-down">▾</span></a>'
    new_part_link = '<a href="#participacion" class="nav-link" data-page="page-participacion" id="link-participacion">Participación <span class="chevron-down">▾</span></a>'
    if old_part_link in html:
        html = html.replace(old_part_link, new_part_link)
        print("Updated index.html Participación link")
    else:
        print("Participación link not found or already updated")

    # 2. Update Trayectoria nav link ID
    old_tray_link = '<a href="#nosotros" class="nav-link" data-page="page-nosotros">Trayectoria <span class="chevron-down">▾</span></a>'
    new_tray_link = '<a href="#nosotros" class="nav-link" data-page="page-nosotros" id="link-nosotros">Trayectoria <span class="chevron-down">▾</span></a>'
    if old_tray_link in html:
        html = html.replace(old_tray_link, new_tray_link)
        print("Updated index.html Trayectoria link")
    else:
        print("Trayectoria link not found or already updated")

    # 3. Update Mobile Menu Drawer
    old_mobile_menu = """                <span class="mobile-drawer-section-title">Trayectoria</span>
                <a href="#biografia-seccion" class="mobile-drawer-sub-link">📖 Biografía</a>
                <a href="#ejes-partidarios" class="mobile-drawer-sub-link">🏛️ Ejes Parlamentarios</a>
                <a href="#iniciativas-legislativas" class="mobile-drawer-sub-link">📝 Iniciativas Legislativas</a>
                
                <span class="mobile-drawer-section-title">Participación</span>
                <a href="#voluntariado" class="mobile-drawer-sub-link">🤝 Sumate al Equipo</a>
                <a href="#agenda-charlas" class="mobile-drawer-sub-link">📅 Agenda y Charlas</a>
                <a href="#contacto-seccion" class="mobile-drawer-sub-link">📧 Contacto</a>"""
    
    new_mobile_menu = """                <a href="#nosotros" class="mobile-drawer-link" data-page="page-nosotros">Trayectoria</a>
                <a href="#biografia-seccion" class="mobile-drawer-sub-link">📖 Biografía</a>
                <a href="#ejes-partidarios" class="mobile-drawer-sub-link">🏛️ Ejes Parlamentarios</a>
                <a href="#iniciativas-legislativas" class="mobile-drawer-sub-link">📝 Iniciativas Legislativas</a>
                
                <a href="#participacion" class="mobile-drawer-link" data-page="page-participacion">Participación</a>
                <a href="#voluntariado" class="mobile-drawer-sub-link">🤝 Sumate al Equipo</a>
                <a href="#agenda-charlas" class="mobile-drawer-sub-link">📅 Agenda y Charlas</a>
                <a href="#contacto-seccion" class="mobile-drawer-sub-link">📧 Contacto</a>"""
    
    if old_mobile_menu in html:
        html = html.replace(old_mobile_menu, new_mobile_menu)
        print("Updated index.html mobile drawer menu")
    else:
        # Try normalizing whitespace in the search
        norm_old = re.sub(r'\s+', ' ', old_mobile_menu)
        # Search using regex
        html_norm = re.sub(r'\s+', ' ', html)
        if norm_old in html_norm:
            print("Found mobile drawer menu with whitespace differences, trying regex replace")
            pattern = re.escape(old_mobile_menu).replace(r'\ ', r'\s+')
            html = re.sub(pattern, new_mobile_menu, html)
            print("Updated mobile drawer using regex")
        else:
            print("Mobile drawer menu match not found")

    # 4. Replace Radiografía Política on home page with 4-column gateway grid
    # Target from "<!-- Nueva Sección: Radiografía Política -->" to the end of the section
    start_tag = "<!-- Nueva Sección: Radiografía Política -->"
    end_tag = "</section>"
    start_idx = html.find(start_tag)
    if start_idx != -1:
        # Find the next </section> after start_idx
        end_idx = html.find(end_tag, start_idx)
        if end_idx != -1:
            end_idx += len(end_tag)
            # Extrapolate section block
            section_to_replace = html[start_idx:end_idx]
            
            gateway_html = """<!-- Sección: Accesos Rápidos (Navegación Premium) -->
            <section class="gateway-seccion reveal-on-scroll" style="max-width: 1400px; margin: 4rem auto; padding: 0 2rem;">
                <div class="gateway-header" style="text-align: center; margin-bottom: 3rem;">
                    <span class="mono-tag" style="display: inline-block; margin-bottom: 0.8rem; color: var(--color-naranja);">[ DIMENSIONES CLAVE ]</span>
                    <h2 class="section-title" style="color: #fff; font-size: 2.2rem; font-family: var(--font-serif); margin-top: 0.5rem; letter-spacing: -0.5px;">Ejes de Navegación</h2>
                    <p class="section-subtitle" style="color: var(--color-texto-muted); font-size: 1.05rem; max-width: 600px; margin: 0.8rem auto 0; line-height: 1.5;">Explora las áreas fundamentales de nuestra plataforma interactiva de campaña.</p>
                </div>
                
                <div class="gateway-grid">
                    
                    <!-- Tarjeta 1: Propuestas -->
                    <div class="teaser-card card-naranja double-bezel-outer">
                        <div class="teaser-card-inner double-bezel-inner" style="min-height: 380px; justify-content: space-between; display: flex; flex-direction: column;">
                            <div class="teaser-body">
                                <span class="teaser-cat" style="color: var(--color-naranja);">Biblioteca Digital</span>
                                <span class="teaser-number" style="top: 2rem; right: 2rem; font-size: 1.8rem; font-family: inherit; font-weight: normal; opacity: 0.9;">📚</span>
                                <h3 class="teaser-title" style="margin-top: 1rem;">Propuestas y Estrategia</h3>
                                <p class="teaser-desc" style="margin-top: 1rem; font-size: 0.88rem; line-height: 1.6;">Biblioteca completa con los 6 documentos de inteligencia política, campañas austeras y perfiles analíticos detallados.</p>
                            </div>
                            <a href="#publicaciones" class="teaser-cta btn-gold-cta group btn-grad-naranja" style="border: none; padding: 0.8rem 1.4rem; border-radius: 99px; text-decoration: none; color: #fff; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 1.5rem;">
                                <span>Ver Propuestas</span>
                                <span class="btn-icon-circle-sm" style="background: rgba(255,255,255,0.2);">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 12px; height: 12px; color: #fff;">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                    
                    <!-- Tarjeta 2: Trayectoria -->
                    <div class="teaser-card card-verde double-bezel-outer">
                        <div class="teaser-card-inner double-bezel-inner" style="min-height: 380px; justify-content: space-between; display: flex; flex-direction: column;">
                            <div class="teaser-body">
                                <span class="teaser-cat" style="color: var(--color-verde);">Acción Legislativa</span>
                                <span class="teaser-number" style="top: 2rem; right: 2rem; font-size: 1.8rem; font-family: inherit; font-weight: normal; opacity: 0.9;">📖</span>
                                <h3 class="teaser-title" style="margin-top: 1rem;">Trayectoria y Ejes</h3>
                                <p class="teaser-desc" style="margin-top: 1rem; font-size: 0.88rem; line-height: 1.6;">Perfil de Maxi Ferraro, biografía de vida como inquilino de Barracas e iniciativas presentadas en el Congreso.</p>
                            </div>
                            <a href="#nosotros" class="teaser-cta btn-cyan-cta group btn-grad-verde" style="border: none; padding: 0.8rem 1.4rem; border-radius: 99px; text-decoration: none; color: #fff; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 1.5rem;">
                                <span>Ver Trayectoria</span>
                                <span class="btn-icon-circle-sm" style="background: rgba(255,255,255,0.2);">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 12px; height: 12px; color: #fff;">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>

                    <!-- Tarjeta 3: Participación -->
                    <div class="teaser-card card-azul double-bezel-outer">
                        <div class="teaser-card-inner double-bezel-inner" style="min-height: 380px; justify-content: space-between; display: flex; flex-direction: column;">
                            <div class="teaser-body">
                                <span class="teaser-cat" style="color: var(--color-azul-anchor);">Compromiso Vecinal</span>
                                <span class="teaser-number" style="top: 2rem; right: 2rem; font-size: 1.8rem; font-family: inherit; font-weight: normal; opacity: 0.9;">🤝</span>
                                <h3 class="teaser-title" style="margin-top: 1rem;">Participación Activa</h3>
                                <p class="teaser-desc" style="margin-top: 1rem; font-size: 0.88rem; line-height: 1.6;">Sumate como voluntario del equipo de campaña, enterate de la agenda de charlas y contactate de forma directa.</p>
                            </div>
                            <a href="#participacion" class="teaser-cta btn-cyan-cta group btn-grad-azul" style="border: none; padding: 0.8rem 1.4rem; border-radius: 99px; text-decoration: none; color: #fff; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 1.5rem;">
                                <span>Participar</span>
                                <span class="btn-icon-circle-sm" style="background: rgba(255,255,255,0.2);">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 12px; height: 12px; color: #fff;">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                    
                    <!-- Tarjeta 4: Tablero de Campaña -->
                    <div class="teaser-card card-fucsia double-bezel-outer">
                        <div class="teaser-card-inner double-bezel-inner" style="min-height: 380px; justify-content: space-between; display: flex; flex-direction: column;">
                            <div class="teaser-body">
                                <span class="teaser-cat" style="color: var(--color-fucsia);">Control e Inteligencia</span>
                                <span class="teaser-number" style="top: 2rem; right: 2rem; font-size: 1.8rem; font-family: inherit; font-weight: normal; opacity: 0.9;">📊</span>
                                <h3 class="teaser-title" style="margin-top: 1rem;">Tablero de Control</h3>
                                <p class="teaser-desc" style="margin-top: 1rem; font-size: 0.88rem; line-height: 1.6;">Acceso al panel táctico interno: gráficos interactivos de FODA, mapeo de comunas y la Red de Radiografía Estratégica.</p>
                            </div>
                            <a href="#dashboard" class="teaser-cta btn-fucsia-cta group btn-grad-fucsia" style="border: none; padding: 0.8rem 1.4rem; border-radius: 99px; text-decoration: none; color: #fff; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 1.5rem;">
                                <span>Acceder al Tablero</span>
                                <span class="btn-icon-circle-sm" style="background: rgba(255,255,255,0.2);">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 12px; height: 12px; color: #fff;">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                    
                </div>
            </section>"""
            
            html = html[:start_idx] + gateway_html + html[end_idx:]
            print("Replaced homepage Radiografía Política with 4-column gateway grid")
        else:
            print("Could not find end tag </section> for Radiografía Política")
    else:
        print("Could not find start tag of Radiografía Política")

    # 5. Split Trayectoria and Participación page views
    # Find page-nosotros div
    old_page_nosotros_block_start = '<div id="page-nosotros" class="page-view" role="tabpanel" aria-labelledby="link-nosotros">'
    p_nos_idx = html.find(old_page_nosotros_block_start)
    if p_nos_idx != -1:
        # Find where it closes at </div><!-- /page-nosotros -->
        close_comment = '</div><!-- /page-nosotros -->'
        p_nos_end_idx = html.find(close_comment, p_nos_idx)
        if p_nos_end_idx != -1:
            p_nos_end_idx += len(close_comment)
            
            new_split_html = """<div id="page-nosotros" class="page-view" role="tabpanel" aria-labelledby="link-nosotros">
            
            <!-- Directorio de la Sección -->
            <div class="page-directory">
                <a href="#sobre-nosotros" class="directory-item" onclick="window.scrollTo({top: document.getElementById('sobre-nosotros').offsetTop - 80, behavior: 'smooth'}); return false;">
                    <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--color-naranja); letter-spacing: 1.5px; text-transform: uppercase;">[ SECCIÓN 01 ]</span>
                    <span style="font-family: var(--font-serif); font-size: 1.1rem; font-weight: bold; margin: 0.2rem 0; color: #fff;">Compromiso</span>
                    <span style="font-size: 0.72rem; color: var(--color-texto-muted);">Perfil biográfico y su arraigo residencial en CABA.</span>
                </a>
                <a href="#ejes-partidarios" class="directory-item" onclick="window.scrollTo({top: document.getElementById('ejes-partidarios').offsetTop - 80, behavior: 'smooth'}); return false;">
                    <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--color-verde); letter-spacing: 1.5px; text-transform: uppercase;">[ SECCIÓN 02 ]</span>
                    <span style="font-family: var(--font-serif); font-size: 1.1rem; font-weight: bold; margin: 0.2rem 0; color: #fff;">Ejes Legislativos</span>
                    <span style="font-size: 0.72rem; color: var(--color-texto-muted);">Principios fundamentales de su acción pública en la Ciudad.</span>
                </a>
                <a href="#iniciativas-legislativas" class="directory-item" onclick="window.scrollTo({top: document.getElementById('iniciativas-legislativas').offsetTop - 80, behavior: 'smooth'}); return false;">
                    <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--color-azul-anchor); letter-spacing: 1.5px; text-transform: uppercase;">[ SECCIÓN 03 ]</span>
                    <span style="font-family: var(--font-serif); font-size: 1.1rem; font-weight: bold; margin: 0.2rem 0; color: #fff;">Proyectos</span>
                    <span style="font-size: 0.72rem; color: var(--color-texto-muted);">Iniciativas parlamentarias activas presentadas en el Congreso.</span>
                </a>
            </div>

            <section id="sobre-nosotros" class="institucion-seccion">
                <div style="max-width: 800px; margin: 0 auto; padding: 0 2rem;">
                    <!-- Biografía -->
                    <div id="biografia-seccion">
                        <span class="mono-tag">[ TRAYECTORIA Y COMPROMISO ]</span>
                        <h2 style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: bold; margin: 1rem 0; color: #fff;">Maxi Ferraro</h2>
                        <p class="institucion-text" style="font-size: 1.05rem; line-height: 1.8; color: var(--color-texto-dm); margin-bottom: 1.5rem;">
                            <strong>Maxi Ferraro</strong> (50 años) es Diputado Nacional por la Ciudad Autónoma de Buenos Aires y presidente de la Coalición Cívica ARI. Vecino de Barracas, inquilino y usuario habitual del transporte público, su labor parlamentaria se destaca por la coherencia y la transparencia activa.
                        </p>
                        <p class="institucion-text" style="font-size: 1.05rem; line-height: 1.8; color: var(--color-texto-dm); margin-bottom: 2rem;">
                            En el Congreso, impulsó la comisión investigadora de la estafa con la criptomoneda $LIBRA y fue clave para el rechazo legislativo al DNU 656/2024 que pretendía asignar fondos reservados millonarios de manera opaca a la SIDE. Cree en la transparencia ética y el control ciudadano.
                        </p>

                        <h3 class="comite-title" id="ejes-partidarios" style="font-family: var(--font-serif); font-size: 1.8rem; margin: 3rem 0 1rem; color: #fff; border-bottom: 1px solid var(--color-linea); padding-bottom: 0.8rem;">Ejes Parlamentarios</h3>
                        <div class="comite-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 1.5rem;">
                            <div class="comite-info" style="background: rgba(255,255,255,0.02); border: 1px solid var(--color-linea); padding: 1.5rem; border-radius: var(--radius-md);">
                                <h4 style="color: var(--color-naranja); margin-top: 0; margin-bottom: 0.5rem; font-size: 1.1rem;">Educación Pública</h4>
                                <p style="font-size: 0.88rem; color: var(--color-texto-muted); margin: 0; line-height: 1.5;">Políticas de financiamiento sostenido y acceso tecnológico.</p>
                            </div>
                            <div class="comite-info" style="background: rgba(255,255,255,0.02); border: 1px solid var(--color-linea); padding: 1.5rem; border-radius: var(--radius-md);">
                                <h4 style="color: var(--color-verde); margin-top: 0; margin-bottom: 0.5rem; font-size: 1.1rem;">Transparencia</h4>
                                <p style="font-size: 0.88rem; color: var(--color-texto-muted); margin: 0; line-height: 1.5;">Impulso de Ficha Limpia y portales de control de cuentas públicas.</p>
                            </div>
                            <div class="comite-info" style="background: rgba(255,255,255,0.02); border: 1px solid var(--color-linea); padding: 1.5rem; border-radius: var(--radius-md);">
                                <h4 style="color: var(--color-fucsia); margin-top: 0; margin-bottom: 0.5rem; font-size: 1.1rem;">Economía Verde</h4>
                                <p style="font-size: 0.88rem; color: var(--color-texto-muted); margin: 0; line-height: 1.5;">Transición ecológica, energías limpias y reciclado urbano.</p>
                            </div>
                            <div class="comite-info" style="background: rgba(255,255,255,0.02); border: 1px solid var(--color-linea); padding: 1.5rem; border-radius: var(--radius-md);">
                                <h4 style="color: var(--color-azul-anchor); margin-top: 0; margin-bottom: 0.5rem; font-size: 1.1rem;">Derechos y Diversidad</h4>
                                <p style="font-size: 0.88rem; color: var(--color-texto-muted); margin: 0; line-height: 1.5;">Defensa activa de la inclusión social y los derechos humanos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Sección: Iniciativas Legislativas -->
            <section id="iniciativas-legislativas" class="institucion-seccion" style="padding-top: 2rem;">
                <div style="max-width: 900px; margin: 0 auto; text-align: center; padding: 4rem 2rem; border-top: 1px solid var(--color-linea);">
                    <span class="mono-tag">[ INICIATIVAS LEGISLATIVAS ]</span>
                    <h2 style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 400; margin: 1rem 0; color: #fff;">Proyectos de Ley Activos</h2>
                    <p style="color: var(--color-texto-dm); font-size: 1.05rem; line-height: 1.9; max-width: 60ch; margin: 0 auto 2.5rem;">
                        Maxi Ferraro ha presentado más de 150 proyectos de ley en el Congreso. Conocé los ejes legislativos más importantes de la campaña 2026 en la sección de Propuestas.
                    </p>
                    <a href="#publicaciones" class="btn-premium btn-grad-naranja" style="display: inline-flex; text-decoration: none;">
                        <span>Ver Propuestas</span>
                        <span class="btn-icon-circle" style="background: rgba(255,255,255,0.2);">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 14px; height: 14px; color: #fff;"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </span>
                    </a>
                </div>
            </section>

        </div><!-- /page-nosotros -->

        <div id="page-participacion" class="page-view" role="tabpanel" aria-labelledby="link-participacion">
            
            <!-- Directorio de la Sección -->
            <div class="page-directory">
                <a href="#voluntariado" class="directory-item" onclick="window.scrollTo({top: document.getElementById('voluntariado').offsetTop - 80, behavior: 'smooth'}); return false;">
                    <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--color-verde); letter-spacing: 1.5px; text-transform: uppercase;">[ SECCIÓN 01 ]</span>
                    <span style="font-family: var(--font-serif); font-size: 1.1rem; font-weight: bold; margin: 0.2rem 0; color: #fff;">Voluntariado</span>
                    <span style="font-size: 0.72rem; color: var(--color-texto-muted);">Sumate al equipo de trabajo para fiscalizar y difundir.</span>
                </a>
                <a href="#agenda-charlas" class="directory-item" onclick="window.scrollTo({top: document.getElementById('agenda-charlas').offsetTop - 80, behavior: 'smooth'}); return false;">
                    <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--color-naranja); letter-spacing: 1.5px; text-transform: uppercase;">[ SECCIÓN 02 ]</span>
                    <span style="font-family: var(--font-serif); font-size: 1.1rem; font-weight: bold; margin: 0.2rem 0; color: #fff;">Agenda</span>
                    <span style="font-size: 0.72rem; color: var(--color-texto-muted);">Próximos debates y charlas públicas en la Ciudad.</span>
                </a>
                <a href="#contacto-seccion" class="directory-item" onclick="window.scrollTo({top: document.getElementById('contacto-seccion').offsetTop - 80, behavior: 'smooth'}); return false;">
                    <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--color-fucsia); letter-spacing: 1.5px; text-transform: uppercase;">[ SECCIÓN 03 ]</span>
                    <span style="font-family: var(--font-serif); font-size: 1.1rem; font-weight: bold; margin: 0.2rem 0; color: #fff;">Contacto</span>
                    <span style="font-size: 0.72rem; color: var(--color-texto-muted);">Canales de comunicación oficiales de la campaña.</span>
                </a>
            </div>

            <!-- Sección: Voluntariado -->
            <section id="voluntariado" class="institucion-seccion" style="padding-bottom: 2rem; padding-top: 0;">
                <div style="max-width: 600px; margin: 0 auto; padding: 0 2rem;">
                    <div class="convocatoria-col" style="background: rgba(255,255,255,0.02); border: 1px solid var(--color-linea); padding: 3rem; border-radius: var(--radius-xl); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);">
                        <span class="mono-tag" style="color: var(--color-verde); border-color: var(--color-verde);">[ COMPROMISO CIUDADANO ]</span>
                        <h2 style="font-family: var(--font-serif); font-size: 2rem; font-weight: bold; margin: 1rem 0; color: #fff;">Sumate al equipo</h2>
                        <p style="margin-bottom: 2rem; font-size: 0.9rem; color: var(--color-texto-dm); line-height: 1.6;">
                            Queremos escucharte y construir juntos esta alternativa de futuro. Completá tus datos para sumarte como voluntario o recibir novedades.
                        </p>
                        
                        <form id="volunteer-form" class="campania-form">
                            <div class="form-group" style="margin-bottom: 1.2rem;">
                                <label for="form-name" style="display: block; font-size: 0.75rem; color: var(--color-texto-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">Nombre completo</label>
                                <input type="text" id="form-name" class="form-control" placeholder="Ingresá tu nombre" style="width: 100%; padding: 0.8rem 1.2rem; border-radius: var(--radius-md); border: 1px solid var(--color-linea); background: rgba(0,0,0,0.2); color: #fff;" required>
                            </div>
                            <div class="form-group" style="margin-bottom: 1.2rem;">
                                <label for="form-email" style="display: block; font-size: 0.75rem; color: var(--color-texto-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">Correo electrónico</label>
                                <input type="email" id="form-email" class="form-control" placeholder="tu@email.com" style="width: 100%; padding: 0.8rem 1.2rem; border-radius: var(--radius-md); border: 1px solid var(--color-linea); background: rgba(0,0,0,0.2); color: #fff;" required>
                            </div>
                            <div class="form-group" style="margin-bottom: 1.2rem;">
                                <label for="form-neighborhood" style="display: block; font-size: 0.75rem; color: var(--color-texto-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">Barrio (CABA)</label>
                                <input type="text" id="form-neighborhood" class="form-control" placeholder="Ej. Palermo, Flores..." style="width: 100%; padding: 0.8rem 1.2rem; border-radius: var(--radius-md); border: 1px solid var(--color-linea); background: rgba(0,0,0,0.2); color: #fff;" required>
                            </div>
                            <div class="form-group" style="margin-bottom: 2rem;">
                                <label for="form-interest" style="display: block; font-size: 0.75rem; color: var(--color-texto-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">Eje de mayor interés</label>
                                <select id="form-interest" class="form-control" style="width: 100%; padding: 0.8rem 1.2rem; border-radius: var(--radius-md); border: 1px solid var(--color-linea); background: var(--bg-surface); color: var(--color-texto);" required>
                                    <option value="" disabled selected>Seleccioná una opción</option>
                                    <option value="Educacion">Educación y Futuro</option>
                                    <option value="Transparencia">Transparencia y Democracia</option>
                                    <option value="Ambiente">Economía Verde y Sustentabilidad</option>
                                    <option value="Militancia">Acción y Comunicación</option>
                                </select>
                            </div>
                            
                            <button type="submit" class="btn-premium btn-grad-naranja" style="border: none; padding: 0.9rem 1.8rem; width: 100%; border-radius: 99px; cursor: pointer; color: #fff; display: flex; align-items: center; justify-content: center; gap: 0.8rem;">
                                <span>Enviar Registro</span>
                                <span class="btn-icon-circle" style="background: rgba(255,255,255,0.25); display: inline-flex; width: 24px; height: 24px; border-radius: 50%; align-items: center; justify-content: center;">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 12px; height: 12px; color: #fff;">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </span>
                            </button>
                            <div id="form-feedback" class="form-feedback" style="display: none; margin-top: 1rem; color: var(--color-verde); font-size: 0.85rem; text-align: center;"></div>
                        </form>
                    </div>
                </div>
            </section>

            <!-- Sección: Agenda -->
            <section id="agenda-charlas" class="institucion-seccion" style="padding-top: 2rem;">
                <div style="max-width: 900px; margin: 0 auto; text-align: center; padding: 4rem 2rem; border-top: 1px solid var(--color-linea);">
                    <span class="mono-tag" style="color: var(--color-naranja); border-color: var(--color-naranja);">[ AGENDA Y CHARLAS ]</span>
                    <h2 style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 400; margin: 1rem 0; color: #fff;">Próximos eventos</h2>
                    <p style="color: var(--color-texto-dm); font-size: 1.05rem; line-height: 1.9; max-width: 60ch; margin: 0 auto 2.5rem;">
                        Seguí la agenda de Maxi Ferraro en redes sociales para enterarte de los próximos debates, charlas públicas y eventos de campaña en la Ciudad.
                    </p>
                    <a href="https://www.instagram.com/maxiferraro/" target="_blank" rel="noopener" class="btn-premium btn-grad-verde" style="display: inline-flex; text-decoration: none;">
                        <span>Seguir en Instagram</span>
                        <span class="btn-icon-circle" style="background: rgba(255,255,255,0.2);">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 14px; height: 14px; color: #fff;"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </span>
                    </a>
                </div>
            </section>

            <!-- Sección: Contacto -->
            <section id="contacto-seccion" class="institucion-seccion" style="padding-top: 0; padding-bottom: 4rem;">
                <div style="max-width: 900px; margin: 0 auto; text-align: center; padding: 4rem 2rem; border-top: 1px solid var(--color-linea);">
                    <span class="mono-tag" style="color: var(--color-fucsia); border-color: var(--color-fucsia);">[ CONTACTO ]</span>
                    <h2 style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 400; margin: 1rem 0; color: #fff;">Escribinos</h2>
                    <p style="color: var(--color-texto-dm); font-size: 1.05rem; line-height: 1.9; max-width: 60ch; margin: 0 auto 2.5rem;">
                        Para consultas de prensa, participación o colaboración, completá el formulario de voluntariado o escribinos a través de las redes oficiales.
                    </p>
                    <a href="#voluntariado" class="btn-premium btn-grad-naranja" style="display: inline-flex; text-decoration: none;">
                        <span>Sumate al equipo</span>
                        <span class="btn-icon-circle" style="background: rgba(255,255,255,0.2);">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 14px; height: 14px; color: #fff;"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </span>
                    </a>
                </div>
            </section>

        </div><!-- /page-participacion -->"""
            
            html = html[:p_nos_idx] + new_split_html + html[p_nos_end_idx:]
            print("Successfully split page-nosotros and page-participacion")
        else:
            print("Could not find closing comment for page-nosotros")
    else:
        print("Could not find page-nosotros start tag")

    with open(index_path, "w", encoding="utf-8") as f:
        f.write(html)

def apply_dashboard_changes():
    dash_path = r"c:\Users\23353247239\Desktop\antigravity\campaña ferraro\dashboard.html"
    with open(dash_path, "r", encoding="utf-8") as f:
        html = f.read()

    # 1. Update Resumen Ejecutivo: Add Table 2 and Table 5 before closing of db-tab-resumen
    # Find the end of FODA card in db-tab-resumen
    # It has a closing </section> for db-tab-resumen.
    # Let's search for "db-tab-resumen" and the next </section>
    resumen_start = html.find('id="db-tab-resumen"')
    if resumen_start != -1:
        resumen_end = html.find('</section>', resumen_start)
        if resumen_end != -1:
            tables_to_add = """
                    <!-- Matriz de Reencuadre Biográfico y Pivot Estratégico (Tabla 2) -->
                    <div class="db-card" style="margin-top: 1.5rem;">
                        <h3>⚖️ Matriz de Reencuadre Biográfico y Pivot Estratégico (Tabla 2)</h3>
                        <div class="db-table-container">
                            <table class="db-table">
                                <thead>
                                    <tr>
                                        <th style="width: 20%; text-align: left;">Dimensión Analizada</th>
                                        <th style="width: 30%; text-align: left;">Atributo Actual del Candidato</th>
                                        <th style="width: 25%; text-align: left;">Riesgo de Percepción Ciudadana</th>
                                        <th style="width: 25%; text-align: left;">Pivot Estratégico Propuesto (Oportunidad)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Identidad Biográfica</strong></td>
                                        <td>Inquilino en Barracas (zona sur), usuario diario de transporte público y red de subterráneos.</td>
                                        <td>Altamente sub-comunicado. Se percibe como un político de la élite tradicional que no padece la ciudad.</td>
                                        <td>Posicionarlo proactivamente como el "Vecino Legislador", evidenciando que padece los mismos cortes de servicio y problemas de infraestructura.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Rol Político y Público</strong></td>
                                        <td>Experto en educación, ética republicana, códigos civiles y transparencia nacional.</td>
                                        <td>"Institucionalista" de escritorio, preocupado por reglas abstractas, constituciones y no por soluciones materiales tangibles.</td>
                                        <td>Traducir su capital de "ética" a "eficiencia operativa": exigir implacablemente que los servicios públicos concesionados funcionen sin sobreprecios ni corrupción territorial.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Agenda Legislativa</strong></td>
                                        <td>Códigos urbanísticos, regulaciones nacionales de la SIDE, husos horarios, criptomonedas y Mercosur.</td>
                                        <td>Completamente disociado de la coyuntura de supervivencia del metro cuadrado del votante.</td>
                                        <td>Enfocar su probada capacidad técnica en auditar los pliegos de concesiones de basura, seguridad en los barrios y control de licitaciones de obras.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Ecosistema Digital</strong></td>
                                        <td>Comunicación formal, comunicados de prensa estructurados, intentos forzados de sumarse a tendencias.</td>
                                        <td>Percibido como aburrido, acartonado o desconectado de la dinámica de indignación ciudadana contemporánea.</td>
                                        <td>Adoptar un formato de "investigación in situ", estilo cámara al hombro, documentando fallas del gobierno porteño en tiempo real y sin intermediarios.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Cronograma Ejecutivo de Intervención (Tabla 5) -->
                    <div class="db-card" style="margin-top: 1.5rem;">
                        <h3>📅 Cronograma Ejecutivo de Intervención Sintetizado (Tabla 5)</h3>
                        <div class="db-table-container">
                            <table class="db-table">
                                <thead>
                                    <tr>
                                        <th style="width: 15%; text-align: left;">Período Temporal</th>
                                        <th style="width: 25%; text-align: left;">Foco Estratégico y Meta</th>
                                        <th style="width: 30%; text-align: left;">Acciones Físicas (Despliegue en Territorio)</th>
                                        <th style="width: 30%; text-align: left;">Acciones Digitales / Operatividad Comunicacional</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Semanas 1 - 2</strong></td>
                                        <td>Inteligencia y Mapeo</td>
                                        <td>Ninguna intervención. Trabajo técnico exhaustivo de escritorio. Mapeo y cruce de actas AGC, reclamos retenidos del 147 y saturación del 108.</td>
                                        <td>Setup intensivo de las nuevas estéticas narrativas crudas. Ajuste radical de las biografías en sus perfiles (enfoque centrado en su identidad de residente porteño y usuario del transporte).</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Semanas 3 - 4</strong></td>
                                        <td>Inserción Territorial Quirúrgica</td>
                                        <td>Visitas sorpresa de "Auditoría" in situ a los 15 puntos críticos seleccionados por el mapeo. Reuniones secretas "1 a 1" con referentes barriales invisibles.</td>
                                        <td>Grabación sistemática de todo el material en crudo "in situ" con celular. Restricción absoluta (cero posteos) sobre "reuniones institucionales" o debates en salones cerrados.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Semanas 5 - 6</strong></td>
                                        <td>Amplificación Mediática y Resolución</td>
                                        <td>Retorno de validación política a los puntos geográficos específicos donde la presión forzó y logró respuestas gubernamentales tangibles.</td>
                                        <td>Ejecución implacable de la estrategia "Go Everywhere" en medios masivos no tradicionales y nichos digitales. Lanzamiento escalonado de la serie digital serializada exponiendo la ineficiencia estructural de la Ciudad.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
            """
            html = html[:resumen_end] + tables_to_add + html[resumen_end:]
            print("Added Table 2 and Table 5 to Resumen Ejecutivo in dashboard.html")
        else:
            print("Could not find closing section tag for db-tab-resumen in dashboard.html")
    else:
        print("Could not find db-tab-resumen in dashboard.html")

    # 2. Update Seguridad y PyMEs: Replace 3-column table with 5-column table (Tabla 3)
    start_seg_table = html.find('<div class="db-card">\n                            <h3>Foco de Infiltración Territorial</h3>')
    # If not found due to whitespace, search for 'Foco de Infiltración Territorial'
    if start_seg_table == -1:
        start_seg_table = html.find('Foco de Infiltración Territorial')
        if start_seg_table != -1:
            # Find the starting <div class="db-card"> before it
            start_seg_table = html.rfind('<div class="db-card"', 0, start_seg_table)
            
    if start_seg_table != -1:
        # Find closing </div> of this card (it has a table inside, so we find </table> and then the next </div>)
        table_end = html.find('</table>', start_seg_table)
        if table_end != -1:
            card_end = html.find('</div>', table_end)
            if card_end != -1:
                card_end += len('</div>')
                
                new_seg_table_card = """<div class="db-card">
                            <h3>🗺️ Mapeo por Corredores y Dolores de Comunas (Tabla 3)</h3>
                            <div class="db-table-container">
                                <table class="db-table">
                                    <thead>
                                        <tr>
                                            <th style="width: 12%; text-align: left;">Corredor Estratégico</th>
                                            <th style="width: 10%; text-align: left;">Comunas Incluidas</th>
                                            <th style="width: 26%; text-align: left;">Perfil Socio-Urbano y Demográfico</th>
                                            <th style="width: 26%; text-align: left;">Foco de Conflicto (Punto de Dolor)</th>
                                            <th style="width: 26%; text-align: left;">Rol Operativo del "Auditor Ciudadano" (Ferraro)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Centro</strong></td>
                                            <td>1, 3</td>
                                            <td>Alta densidad poblacional, extrema vulnerabilidad social, tránsito comercial masivo.</td>
                                            <td>Situación de calle desbordada (concentra el 50% de todo CABA), higiene urbana crítica.</td>
                                            <td>Fiscalización territorial de pliegos de recolección de basura y auditoría de la red de asistencia del Ministerio de Desarrollo.</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Norte</strong></td>
                                            <td>2, 13, 14</td>
                                            <td>Alto poder adquisitivo, fuerte presencia de polos gastronómicos y turismo.</td>
                                            <td>Contaminación acústica, saturación cloacal por nuevo Código Urbanístico, megaobras.</td>
                                            <td>Defensa irrestricta del consorcio frenando habilitaciones fraudulentas de la AGC e impidiendo nuevas excepciones al código.</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Sur</strong></td>
                                            <td>4, 8, 9</td>
                                            <td>Crónico subdesarrollo de infraestructura, alarmante déficit habitacional, abandono estatal.</td>
                                            <td>Deterioro estructural de escuelas públicas, urbanizaciones inconclusas del IVC, transporte.</td>
                                            <td>Explotar su arraigo geográfico residencial. Auditar in situ paralización de obras del IVC y condiciones sanitarias en colegios.</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Oeste</strong></td>
                                            <td>7, 10, 11</td>
                                            <td>Entramado residencial de media densidad, fuerte tracción del comercio local y PyMEs.</td>
                                            <td>Inseguridad barrial (arrebatos), proliferación del mercado de objetos robados.</td>
                                            <td>Exigir trazabilidad y contundencia en los operativos de seguridad inter-agencias, protegiendo paralelamente al comercio legal de la burocracia.</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Centro-Oeste</strong></td>
                                            <td>5, 6, 12, 15</td>
                                            <td>Corazón cultural de CABA, clases medias progresistas, nodos de transbordo multimodal.</td>
                                            <td>Lucha contra la gentrificación, preservación de espacios verdes y centros culturales.</td>
                                            <td>Proteger el acervo cultural barrial (Bares Notables, teatros independientes) y presionar por la expansión operativa de la red de subtes.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>"""
                html = html[:start_seg_table] + new_seg_table_card + html[card_end:]
                print("Updated Seguridad y PyMEs Comunas table in dashboard.html")
            else:
                print("Could not find closing card div in db-tab-seguridad")
        else:
            print("Could not find table end in db-tab-seguridad")
    else:
        print("Could not find Foco de Infiltración Territorial card in db-tab-seguridad")

    # 3. Update Benchmarking: Replace 15-leader table with 10-leader table and add Risk Mitigation Matrix
    start_bench_card = html.find('<h3>Modelos Internacionales Transpuestos')
    if start_bench_card == -1:
        start_bench_card = html.find('Modelos Internacionales Transpuestos')
    
    if start_bench_card != -1:
        start_bench_card = html.rfind('<div class="db-card">', 0, start_bench_card)
        if start_bench_card != -1:
            table_end = html.find('</table>', start_bench_card)
            if table_end != -1:
                # Find two closing </div>: one for table-container, one for db-card
                card_end = html.find('</div>', table_end)
                if card_end != -1:
                    card_end = html.find('</div>', card_end + 6)
                    if card_end != -1:
                        card_end += len('</div>')
                        
                        new_bench_content = """<div class="db-card">
                            <h3>🗺️ Matriz Comparativa de Extrapolación Operativa (10 Líderes Globales)</h3>
                            <div class="db-table-container">
                                <table class="db-table">
                                    <thead>
                                        <tr>
                                            <th style="width: 20%; text-align: left;">Político Internacional</th>
                                            <th style="width: 25%; text-align: left;">Activo Estratégico Clave</th>
                                            <th style="width: 25%; text-align: left;">Riesgo a Mitigar en CABA</th>
                                            <th style="width: 30%; text-align: left;">Extrapolación Táctica Directa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Pete Buttigieg</strong></td>
                                            <td>"Go Everywhere" en Podcasts</td>
                                            <td>Caer en la sobreexposición en espacios banales</td>
                                            <td>Podcast blitz en streaming independiente analítico</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Claudia López</strong></td>
                                            <td>Narrativa biográfica "Hecha a pulso"</td>
                                            <td>Ser percibida como demagógica o artificial</td>
                                            <td>Explotar su vida como inquilino de Barracas que viaja en subte</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Raphaël Glucksmann</strong></td>
                                            <td>Explicación didáctica y moral en redes</td>
                                            <td>Imitar modas juveniles de forma forzada</td>
                                            <td>Videos verticales de formato "Pizarra y Datos" sobre corrupción</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Manuela Carmena</strong></td>
                                            <td>Descentralización mediante balcones vecinales</td>
                                            <td>Desgaste o apatía por parte de los vecinos</td>
                                            <td>Artivismo en balcones de consorcios afectados por el CUR</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Antanas Mockus</strong></td>
                                            <td>Modificación lúdica de conductas ciudadanas</td>
                                            <td>Ser considerado infantil en entornos violentos</td>
                                            <td>Campaña descargable de "Tarjetas Cívicas de Convivencia"</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Andrew Yang</strong></td>
                                            <td>Foco absoluto en la solvencia del dato duro</td>
                                            <td>Parecer aburrido o excesivamente tecnócrata</td>
                                            <td>Presentar tablets con visualizaciones del malgasto presupuestario en TV</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Elizabeth Warren</strong></td>
                                            <td>"Tengo un plan para eso" (Planes de nicho)</td>
                                            <td>Prometer soluciones demasiado complejas de leer</td>
                                            <td>Presentar "La Carpeta del Plan" específico para la cuadra visitada</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Alexandria Ocasio-Cortez</strong></td>
                                            <td>Desempaque pedagógico del proceso de poder</td>
                                            <td>Pérdida del decoro y la respetabilidad institucional</td>
                                            <td>Transmisiones en vivo desglosando quién vota qué en la Legislatura</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Bernie Sanders</strong></td>
                                            <td>Construcción de canales de distribución propios</td>
                                            <td>Aislamiento informativo en burbujas ideológicas</td>
                                            <td>Lanzar "El Canal del Auditor" en plataformas digitales independientes</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Mariano Rajoy</strong></td>
                                            <td>Llamadas pregrabadas y directas de voz</td>
                                            <td>Rechazo o molestia ("spam") por saturación telefónica</td>
                                            <td>Distribución de audios cortos de WhatsApp segmentados por cuadra y problema</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        </div> <!-- /db-grid-2 -->

                        <div class="db-card" style="margin-top: 1.5rem;">
                            <h3>⚖️ Matriz de Mitigación de Riesgos Estratégicos</h3>
                            <p style="font-size: 0.85rem; color: var(--color-texto-muted); margin-bottom: 1.2rem; line-height: 1.5;">
                                La transición de Maximiliano Ferraro de un perfil institucional clásico a uno de "Auditor Ciudadano" no está exenta de vulnerabilidades políticas y de comunicación. A continuación, se detallan los riesgos identificados en el ecosistema porteño y los protocolos de mitigación correspondientes.
                            </p>
                            <div class="db-table-container">
                                <table class="db-table">
                                    <thead>
                                        <tr>
                                            <th style="width: 25%; text-align: left;">Riesgo Identificado</th>
                                            <th style="width: 35%; text-align: left;">Descripción del Riesgo</th>
                                            <th style="width: 40%; text-align: left;">Protocolo de Mitigación Directa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>Riesgo 1: Acusación de "Chicana Política u Oposicionismo Barato"</strong></td>
                                            <td>El oficialismo porteño (PRO/LLA) o los medios tradicionales afines intentarán descalificar las recorridas y denuncias de Ferraro tildándolas de oportunismo electoral propio de un año de campaña, minimizando el impacto de los baches, el CUR o las quejas por basura.</td>
                                            <td>Ferraro jamás debe realizar una denuncia basada únicamente en opiniones subjetivas u apreciaciones políticas partidarias. Cada visita y video de auditoría debe comenzar mostrando a la pantalla de la cámara la foja del documento público, el dataset unificado de BA Obras o el portal de transparencia activa de la propia gestión del Gobierno porteño. La respuesta es quirúrgica: "No vengo a hacer campaña ni a criticar desde la ideología. Vengo hoy con las estadísticas y los números oficiales que el propio Ejecutivo publica en su portal de Open Data, y que demuestran que le están mintiendo al vecino en su cara".</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Riesgo 2: El "Contra-Archivo" de su Votación Legislativa Histórica</strong></td>
                                            <td>La oposición de izquierda u otros sectores pueden recordar que Ferraro fue vicepresidente del bloque Vamos Juntos y acompañó debates clave de densificación urbana de la ciudad en el pasado, intentando invalidar su coherencia frente a los reclamos del nuevo Código Urbanístico.</td>
                                            <td>Ferraro debe asumir con madurez institucional su historial legislativo pero marcando de forma tajante el punto de quiebre operativo: "Acompañamos debates para jerarquizar y equilibrar el desarrollo de la ciudad, pero el Ejecutivo desvirtuó la aplicación del Código Urbanístico para favorecer excepciones inmobiliarias irregulares y amnistías constructivas de obras clandestinas de hasta 5.000 metros cuadrados que nosotros jamás convalidamos ni convalidaremos. Una buena ley aplicada con opacidad y sin control se transforma en una estafa al vecino, y mi trabajo actual como Auditor es, justamente, frenar esos abusos".</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Riesgo 3: La "Fatiga de la Queja" y Bloqueo de Audiencia por Aburrimiento</strong></td>
                                            <td>Que la audiencia digital asocie los videos verticales de Ferraro a un canal crónico de quejas aburridas que no generan interacción ni tracción de voto joven en TikTok o Instagram.</td>
                                            <td>Aplicar el modelo de pedagogía didáctica de Raphaël Glucksmann y Antanas Mockus. No limitarse a la denuncia de la vereda rota; explicar detalladamente el mecanismo de por qué el bache no se repara, adónde se desvía el presupuesto, cómo funciona la triangulación de contratos de consultoría o el lobby corporativo.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>"""
                        
                        # Wait, we need to make sure we close the grid properly.
                        # The original template had:
                        # <div class="db-grid-2">
                        #    <div class="db-card"> ... (chart) ... </div>
                        #    <div class="db-card"> ... (15 leaders table) ... </div>
                        # </div> <!-- this closing tag of db-grid-2 is what we replace with </div> <!-- /db-grid-2 --> -->
                        # So we replace the entire card and the grid closing tag, and append the risks card.
                        # Wait! Let's verify what lies after the bench card in dashboard.html.
                        # Around lines 640-650:
                        # 644:                     </div>
                        # 645:                 </section>
                        # So yes, card_end is the </div> at 644, which is the closing of the card.
                        # We want to replace from start_bench_card to card_end.
                        # Since card_end is the end of the card, we also need to close the db-grid-2.
                        # So we do: html = html[:start_bench_card] + new_bench_content + html[card_end:]
                        # Wait! Let's check: does start_bench_card include the `<div class="db-card">`?
                        # Yes, we did: start_bench_card = html.rfind('<div class="db-card">', 0, start_bench_card).
                        # So we replace from the opening `<div class="db-card">` to its closing `</div>`.
                        # Inside new_bench_content, we close the card: `</div>`
                        # Then we close the db-grid-2: `</div> <!-- /db-grid-2 -->`
                        # And then we add the new risks card.
                        # Wait! In the original code, the db-grid-2 was closed AFTER the bench card.
                        # Yes:
                        # 643:                             </div>
                        # 644:                         </div>
                        # 645:                     </div> (this is the db-grid-2 closing!)
                        # So card_end was index of </div> at 644. But wait, did it include the db-grid-2 closing </div>?
                        # No, card_end was the end of the bench card.
                        # Let's check how many </div> are after table_end.
                        # table_end is before `</div>` (table-container) and `</div>` (db-card) and `</div>` (db-grid-2).
                        # So card_end = html.find('</div>', table_end) is table-container closing.
                        # card_end = html.find('</div>', card_end + 6) is db-card closing.
                        # So replacing from start_bench_card to card_end + 6 (which is db-card closing) leaves the db-grid-2 closing </div> intact on the next line!
                        # So our replacement should NOT close the db-grid-2 if we don't consume its closing tag!
                        # Or we can consume the db-grid-2 closing tag as well, and close it inside the replacement.
                        # Yes, consuming it is cleaner. Let's make sure we find the third </div>:
                        # card_end = html.find('</div>', table_end) (table-container)
                        # card_end = html.find('</div>', card_end + 6) (db-card)
                        # grid_end = html.find('</div>', card_end + 6) (db-grid-2)
                        # If we find all three, we can replace up to grid_end + len('</div>') with new_bench_content.
                        # Let's do that!
                        grid_end = html.find('</div>', card_end)
                        if grid_end != -1:
                            grid_end += len('</div>')
                            html = html[:start_bench_card] + new_bench_content + html[grid_end:]
                            print("Updated Benchmarking Global tables in dashboard.html")
                        else:
                            print("Could not find grid closing tag in dashboard.html")
                    else:
                        print("Could not find card closing tag in dashboard.html")
                else:
                    print("Could not find table-container closing tag in dashboard.html")
            else:
                print("Could not find table end in dashboard.html")
        else:
            print("Could not find bench card opening tag in dashboard.html")
    else:
        print("Could not find Modelos Internacionales in dashboard.html")

    with open(dash_path, "w", encoding="utf-8") as f:
        f.write(html)

if __name__ == "__main__":
    apply_index_changes()
    apply_dashboard_changes()
    print("All file edits applied successfully!")

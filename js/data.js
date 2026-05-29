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

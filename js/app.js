/**
 * app.js - Lógica principal de Evidencia Penal
 * Integración con MongoDB Realm (Stitch)
 */

// NOTA PARA EL USUARIO:
// Reemplazar '<TU_APP_ID>' con el ID real de tu aplicación en MongoDB App Services (Stitch).
const STITCH_APP_ID = '<TU_APP_ID>'; 

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Inicializando interfaz de la revista Evidencia Penal...");

    // Intentamos conectar con Stitch si hay un ID configurado
    if (STITCH_APP_ID !== '<TU_APP_ID>') {
        try {
            const app = new Realm.App({ id: STITCH_APP_ID });
            // Aquí iría el login anónimo o por credenciales:
            // const user = await app.logIn(Realm.Credentials.anonymous());
            console.log("Conectado a Stitch exitosamente.");
            // Aquí llamaríamos a fetchArticles(user);
        } catch (error) {
            console.error("Error conectando con Stitch:", error);
        }
    } else {
        console.warn("Falta configurar el STITCH_APP_ID. Cargando datos simulados (Mock).");
        loadMockData();
    }
});

function loadMockData() {
    // Datos simulados estructurados basados en el Manual Editorial
    const mockArticle = {
        title: "Impacto del tratamiento penitenciario en la reducción de la reincidencia",
        author: "Dirección General de Política Criminal - Sección: Dossier Académico",
        abstract: "El presente artículo analiza la evidencia empírica respecto a los programas de terminalidad educativa y formación laboral dentro del régimen penitenciario, demostrando cómo el acceso progresivo a herramientas de reinserción constituye el mecanismo más efectivo para disminuir las tasas de reincidencia.",
        keywords: ["Reincidencia", "Tratamiento Penitenciario", "Educación", "Reintegración"],
        body: `
            <h3>1. El Tratamiento Penitenciario como Eje Rehabilitador</h3>
            <p>La consolidación del Servicio Penitenciario de la Ciudad Autónoma de Buenos Aires (SPCABA) trae consigo el desafío de diseñar políticas de ejecución que superen el mero castigo punitivo. Al amparo de lo estipulado por los artículos correspondientes de la Ley 24.660, el tratamiento resocializador se erige como el pilar fundamental para garantizar que el interno adquiera las herramientas necesarias para su reintegración a la sociedad.</p>
            <p>Diversos estudios criminológicos comparados demuestran que la participación activa en programas de terminalidad educativa y talleres de oficios reduce drásticamente las probabilidades de reincidencia delictiva post-egreso.</p>
            
            <h3>2. Medición del Impacto: Desafíos Estadísticos</h3>
            <p>Para proyectar la correcta operatividad de estos programas, resulta imperativo contar con un registro nominal de egresados y su seguimiento. Respecto a la proyección estadística exacta de la baja de reincidencia en CABA para el último período anual, declaramos metodológicamente: <strong>NO SE</strong> cuenta a la fecha con un consolidado oficial abierto y publicado en fuentes del GCBA que defina el porcentaje exacto tras la reciente asunción de competencias. Establecer este observatorio de datos es prioridad de la política criminal local.</p>

            <h3>3. Implicancias para la Gestión Gubernamental</h3>
            <p>Toda política penitenciaria moderna debe enfocar sus recursos en la "criminología positiva". Convertir el tiempo de detención en tiempo de capacitación no es un acto de indulgencia procesal, sino una política de seguridad pública de alta eficacia a mediano y largo plazo.</p>
        `
    };

    renderArticle(mockArticle);
}

function renderArticle(data) {
    document.getElementById('dyn-title').innerText = data.title;
    document.getElementById('dyn-author').innerText = data.author;
    document.getElementById('dyn-abstract').innerText = data.abstract;
    document.getElementById('dyn-body').innerHTML = data.body;

    const keywordsContainer = document.getElementById('dyn-keywords');
    keywordsContainer.innerHTML = '';
    data.keywords.forEach(kw => {
        const span = document.createElement('span');
        span.className = 'keyword-tag';
        span.innerText = kw;
        keywordsContainer.appendChild(span);
    });
}

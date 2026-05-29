/**
 * app_entry.js - Entrada principal del sistema SPA modularizado
 * Plataforma Maxi Ferraro - Campaña 2026
 */

// Inicialización de la aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log("SPA - Inicializando sistema modular...");

    // 1. Configurar navegación por links con hashes en el navbar
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const pageId = link.getAttribute('data-page');
        if (pageId) {
            if (pageId === 'page-inicio') link.setAttribute('href', '#inicio');
            else if (pageId === 'page-publicaciones') link.setAttribute('href', '#publicaciones');
            else if (pageId === 'page-nosotros') link.setAttribute('href', '#nosotros');
            else if (pageId === 'page-dashboard') link.setAttribute('href', '#dashboard');
        }
    });

    // 2. Formulario de voluntariado de Campaña
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

    // 3. Inicializar módulos
    initAnimations();
    initDashboard();
    if (document.getElementById('page-inicio')) {
        initRouter();
        router();
    }
});

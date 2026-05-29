/**
 * dashboard.js - Gestión de Tablero de Control, Tab Switching y Gráficos Custom HTML5 Canvas
 * Plataforma Maxi Ferraro - Campaña 2026
 */

const dbChartModels = {
    swot: 'radar',
    barrios: 'trend',
    bench: 'bar'
};

function initDashboard() {
    console.log("Dashboard - Inicializando listeners y controles...");

    // Tab switching del tablero
    const dbNavItems = document.querySelectorAll('.db-nav-item');
    const dbPanels = document.querySelectorAll('.db-panel');
    const dbHeaderTitle = document.getElementById('db-header-title');

    dbNavItems.forEach(item => {
        item.addEventListener('click', () => {
            dbNavItems.forEach(i => i.classList.remove('active'));
            dbPanels.forEach(p => p.classList.remove('active'));

            item.classList.add('active');
            const targetPanel = document.getElementById(item.getAttribute('data-db-tab'));
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
            if (dbHeaderTitle) {
                // Remover emoji y espacios al inicio para el título del header
                dbHeaderTitle.textContent = item.textContent.replace(/^[\p{Emoji}\s]+/u, '').trim();
            }
            
            // Re-dibujar gráficos con un breve retraso para asegurar visibilidad en pantalla
            setTimeout(() => {
                renderDbCharts();
            }, 50);
        });
    });

    // Listeners globales para redibujar en cambio de tamaño de ventana
    window.addEventListener('resize', renderDbCharts);
    window.addEventListener('load', renderDbCharts);

    // Renderizado inicial
    renderDbCharts();
}

function setDbChartModel(chartId, model) {
    dbChartModels[chartId] = model;
    
    // Actualizar botones activos en el DOM del panel visible
    let tabId = '';
    if (chartId === 'swot') tabId = 'db-tab-resumen';
    else if (chartId === 'barrios') tabId = 'db-tab-seguridad';
    else if (chartId === 'bench') tabId = 'db-tab-benchmarking';
    
    const panel = document.getElementById(tabId);
    if (panel) {
        const buttons = panel.querySelectorAll('.db-btn-toggle');
        buttons.forEach(btn => {
            const btnText = btn.textContent.toLowerCase();
            const targetText = (model === 'trend' ? 'línea' : model === 'radar' ? 'radar' : 'barras');
            if (btnText === targetText) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    renderDbCharts();
}

// Motores de dibujo custom HTML5 Canvas
function drawDbRadarChart(ctx, width, height, labels, values, maxVal, color) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.38;

    ctx.clearRect(0, 0, width, height);

    // Polígonos de la cuadrícula de fondo
    const levels = 4;
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (let l = 1; l <= levels; l++) {
        ctx.beginPath();
        const currentRadius = radius * (l / levels);
        for (let i = 0; i < labels.length; i++) {
            const angle = (i * Math.PI * 2) / labels.length - Math.PI / 2;
            const x = centerX + Math.cos(angle) * currentRadius;
            const y = centerY + Math.sin(angle) * currentRadius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }

    // Ejes radiales y etiquetas de variables
    ctx.fillStyle = '#64748b';
    ctx.font = '9px "Share Tech Mono", monospace';
    ctx.textAlign = 'center';
    for (let i = 0; i < labels.length; i++) {
        const angle = (i * Math.PI * 2) / labels.length - Math.PI / 2;
        const axisX = centerX + Math.cos(angle) * radius;
        const axisY = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(axisX, axisY);
        ctx.stroke();

        const labelX = centerX + Math.cos(angle) * (radius + 20);
        const labelY = centerY + Math.sin(angle) * (radius + 15);
        ctx.fillText(labels[i], labelX, labelY);
    }

    // Polígono de valores de datos
    ctx.beginPath();
    for (let i = 0; i < values.length; i++) {
        const valRatio = values[i] / maxVal;
        const angle = (i * Math.PI * 2) / labels.length - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius * valRatio;
        const y = centerY + Math.sin(angle) * radius * valRatio;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = color.replace('1)', '0.15)');
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Puntos / Nodos en los extremos
    for (let i = 0; i < values.length; i++) {
        const valRatio = values[i] / maxVal;
        const angle = (i * Math.PI * 2) / labels.length - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius * valRatio;
        const y = centerY + Math.sin(angle) * radius * valRatio;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }
}

function drawDbBarChart(ctx, width, height, labels, values, maxVal, color) {
    ctx.clearRect(0, 0, width, height);
    const paddingLeft = 50;
    const paddingBottom = 40;
    const paddingTop = 30;
    const paddingRight = 30;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    // Líneas horizontales de cuadrícula y etiquetas eje Y
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
        const y = paddingTop + (chartHeight * (i / gridLines));
        ctx.beginPath();
        ctx.moveTo(paddingLeft, y);
        ctx.lineTo(width - paddingRight, y);
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = '9px "Share Tech Mono", monospace';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        const labelVal = Math.round(maxVal * (1 - (i / gridLines)));
        ctx.fillText(labelVal, paddingLeft - 8, y);
    }

    // Barras de datos
    const barSpacing = chartWidth / labels.length;
    const barWidth = barSpacing * 0.5;

    for (let i = 0; i < labels.length; i++) {
        const barHeight = chartHeight * (values[i] / maxVal);
        const x = paddingLeft + (barSpacing * i) + (barSpacing - barWidth) / 2;
        const y = paddingTop + chartHeight - barHeight;

        const grad = ctx.createLinearGradient(x, y, x, y + barHeight);
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'rgba(0,0,0,0.1)');

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, barHeight);
        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, barWidth, barHeight);

        // Etiquetas eje X (etiquetas inferiores de variables)
        ctx.fillStyle = '#64748b';
        ctx.font = '9px "Share Tech Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(labels[i], x + barWidth / 2, paddingTop + chartHeight + 8);
    }
}

function drawDbLineChart(ctx, width, height, labels, dataset, maxVal, color) {
    ctx.clearRect(0, 0, width, height);
    const paddingLeft = 50;
    const paddingBottom = 40;
    const paddingTop = 30;
    const paddingRight = 30;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    // Líneas horizontales de cuadrícula y etiquetas eje Y
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
        const y = paddingTop + (chartHeight * (i / gridLines));
        ctx.beginPath();
        ctx.moveTo(paddingLeft, y);
        ctx.lineTo(width - paddingRight, y);
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = '9px "Share Tech Mono", monospace';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        const labelVal = Math.round(maxVal * (1 - (i / gridLines)));
        ctx.fillText(labelVal, paddingLeft - 8, y);
    }

    const stepX = chartWidth / (labels.length - 1);
    
    // Trazado de la línea conectora principal
    ctx.beginPath();
    for (let i = 0; i < dataset.length; i++) {
        const x = paddingLeft + (stepX * i);
        const y = paddingTop + chartHeight - (chartHeight * (dataset[i] / maxVal));
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Relleno degradado debajo de la línea
    ctx.lineTo(paddingLeft + (stepX * (dataset.length - 1)), paddingTop + chartHeight);
    ctx.lineTo(paddingLeft, paddingTop + chartHeight);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, paddingTop, 0, paddingTop + chartHeight);
    grad.addColorStop(0, color.replace('1)', '0.2)'));
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Nodos de datos y etiquetas de categorías
    for (let i = 0; i < dataset.length; i++) {
        const x = paddingLeft + (stepX * i);
        const y = paddingTop + chartHeight - (chartHeight * (dataset[i] / maxVal));
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = '9px "Share Tech Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(labels[i], x, paddingTop + chartHeight + 8);
    }
}

function renderDbCharts() {
    // 1. Gráfico SWOT
    const swotCanvas = document.getElementById('db-swot-chart');
    if (swotCanvas && swotCanvas.offsetParent !== null) {
        const ctx = swotCanvas.getContext('2d');
        swotCanvas.width = swotCanvas.clientWidth;
        swotCanvas.height = swotCanvas.clientHeight;
        const labels = ['Trayectoria', 'Perfil Ético', 'Consensos', 'Redes', 'Populismo'];
        const values = [8.5, 9.5, 8.0, 7.5, 4.0];
        if (dbChartModels.swot === 'radar') {
            drawDbRadarChart(ctx, swotCanvas.width, swotCanvas.height, labels, values, 10, 'rgba(0, 255, 210, 1)');
        } else {
            drawDbBarChart(ctx, swotCanvas.width, swotCanvas.height, labels, values, 10, '#00ffd2');
        }
    }

    // 2. Gráfico Barrios / Corredores (Seguridad)
    const barriosCanvas = document.getElementById('db-barrios-chart');
    if (barriosCanvas && barriosCanvas.offsetParent !== null) {
        const ctx = barriosCanvas.getContext('2d');
        barriosCanvas.width = barriosCanvas.clientWidth;
        barriosCanvas.height = barriosCanvas.clientHeight;
        const labels = ['Centro', 'Norte', 'Sur', 'Oeste', 'C. Oeste'];
        const values = [90, 85, 78, 65, 72];
        if (dbChartModels.barrios === 'trend') {
            drawDbLineChart(ctx, barriosCanvas.width, barriosCanvas.height, labels, values, 100, 'rgba(255, 8, 68, 1)');
        } else {
            drawDbBarChart(ctx, barriosCanvas.width, barriosCanvas.height, labels, values, 100, '#ff0844');
        }
    }

    // 3. Gráfico Benchmarking Costo-Impacto
    const benchCanvas = document.getElementById('db-bench-chart');
    if (benchCanvas && benchCanvas.offsetParent !== null) {
        const ctx = benchCanvas.getContext('2d');
        benchCanvas.width = benchCanvas.clientWidth;
        benchCanvas.height = benchCanvas.clientHeight;
        const labels = ['Town Halls', 'Ludopatía', 'En Bici', 'Plaza Ideas'];
        const values = [80, 95, 70, 75];
        if (dbChartModels.bench === 'bar') {
            drawDbBarChart(ctx, benchCanvas.width, benchCanvas.height, labels, values, 100, '#f5af19');
        } else {
            drawDbRadarChart(ctx, benchCanvas.width, benchCanvas.height, labels, values, 100, 'rgba(245, 175, 25, 1)');
        }
    }
}

// Exponer en window para retrocompatibilidad con controladores inline 'onclick' en HTML
window.setDbChartModel = setDbChartModel;
window.renderDbCharts = renderDbCharts;

// Auto-inicialización del tablero si se detecta su contenedor
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.db-wrapper') && !window.dashboardInitialized) {
        window.dashboardInitialized = true;
        initDashboard();
    }
});

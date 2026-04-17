// script.js
let miGraficaPrincipal;
let miGraficaHistorial;
let varX = "X";
let varY = "Y";
let idiomaActual = "es";

const traducciones = {
    es: {
        mainTitle: "Interpolador Lineal",
        calcTitle: "Calculadora",
        calcSub: "Llena 5 de las 6 casillas. Deja en blanco la que deseas calcular.",
        btnCalc: "Calcular",
        histTitle: "Historial",
        histHelp: "(Clic en una fila para ver gráfica)",
        colVars: "Variables",
        histEmpty: "Aún no hay cálculos en el historial.",
        btnExport: "⬇️ Exportar a CSV",
        chartEmpty: "Selecciona una fila del historial",
        eduTitle: "¿Qué estamos calculando?",
        eduP1: "La <strong>interpolación lineal</strong> estima un valor desconocido asumiendo un cambio proporcional y constante (línea recta) entre los puntos conocidos.",
        eduP2: "Al tener dos puntos completos $A(x_A, y_A)$ y $B(x_B, y_B)$, podemos encontrar cualquier componente faltante de un tercer punto $C$ manteniendo la misma pendiente.",
        eduEqTitle: "Ecuación de la Recta:",
        eduWhere: "Donde <strong>$x$</strong> es",
        eduAnd: "e <strong>$y$</strong> es",
        eduLogicTitle: "Lógica Matemática del Solver:",
        step1: "El programa identifica cuáles dos puntos tienen sus coordenadas completas (Puntos A y B).",
        step2: "Identifica el punto incompleto (Punto C) y averigua si falta la $x$ o la $y$.",
        step3: "Calcula la pendiente $m$ entre los puntos A y B: $m = (y_B - y_A) / (x_B - x_A)$.",
        step4: "Si falta $y$, la despeja: $y_C = y_A + m \\cdot (x_C - x_A)$.",
        step5: "Si falta $x$, la despeja: $x_C = x_A + (y_C - y_A) / m$.",
        alertFill: "Por favor, llena 5 de las 6 casillas. Deja exactamente UNA en blanco.",
        alertError: "Error matemático. Revisa los datos ingresados.",
        alertDivZeroX: "División por cero: Las X conocidas no pueden ser iguales.",
        alertDivZeroY: "División por cero: Las Y conocidas no pueden ser iguales.",
        promptX: "Ingresa el nuevo nombre para la variable X (ej. Tiempo, Presión):",
        promptY: "Ingresa el nuevo nombre para la variable Y (ej. Distancia, Temperatura):",

        eduExampleTitle: "Ejemplo de Aplicación Real:",
        eduExampleText: "Si a una presión de $100 \\text{ kPa}$ la temperatura de saturación es $99.61 ^\\circ\\text{C}$ ($P_1, T_1$) y a $150 \\text{ kPa}$ es $111.35 ^\\circ\\text{C}$ ($P_2, T_2$), ¿cuál es la temperatura a $125 \\text{ kPa}$ ($P_C$)?",
        eduExampleResult: "Resultado: $105.48 ^\\circ\\text{C}$",
        eduUseCaseTitle: "Casos de uso comunes:",
        eduList1: "Tablas de Termodinámica (Presión, Temperatura, Volumen específico).",
        eduList2: "Resistencia de Materiales (Esfuerzo vs Deformación).",
        eduList3: "Mecánica de Fluidos (Viscosidad según la temperatura).",

        footerPriv: "Política de Privacidad",
        footerTerm: "Términos y Condiciones",
        footerCont: "Contacto",
        footerRights: "© 2026 Interpolat. Todos los derechos reservados."
    },
    en: {
        mainTitle: "Linear Interpolator",
        calcTitle: "Calculator",
        calcSub: "Fill in 5 of the 6 boxes. Leave the one you want to calculate blank.",
        btnCalc: "Calculate",
        histTitle: "History",
        histHelp: "(Click on a row to view graph)",
        colVars: "Variables",
        histEmpty: "No calculations in history yet.",
        btnExport: "⬇️ Export to CSV",
        chartEmpty: "Select a row from history",
        eduTitle: "What are we calculating?",
        eduP1: "<strong>Linear interpolation</strong> estimates an unknown value by assuming a constant proportional change (a straight line) between known points.",
        eduP2: "By having two complete points $A(x_A, y_A)$ and $B(x_B, y_B)$, we can find any missing component of a third point $C$ by maintaining the same slope.",
        eduEqTitle: "Equation of a Line:",
        eduWhere: "Where <strong>$x$</strong> is",
        eduAnd: "and <strong>$y$</strong> is",
        eduLogicTitle: "Mathematical Solver Logic:",
        step1: "The program identifies which two points have complete coordinates (Points A and B).",
        step2: "It identifies the incomplete point (Point C) and checks if $x$ or $y$ is missing.",
        step3: "Calculates the slope $m$ between points A and B: $m = (y_B - y_A) / (x_B - x_A)$.",
        step4: "If $y$ is missing, it solves for it: $y_C = y_A + m \\cdot (x_C - x_A)$.",
        step5: "If $x$ is missing, it solves for it: $x_C = x_A + (y_C - y_A) / m$.",
        alertFill: "Please fill 5 out of 6 boxes. Leave exactly ONE blank.",
        alertError: "Math error. Check your input data.",
        alertDivZeroX: "Division by zero: Known X values cannot be equal.",
        alertDivZeroY: "Division by zero: Known Y values cannot be equal.",
        promptX: "Enter the new name for the X variable (e.g., Time, Pressure):",
        promptY: "Enter the new name for the Y variable (e.g., Distance, Temperature):",

        eduExampleTitle: "Real Application Example:",
        eduExampleText: "If at a pressure of $100 \\text{ kPa}$ the saturation temperature is $99.61 ^\\circ\\text{C}$ ($P_1, T_1$) and at $150 \\text{ kPa}$ it is $111.35 ^\\circ\\text{C}$ ($P_2, T_2$), what is the temperature at $125 \\text{ kPa}$ ($P_C$)?",
        eduExampleResult: "Result: $105.48 ^\\circ\\text{C}$",
        eduUseCaseTitle: "Common use cases:",
        eduList1: "Thermodynamics Tables (Pressure, Temperature, Specific Volume).",
        eduList2: "Strength of Materials (Stress vs Strain).",
        eduList3: "Fluid Mechanics (Viscosity vs Temperature).",

        footerPriv: "Privacy Policy",
        footerTerm: "Terms and Conditions",
        footerCont: "Contact",
        footerRights: "© 2026 Interpolat. All rights reserved."
    }
};

function inicializarIdioma() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');

    if (urlLang && (urlLang === 'es' || urlLang === 'en')) {
        idiomaActual = urlLang;
    } else {
        const userLang = navigator.language || navigator.userLanguage;
        idiomaActual = userLang.startsWith('es') ? 'es' : 'en';
    }

    document.getElementById('lang-switch').value = idiomaActual;
    document.getElementById('html-tag').setAttribute('lang', idiomaActual);
    aplicarTraducciones();
}

function cambiarIdioma(lang) {
    idiomaActual = lang;
    document.getElementById('html-tag').setAttribute('lang', idiomaActual);
    aplicarTraducciones();
    
    // Solo redibujar la gráfica si ya hay datos, de lo contrario dibujar una vacía
    const inputsDOM = ['x1', 'y1', 'x2', 'y2', 'x3', 'y3'].map(id => document.getElementById(id));
    let vacios = inputsDOM.filter(el => el.value.trim() === "");
    if (vacios.length > 1) {
        dibujarGraficaVacia();
    } else {
        calcularInterpolacion(false);
    }
}

function aplicarTraducciones() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (traducciones[idiomaActual][key]) {
            el.innerHTML = traducciones[idiomaActual][key];
        }
    });
    renderMathInElement(document.getElementById('zona-educativa'), { delimiters: [ {left: '$', right: '$', display: false} ] });

    document.getElementById('link-priv').href = `privacidad.html?lang=${idiomaActual}`;
    document.getElementById('link-term').href = `terminos.html?lang=${idiomaActual}`;
    document.getElementById('link-cont').href = `contacto.html?lang=${idiomaActual}`;
}

function getT(key) { return traducciones[idiomaActual][key]; }

function editarVariable(eje) {
    let mensaje = eje === 'X' ? getT("promptX") : getT("promptY");
    let nuevoNombre = prompt(mensaje);
    if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
        if (eje === 'X') varX = nuevoNombre.trim();
        if (eje === 'Y') varY = nuevoNombre.trim();
        
        document.querySelectorAll('.lbl-x').forEach(el => el.innerText = varX);
        document.querySelectorAll('.lbl-y').forEach(el => el.innerText = varY);
        
        const inputsDOM = ['x1', 'y1', 'x2', 'y2', 'x3', 'y3'].map(id => document.getElementById(id));
        let vacios = inputsDOM.filter(el => el.value.trim() === "");
        if (vacios.length > 1) {
            dibujarGraficaVacia();
        } else {
            calcularInterpolacion(false); 
        }
    }
}

// NUEVA FUNCIÓN: Dibuja una cuadrícula en blanco elegante al abrir la página
function dibujarGraficaVacia() {
    if (miGraficaPrincipal) miGraficaPrincipal.destroy();
    const ctx = document.getElementById('lienzoGrafica').getContext('2d');
    miGraficaPrincipal = new Chart(ctx, {
        type: 'scatter',
        data: { datasets: [] }, // Sin datos
        options: { 
            responsive: true, 
            maintainAspectRatio: false, 
            scales: { 
                x: { title: { display: true, text: varX }, min: 0, max: 10 }, 
                y: { title: { display: true, text: varY }, min: 0, max: 10 } 
            } 
        }
    });
}

function calcularInterpolacion(guardarEnHistorial = true) {
    const inputsDOM = ['x1', 'y1', 'x2', 'y2', 'x3', 'y3'].map(id => document.getElementById(id));
    inputsDOM.forEach(el => el.classList.remove('calculado'));

    let vacios = inputsDOM.filter(el => el.value.trim() === "");
    
    // Prevenir alertas si la página acaba de cargar y está todo vacío
    if (vacios.length === 6 && !guardarEnHistorial) return; 

    if (vacios.length !== 1) return alert(getT("alertFill"));

    const incognitaEl = vacios[0];
    const incognitaId = incognitaEl.id;

    let vals = {};
    inputsDOM.forEach(el => { if (el.value.trim() !== "") vals[el.id] = parseFloat(el.value); });

    let puntos = [
        { id: 1, x: vals.x1, y: vals.y1 },
        { id: 2, x: vals.x2, y: vals.y2 },
        { id: 3, x: vals.x3, y: vals.y3 }
    ];

    let completos = puntos.filter(p => p.x !== undefined && p.y !== undefined);
    let incompleto = puntos.find(p => p.x === undefined || p.y === undefined);

    if (completos.length !== 2 || !incompleto) return alert(getT("alertError"));

    let A = completos[0];
    let B = completos[1];
    let C = incompleto; 

    let res = 0;
    let dx = B.x - A.x;
    let dy = B.y - A.y;

    if (C.y === undefined) {
        if (dx === 0) return alert(getT("alertDivZeroX"));
        res = A.y + (dy / dx) * (C.x - A.x);
        C.y = res;
        vals['y' + C.id] = res;
    } else {
        if (dy === 0) return alert(getT("alertDivZeroY"));
        res = A.x + (dx / dy) * (C.y - A.y);
        C.x = res;
        vals['x' + C.id] = res;
    }

    res = parseFloat(res.toFixed(4));
    incognitaEl.value = res;
    incognitaEl.classList.add('calculado');

    let puntosGrafica = [
        {x: vals.x1, y: vals.y1},
        {x: vals.x2, y: vals.y2},
        {x: vals.x3, y: vals.y3}
    ].sort((a, b) => a.x - b.x);

    let puntoCalculado = { x: C.x, y: C.y };

    if (miGraficaPrincipal) miGraficaPrincipal.destroy();
    const ctx = document.getElementById('lienzoGrafica').getContext('2d');
    miGraficaPrincipal = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                { label: idiomaActual === 'es' ? 'Línea Base' : 'Baseline', data: puntosGrafica, borderColor: '#2c3e50', backgroundColor: '#2c3e50', showLine: true, borderWidth: 2 },
                { label: idiomaActual === 'es' ? 'Punto Calculado' : 'Calculated Point', data: [puntoCalculado], borderColor: '#e74c3c', backgroundColor: '#e74c3c', pointRadius: 8, pointStyle: 'rectRot' }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { x: { title: { display: true, text: varX } }, y: { title: { display: true, text: varY } } } }
    });

    if (guardarEnHistorial) {
        document.getElementById('mensaje-historial-vacio').style.display = 'none'; 
        document.getElementById('btn-exportar').style.display = 'block'; 
        
        const cuerpoTabla = document.getElementById('cuerpo-historial');
        const fila = document.createElement('tr');
        fila.className = 'fila-historial';
        
        fila.onclick = () => mostrarGraficaHistorial(vals.x1, vals.y1, vals.x2, vals.y2, vals.x3, vals.y3, C.x, C.y, varX, varY);
        
        const td = (id) => id === incognitaId ? `<td style="color: #3498db; font-weight: bold;">${vals[id]}</td>` : `<td>${vals[id]}</td>`;

        fila.innerHTML = `
            <td><button class="btn-borrar" onclick="borrarFila(this, event)" title="Borrar">🗑️</button></td>
            ${td('x1')} ${td('y1')}
            ${td('x2')} ${td('y2')}
            ${td('x3')} ${td('y3')}
            <td style="font-size: 0.85em; color: #555;">${varX} / ${varY}</td>
        `;
        cuerpoTabla.prepend(fila);
    }
}

function borrarFila(btn, event) {
    event.stopPropagation(); 
    const fila = btn.closest('tr');
    fila.remove();
    
    const cuerpoTabla = document.getElementById('cuerpo-historial');
    if (cuerpoTabla.children.length === 0) {
        document.getElementById('mensaje-historial-vacio').style.display = 'block';
        document.getElementById('btn-exportar').style.display = 'none'; 
        
        if (miGraficaHistorial) {
            miGraficaHistorial.destroy();
            document.getElementById('mensaje-vacio-grafica').style.display = 'block';
        }
    }
}

function mostrarGraficaHistorial(x1, y1, x2, y2, x3, y3, cx, cy, histVarX, histVarY) {
    document.getElementById('mensaje-vacio-grafica').style.display = 'none';
    let puntosGrafica = [{x: x1, y: y1}, {x: x2, y: y2}, {x: x3, y: y3}].sort((a, b) => a.x - b.x);

    if (miGraficaHistorial) miGraficaHistorial.destroy();
    const ctx = document.getElementById('lienzoGraficaHistorial').getContext('2d');
    miGraficaHistorial = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                { label: idiomaActual === 'es' ? 'Línea Histórica' : 'Historical Line', data: puntosGrafica, borderColor: '#7f8c8d', backgroundColor: '#7f8c8d', showLine: true, borderWidth: 2, borderDash: [5, 5] },
                { label: idiomaActual === 'es' ? 'Punto Calculado' : 'Calculated Point', data: [{x: cx, y: cy}], borderColor: '#f39c12', backgroundColor: '#f39c12', pointRadius: 8, pointStyle: 'rectRot' }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { x: { title: { display: true, text: histVarX } }, y: { title: { display: true, text: histVarY } } }, plugins: { title: { display: true, text: idiomaActual === 'es' ? 'Revisión del Historial' : 'History Review' } } }
    });
}

function exportarCSV() {
    let csv = [];
    let cabeceras = [];
    document.querySelectorAll('#tabla-historial thead th').forEach((th, index) => {
        if (index > 0) cabeceras.push(th.innerText);
    });
    csv.push(cabeceras.join(","));

    document.querySelectorAll('#cuerpo-historial tr').forEach(tr => {
        let filaDatos = [];
        tr.querySelectorAll('td').forEach((td, index) => {
            if (index > 0) filaDatos.push(td.innerText);
        });
        csv.push(filaDatos.join(","));
    });

    const contenidoCSV = csv.join("\n");
    const blob = new Blob([contenidoCSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const enlace = document.createElement("a");
    enlace.setAttribute("href", url);
    enlace.setAttribute("download", "Interpolat_Data.csv");
    enlace.style.visibility = 'hidden';
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}

window.onload = function() {
    inicializarIdioma();
    
    setTimeout(() => {
        katex.render("y - y_A = \\frac{y_B - y_A}{x_B - x_A} (x - x_A)", document.getElementById('formula-latex'), { displayMode: true });
    }, 100);
    
    // Inicia dibujando una gráfica vacía de 0 a 10
    dibujarGraficaVacia();
};
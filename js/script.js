/* =====================================================
   OBSERVATORIO "NO MÁS" - LÓGICA PRINCIPAL
   Autor: Jonathan Machado Isern
   © 2026 - Todos los derechos reservados
   ===================================================== */
'use strict';

// ═══════════════════════════════════════════════════════
// 1. DATOS ESTÁTICOS
// ═══════════════════════════════════════════════════════
const PREGUNTAS = [
    {
        id: 1,
        texto: '¿Con qué frecuencia se abordan temas de violencia de género en tu medio?',
        opciones: ['A diario', 'Semanal', 'Quincenal', 'Rara vez'],
        multiple: false,
        analisisObservatorio: 'Según el monitoreo: el 47% de los medios abordan el tema semanalmente, principalmente durante campañas específicas. Solo el 12% lo hace a diario.'
    },
    {
        id: 2,
        texto: '¿En qué fechas se publica más contenido sobre violencia machista?',
        opciones: ['25N (Día violencia)', '8M (Mujer)', 'Día DDHH', 'Enero'],
        multiple: true,
        analisisObservatorio: "El Observatorio detectó que el 68% de la cobertura se concentra en los '16 Días de Activismo' (25 Nov - 10 Dic). Fuera de ese periodo, la visibilidad cae drásticamente."
    },
    {
        id: 3,
        texto: '¿Qué tipo de narrativa predomina?',
        opciones: ['Nota informativa', 'Reportaje', 'Opinión', 'Entrevista a especialistas'],
        multiple: true,
        analisisObservatorio: 'El 82% de las piezas son notas informativas cortas. Solo el 9% son reportajes de profundidad. Hay una oportunidad de mejorar el contexto.'
    },
    {
        id: 4,
        texto: '¿Se utilizan fuentes oficiales o testimonios de víctimas?',
        opciones: ['Solo oficiales', 'Solo víctimas', 'Ambas', 'Ninguna'],
        multiple: false,
        analisisObservatorio: 'El 55% de las notas usan solo fuentes oficiales (policía, fiscales). Solo el 12% incluye testimonios de víctimas o familiares.'
    },
    {
        id: 5,
        texto: '¿Existe tratamiento sensacionalista?',
        opciones: ['Siempre', 'Frecuentemente', 'A veces', 'Nunca'],
        multiple: false,
        analisisObservatorio: "El 41% de los medios analizados incurre 'a veces' en sensacionalismo (títulos amarillistas o detalles morbosos). El 23% lo hace frecuentemente."
    },
    {
        id: 6,
        texto: '¿El medio responsabiliza a la víctima?',
        opciones: ['Sí, frecuentemente', 'A veces', 'Nunca', 'No aplica'],
        multiple: false,
        analisisObservatorio: '¡Buena noticia! En el 100% de los medios monitoreados NO se responsabilizó a la víctima. Es un avance en el tratamiento ético.'
    },
    {
        id: 7,
        texto: '¿Se incluyen recursos de ayuda (líneas, centros)?',
        opciones: ['Siempre', 'A veces', 'Nunca'],
        multiple: false,
        analisisObservatorio: 'El 63% de los medios NUNCA incluye números de ayuda o centros de apoyo. Solo el 8% lo hace siempre. Es una de las principales áreas de mejora.'
    }
];

const CLAVES_STORAGE = {
    respuestasTiempoReal: 'respuestasUsuarioTiempoReal',
    datosPreviosTemp: 'datosPreviosTemp',
    historial: 'historialEncuestas'
};

// ═══════════════════════════════════════════════════════
// 2. ESTADO
// ═══════════════════════════════════════════════════════
let respuestasUsuario = {};

// ═══════════════════════════════════════════════════════
// 3. UTILIDADES
// ═══════════════════════════════════════════════════════
function safeStorageGet(key) {
    try { return localStorage.getItem(key); }
    catch (e) { return null; }
}

function safeStorageSet(key, value) {
    try { localStorage.setItem(key, value); return true; }
    catch (e) { return false; }
}

function safeStorageRemove(key) {
    try { localStorage.removeItem(key); }
    catch (e) { /* noop */ }
}

function contarRespondidas() {
    return Object.values(respuestasUsuario).filter(v => {
        if (Array.isArray(v)) return v.length > 0;
        return v !== null && v !== undefined && v !== '';
    }).length;
}

// ═══════════════════════════════════════════════════════
// 4. NAVEGACIÓN
// ═══════════════════════════════════════════════════════
const PAGINAS = {
    portada_home: document.getElementById('portada'),
    home: document.getElementById('home-page'),
    monitoreo: document.getElementById('monitoreo-page'),
    resultados: document.getElementById('resultados-page'),
    contactos: document.getElementById('contactos-page')
};

function showPage(pageId) {
    Object.entries(PAGINAS).forEach(([id, el]) => {
        if (!el) return;
        el.classList.toggle('active-page', id === pageId);
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === pageId);
    });

    cerrarMenuMovil();
}

function cerrarMenuMovil() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.getElementById('menuToggle');
    if (!navLinks || !menuToggle) return;
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    const icon = menuToggle.querySelector('i');
    if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

function initNavegacion() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.page) showPage(btn.dataset.page);
        });
    });
}

// ═══════════════════════════════════════════════════════
// 5. MENÚ HAMBURGUESA
// ═══════════════════════════════════════════════════════
function initMenuHamburguesa() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        const abierto = navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', String(abierto));
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars', !abierto);
            icon.classList.toggle('fa-times', abierto);
        }
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!navLinks.classList.contains('active')) return;
        if (navLinks.contains(e.target) || menuToggle.contains(e.target)) return;
        cerrarMenuMovil();
    });
}

// ═══════════════════════════════════════════════════════
// 6. ACORDEONES
// ═══════════════════════════════════════════════════════
function initAcordeones() {
    document.querySelectorAll('.acordeon-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            if (!content) return;
            const visible = content.classList.toggle('visible');
            header.setAttribute('aria-expanded', String(visible));
        });
    });
}

// ═══════════════════════════════════════════════════════
// 7. ENCUESTA - RENDERIZADO
// ═══════════════════════════════════════════════════════
function renderizarPreguntas() {
    const container = document.getElementById('preguntasContainer');
    if (!container) return;
    container.innerHTML = '';

    PREGUNTAS.forEach(p => {
        const div = document.createElement('div');
        div.className = 'pregunta-compare';

        // Título
        const titulo = document.createElement('div');
        titulo.className = 'pregunta-texto';
        const tipoClase = p.multiple ? 'multiple' : 'unica';
        const tipoTexto = p.multiple ? '(puedes marcar varias)' : '(solo una opción)';
        titulo.innerHTML = `${p.id}. ${p.texto} <span class="pregunta-tipo ${tipoClase}">${tipoTexto}</span>`;
        div.appendChild(titulo);

        // Opciones
        const opcionesDiv = document.createElement('div');
        opcionesDiv.className = 'radio-group';

        let previas = respuestasUsuario[`pregunta${p.id}`];
        if (previas && !Array.isArray(previas)) previas = [previas];
        if (!previas) previas = [];

        p.opciones.forEach(opcion => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = p.multiple ? 'checkbox' : 'radio';
            input.name = `pregunta_${p.id}`;
            input.value = opcion;
            if (previas.includes(opcion)) input.checked = true;

            input.addEventListener('change', () => {
                recolectarRespuestas(p.id, p.multiple);
            });

            label.appendChild(input);
            label.appendChild(document.createTextNode(opcion));
            opcionesDiv.appendChild(label);
        });

        div.appendChild(opcionesDiv);

        // Análisis
        const analisis = document.createElement('div');
        analisis.id = `analisis-p${p.id}`;
        div.appendChild(analisis);

        container.appendChild(div);
    });

    // Restaurar análisis si había respuestas previas
    PREGUNTAS.forEach(p => {
        const prev = respuestasUsuario[`pregunta${p.id}`];
        if (prev && (Array.isArray(prev) ? prev.length > 0 : prev)) {
            manejarRespuesta(p.id, prev);
        }
    });

    // Mostrar progreso inicial
    actualizarProgreso();
}

// ═══════════════════════════════════════════════════════
// 8. ENCUESTA - LÓGICA
// ═══════════════════════════════════════════════════════
function recolectarRespuestas(preguntaId, esMultiple) {
    const inputs = document.querySelectorAll(`input[name="pregunta_${preguntaId}"]:checked`);
    let valores;

    if (esMultiple) {
        valores = Array.from(inputs).map(i => i.value);
        if (valores.length === 0) valores = null;
    } else {
        valores = inputs.length > 0 ? inputs[0].value : null;
    }

    manejarRespuesta(preguntaId, valores);
}

function manejarRespuesta(preguntaId, valores) {
    const clave = `pregunta${preguntaId}`;

    if (!valores || (Array.isArray(valores) && valores.length === 0)) {
        delete respuestasUsuario[clave];
    } else {
        respuestasUsuario[clave] = valores;
    }

    // Pintar análisis
    const contenedor = document.getElementById(`analisis-p${preguntaId}`);
    const data = PREGUNTAS.find(p => p.id === preguntaId);

    if (contenedor && data) {
        if (!valores || (Array.isArray(valores) && valores.length === 0)) {
            contenedor.innerHTML = '';
        } else {
            const textoResp = Array.isArray(valores)
                ? valores.map(v => `• ${v}`).join('<br>')
                : valores;
            const plural = Array.isArray(valores) && valores.length > 1 ? 's' : '';

            contenedor.innerHTML = `
                <div class="analisis-box">
                    <i class="fas fa-chart-line" aria-hidden="true"></i>
                    <strong>📊 Respuesta del Observatorio:</strong><br>
                    ${data.analisisObservatorio}
                    <hr>
                    <span style="font-size:0.85rem;">
                        <strong>Tu respuesta${plural}:</strong>
                    </span><br>
                    <div style="font-size:0.9rem; margin-top:0.3rem;">${textoResp}</div>
                </div>
            `;
        }
    }

    safeStorageSet(CLAVES_STORAGE.respuestasTiempoReal, JSON.stringify(respuestasUsuario));
    actualizarProgreso();
}

function actualizarProgreso() {
    const total = PREGUNTAS.length;
    const respondidas = contarRespondidas();
    const mensaje = document.getElementById('mensajeFinalEncuesta');
    const toolbar = document.getElementById('toolbarProgreso');

    if (toolbar) {
        toolbar.textContent = `📋 Encuesta en curso · ${respondidas}/${total} respondidas`;
    }

    if (!mensaje) return;

    if (respondidas === total) {
        mostrarCierre(mensaje);
    } else {
        mensaje.innerHTML = `<div class="progreso-box">Llevas ${respondidas} de ${total} preguntas respondidas.</div>`;
    }
}

// ═══════════════════════════════════════════════════════
// 9. CIERRE DE ENCUESTA (recomendaciones + recurso)
// ═══════════════════════════════════════════════════════
function mostrarCierre(contenedor) {
    // Ocultar botón "Salir" cuando la encuesta ya está completa
    const btnSalir = document.getElementById('btnSalirEncuesta');
    if (btnSalir) btnSalir.style.display = 'none';

    // Mostrar bloque comparativo si existe
    const comparativo = document.getElementById('comparativoBlock');
    if (comparativo) comparativo.style.display = 'block';

    contenedor.innerHTML = `
        <div style="background:#d4edda; padding:0.8rem; border-radius:1rem; margin:1rem 0; display:inline-block;">
            ¡Felicitaciones! Completaste todas las preguntas.
        </div>
        <div style="margin-top:1rem;">
            <button type="button" id="btnFinalizarEncuesta" class="btn-primary" style="width:100%;">
                🏁 Finalizar Encuesta y Reiniciar
            </button>
        </div>
    `;

    const btnFinalizar = document.getElementById('btnFinalizarEncuesta');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', finalizarYReiniciar);
    }

    const btnPDF = document.getElementById('btnDescargarPDF');
    if (btnPDF && !btnPDF.dataset.bound) {
        btnPDF.dataset.bound = 'true';
        btnPDF.addEventListener('click', () => {
            alert('📄 Aquí se descargaría el PDF "Una ruta frente a la violencia"');
            // window.open('pdfs/ruta-frente-violencia.pdf', '_blank');
        });
    }
}

function finalizarYReiniciar() {
    const resultadosCompletos = {
        fecha: new Date().toISOString(),
        respuestas: { ...respuestasUsuario },
        datosPrevios: {
            medios: Array.from(document.querySelectorAll('#mediosCheck input:checked')).map(cb => cb.value),
            edad: document.getElementById('edadUser')?.value || '',
            genero: document.querySelector('input[name="genero"]:checked')?.value || '',
            colorPiel: document.querySelector('input[name="piel"]:checked')?.value || ''
        }
    };

    let historial = [];
    const guardado = safeStorageGet(CLAVES_STORAGE.historial);
    if (guardado) {
        try { historial = JSON.parse(guardado) || []; } catch (e) { historial = []; }
    }
    historial.push(resultadosCompletos);
    safeStorageSet(CLAVES_STORAGE.historial, JSON.stringify(historial));

    safeStorageRemove(CLAVES_STORAGE.respuestasTiempoReal);
    safeStorageRemove(CLAVES_STORAGE.datosPreviosTemp);

    alert('✅ Encuesta guardada exitosamente. La página se reiniciará.');
    location.reload();
}

// ═══════════════════════════════════════════════════════
// 10. INICIO DE ENCUESTA
// ═══════════════════════════════════════════════════════
function iniciarEncuesta() {
    const msgError = document.getElementById('msgConsent');
    if (msgError) msgError.textContent = '';

    const edad = document.getElementById('edadUser')?.value;
    const consent = document.getElementById('consentimientoCheck')?.checked;

    if (!edad || Number(edad) < 14) {
        if (msgError) msgError.textContent = 'Por favor ingresa una edad válida (mínimo 14 años).';
        return;
    }
    if (!consent) {
        if (msgError) msgError.textContent = 'Debes aceptar que tus datos sean analizados para continuar.';
        return;
    }

    // Guardar datos previos
    const datosPrevios = {
        medios: Array.from(document.querySelectorAll('#mediosCheck input:checked')).map(cb => cb.value),
        edad,
        genero: document.querySelector('input[name="genero"]:checked')?.value || '',
        colorPiel: document.querySelector('input[name="piel"]:checked')?.value || ''
    };
    safeStorageSet(CLAVES_STORAGE.datosPreviosTemp, JSON.stringify(datosPrevios));

    // Cargar respuestas previas si existen
    const guardadas = safeStorageGet(CLAVES_STORAGE.respuestasTiempoReal);
    if (guardadas) {
        try { respuestasUsuario = JSON.parse(guardadas) || {}; } catch (e) { respuestasUsuario = {}; }
    }

    renderizarPreguntas();

    // Mostrar botón "Salir" (por si estaba oculto)
    const btnSalir = document.getElementById('btnSalirEncuesta');
    if (btnSalir) btnSalir.style.display = 'inline-block';

    document.getElementById('preSurveyBlock').style.display = 'none';
    document.getElementById('encuestaPreguntasBlock').style.display = 'block';
}

// ═══════════════════════════════════════════════════════
// 11. INICIALIZACIÓN DE ENCUESTA
// ═══════════════════════════════════════════════════════
function initEncuesta() {
    // Recuperar encuesta previa (si existe)
    const guardadas = safeStorageGet(CLAVES_STORAGE.respuestasTiempoReal);
    if (guardadas) {
        try {
            const parseadas = JSON.parse(guardadas);
            if (parseadas && Object.keys(parseadas).length > 0) {
                const continuar = confirm(
                    'Tienes una encuesta en progreso de tu visita anterior.\n\n' +
                    '✓ "Aceptar" = Continuar donde la dejaste\n' +
                    '✓ "Cancelar" = Empezar una nueva encuesta'
                );
                if (continuar) {
                    respuestasUsuario = parseadas;
                } else {
                    safeStorageRemove(CLAVES_STORAGE.respuestasTiempoReal);
                    safeStorageRemove(CLAVES_STORAGE.datosPreviosTemp);
                }
            }
        } catch (e) {
            safeStorageRemove(CLAVES_STORAGE.respuestasTiempoReal);
        }
    }

    const btnIniciar = document.getElementById('iniciarEncuestaBtn');
    if (btnIniciar) {
        btnIniciar.addEventListener('click', (e) => {
            e.preventDefault();
            iniciarEncuesta();
        });
    }
}

// ═══════════════════════════════════════════════════════
// 12. SALIR DE LA ENCUESTA EN CUALQUIER MOMENTO
// ═══════════════════════════════════════════════════════
function abrirModalSalir() {
    const modal = document.getElementById('modalSalir');
    if (!modal) return;
    modal.classList.add('visible');
    const btn = modal.querySelector('.btn-guardar-salir');
    if (btn) setTimeout(() => btn.focus(), 50);
}

function cerrarModalSalir() {
    const modal = document.getElementById('modalSalir');
    if (modal) modal.classList.remove('visible');
}

function guardarYSalir() {
    safeStorageSet(CLAVES_STORAGE.respuestasTiempoReal, JSON.stringify(respuestasUsuario));

    const datosPrevios = {
        medios: Array.from(document.querySelectorAll('#mediosCheck input:checked')).map(cb => cb.value),
        edad: document.getElementById('edadUser')?.value || '',
        genero: document.querySelector('input[name="genero"]:checked')?.value || '',
        colorPiel: document.querySelector('input[name="piel"]:checked')?.value || ''
    };
    safeStorageSet(CLAVES_STORAGE.datosPreviosTemp, JSON.stringify(datosPrevios));

    cerrarModalSalir();
    volverAlInicio();
}

function salirSinGuardar() {
    safeStorageRemove(CLAVES_STORAGE.respuestasTiempoReal);
    safeStorageRemove(CLAVES_STORAGE.datosPreviosTemp);
    respuestasUsuario = {};
    cerrarModalSalir();
    volverAlInicio();
}

function volverAlInicio() {
    const preBlock = document.getElementById('preSurveyBlock');
    const pregBlock = document.getElementById('encuestaPreguntasBlock');
    const compBlock = document.getElementById('comparativoBlock');
    if (preBlock) preBlock.style.display = 'block';
    if (pregBlock) pregBlock.style.display = 'none';
    if (compBlock) compBlock.style.display = 'none';

    const cont = document.getElementById('preguntasContainer');
    if (cont) cont.innerHTML = '';
    const msg = document.getElementById('mensajeFinalEncuesta');
    if (msg) msg.innerHTML = '';

    const form = document.getElementById('formDatosPrevios');
    if (form) form.reset();

    const msgConsent = document.getElementById('msgConsent');
    if (msgConsent) msgConsent.textContent = '';

    showPage('portada_home');
}

function initSalirEncuesta() {
    const btnSalir = document.getElementById('btnSalirEncuesta');
    const btnGuardarSalir = document.getElementById('btnGuardarSalir');
    const btnSalirSinGuardar = document.getElementById('btnSalirSinGuardar');
    const btnCancelarSalir = document.getElementById('btnCancelarSalir');
    const modal = document.getElementById('modalSalir');

    if (btnSalir) btnSalir.addEventListener('click', abrirModalSalir);
    if (btnGuardarSalir) btnGuardarSalir.addEventListener('click', guardarYSalir);
    if (btnSalirSinGuardar) btnSalirSinGuardar.addEventListener('click', salirSinGuardar);
    if (btnCancelarSalir) btnCancelarSalir.addEventListener('click', cerrarModalSalir);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) cerrarModalSalir();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('visible')) {
            cerrarModalSalir();
        }
    });
}

// ═══════════════════════════════════════════════════════
// 13. INICIALIZACIÓN GLOBAL
// ═══════════════════════════════════════════════════════
function init() {
    initNavegacion();
    initMenuHamburguesa();
    initAcordeones();
    initEncuesta();
    initSalirEncuesta();

    // Página inicial
    showPage('portada_home');

    console.log(
        '%c© 2026 Jonathan Machado Isern | Observatorio "No Más" | Todos los derechos reservados',
        'color: #2c1a4e; font-size: 14px; font-weight: bold;'
    );
}

document.addEventListener('DOMContentLoaded', init);

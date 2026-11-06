// ===== FIRMA OCULTA EN CONSOLA =====
console.log("%c© 2026 Observatorio 'No Más' | Diseñado y desarrollado por Jonathan Machado Isern | Todos los derechos reservados", "color: #2c1a4e; font-size: 16px; font-weight: bold;");
console.log("%cSi estás viendo este mensaje sin autorización, has cometido un delito de propiedad intelectual.", "color: #dc3545; font-size: 12px;");
console.log("%cContacto: jonathanisern@gmail.com", "color: #28a745; font-size: 12px;");
localStorage.setItem('_firma_autor', btoa('Jonathan-Machado-Isern-2026-Observatorio-NoMas'));

localStorage.removeItem('respuestasUsuarioTiempoReal')
// ========== PREGUNTAS CON ANÁLISIS DEL OBSERVATORIO ==========
const preguntas = [
    {
        id: 1,
        texto: "¿Con qué frecuencia se abordan temas de violencia de género en tu medio?",
        opciones: ["Frecuentemente", "Ocasionalmente", "Nunca"],
        analisisObservatorio: "El Observatorio pudo constatar que: los medios no reflejan de manera sistemática las acciones locales orientadas a la eliminación de la violencia de género, ni visibilizan el trabajo sostenido de las instituciones."
    },
    {
        id: 2,
        texto: "¿En qué fechas se publica más contenido sobre violencia de género?",
        opciones: ["Jornada 16 Días de Activismo contra la Violencia de Género.", "Días 25 de cada mes. Día Naranja", "En cualquier momento o fecha.", "Depende de la agenda noticiosa"],
        analisisObservatorio: "El Observatorio, en consonancia con otras investigaciones realizadas en Cuba, evidencia que, aunque la violencia de género forma parte de las agendas mediáticas, no constituye una prioridad en los medios de comunicación territoriales analizados, ni a nivel nacional. Si bien el problema de las violencias machistas adquiere mayor visibilidad en la prensa nacional, su cobertura suele concentrarse durante las Jornadas 16 Días de Activismo contra la Violencia de Género. Solo algunos medios mantienen una agenda informativa sistemática y sostenida sobre esta problemática."
    },
    {
        id: 3,
        texto: "¿Qué tipo de narrativa y contenidos predomina?",
        opciones: ["Nota informativa", "Reportaje", "Entrevistas.", "Crónicas.", "Productos multimediales"],
        analisisObservatorio: "La muestra se caracteriza, en términos generales, por un tratamiento superficial de la violencia de género, abordado principalmente desde géneros periodísticos informativos. En cuanto a los programas televisivos y radiales, el monitoreo evidenció que, aunque se tratan temas como las relaciones familiares, la armonía en el hogar, el respeto entre sus integrantes y el bienestar, en la mayoría de los casos no se aprovecha para profundizar sobre las distintas manifestaciones de la violencia de género. Esto revela la ausencia de un enfoque de género transversal en las políticas editoriales."
    },
    {
        id: 4,
        texto: "¿Qué fuentes se utilizan?",
        opciones: ["Fuentes documentales: investigaciones científicas, datos estadísticos, reportes de prensa especializada...", "Mujeres víctimas", "Especialistas", "Autoridades: Policía Nacional Revolucionaria (PNR), Fiscalía General de la República, Ministerio de Justicia.", "Organizaciones nacionales e internacionales que abordan las violencias: Federación de Mujeres Cubanas (FMC), Centro Oscar Arnulfo Romero(OAR), Fondo de las Naciones Unidas para la Infancia (UNICEF), Fondo de Población de las Naciones Unidas (UNFPA), Organización de las Naciones Unidas (ONU).", "Otras"],
        analisisObservatorio: "Los materiales analizados se caracterizan por el uso limitado de fuentes de información, generalmente una sola por cada trabajo o espacio radial o televisivo. En los medios territoriales analizados (en particular, en el Oriente del país) el accionar de la Federación de Mujeres Cubanas (FMC) resulta el más representado en la mayoría de los medios monitoreados. Asimismo, aparecen como fuentes autoridades de la Unión de Bufetes de Cuba, especialistas de la Unión de Informáticos de Cuba (UIC), así como abogados, docentes y promotores locales. No obstante, la mayoría de los materiales carecen de conceptos, términos o referencias teóricas sobre las diferentes expreciones y tipos de violencia de género. Tampoco se abordan los antecedentes del fenómeno, sus causas ni las relaciones de poder que lo sustentan."
    },
    {
        id: 5,
        texto: "¿En los trabajos periodísticos se incluyen herramientas como protocolos, rutas para denunciar y mecanismos institucionales para abordar las violencias?",
        opciones: ["Si", "No"],
        analisisObservatorio: "Así se comportó la muestra analizada en la primera versión del Observatorio. Predomina un tratamiento limitado de la violencia de género, sin un enfoque profundo ni crítico. Asimismo, se evidencia una escasa diversidad de fuentes de información y un uso insuficiente de estadísticas, referencias teóricas y consideraciones legales que permitan visibilizar los problemas que afectan a estas poblaciones."
    },
    {
        id: 6,
        texto: " Los trabajos periodísticos sobre la violencia de género los realiza:",
        opciones: ["Una/un periodista especializada/o.", "Un equipo de trabajo.", "Cualquier periodista."],
        analisisObservatorio: "Así se comportó la muestra analizada en la primera versión del Observatorio:"
    },
    {
        id: 7,
        texto: "¿En los trabajos periodísticos, se responsabiliza a las víctimas por la violencia que viven?",
        opciones: ["Si", "No"],
        analisisObservatorio: "Una buena noticia: ninguno de los trabajos analizados reprodujo estereotipos de género ni responsabilizó a las víctimas por la violencia sufrida."
    }
];

// Elementos DOM
const home = document.getElementById('home-page');
const monitoreo = document.getElementById('monitoreo-page');
const resultados = document.getElementById('resultados-page');
const navBtns = document.querySelectorAll('.nav-btn');
const portada_home = document.getElementById('portada');

// Navegación entre páginas
function showPage(pageId) {
    portada_home.classList.remove('active-page');
    home.classList.remove('active-page');
    monitoreo.classList.remove('active-page');
    resultados.classList.remove('active-page');
    if (pageId === 'portada_home') portada_home.classList.add('active-page');
    if (pageId === 'home') home.classList.add('active-page');
    if (pageId === 'monitoreo') monitoreo.classList.add('active-page');
    if (pageId === 'resultados') resultados.classList.add('active-page');
    navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === pageId) btn.classList.add('active');
    });
}

navBtns.forEach(btn => btn.addEventListener('click', () => showPage(btn.dataset.page)));

// Acordeones
document.querySelectorAll('.acordeon-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

// ========== LÓGICA DE ENCUESTA INTERACTIVA ==========
let respuestasUsuario = {};

// Función para finalizar y reiniciar
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

    let historialEncuestas = localStorage.getItem('historialEncuestas');
    if (historialEncuestas) {
        historialEncuestas = JSON.parse(historialEncuestas);
    } else {
        historialEncuestas = [];
    }

    historialEncuestas.push(resultadosCompletos);
    localStorage.setItem('historialEncuestas', JSON.stringify(historialEncuestas));

    localStorage.removeItem('respuestasUsuarioTiempoReal');
    localStorage.removeItem('datosPreviosTemp');

    alert(' Encuesta guardada exitosamente. La página se reiniciará.');
    location.reload();
}

// Función que se ejecuta al marcar una opción

function manejarRespuesta(preguntaId, valorSeleccionado) {
    respuestasUsuario[`pregunta${preguntaId}`] = valorSeleccionado;

    const contenedorAnalisis = document.getElementById(`analisis-p${preguntaId}`);
    const preguntaData = preguntas.find(p => p.id === preguntaId);

    // Definir qué imagen mostrar según la pregunta
    const imagenesGraficos = {
        1: "imagenes/grafico-p1.png",
        2: "",
        3: "imagenes/grafico-p3.png",
        4: "",
        5: "imagenes/grafico-p5.png",
        6: "imagenes/grafico-p6.png",
        7: ""
    };

    const rutaImagen = imagenesGraficos[preguntaId];

    if (contenedorAnalisis && preguntaData) {
        // Si hay imagen disponible, la mostramos
        const imagenHTML = rutaImagen ? `
            <div style="margin: 0.8rem 0; text-align: center; background: white; padding: 0.5rem; border-radius: 0.8rem;">
                <img src="${rutaImagen}" alt="Gráfico del Observatorio" 
                     style="max-width: 100%; height: auto; max-height: 400px; border-radius: 0.5rem;">
                <div style="font-size: 0.7rem; color: #666; margin-top: 0.3rem;">Fuente: Observatorio "No Más"</div>
            </div>
        ` : '';

        contenedorAnalisis.innerHTML = `
            <div style="background: #e8f0fe; border-radius: 1rem; padding: 0.8rem; margin-top: 0.8rem; border-left: 4px solid #2c1a4e;">
                <i class="fas fa-chart-line"></i> <strong> Respuesta del Observatorio:</strong><br>
                ${preguntaData.analisisObservatorio}
                ${imagenHTML}
                <hr style="margin: 0.5rem 0;">
                <span style="font-size:0.85rem;"><strong>Tu respuesta:</strong> ${valorSeleccionado}</span>
            </div>
        `;
    }

    function verificarIntegridad() {
        const firmaGuardada = localStorage.getItem('_firma_autor');
        if (!firmaGuardada) {
            console.warn("⚠️ ADVERTENCIA: La firma de autoría ha sido eliminada.");
            // Opcional: restaurar la firma
            restaurarFirma();
        }
    }
    
    // Verificar cada 30 segundos
    setInterval(verificarIntegridad, 30000);

    const totalPreguntas = preguntas.length;
    const respondidas = Object.keys(respuestasUsuario).length;
    const mensajeFinal = document.getElementById('mensajeFinalEncuesta');

    if (respondidas === totalPreguntas && mensajeFinal) {
        const recomendacionesHTML = `
            <div style="background: #f0f4ff; border-radius: 1rem; padding: 1.2rem; margin-top: 1rem; border: 2px solid #6e0e94;">
                <h3 style="color: #6e0e94; margin-bottom: 1rem; text-align: center;">
                    <i class="fas fa-list-check"></i> Recomendaciones del estudio
                </h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.8rem;">
                    <div style="background: white; padding: 0.8rem; border-radius: 0.8rem; border-left: 4px solid #6e0e94;">
                        <i class="fas fa-calendar-alt" style="color: #6e0e94;"></i> 
                        <strong>Priorizar la Violencia de Género</strong><br>
                        <small>Incluir el tema en agendas mediáticas de forma constante, no solo en fechas conmemorativas.</small>
                    </div>
                    <div style="background: white; padding: 0.8rem; border-radius: 0.8rem; border-left: 4px solid #6e0e94;">
                        <i class="fas fa-people-arrows" style="color: #6e0e94;"></i> 
                        <strong>Enfoque interseccional</strong><br>
                        <small>Considerar raza, clase, edad, territorio y diversidad sexual en las coberturas.</small>
                    </div>
                    <div style="background: white; padding: 0.8rem; border-radius: 0.8rem; border-left: 4px solid #6e0e94;">
                        <i class="fas fa-microphone-alt" style="color: #6e0e94;"></i> 
                        <strong>Fortalecer fuentes diversas</strong><br>
                        <small>Incluir testimonios de víctimas, activistas y especialistas, no solo fuentes oficiales.</small>
                    </div>
                    <div style="background: white; padding: 0.8rem; border-radius: 0.8rem; border-left: 4px solid #6e0e94;">
                        <i class="fas fa-universal-access" style="color: #6e0e94;"></i> 
                        <strong>Garantizar utilidad y accesibilidad</strong><br>
                        <small>Incluir recursos de ayuda, lenguaje claro y formatos accesibles.</small>
                    </div>
                    <div style="background: white; padding: 0.8rem; border-radius: 0.8rem; border-left: 4px solid #6e0e94;">
                        <i class="fas fa-laptop-code" style="color: #6e0e94;"></i> 
                        <strong>Aprovechar plataformas digitales</strong><br>
                        <small>Usar redes sociales y sitios web para amplificar mensajes y llegar a audiencias jóvenes.</small>
                    </div>
                    <div style="background: white; padding: 0.8rem; border-radius: 0.8rem; border-left: 4px solid #6e0e94;">
                        <i class="fas fa-star" style="color: #6e0e94;"></i> 
                        <strong>Sistematizar buenas prácticas</strong><br>
                        <small>Crear repositorios de coberturas responsables y ejemplos a seguir.</small>
                    </div>
                    <div style="background: white; padding: 0.8rem; border-radius: 0.8rem; border-left: 4px solid #6e0e94;">
                        <i class="fas fa-chart-line" style="color: #6e0e94;"></i> 
                        <strong>Monitoreo y evaluación continua</strong><br>
                        <small>Establecer indicadores y auditorías periódicas de contenido.</small>
                    </div>
                    <div style="background: white; padding: 0.8rem; border-radius: 0.8rem; border-left: 4px solid #6e0e94;">
                        <i class="fas fa-chalkboard-user" style="color: #6e0e94;"></i> 
                        <strong>Capacitación y formación sistemática</strong><br>
                        <small>Talleres obligatorios en perspectiva de género para periodistas y editores.</small>
                    </div>
                    <div style="background: white; padding: 0.8rem; border-radius: 0.8rem; border-left: 4px solid #6e0e94;">
                        <i class="fas fa-gavel" style="color: #6e0e94;"></i> 
                        <strong>Visibilizar y condenar el femicidio</strong><br>
                        <small>Tratar el femicidio como problema estructural, no como hecho aislado.</small>
                    </div>
                    <div style="background: white; padding: 0.8rem; border-radius: 0.8rem; border-left: 4px solid #6e0e94;">
                        <i class="fas fa-handshake" style="color: #6e0e94;"></i> 
                        <strong>Fortalecer articulación institucional</strong><br>
                        <small>Coordinación entre medios, organismos de género y organizaciones feministas.</small>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: #555;">
                     Estas recomendaciones son parte del Informe del Observatorio "No Más"
                </div>
            </div>
        `;

        mensajeFinal.innerHTML = `
            <div style="background:#d4edda; padding:0.8rem; border-radius:1rem; margin-bottom:1rem;">
                 ¡Felicitaciones! Completaste todas las preguntas.
            </div>
            ${recomendacionesHTML}
        `;
        // HTML de la sección del recurso (la que pediste)
        const recursoHTML = `
    <div class="hero" style="background:#f0f4ff; border-radius: 1rem; padding: 1.5rem; margin-top: 1.5rem; text-align: center; border: 1px solid #e0c8a8;">
        <i class="fas fa-book-open" style="font-size: 2rem; color: #6e0e94; margin-bottom: 0.5rem;"></i>
        <h3 style="color: #6e0e94; margin-bottom: 0.5rem;"> Recurso: Una ruta frente a la violencia</h3>
        <p style="margin-bottom: 1rem;">Descarga la guía práctica para coberturas responsables.</p>
        <button id="btnDescargarPDF" style="background-color: #6e0e94; color: white; padding: 10px 24px; border: none; border-radius: 25px; cursor: pointer;">
             Descargar PDF
        </button>
    </div>
`;

        mensajeFinal.innerHTML = `
    <div style="background:#d4edda; padding:0.8rem; border-radius:1rem; margin-bottom:1rem;">
         ¡Felicitaciones! Completaste todas las preguntas.
    </div>
    ${recomendacionesHTML}
    ${recursoHTML}
`;

        // Agregar evento al botón de descarga
        setTimeout(() => {
            const btnPDF = document.getElementById('btnDescargarPDF');
            if (btnPDF) {
                btnPDF.addEventListener('click', function () {
                    // Aquí puedes poner la URL real de tu PDF
                     ;
                     window.open('archivos/pdf de prueba.pdf', '_blank')

                    // Si tienes el archivo PDF en tu servidor:
                    // window.open('pdfs/ruta-frente-violencia.pdf', '_blank');
                });
            }
        }, 100);

        if (!document.getElementById('btnFinalizarEncuesta')) {
            const botonFinalizar = document.createElement('button');
            botonFinalizar.id = 'btnFinalizarEncuesta';
            botonFinalizar.innerHTML = 'Finalizar Encuesta';
            botonFinalizar.style.backgroundColor = '#6e0e94';
            botonFinalizar.style.marginTop = '1rem';
            botonFinalizar.style.padding = '12px 24px';
            botonFinalizar.style.fontSize = '1rem';
            botonFinalizar.style.border = 'none';
            botonFinalizar.style.borderRadius = '25px';
            botonFinalizar.style.cursor = 'pointer';
            botonFinalizar.style.color = 'white';
            botonFinalizar.style.fontWeight = 'bold';
            botonFinalizar.style.width = '25%';
            botonFinalizar.onclick = finalizarYReiniciar;
            mensajeFinal.appendChild(botonFinalizar);
        }
    } else if (mensajeFinal) {
        mensajeFinal.innerHTML = `<div style="background:#d1ecf1; padding:0.5rem; border-radius:1rem;"> Llevas ${respondidas} de ${totalPreguntas} preguntas respondidas.</div>`;
    }

    localStorage.setItem('respuestasUsuarioTiempoReal', JSON.stringify(respuestasUsuario));
}

// Renderizar preguntas
function renderizarPreguntas() {
    const container = document.getElementById('preguntasContainer');
    if (!container) return;
    container.innerHTML = '';

    preguntas.forEach(p => {
        const divPregunta = document.createElement('div');
        divPregunta.className = 'pregunta-compare';
        divPregunta.style.marginBottom = '1.8rem';
        divPregunta.style.padding = '1rem';
        divPregunta.style.backgroundColor = 'white';
        divPregunta.style.borderRadius = '1rem';

        const textoPregunta = document.createElement('div');
        textoPregunta.style.fontWeight = 'bold';
        textoPregunta.style.marginBottom = '0.8rem';
        textoPregunta.innerHTML = `${p.id}. ${p.texto}`;
        divPregunta.appendChild(textoPregunta);

        const opcionesDiv = document.createElement('div');
        opcionesDiv.className = 'radio-group';
        opcionesDiv.style.display = 'flex';
        opcionesDiv.style.flexWrap = 'wrap';
        opcionesDiv.style.gap = '1rem';

        p.opciones.forEach(opcion => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `pregunta_${p.id}`;
            radio.value = opcion;

            radio.addEventListener('change', (e) => {
                manejarRespuesta(p.id, e.target.value);
            });

            const previa = respuestasUsuario[`pregunta${p.id}`];
            if (previa === opcion) {
                radio.checked = true;
                setTimeout(() => {
                    if (radio.checked) manejarRespuesta(p.id, opcion);
                }, 100);
            }

            label.appendChild(radio);
            label.appendChild(document.createTextNode(opcion));
            opcionesDiv.appendChild(label);
        });

        divPregunta.appendChild(opcionesDiv);

        const contenedorAnalisis = document.createElement('div');
        contenedorAnalisis.id = `analisis-p${p.id}`;
        divPregunta.appendChild(contenedorAnalisis);

        container.appendChild(divPregunta);
    });
}

function cargarRespuestasPrevias() {
    const guardadas = localStorage.getItem('respuestasUsuarioTiempoReal');
    if (guardadas) {
        try {
            respuestasUsuario = JSON.parse(guardadas);
        } catch (e) { }
    }
}

function iniciarEncuesta() {
    cargarRespuestasPrevias();
    renderizarPreguntas();
    document.getElementById('preSurveyBlock').style.display = 'none';
    document.getElementById('encuestaPreguntasBlock').style.display = 'block';

    const respondidas = Object.keys(respuestasUsuario).length;
    const mensajeFinal = document.getElementById('mensajeFinalEncuesta');
    if (mensajeFinal && respondidas > 0) {
        mensajeFinal.innerHTML = `<div style="background:#d1ecf1; padding:0.5rem; border-radius:1rem;"> Retomando ${respondidas} de ${preguntas.length} preguntas respondidas.</div>`;
    }
}

// Evento del botón iniciar encuesta
const btnIniciar = document.getElementById('iniciarEncuestaBtn');
if (btnIniciar) {
    const nuevoBtn = btnIniciar.cloneNode(true);
    btnIniciar.parentNode.replaceChild(nuevoBtn, btnIniciar);
    nuevoBtn.addEventListener('click', (e) => {
        const edad = document.getElementById('edadUser').value;
        if (!edad) { alert('Ingresa edad'); return; }
        iniciarEncuesta();
    });
}
// Función para reiniciar SOLO la encuesta (sin recargar página)
function reiniciarEncuesta() {
    if (confirm('¿Estás segura/o? Se borrarán todas tus respuestas actuales.')) {
        // Limpiar respuestas en memoria
        respuestasUsuario = {};

        // Limpiar localStorage
        localStorage.removeItem('respuestasUsuarioTiempoReal');

        // Limpiar el contenedor de análisis de cada pregunta
        for (let i = 1; i <= preguntas.length; i++) {
            const contenedor = document.getElementById(`analisis-p${i}`);
            if (contenedor) {
                contenedor.innerHTML = '';
            }
        }

        // Desmarcar todos los radios
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });

        // Limpiar mensaje final
        const mensajeFinal = document.getElementById('mensajeFinalEncuesta');
        if (mensajeFinal) {
            mensajeFinal.innerHTML = '';
        }

        // Volver a renderizar preguntas (limpias)
        renderizarPreguntas();

        alert('✅ Encuesta reiniciada. Puedes comenzar de nuevo.');
    }
}

// Agregar evento al botón
document.getElementById('btnReiniciarEncuesta')?.addEventListener('click', reiniciarEncuesta);
// Guardar aporte del usuario
document.getElementById('guardarAporteBtn')?.addEventListener('click', () => {
    alert('Gracias por tu aporte: ' + document.getElementById('aporteUsuario').value);
});

// Funciones auxiliares
function recargarPagina() {
    location.reload();
}

function portada_inicio() {
    showPage('portada_home');
}

// Mostrar página inicial
showPage('portada_home');
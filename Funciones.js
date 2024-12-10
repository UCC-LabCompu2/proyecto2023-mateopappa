/**
 * Función para simular la Ley de Hooke y calcular la fuerza resultante.
 * @method simularHooke
 */
const simularHooke = () => {
    // Captura los valores ingresados por el usuario
    let constanteElastica = parseFloat(document.getElementById("input-constante").value);
    let fuerzaRestauradora = parseFloat(document.getElementById("input-fuerza-restauradora").value);
    let desplazamientoHorizontal = parseFloat(document.getElementById("input-desplazamiento-horizontal").value);

    // Validación: Asegurarse de que al menos dos valores sean válidos
    let valoresValidos = 0;
    if (!isNaN(constanteElastica) && constanteElastica > 0) valoresValidos++;
    if (!isNaN(fuerzaRestauradora) && fuerzaRestauradora > 0) valoresValidos++;
    if (!isNaN(desplazamientoHorizontal) && desplazamientoHorizontal > 0) valoresValidos++;

    if (valoresValidos < 2) {
        alert("Por favor, ingresa al menos dos valores válidos para realizar la simulación.");
        return; // Salir si no se cumplen los requisitos
    }

    // Realizar cálculos basados en los valores válidos
    if (!isNaN(fuerzaRestauradora) && !isNaN(constanteElastica)) {
        desplazamientoHorizontal = fuerzaRestauradora / constanteElastica; // Calcular desplazamiento
    } else if (!isNaN(desplazamientoHorizontal) && !isNaN(constanteElastica)) {
        fuerzaRestauradora = constanteElastica * desplazamientoHorizontal; // Calcular fuerza restauradora
    } else if (!isNaN(desplazamientoHorizontal) && !isNaN(fuerzaRestauradora)) {
        constanteElastica = fuerzaRestauradora / desplazamientoHorizontal; // Calcular constante elástica
    }

    // Mostrar los resultados calculados en los campos de entrada
    document.getElementById("input-constante").value = constanteElastica.toFixed(2);
    document.getElementById("input-fuerza-restauradora").value = fuerzaRestauradora.toFixed(2);
    document.getElementById("input-desplazamiento-horizontal").value = desplazamientoHorizontal.toFixed(2);

    // Preparar datos para el gráfico
    const dataX = [0, desplazamientoHorizontal];
    const dataY = [0, fuerzaRestauradora];

    // Dibujar el gráfico
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    drawGraph(context, dataX, dataY);

    // Deshabilitar los campos tras la simulación
    deshabilitarCampos();
};

/**
 * Deshabilita los campos de entrada para no permitir cambios hasta que no se toque el boton limpiarcampos
 * @method deshabilitarCampos
 */
const deshabilitarCampos = () => {
    // Deshabilitar los campos de entrada estableciendo la propiedad disabled como true
    document.getElementById("input-constante").disabled = true;
    document.getElementById("input-fuerza-restauradora").disabled = true;
    document.getElementById("input-desplazamiento-horizontal").disabled = true;
};
/**
 * Habilita los campos de entrada para permitir cambios
 * @method habilitarCampos
 */
const habilitarCampos = () => {
    // habilitar los campos de entrada estableciendo la propiedad disabled como false
    document.getElementById("input-constante").disabled = false;
    document.getElementById("input-fuerza-restauradora").disabled = false;
    document.getElementById("input-desplazamiento-horizontal").disabled = false;
};

/**
 * Función para limpiar los campos de entrada, limpia el grafico y habilita los input nuevamente
 * @method limpiarCampos
 */
const limpiarCampos = () => {
    document.getElementById('input-constante').value = '0.5';
    document.getElementById('input-fuerza-restauradora').value = '';
    document.getElementById('input-desplazamiento-horizontal').value = '';
    document.getElementById('resultado-constante').value = '';
    limpiarGrafico();
    habilitarCampos();
};

/**
 * Función para verificar si los campos ingresados son válidos y blanquearlos si no lo son, luego de mandar un alert
 * @method verificarCampos
 */
/**
 * Función para verificar si los campos ingresados son válidos y limpiar solo los incorrectos
 * @method verificarCampos
 */
const verificarCampos = () => {
    const inputConstante = document.getElementById("input-constante");
    const inputFuerzaRestauradora = document.getElementById("input-fuerza-restauradora");
    const inputDesplazamientoHorizontal = document.getElementById("input-desplazamiento-horizontal");

    let valoresCorrectos = 0;

    // Validar constante elástica
    if (isNaN(parseFloat(inputConstante.value)) || inputConstante.value === "") {
        inputConstante.value = ""; // Limpiar si no es válido
    } else {
        valoresCorrectos++;
    }

    // Validar fuerza restauradora
    if (isNaN(parseFloat(inputFuerzaRestauradora.value)) || inputFuerzaRestauradora.value === "") {
        inputFuerzaRestauradora.value = ""; // Limpiar si no es válido
    } else {
        valoresCorrectos++;
    }

    // Validar desplazamiento horizontal
    if (isNaN(parseFloat(inputDesplazamientoHorizontal.value)) || inputDesplazamientoHorizontal.value === "") {
        inputDesplazamientoHorizontal.value = ""; // Limpiar si no es válido
    } else {
        valoresCorrectos++;
    }

    // Verificar que al menos dos valores sean correctos
    if (valoresCorrectos < 2) {
        alert("Debe ingresar al menos 2 valores numéricos válidos para realizar el cálculo.");
    }
};


/**
 * muestra el valor del range una vez modificado este input-type
 * @param {string} valor- valor range
 * @method mostrarValorRange
 */
const mostrarValorRange = (valor) => {
    document.getElementById("valor-range").textContent = valor;
};

/**
 * Calcula la constante de elasticidad para cuando el usuario asi lo decide. Muestra el valor del resultado en un div oculto hasta entonces
 * @method calcularConstante
 */
const calcularConstante = () => {
    const LIMITE_VALOR = 1000000; // Límite de valor permitido

    const inputFuerzaRestauradora = document.getElementById("input-fuerza-restauradora");
    const inputDesplazamientoHorizontal = document.getElementById("input-desplazamiento-horizontal");

    const fuerzaRestauradora = parseFloat(inputFuerzaRestauradora.value);
    const desplazamientoHorizontal = parseFloat(inputDesplazamientoHorizontal.value);

    let mensajeError = "";

    // Validar fuerza restauradora
    if (isNaN(fuerzaRestauradora)) {
        mensajeError += "Ingrese un valor válido para la fuerza restauradora.\n";
        inputFuerzaRestauradora.value = "";
    } else if (!validarTamanioNumeros(fuerzaRestauradora, LIMITE_VALOR)) {
        mensajeError += `La fuerza restauradora no debe exceder ${LIMITE_VALOR}.\n`;
        inputFuerzaRestauradora.value = "";
    }

    // Validar desplazamiento horizontal
    if (isNaN(desplazamientoHorizontal)) {
        mensajeError += "Ingrese un valor válido para el desplazamiento horizontal.\n";
        inputDesplazamientoHorizontal.value = "";
    } else if (!validarTamanioNumeros(desplazamientoHorizontal, LIMITE_VALOR)) {
        mensajeError += `El desplazamiento horizontal no debe exceder ${LIMITE_VALOR}.\n`;
        inputDesplazamientoHorizontal.value = "";
    }

    // Mostrar errores si existen
    if (mensajeError) {
        alert(mensajeError);
        return;
    }

    // Si los valores son válidos, calcular constante de elasticidad
    const constanteElastica = fuerzaRestauradora / desplazamientoHorizontal;
    const resultadoConstante = document.getElementById("resultado-constante");
    const labelConstante = document.getElementById("label-constante");

    resultadoConstante.value = constanteElastica.toFixed(2);
    resultadoConstante.style.display = "inline-block";
    labelConstante.style.display = "inline-block";
};

/**
 * muestra u oculta los div segun la seleccion del usuario en el
 * @param {string} divId- id del div a mostrar/ocultar
 * @method mostrarDiv
 */
const mostrarDiv = (divId) => {
    const divSimular = document.getElementById("div-simular");
    const divCalcular = document.getElementById("div-calcular");
    const resultadoConstante = document.getElementById("resultado-constante");
    const labelConstante = document.getElementById("label-constante");
    const divRange = document.getElementById("input-constante");
    const divlabelrange = document.getElementById("input-cons");
    const spanunidadcons = document.getElementById("unidades-cons");

    if (divId === "div-simular") {
        divSimular.style.display = "block";
        divCalcular.style.display = "none";
        resultadoConstante.style.display = "none";
        labelConstante.style.display = "none";
        divRange.style.display = "inline-block";
        divlabelrange.style.display = "inline-block";
        spanunidadcons.style.display = "inline-block";
    } else if (divId === "div-calcular") {
        divSimular.style.display = "none";
        divCalcular.style.display = "block";
        resultadoConstante.style.display = "inline-block";
        labelConstante.style.display = "inline-block";
        divRange.style.display = "none";
        divlabelrange.style.display = "none";
        spanunidadcons.style.display = "none";
    }
};

document.addEventListener("DOMContentLoaded", function() {
    const botonSimular = document.getElementById("boton-simular");
    botonSimular.addEventListener("click", simularHooke);
});

/**
 * dibuja el grafico, ejes cartesianos y los nombres de los mismos, de forma que hace una representacion basica de la relacion lineal que explica la ley de Hooke
 * @param {CanvasRenderingContext2D} context - El contexto 2D del canvas donde se dibujará el gráfico.
 * @param {number[]} dataX - Conjunto de datos en el eje X (desplazamiento horizontal).
 * @param {number[]} dataY - Conjunto de datos en el eje Y (fuerza aplicada o fuerza restauradora).
 * @method drawGraph
 */
const drawGraph = (context, dataX, dataY) => {

    const canvasWidth = context.canvas.width;
    const canvasHeight = context.canvas.height;

    // configurar el estilo de dibujo del gráfico
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.strokeStyle = "blue";
    context.lineWidth = 1;

    // calcular la escala en el eje X y Y
    const scaleX = canvasWidth / (Math.max(...dataX) - Math.min(...dataX));
    const scaleY = canvasHeight / (Math.max(...dataY) - Math.min(...dataY));

    //desplazamiento para centrar el gráfico
    const offsetX = (Math.max(...dataX) - Math.min(...dataX)) / 2;
    const offsetY = (Math.max(...dataY) - Math.min(...dataY)) / 2;

    // graficar la funcion lineal
    context.beginPath();
    for (let i = 0; i < dataX.length; i++) {
        const x = (dataX[i] + offsetX) * scaleX;
        const y = canvasHeight - (dataY[i] + offsetY) * scaleY;
        if (i === 0) {
            context.moveTo(x, y);
        } else {
            context.lineTo(x, y);
        }
    }
    context.stroke();

    // dibuja ejes
    context.strokeStyle = "black";
    context.lineWidth = 0.5;
    context.font = "10px sans-serif";
    context.beginPath();
    context.moveTo(0, canvasHeight - offsetY * scaleY);
    context.lineTo(canvasWidth, canvasHeight - offsetY * scaleY);
    context.moveTo(offsetX * scaleX, 0);
    context.lineTo(offsetX * scaleX, canvasHeight);
    context.stroke();

    // pone nombre a los ejes
    context.fillText("fuerza aplicada", canvasWidth - 20, canvasHeight - 10);
    context.fillText("desplazamiento horizontal", offsetX * scaleX + 10, 10);
};
/**
 * limpia el canvas
 * @method limpiarGrafico
 */
const limpiarGrafico = () => {

    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");


    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
};

const validarTamanioNumeros = (valor, limite) => {
    if (Math.abs(valor) > limite) {
        return false;
    }
    return true;
};

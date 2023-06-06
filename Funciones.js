/**
 * Función para simular la Ley de Hooke y calcular la fuerza resultante.
 * @method simularHooke
 */
const simularHooke = () => {
    verificarCampos();
    let constanteElastica = parseFloat(document.getElementById("input-constante").value);
    let fuerzaRestauradora = parseFloat(document.getElementById("input-fuerza-restauradora").value);
    let desplazamientoHorizontal = parseFloat(document.getElementById("input-desplazamiento-horizontal").value);
    const dataX = [0, fuerzaRestauradora, desplazamientoHorizontal];
    const dataY = [0, constanteElastica, constanteElastica];

    if (fuerzaRestauradora && constanteElastica) {
        // calcula desplazamiento horizontal
        desplazamientoHorizontal = fuerzaRestauradora / constanteElastica;
    } else if (desplazamientoHorizontal && constanteElastica) {
        // calcula la fuerza restauradora
        fuerzaRestauradora = constanteElastica * desplazamientoHorizontal;
    }

    // Mostrar los resultados en los campos de entrada
    document.getElementById("input-constante").value = constanteElastica.toFixed(2);
    document.getElementById("input-fuerza-restauradora").value = fuerzaRestauradora.toFixed(2);
    document.getElementById("input-desplazamiento-horizontal").value = desplazamientoHorizontal.toFixed(2);

    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    drawGraph(context, dataX, dataY);
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
const verificarCampos = () => {
    const constanteElastica = document.getElementById("input-constante").value;
    const fuerzaRestauradora = document.getElementById("input-fuerza-restauradora").value;
    const desplazamientoHorizontal = document.getElementById("input-desplazamiento-horizontal").value;

    // Verificar si se proporcionaron al menos 2 valores
    let valoresIngresados = 0;

    if (!isNaN(constanteElastica) && constanteElastica !== '') {
        valoresIngresados++;
    }

    if (!isNaN(fuerzaRestauradora) && fuerzaRestauradora !== '') {
        valoresIngresados++;
    }

    if (!isNaN(desplazamientoHorizontal) && desplazamientoHorizontal !== '') {
        valoresIngresados++;
    }

    if (valoresIngresados < 2) {
        alert("Debe ingresar al menos 2 valores numéricos para realizar el cálculo.");
        limpiarCampos();
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
    const fuerzaRestauradora = parseFloat(document.getElementById("input-fuerza-restauradora").value);
    const desplazamientoHorizontal = parseFloat(document.getElementById("input-desplazamiento-horizontal").value);

    if (isNaN(fuerzaRestauradora) || isNaN(desplazamientoHorizontal)) {
        alert("Por favor, ingrese valores válidos para la fuerza restauradora y el desplazamiento horizontal.");
        document.getElementById("input-fuerza-restauradora").value = "";
        document.getElementById("input-desplazamiento-horizontal").value = "";
        return;
    }

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
 * @param context
 * @param dataX
 * @param dataY
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
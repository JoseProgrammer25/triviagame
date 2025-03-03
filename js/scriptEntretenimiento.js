document.addEventListener("DOMContentLoaded", function() {
    cargarPregunta();
});

let preguntaActual = 0;
let preguntas = [];
let puntuacion = 0;

function cargarPregunta() {
    try {
        preguntas = JSON.parse(readText("../json/preguntasEntretenimiento.json"));
        if (!preguntas || preguntas.length === 0) {
            console.error("No se encontraron preguntas en el archivo JSON.");
            return;
        }
        preguntas = barajarArray(preguntas).slice(0, 10); 
        mostrarPregunta();
    } catch (error) {
        console.error("Error al cargar las preguntas:", error);
    }
}

function barajarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function barajarOpciones(opciones) {
    for (let i = opciones.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opciones[i], opciones[j]] = [opciones[j], opciones[i]];
    }
    return opciones;
}

function mostrarPregunta() {
    if (preguntaActual >= preguntas.length) {
        verificarResultado();
        return;
    }

    const pregunta = preguntas[preguntaActual];
    document.querySelector(".categoria").textContent = pregunta.categoria;
    document.querySelector(".pregunta").textContent = pregunta.pregunta;

    const opcionesBarajadas = barajarOpciones([...pregunta.opciones]);
    document.getElementById("btn1").textContent = opcionesBarajadas[0];
    document.getElementById("btn2").textContent = opcionesBarajadas[1];
    document.getElementById("btn3").textContent = opcionesBarajadas[2];
    document.getElementById("btn4").textContent = opcionesBarajadas[3];

    document.getElementById("btn1").style.backgroundColor = "";
    document.getElementById("btn2").style.backgroundColor = "";
    document.getElementById("btn3").style.backgroundColor = "";
    document.getElementById("btn4").style.backgroundColor = "";

    actualizarBarraProgreso();
}

function verificarRespuesta(opcionSeleccionada, botonSeleccionado) {
    const pregunta = preguntas[preguntaActual];
    const botones = document.querySelectorAll(".btn");

    if (pregunta.respuestaCorrecta === opcionSeleccionada) {
        botonSeleccionado.style.backgroundColor = "green";
        puntuacion++;
    } else {
        botonSeleccionado.style.backgroundColor = "red";
        botones.forEach(boton => {
            if (boton.textContent === pregunta.respuestaCorrecta) {
                boton.style.backgroundColor = "green";
            }
        });
    }

    document.getElementById("puntuacion").textContent = puntuacion;

    setTimeout(() => {
        preguntaActual++;
        mostrarPregunta();
    }, 1000);
}

function actualizarBarraProgreso() {
    const progreso = ((preguntaActual + 1) / preguntas.length) * 100;
    document.querySelector(".barraProgreso").style.width = progreso + "%";
}

function verificarResultado() {
    const resultado = (puntuacion >= preguntas.length / 2) ? "¡Aprobado!" : "Suspendido";
    alert(`Has completado el cuestionario. ${resultado} Puntuación: ${puntuacion}/${preguntas.length}`);
}

function select_id(id) {
    return document.getElementById(id);
}

function style(id) {
    return select_id(id).style;
}

function readText(ruta_local) {
    var texto = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", ruta_local, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        texto = xmlhttp.responseText;
    } else {
        console.error("Error al leer el archivo:", xmlhttp.statusText);
    }
    return texto;
}

document.getElementById("btn1").addEventListener("click", function() {
    verificarRespuesta(this.textContent, this);
});
document.getElementById("btn2").addEventListener("click", function() {
    verificarRespuesta(this.textContent, this);
});
document.getElementById("btn3").addEventListener("click", function() {
    verificarRespuesta(this.textContent, this);
});
document.getElementById("btn4").addEventListener("click", function() {
    verificarRespuesta(this.textContent, this);
});
const PALABRAS = [
    "JAVA", "PROGRAMACION", "AHORCADO", "COMPUTADORA", "JUEGO",
    "DESARROLLO", "SISTEMA", "LENGUAJE", "CODIGO", "APLICACION",
    "ALGORITMO", "VARIABLE", "FUNCION", "METODO", "OBJETO",
    "CLASE", "INTERFAZ", "HERENCIA", "POLIMORFISMO", "ENCAPSULAMIENTO"
];
const MAX_INTENTOS = 5;

let palabraSecreta;
let palabraGuionada;
let jugadorActual = 1;
let intentosRestantes = MAX_INTENTOS;
let puntaje = 0;

function iniciarJuego() {
    palabraSecreta = PALABRAS[Math.floor(Math.random() * PALABRAS.length)];
    palabraGuionada = "_".repeat(palabraSecreta.length).split("");
    jugadorActual = 1;
    intentosRestantes = MAX_INTENTOS;
    puntaje = 0;
    actualizarPantalla();
}

function actualizarPantalla() {
    document.getElementById("palabraGuionada").innerText = palabraGuionada.join(" ");
    document.getElementById("jugadorActual").innerText = jugadorActual;
    document.getElementById("intentosRestantes").innerText = intentosRestantes;
    document.getElementById("puntaje").innerText = puntaje;
    document.getElementById("ahorcado").innerText = mostrarAhorcado(MAX_INTENTOS - intentosRestantes);
}

function adivinarLetra() {
    const letra = document.getElementById("letraInput").value.toUpperCase();
    if (letra.length === 1 && /^[A-Z]$/.test(letra)) {
        let letraCorrecta = false;
        for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
                palabraGuionada[i] = letra;
                letraCorrecta = true;
            }
        }
        if (letraCorrecta) {
            puntaje += 10;
        } else {
            intentosRestantes--;
            puntaje = Math.max(puntaje - 5, 0);
        }
        actualizarPantalla();
        verificarEstadoJuego();
    }
    document.getElementById("letraInput").value = "";
}

function verificarEstadoJuego() {
    if (intentosRestantes === 0) {
        alert(`El juego ha terminado. La palabra era: ${palabraSecreta}`);
        reiniciarJuego();
    } else if (!palabraGuionada.includes("_")) {
        alert(`¡Felicidades! Has adivinado la palabra: ${palabraSecreta}`);
        reiniciarJuego();
    }
}

function reiniciarJuego() {
    iniciarJuego();
}

function mostrarAhorcado(intentos) {
    switch (intentos) {
        case 1:
            return `
            +---+
            |   |
            O   |
            |   |
                |
                |
            =====`;
        case 2:
            return `
            +---+
            |   |
            O   |
           /|   |
                |
                |
            =====`;
        case 3:
            return `
            +---+
            |   |
            O   |
           /|\\ |
                |
                |
            =====`;
        case 4:
            return `
            +---+
            |   |
            O   |
           /|\\ |
           / \\ |
                |
            =====`;
        case 5:
            return `
            +---+
            |   |
            O   |
           /|\\ |
           /    |
                |
            =====`;
        case 6:
            return `
            +---+
            |   |
            O   |
           /|\\ |
           / \\ |
                |
            =====`;
        default:
            return "";
    }
}

document.addEventListener("DOMContentLoaded", iniciarJuego);

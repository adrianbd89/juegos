class TableroView {
    constructor(filas, columnas) {
        this.crearTablero(filas, columnas);
    }

    crearTablero(filas, columnas) {
        const tablero = document.getElementById("wordle-tablero");
        const anchoDisponible = this.calcularAnchoDisponible(tablero);
        const gap = anchoDisponible <= 360 ? 4 : 6;
        const tamanoCasilla = Math.max(
            32,
            Math.min(60, Math.floor((anchoDisponible - gap * (columnas - 1)) / columnas))
        );

        tablero.innerHTML = "";
        tablero.style.setProperty("--wordle-gap", `${gap}px`);

        for (let i = 0; i < filas; i++) {
            const fila = document.createElement("div");
            fila.classList.add("wordle-fila");
            fila.style.gridTemplateColumns = `repeat(${columnas}, minmax(0, ${tamanoCasilla}px))`;
            fila.style.gap = `${gap}px`;

            for (let j = 0; j < columnas; j++) {
                const casilla = document.createElement("div");
                casilla.classList.add("wordle-casilla");
                casilla.style.width = `${tamanoCasilla}px`;
                casilla.style.height = `${tamanoCasilla}px`;
                fila.appendChild(casilla);
            }

            tablero.appendChild(fila);
        }
    }

    calcularAnchoDisponible(tablero) {
        const contenido = document.getElementById("contenido");
        const referencia = contenido || tablero.parentElement || tablero;
        const ancho = referencia ? referencia.clientWidth : window.innerWidth;

        return Math.max(220, ancho - 48);
    }

    actualizarFila(filaIndex, letras) {
        const fila = document.querySelectorAll(".wordle-fila")[filaIndex].children;
        for (let i = 0; i < letras.length; i++) {
            fila[i].textContent = letras[i];
            fila[i].style.background = "";
        }
    }

    pintarFila(filaIndex, estados) {
        const fila = document.querySelectorAll(".wordle-fila")[filaIndex].children;

        for (let i = 0; i < estados.length; i++) {
            if (estados[i] === "verde") {
                fila[i].style.background = "#6aaa64";
            } else if (estados[i] === "naranja") {
                fila[i].style.background = "#c9b458";
            } else {
                fila[i].style.background = "#787c7e";
            }
        }
    }

    limpiarTablero() {
        const filasHTML = document.querySelectorAll(".wordle-fila");
        filasHTML.forEach((fila) => {
            Array.from(fila.children).forEach((casilla) => {
                casilla.textContent = "";
                casilla.style.background = "";
            });
        });
    }
}

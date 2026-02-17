class Tablero{

    constructor(filas, columnas){
        this.tableroLogico = Array.from({ length: filas }, () => Array(columnas).fill(''));
        this.crearTablero(filas, columnas);
    }

    crearTablero(filas, columnas) {
        const tablero = document.getElementById("wordle-tablero");
        tablero.innerHTML = "";
        for (let i = 0; i < filas; i++) {
            const fila = document.createElement("div");
            fila.classList.add("wordle-fila");
            // Ajustar dinámicamente el número de columnas para aceptar palabras de distinta longitud
            fila.style.gridTemplateColumns = `repeat(${columnas}, 60px)`;
            for (let j = 0; j < columnas; j++) {
                const casilla = document.createElement("div");
                casilla.classList.add("wordle-casilla");
                fila.appendChild(casilla);
            }
            tablero.appendChild(fila);
        }
    }

    getTableroLogico(fila, columna){
        return this.tableroLogico[fila][columna];
    }

    getFilaTableroLogico(fila){
        return this.tableroLogico[fila];
    }

    updateTableroLogico(fila, columna, nuevoValor){
        this.tableroLogico[fila][columna] = nuevoValor;
    }

    actualizarFila(intentoActual, columna) {
        const fila = document.querySelectorAll(".wordle-fila")[intentoActual].children;
        for (let i = 0; i < columna; i++) {
            fila[i].textContent = this.getTableroLogico(intentoActual, i);
            fila[i].style.background = "";
        }
    }

    limpiarTablero(){
        this.tableroLogico = this.tableroLogico.map(fila => fila.map(() => ''));

        const filasHTML = document.querySelectorAll(".wordle-fila");
        filasHTML.forEach(fila => {
            Array.from(fila.children).forEach(casilla => {
                casilla.textContent = '';
                casilla.style.background = '';
            });
        });
    }
}
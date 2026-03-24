class PuzzleGame {
    constructor(contenedorId, imagenes, statusView, onVictory) {
        this.contenedor = document.getElementById(contenedorId);
        this.imagenes = imagenes;
        this.statusView = statusView;
        this.onVictory = onVictory;
        this.resuelto = false;
        this.iniciar();
    }

    iniciar() {
        this.resuelto = false;
        this.imagenActual = this.imagenes[Math.floor(Math.random() * this.imagenes.length)];
        this.tablero = [...Array(15).keys()];
        this.tablero.push(null);
        this.tablero.sort(() => Math.random() - 0.5);
        this.vaciaIndex = this.tablero.indexOf(null);

        this.contenedor.innerHTML = `
            <h2>Ordena la imagen</h2>
            <p class="subtexto-juego">Mueve las piezas hasta recomponer la foto completa.</p>
            <div class="juego-superficie puzzle-superficie">
                <div id="tablero"></div>
            </div>
            <p id="mensaje-puzzle" class="mensaje-juego"></p>
        `;
        this.statusView.clear();
        this.dibujar();
    }

    dibujar() {
        const contenedorTablero = document.getElementById("tablero");
        const piezaSize =
            parseFloat(getComputedStyle(contenedorTablero).getPropertyValue("--puzzle-piece-size")) || 84;

        contenedorTablero.innerHTML = "";

        this.tablero.forEach((valor, index) => {
            const div = document.createElement("div");

            if (valor === null) {
                div.classList.add("pieza", "vacia");
            } else {
                div.classList.add("pieza");
                const x = (valor % 4) * piezaSize;
                const y = Math.floor(valor / 4) * piezaSize;
                div.style.backgroundImage = `url(${this.imagenActual})`;
                div.style.backgroundPosition = `-${x}px -${y}px`;
                div.style.backgroundSize = `${piezaSize * 4}px ${piezaSize * 4}px`;
            }

            div.addEventListener("click", () => this.mover(index));
            contenedorTablero.appendChild(div);
        });
    }

    mover(index) {
        if (this.resuelto) return;

        const filaVacia = Math.floor(this.vaciaIndex / 4);
        const colVacia = this.vaciaIndex % 4;
        const filaClick = Math.floor(index / 4);
        const colClick = index % 4;

        const esAdyacente =
            (filaVacia === filaClick && Math.abs(colVacia - colClick) === 1) ||
            (colVacia === colClick && Math.abs(filaVacia - filaClick) === 1);

        if (esAdyacente) {
            [this.tablero[this.vaciaIndex], this.tablero[index]] =
                [this.tablero[index], this.tablero[this.vaciaIndex]];
            this.vaciaIndex = index;
            this.dibujar();
            this.comprobarVictoria();
        }
    }

    comprobarVictoria() {
        for (let i = 0; i < 15; i++) {
            if (this.tablero[i] !== i) return;
        }

        this.resuelto = true;
        this.statusView.showVictory();
        if (this.onVictory) {
            this.onVictory("#tablero", {
                colors: ["#ff5f9e", "#ff8fab", "#ffd166", "#fff4f7"],
                duration: 2200
            });
        }
    }
}

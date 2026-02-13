class Puzzle {
    constructor(contenedorId, imagenes) {
        this.contenedor = document.getElementById(contenedorId);
        this.imagenes = imagenes;
        this.iniciar();
    }

    iniciar() {
        this.imagenActual = this.imagenes[Math.floor(Math.random() * this.imagenes.length)];
        this.tablero = [...Array(15).keys()];
        this.tablero.push(null);
        this.tablero.sort(() => Math.random() - 0.5);
        this.vaciaIndex = this.tablero.indexOf(null);

        this.contenedor.innerHTML = `
            <h2>Ordena la imagen 🧩</h2>
            <div id="tablero"></div>
        `;
        this.dibujar();
    }

    dibujar() {
        const contenedorTablero = document.getElementById("tablero");
        contenedorTablero.innerHTML = "";

        this.tablero.forEach((valor, index) => {
            const div = document.createElement("div");

            if (valor === null) {
                div.classList.add("pieza", "vacia");
            } else {
                div.classList.add("pieza");
                const x = (valor % 4) * 80;
                const y = Math.floor(valor / 4) * 80;
                div.style.backgroundImage = `url(${this.imagenActual})`;
                div.style.backgroundPosition = `-${x}px -${y}px`;
            }

            div.addEventListener("click", () => this.mover(index));
            contenedorTablero.appendChild(div);
        });
    }

    mover(index) {
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
        this.contenedor.innerHTML += `
            <h3 style="margin-top:20px;">💖 ¡Lo has conseguido! 💖</h3>
        `;
    }
}

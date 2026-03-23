class TecladoController {

    constructor(contenedor, palabraSecreta) {
        this.contenedor = contenedor;
        this.palabraSecreta = palabraSecreta;

        this.columnas = this.palabraSecreta.length;
        this.filas = Math.min(6, this.columnas + 1);

        this.inicializarJuego();
        this.registrarListeners();
    }

    inicializarJuego() {
        this.intentoActual = 0;
        this.letraActual = 0;

        this.tablero = new Tablero(this.filas, this.columnas);
        this.teclado = new Teclado(this.contenedor);
    }

    registrarListeners() {
        if (!this.listenerRegistrado) {
            document.addEventListener("keydown", (e) => this.teclear(e));
            this.listenerRegistrado = true;
        }

        if (!this.listenerTeclasVisualesRegistrado) {
            this.contenedor.addEventListener("teclaPresionada", (e) => this.teclear({ key: e.detail }));
            this.listenerTeclasVisualesRegistrado = true;
        }
    }

    vistaRenderizada() {
        return Boolean(
            document.getElementById("wordle-tablero") &&
            document.getElementById("wordle-teclado")
        );
    }

    teclear(e) {
        const key = e.key.toUpperCase();
        if (this.intentoActual >= this.filas) return;

        if (key === "BACKSPACE") {
            if (this.letraActual > 0) {
                this.letraActual--;
                this.tablero.updateTableroLogico(this.intentoActual, this.letraActual, "");
                this.tablero.actualizarFila(this.intentoActual, this.columnas);
            }
        } else if (key === "ENTER") {
            if (this.letraActual === this.columnas) {
                this.validarIntento();
            }
        } else if (/^[A-Z]$/.test(key)) {
            if (this.letraActual < this.columnas) {
                this.tablero.updateTableroLogico(this.intentoActual, this.letraActual, key);
                this.letraActual++;
                this.tablero.actualizarFila(this.intentoActual, this.columnas);
            }
        }
    }

    validarIntento() {
        const fila = document.querySelectorAll(".wordle-fila")[this.intentoActual].children;
        const intento = this.tablero.getFilaTableroLogico(this.intentoActual).join("");
        const palabra = this.palabraSecreta.split("");
        const estado = Array(this.columnas).fill("gris");

        this.pintar(intento, palabra, estado, fila);

        if (intento === this.palabraSecreta) {
            this.victoria();
            return;
        }

        this.intentoActual++;
        this.letraActual = 0;

        if (this.intentoActual === this.filas) {
            document.getElementById("mensaje-wordle").textContent = `La palabra era: ${this.palabraSecreta}`;
        }
    }

    pintar(intento, palabra, estado, fila) {
        for (let i = 0; i < this.columnas; i++) {
            if (intento[i] === palabra[i]) {
                estado[i] = "verde";
                palabra[i] = null;
            }
        }

        for (let i = 0; i < this.columnas; i++) {
            if (estado[i] === "gris" && palabra.includes(intento[i])) {
                estado[i] = "naranja";
                palabra[palabra.indexOf(intento[i])] = null;
            }
        }

        for (let i = 0; i < this.columnas; i++) {
            if (estado[i] === "verde") {
                fila[i].style.background = "#6aaa64";
                this.teclado.actualizarTecla(intento[i], "verde");
            } else if (estado[i] === "naranja") {
                fila[i].style.background = "#c9b458";
                this.teclado.actualizarTecla(intento[i], "naranja");
            } else {
                fila[i].style.background = "#787c7e";
                this.teclado.actualizarTecla(intento[i], "gris");
            }
        }
    }

    victoria() {
        document.getElementById("mensaje-wordle").textContent = "Lo adivinaste 💖";

        if (window.app) {
            window.app.reproducirVictoria("#wordle-tablero", {
                colors: ["#6aaa64", "#c9b458", "#ff8fab", "#ffffff"],
                duration: 2000
            });
        }

        this.intentoActual = this.filas;
    }

    reset() {
        if (!this.vistaRenderizada()) {
            this.inicializarJuego();
            return;
        }

        this.intentoActual = 0;
        this.letraActual = 0;

        this.tablero.limpiarTablero();
        this.teclado.limpiarTeclado();
    }
}

class WordleController {
    constructor(contenedor, game, statusView, onVictory, metadata = {}) {
        this.contenedor = contenedor;
        this.game = game;
        this.statusView = statusView;
        this.onVictory = onVictory;
        this.metadata = metadata;

        this.inicializarJuego();
        WordleController.instanciaActiva = this;
        this.registrarListenersGlobales();
    }

    inicializarJuego() {
        this.tablero = new TableroView(this.game.getFilas(), this.game.getColumnas());
        this.teclado = new TecladoView(this.contenedor);
    }

    registrarListenersGlobales() {
        if (!WordleController.listenerTecladoRegistrado) {
            document.addEventListener("keydown", (e) => {
                if (WordleController.instanciaActiva) {
                    WordleController.instanciaActiva.teclear(e);
                }
            });
            WordleController.listenerTecladoRegistrado = true;
        }

        if (!WordleController.listenerTeclasVisualesRegistrado) {
            this.contenedor.addEventListener("teclaPresionada", (e) => {
                if (WordleController.instanciaActiva) {
                    WordleController.instanciaActiva.teclear({ key: e.detail });
                }
            });
            WordleController.listenerTeclasVisualesRegistrado = true;
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
        if (!this.game.puedeEscribir()) return;

        if (key === "BACKSPACE") {
            if (this.game.borrarLetra()) {
                this.renderFilaActual();
            }
        } else if (key === "ENTER") {
            if (this.game.puedeEnviarIntento()) {
                this.validarIntento();
            }
        } else if (/^[A-Z]$/.test(key)) {
            if (this.game.insertarLetra(key)) {
                this.renderFilaActual();
            }
        }
    }

    validarIntento() {
        const resultado = this.game.enviarIntento();
        if (!resultado) return;

        this.tablero.pintarFila(resultado.filaIndex, resultado.estados);
        this.pintarTeclado(resultado.intento, resultado.estados);

        if (resultado.ganado) {
            this.victoria();
            return;
        }

        if (resultado.terminado) {
            this.statusView.showDefeat(resultado.palabraSecreta, this.metadata.definicion);
        }
    }

    pintarTeclado(intento, estados) {
        for (let i = 0; i < estados.length; i++) {
            this.teclado.actualizarTecla(intento[i], estados[i]);
        }
    }

    victoria() {
        this.statusView.showVictory(this.metadata.definicion);
        if (this.onVictory) {
            this.onVictory("#wordle-tablero", {
                colors: ["#6aaa64", "#c9b458", "#7ad7a6", "#ffffff"],
                duration: 2000
            });
        }
    }

    reset() {
        if (!this.vistaRenderizada()) {
            this.inicializarJuego();
            return;
        }

        this.game.reset();
        this.tablero.limpiarTablero();
        this.teclado.limpiarTeclado();
        this.statusView.clear();
    }

    renderFilaActual() {
        const filaIndex = this.game.getFilaActualIndex();
        this.tablero.actualizarFila(filaIndex, this.game.getFila(filaIndex));
    }
}

WordleController.instanciaActiva = null;
WordleController.listenerTecladoRegistrado = false;
WordleController.listenerTeclasVisualesRegistrado = false;

class WordleScreen {
    constructor(contenedorId, onVictory) {
        this.contenedor = document.getElementById(contenedorId);
        this.onVictory = onVictory;
        this.controller = null;
        this.statusView = new WordleStatusView();
        this.modoActual = "normal";
        this.listenerModoRegistrado = false;
    }

    generarHTMLbase() {
        const modos = Object.values(PalabraDia.getModosDisponibles());
        const botonesModo = modos.map((modo) => `
            <button
                type="button"
                class="wordle-mode-button${modo.id === this.modoActual ? " activo" : ""}"
                data-wordle-mode="${modo.id}"
                aria-pressed="${modo.id === this.modoActual}"
            >
                <span class="wordle-mode-button-emoji">${modo.emoji}</span>
                <span>${modo.etiqueta}</span>
            </button>
        `).join("");

        const modo = PalabraDia.getModosDisponibles()[this.modoActual];

        this.contenedor.innerHTML = `
            <div class="wordle-toolbar">
                ${botonesModo}
            </div>
            <h2>Wordle</h2>
            <p class="subtexto-juego">${modo.descripcion}</p>
            <div class="juego-superficie wordle-superficie">
                <div id="wordle-tablero" class="wordle-tablero"></div>
            </div>
            <p id="mensaje-wordle" class="mensaje-juego"></p>
        `;
    }

    inicializar() {
        this.aplicarTema();
        this.generarHTMLbase();
        this.registrarListenerModos();
        this.iniciarPartida();
    }

    iniciarPartida() {
        const palabra = PalabraDia.getPalabraDelDia(this.modoActual);
        const definicion = PalabraDia.getDefinicionDelDia(this.modoActual);
        const game = new WordleGame(palabra);
        this.controller = new WordleController(this.contenedor, game, this.statusView, this.onVictory, {
            definicion
        });
        this.statusView.clear();
        this.actualizarBotonesModo();
    }

    registrarListenerModos() {
        if (this.listenerModoRegistrado) {
            return;
        }

        this.contenedor.addEventListener("click", (event) => {
            const botonModo = event.target.closest("[data-wordle-mode]");
            if (!botonModo) {
                return;
            }

            this.cambiarModo(botonModo.dataset.wordleMode);
        });

        this.listenerModoRegistrado = true;
    }

    actualizarBotonesModo() {
        const botones = this.contenedor.querySelectorAll("[data-wordle-mode]");
        botones.forEach((boton) => {
            const estaActivo = boton.dataset.wordleMode === this.modoActual;
            boton.classList.toggle("activo", estaActivo);
            boton.setAttribute("aria-pressed", estaActivo);
        });
    }

    aplicarTema() {
        document.body.classList.toggle("theme-quimica", this.modoActual === "quimica");
    }

    limpiarTema() {
        document.body.classList.remove("theme-quimica");
    }

    cambiarModo(modo) {
        if (!PalabraDia.cambiarModo(modo)) {
            return;
        }

        this.modoActual = modo;
        this.inicializar();
    }

    reiniciar() {
        PalabraDia.reiniciarPalabra();
        this.inicializar();
    }

    clear() {
        this.modoActual = "normal";
        PalabraDia.cambiarModo("normal");
        this.reiniciar();
    }
}

class WordleScreen {
    constructor(contenedorId, onVictory) {
        this.contenedor = document.getElementById(contenedorId);
        this.onVictory = onVictory;
        this.controller = null;
        this.statusView = new WordleStatusView();
    }

    generarHTMLbase() {
        this.contenedor.innerHTML = `
            <h2>Wordle</h2>
            <p class="subtexto-juego">Adivina la palabra del dia antes de quedarte sin intentos.</p>
            <div class="juego-superficie wordle-superficie">
                <div id="wordle-tablero" class="wordle-tablero"></div>
            </div>
            <p id="mensaje-wordle" class="mensaje-juego"></p>
        `;
    }

    inicializar() {
        this.generarHTMLbase();
        const palabra = PalabraDia.getPalabraDelDia();
        const game = new WordleGame(palabra);
        this.controller = new WordleController(this.contenedor, game, this.statusView, this.onVictory);
        this.statusView.clear();
    }

    reiniciar() {
        if (!this.controller) return;

        this.controller.reset();
    }

    clear() {
        const h2 = document.getElementById("contenido").querySelector("h2");
        const estamosFueraDeWordle = !h2 || !h2.textContent.includes("Wordle");

        if (estamosFueraDeWordle || !this.controller) {
            PalabraDia.reiniciarPalabra();
            this.inicializar();
        } else {
            this.reiniciar();
        }
    }
}

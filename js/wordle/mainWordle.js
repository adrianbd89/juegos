/* La aplicacion puede dar el problema de que al dar al intro se ejecute
el ultimo sitio que se clico, como puede ser el enlace, y por eso puede
tener comportamientos raros. Hay que tener cuidado con eso. */

class MainWordle {

    constructor(contenedorId) {
        this.contenedor = document.getElementById(contenedorId);
        this.controller = null;
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

    mostrarEstado(mensaje) {
        const mensajeWordle = document.getElementById("mensaje-wordle");
        if (mensajeWordle) {
            mensajeWordle.textContent = mensaje;
        }
    }

    inicializar() {
        this.generarHTMLbase();
        const palabra = PalabraDia.getPalabraDelDia();
        this.controller = new TecladoController(this.contenedor, palabra);
        this.mostrarEstado("");
    }

    reiniciar() {
        if (!this.controller) return;

        this.controller.reset();
        this.mostrarEstado("");
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

class TecladoController{

    constructor(contenedor){
        this.intentoActual = 0;
        this.letraActual = 0;

        this.palabraSecreta = PalabraDia.getPalabraDelDia(); //selecciona la palabra del dia

        this.columnas = this.palabraSecreta.length;
        this.filas = Math.min(6, this.columnas + 1); //por si la palabra es muy corta

        // Crear tablero visual
        this.tablero = new Tablero(this.filas, this.columnas);
        this.teclado = new Teclado(contenedor);

        this.registrarListeners(contenedor);
    }

    registrarListeners(contenedor) {
        if (!this.listenerRegistrado) {
            document.addEventListener("keydown", (e) => this.teclear(e));
            this.listenerRegistrado = true;
        }

        // Registrar listener de teclado visual solo una vez
        if (!this.listenerTeclasVisualesRegistrado) {
            contenedor.addEventListener("teclaPresionada", e => this.teclear({ key: e.detail }));
            this.listenerTeclasVisualesRegistrado = true;
        }
    }

    teclear(e) {
        const key = e.key.toUpperCase();
        if (this.intentoActual >= this.filas) return;

        if (key === "BACKSPACE") {
            if (this.letraActual > 0) {
                this.letraActual--;
                this.tablero.updateTableroLogico(this.intentoActual, this.letraActual, '');
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
        const intento = this.tablero.getFilaTableroLogico(this.intentoActual).join('');
        const palabra = this.palabraSecreta.split('');
        const estado = Array(this.columnas).fill('gris');
        // marca casillas Verde primero
        this.pintar(intento, palabra, estado, fila);

        if (intento === this.palabraSecreta) {
            document.getElementById("mensaje-wordle").textContent = "💖 ¡Lo adivinaste! 💖";
            this.intentoActual = this.filas;
            return;
        }

        this.intentoActual++;
        this.letraActual = 0;

        if (this.intentoActual === this.filas) {
            document.getElementById("mensaje-wordle").textContent = `😢 La palabra era: ${this.palabraSecreta}`;
        }
    }

    pintar(intento, palabra, estado, fila) {
        for (let i = 0; i < this.columnas; i++) {
            if (intento[i] === palabra[i]) {
                estado[i] = 'verde';
                palabra[i] = null;
            }
        }

        // ,marca casillas Naranja luego
        for (let i = 0; i < this.columnas; i++) {
            if (estado[i] === 'gris' && palabra.includes(intento[i])) {
                estado[i] = 'naranja';
                palabra[palabra.indexOf(intento[i])] = null;
            }
        }

        // Pintar
        // Pintar tablero + actualizar teclado
        for (let i = 0; i < this.columnas; i++) {

            if (estado[i] === 'verde') {
                fila[i].style.background = '#6aaa64';
                this.teclado.actualizarTecla(intento[i], "verde");

            } else if (estado[i] === 'naranja') {
                fila[i].style.background = '#c9b458';
                this.teclado.actualizarTecla(intento[i], "naranja");

            } else {
                fila[i].style.background = '#787c7e';
                this.teclado.actualizarTecla(intento[i], "gris");
            }
        }
    }

    reset(){
        this.intentoActual = 0;
        this.letraActual = 0;

        // Limpiar tablero y teclado visual
        this.tablero.limpiarTablero();
        this.teclado.limpiarTeclado(); 
    }
}
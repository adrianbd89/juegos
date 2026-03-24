class WordleGame {
    constructor(palabraSecreta) {
        this.palabraSecreta = palabraSecreta;
        this.columnas = this.palabraSecreta.length;
        this.filas = Math.min(6, this.columnas + 1);
        this.reset();
    }

    reset() {
        this.intentoActual = 0;
        this.letraActual = 0;
        this.terminado = false;
        this.ganado = false;
        this.tablero = Array.from({ length: this.filas }, () => Array(this.columnas).fill(""));
    }

    puedeEscribir() {
        return !this.terminado && this.intentoActual < this.filas;
    }

    insertarLetra(letra) {
        if (!this.puedeEscribir() || this.letraActual >= this.columnas) {
            return false;
        }

        this.tablero[this.intentoActual][this.letraActual] = letra;
        this.letraActual++;
        return true;
    }

    borrarLetra() {
        if (!this.puedeEscribir() || this.letraActual <= 0) {
            return false;
        }

        this.letraActual--;
        this.tablero[this.intentoActual][this.letraActual] = "";
        return true;
    }

    puedeEnviarIntento() {
        return this.puedeEscribir() && this.letraActual === this.columnas;
    }

    enviarIntento() {
        if (!this.puedeEnviarIntento()) {
            return null;
        }

        const filaIndex = this.intentoActual;
        const intento = this.getFila(filaIndex).join("");
        const estados = this.calcularEstadoIntento(intento);

        if (intento === this.palabraSecreta) {
            this.ganado = true;
            this.terminado = true;
        } else {
            this.intentoActual++;
            this.letraActual = 0;

            if (this.intentoActual === this.filas) {
                this.terminado = true;
            }
        }

        return {
            filaIndex,
            intento,
            estados,
            ganado: this.ganado,
            terminado: this.terminado,
            palabraSecreta: this.palabraSecreta
        };
    }

    calcularEstadoIntento(intento) {
        const palabra = this.palabraSecreta.split("");
        const estado = Array(this.columnas).fill("gris");

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

        return estado;
    }

    getFila(filaIndex) {
        return this.tablero[filaIndex];
    }

    getFilaActualIndex() {
        return this.intentoActual;
    }

    getColumnas() {
        return this.columnas;
    }

    getFilas() {
        return this.filas;
    }
}

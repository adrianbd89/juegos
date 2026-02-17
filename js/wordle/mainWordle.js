/* La aplicación puede dar el problema de qeu al dar al intro se ejecute el ultimo sitio que se clicó
como puede ser el enlace y por eso puede tener comportamientos raros hay que tener cuidado con eso */


class MainWordle {
    
    constructor(contenedorId) {
        this.contenedor = document.getElementById(contenedorId);

        // Crear HTML si no existe
        this.generarHTMLbase();

        this.controller = new TecladoController(this.contenedor);

        
        this.cer();
    }

    async cer(){
        Diccionario.comprobarPalabra();
    }


    generarHTMLbase() {
        if (!document.getElementById("wordle-tablero")) {
            this.contenedor.innerHTML = `
                <h2>Wordle 💌</h2>
                <div id="wordle-tablero" class="wordle-tablero"></div>
                <p id="mensaje-wordle"></p>
            `;
        }
    }

    reiniciar() {
        this.controller.reset();

        // Limpiar mensaje
        const mensaje = document.getElementById("mensaje-wordle");
        mensaje.textContent = '';
    }
    
    clear() {
        this.reiniciar();
        //Comprobar si estamos en otra página y tenemos que generar otra vez todo o solo hacía falta limpiar
        const h2 = document.getElementById("contenido").querySelector("h2");
        if (h2 && !h2.textContent.includes("Wordle")) {//Comprueba además si hay h2 para evitar errores
            this.generarHTMLbase();
        }
    }
}
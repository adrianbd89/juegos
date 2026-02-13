/* La aplicación puede dar el problema de qeu al dar al intro se ejecute el ultimo sitio que se clicó
como puede ser el enlace y por eso puede tener comportamientos raros hay que tener cuidado con eso */


class Wordle {
    constructor(contenedorId) {
        this.contenedor = document.getElementById(contenedorId);

        this.palabras = [
            "AMOR", "GUAPA", "PANCHO", "ROMANO", "MONTE", "STALIN",
            "DIOSA", "LUCES", "ARGENTO", "DULCE", "FELIZ", "DURU",
            "UNIONES", "NIGGER", "ALMA", "CIELO", "SUEÑO", "BUTWHY",
            "RAYOS", "HOLOCUENTO", "PROBETA", "JUDIO", "VUELA", "NEGRO",
            "MIMOS", "JULIA", "QUIMICA", "JUDIADA", "BOMBA", "CIELO"
        ];

        this.seleccionarPalabra(); //selecciona la palabra y marca las columnas del tablero
        this.filas = Math.max(6, this.columnas + 1); //por si la palabra es muy corta

        this.iniciar(); // Inserta HTML y crea tablero, registra listener
        this.inicializar(); // Reinicia variables y tablero
    }

    iniciar() {
        // Crear HTML si no existe
        if (!document.getElementById("wordle-tablero")) {
            this.contenedor.innerHTML = `
                <h2>Wordle 💌</h2>
                <div id="wordle-tablero" class="wordle-tablero"></div>
                <p id="mensaje-wordle"></p>
            `;
        }

        // Registrar listener solo una vez
        if (!this.listenerRegistrado) {
            document.addEventListener("keydown", (e) => this.teclear(e));
            this.listenerRegistrado = true;
        }

        // Crear tablero visual
        this.crearTablero();
        this.crearTeclado();
    }

    inicializar() {
        this.intentoActual = 0;
        this.letraActual = 0;
        this.tablero = Array.from({ length: this.filas }, () => Array(this.columnas).fill(''));

        // Limpiar mensaje
        const mensaje = document.getElementById("mensaje-wordle");
        if (mensaje) mensaje.textContent = '';

        // Limpiar tablero visual
        const filasHTML = document.querySelectorAll(".wordle-fila");
        filasHTML.forEach(fila => {
            Array.from(fila.children).forEach(casilla => {
                casilla.textContent = '';
                casilla.style.background = '';
            });
        });
    }

    seleccionarPalabra() {
        const dia = new Date().getDate();
        const indice = (dia - 1) % this.palabras.length;
        this.palabraSecreta = this.palabras[indice].toUpperCase();
        this.columnas = this.palabraSecreta.length;
        console.log("Palabra de hoy:", this.palabraSecreta);
    }

    crearTablero() {
        const tablero = document.getElementById("wordle-tablero");
        tablero.innerHTML = "";
        for (let i = 0; i < this.filas; i++) {
            const fila = document.createElement("div");
            fila.classList.add("wordle-fila");
            // Ajustar dinámicamente el número de columnas para aceptar palabras de distinta longitud
            fila.style.gridTemplateColumns = `repeat(${this.columnas}, 60px)`;
            for (let j = 0; j < this.columnas; j++) {
                const casilla = document.createElement("div");
                casilla.classList.add("wordle-casilla");
                fila.appendChild(casilla);
            }
            tablero.appendChild(fila);
        }
    }

    crearTeclado() {
        // Revisamos si ya existe y lo limpiamos
        let contTeclado = document.getElementById("wordle-teclado");
        if (!contTeclado) {
            contTeclado = document.createElement("div");
            contTeclado.id = "wordle-teclado";
            contTeclado.classList.add("wordle-teclado");
            this.contenedor.appendChild(contTeclado);
        }
        contTeclado.innerHTML = ""; // limpiar si existe

        const filasTeclado = [
            ["Q","W","E","R","T","Y","U","I","O","P"],
            ["A","S","D","F","G","H","J","K","L"],
            ["ENTER","Z","X","C","V","B","N","M","BACK"]
        ];

        filasTeclado.forEach(fila => {
            const filaDiv = document.createElement("div");
            filaDiv.classList.add("teclado-fila");
            fila.forEach(tecla => {
                const teclaDiv = document.createElement("div");
                teclaDiv.classList.add("tecla");
                teclaDiv.textContent = tecla;
                teclaDiv.addEventListener("click", () => {
                    if (tecla === "ENTER") this.teclear({key: "Enter"});
                    else if (tecla === "BACK") this.teclear({key: "Backspace"});
                    else this.teclear({key: tecla});
                });
                filaDiv.appendChild(teclaDiv);
            });
            contTeclado.appendChild(filaDiv);
        });
    }


    teclear(e) {
        const key = e.key.toUpperCase();
        if (this.intentoActual >= this.filas) return;

        if (key === "BACKSPACE") {
            if (this.letraActual > 0) {
                this.letraActual--;
                this.tablero[this.intentoActual][this.letraActual] = '';
                this.actualizarFila();
            }
        } else if (key === "ENTER") {
            if (this.letraActual === this.columnas) {
                this.validarIntento();
            }
        } else if (/^[A-Z]$/.test(key)) {
            if (this.letraActual < this.columnas) {
                this.tablero[this.intentoActual][this.letraActual] = key;
                this.letraActual++;
                this.actualizarFila();
            }
        }
    }

    actualizarFila() {
        const fila = document.querySelectorAll(".wordle-fila")[this.intentoActual].children;
        for (let i = 0; i < this.columnas; i++) {
            fila[i].textContent = this.tablero[this.intentoActual][i];
            fila[i].style.background = "";
        }
    }

    validarIntento() {
        const fila = document.querySelectorAll(".wordle-fila")[this.intentoActual].children;
        const intento = this.tablero[this.intentoActual].join('');
        const palabra = this.palabraSecreta.split('');
        const estado = Array(this.columnas).fill('gris');
        // marca casillas Verde primero
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
        for (let i = 0; i < this.columnas; i++) {
            if (estado[i] === 'verde') fila[i].style.background = '#6aaa64';
            else if (estado[i] === 'naranja') fila[i].style.background = '#c9b458';
            else fila[i].style.background = '#787c7e';
        }

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

    clear() {
        this.inicializar();
        //Comprobar si estamos en otra página y tenemos que generar otra vez todo o solo hacía falta limpiar
        const h2 = document.getElementById("contenido").querySelector("h2");
        if (h2 && !h2.textContent.includes("Wordle")) {//Comprueba además si hay h2 para evitar errores
            this.iniciar();
        }
    }
}
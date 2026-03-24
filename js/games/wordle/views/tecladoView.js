class TecladoView {
    constructor(contenedor) {
        this.filasTeclado = [
            ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
            ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
            ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"]
        ];
        this.estadoTeclas = {};
        this.crearTeclado(contenedor);
    }

    crearTeclado(contenedor) {
        let contTeclado = document.getElementById("wordle-teclado");
        if (!contTeclado) {
            contTeclado = document.createElement("div");
            contTeclado.id = "wordle-teclado";
            contTeclado.classList.add("wordle-teclado");
            contenedor.appendChild(contTeclado);
        }

        contTeclado.innerHTML = "";

        this.filasTeclado.forEach((fila) => {
            const filaDiv = document.createElement("div");
            filaDiv.classList.add("teclado-fila");

            fila.forEach((tecla) => {
                const teclaDiv = document.createElement("div");
                teclaDiv.classList.add("tecla");

                if (tecla === "ENTER" || tecla === "BACK") {
                    teclaDiv.classList.add("tecla-accion");
                    teclaDiv.textContent = this.obtenerEtiquetaAccion(tecla);
                    teclaDiv.setAttribute("aria-label", tecla === "ENTER" ? "Enter" : "Borrar");
                } else {
                    teclaDiv.textContent = tecla;
                }

                teclaDiv.addEventListener("click", () => {
                    const key = tecla === "ENTER" ? "Enter" : tecla === "BACK" ? "Backspace" : tecla;
                    contenedor.dispatchEvent(new CustomEvent("teclaPresionada", { detail: key }));
                });

                filaDiv.appendChild(teclaDiv);
            });

            contTeclado.appendChild(filaDiv);
        });
    }

    obtenerEtiquetaAccion(tecla) {
        const esMovil = window.matchMedia("(max-width: 480px)").matches;

        if (!esMovil) {
            return tecla;
        }

        return tecla === "ENTER" ? "→" : "←";
    }

    actualizarTecla(letra, nuevoEstado) {
        const tecla = Array.from(document.querySelectorAll(".tecla")).find((t) => t.textContent === letra);

        if (!tecla) return;

        const prioridad = {
            gris: 1,
            naranja: 2,
            verde: 3
        };

        const estadoActual = this.estadoTeclas[letra];

        if (!estadoActual || prioridad[nuevoEstado] > prioridad[estadoActual]) {
            this.estadoTeclas[letra] = nuevoEstado;

            if (nuevoEstado === "verde") {
                tecla.style.background = "#6aaa64";
                tecla.style.color = "#fff";
            } else if (nuevoEstado === "naranja") {
                tecla.style.background = "#c9b458";
                tecla.style.color = "#fff";
            } else {
                tecla.style.background = "#787c7e";
                tecla.style.color = "#fff";
            }
        }
    }

    limpiarTeclado() {
        this.estadoTeclas = {};

        document.querySelectorAll(".tecla").forEach((tecla) => {
            tecla.style.background = "";
            tecla.style.color = "";
        });
    }
}

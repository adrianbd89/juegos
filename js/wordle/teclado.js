class Teclado{

    filasTeclado = [
            ["Q","W","E","R","T","Y","U","I","O","P"],
            ["A","S","D","F","G","H","J","K","L"],
            ["ENTER","Z","X","C","V","B","N","M","BACK"]
        ];

    constructor(contenedor){
        this.estadoTeclas = {}; 
        // Guardará algo como: { A: "verde", B: "gris", C: "naranja" }

        this.crearTeclado(contenedor)
    }

    crearTeclado(contenedor){
        // Revisamos si ya existe y lo limpiamos
        let contTeclado = document.getElementById("wordle-teclado");
        if (!contTeclado) {
            contTeclado = document.createElement("div");
            contTeclado.id = "wordle-teclado";
            contTeclado.classList.add("wordle-teclado");
            contenedor.appendChild(contTeclado);
        }
        contTeclado.innerHTML = ""; // limpiar si existe

        this.filasTeclado.forEach(fila => {
            const filaDiv = document.createElement("div");
            filaDiv.classList.add("teclado-fila");
            fila.forEach(tecla => {
                const teclaDiv = document.createElement("div");
                teclaDiv.classList.add("tecla");
                teclaDiv.textContent = tecla;
                //lanzara un evento al darle a la tecla que recogera un listener 
                teclaDiv.addEventListener("click", () => { 
                    const key = tecla === "ENTER" ? "Enter" : tecla === "BACK" ? "Backspace" : tecla;
                    contenedor.dispatchEvent(new CustomEvent("teclaPresionada", { detail: key }));
                });
                filaDiv.appendChild(teclaDiv);
            });
            contTeclado.appendChild(filaDiv);
        });
    }

    actualizarTecla(letra, nuevoEstado) {
        const tecla = Array.from(document.querySelectorAll(".tecla"))
            .find(t => t.textContent === letra);

        if (!tecla) return;

        const prioridad = {
            gris: 1,
            naranja: 2,
            verde: 3
        };

        const estadoActual = this.estadoTeclas[letra];

        // Si no tiene estado o el nuevo es mejor, actualizar
        if (!estadoActual || prioridad[nuevoEstado] > prioridad[estadoActual]) {
            this.estadoTeclas[letra] = nuevoEstado;

            if (nuevoEstado === "verde") {
                tecla.style.backgroundColor = "#6aaa64";
                tecla.style.color = "#fff";
            } else if (nuevoEstado === "naranja") {
                tecla.style.backgroundColor = "#c9b458";
                tecla.style.color = "#fff";
            } else {
                tecla.style.backgroundColor = "#787c7e";
                tecla.style.color = "#fff";
            }
        }
    }

    limpiarTeclado(){
        this.estadoTeclas = {}; 

        document.querySelectorAll(".tecla").forEach(tecla => {
            tecla.style.backgroundColor = "#d3d6da";
            tecla.style.color = "#000";
        });
    }
}
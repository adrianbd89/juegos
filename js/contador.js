class CuentaAtras {
    constructor(fechaObjetivo, elementoId) {
        this.fechaObjetivo = fechaObjetivo;
        this.elemento = document.getElementById(elementoId);
        this.iniciar();
    }

    iniciar() {
        this.actualizar();
        this.intervalo = setInterval(() => this.actualizar(), 1000);
    }

    actualizar() {
        const ahora = new Date();
        const diferencia = this.fechaObjetivo - ahora;

        if (diferencia <= 0) {
            clearInterval(this.intervalo);

            // Mensaje especial
            this.elemento.innerHTML = `
                <div class="desbloqueado">
                    💖 ¡Te Quiero! 💖
                </div>
            `;

            // Cambiar fondo
            document.body.style.background =
                "linear-gradient(135deg,#ff5f9e,#ff85b3)";

            // Mostrar botón para entrar
            document.getElementById("accion").innerHTML = `
                <button class="entrar-btn"
                    onclick="window.location.href='app.html'">
                    Entrar 💕
                </button>
            `;

            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
        const segundos = Math.floor((diferencia / 1000) % 60);

        this.elemento.innerHTML = `
            <div class="tiempo">
                <span>${dias}</span><small>días</small>
            </div>
            <div class="tiempo">
                <span>${horas}</span><small>horas</small>
            </div>
            <div class="tiempo">
                <span>${minutos}</span><small>min</small>
            </div>
            <div class="tiempo">
                <span>${segundos}</span><small>seg</small>
            </div>
        `;
    }

}

class AccionEspecial {
    constructor(fechaObjetivo, elementoId) {
        this.fechaObjetivo = fechaObjetivo;
        this.elemento = document.getElementById(elementoId);
        this.actualizar();
    }

    actualizar() {
        const ahora = new Date();

        if (ahora >= this.fechaObjetivo) {
            this.mostrarTeQuiero();
        } else {
            this.mostrarBloqueado();
        }
    }

    mostrarBloqueado() {
        this.elemento.innerHTML = `
            <div class="bloqueado">
                🔒 Acceder
                <span>Disponible el 15 de febrero</span>
            </div>
        `;
    }

    mostrarTeQuiero() {
        this.elemento.innerHTML = `
            <button class="entrar-btn"
                onclick="window.location.href='app.html'">
                💖 Entrar 💖
            </button>
        `;
    }

}


/* Crear la fecha objetivo (15 de febrero) */
const ahora = new Date();
let fechaObjetivo = new Date(2026, 1, 15); // Febrero = 1


/* Iniciar contador y añadir boton*/
new CuentaAtras(fechaObjetivo, "contador");
new AccionEspecial(fechaObjetivo, "accion");


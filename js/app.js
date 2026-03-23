// Creamos la "app" global para acceder desde el HTML
const app = {
    contenido: document.getElementById("contenido"),
    heartAnimation: new HomeHeartAnimation("heart-particles"),
    victoryAnimation: new VictoryParticles(),

    limpiarVistaAnterior() {
        this.heartAnimation.stop();
        this.victoryAnimation.stopAll();
    },

    mostrarInicio() {
        this.limpiarVistaAnterior();

        this.contenido.innerHTML = `
            <section class="inicio-hero">
                <div class="inicio-copy">
                    <span class="inicio-etiqueta">Un rinconcito para ti</span>
                    <h2>Bienvenida</h2>
                    <p>He hecho esto para ti porque te quiero muchisimo.</p>
                </div>
                <div class="corazon-particulas-card">
                    <canvas id="heart-particles" aria-label="Corazon de particulas animado"></canvas>
                </div>
            </section>
        `;

        this.heartAnimation.start();
    },

    mostrarPuzzle() {
        this.limpiarVistaAnterior();

        new Puzzle("contenido", [
            "img/foto2.jpg",
            "img/foto3.jpg",
            "img/foto4.jpg",
            "img/foto5.jpg",
            "img/foto6.jpg",
            "img/foto7.jpg"
        ]);
    },

    mostrarWordle() {
        this.limpiarVistaAnterior();

        if (!this.mainWordle) {
            this.mainWordle = new MainWordle("contenido");
        }

        this.mainWordle.clear();
    },

    reproducirVictoria(target, options) {
        this.victoryAnimation.play(target, options);
    }
};

window.app = app;
window.onload = () => app.mostrarInicio();

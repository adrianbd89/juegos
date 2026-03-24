const app = {
    contenido: document.getElementById("contenido"),
    heartAnimation: new HomeHeartAnimation("heart-particles"),
    victoryAnimation: new VictoryParticles(),
    iniciada: false,
    viewManager: null,
    router: null,

    crearRouter() {
        this.viewManager = new ViewManager(this.contenido);
        this.router = new AppRouter(this.viewManager, {
            home: new HomeView(this.contenido, this.heartAnimation, this.victoryAnimation),
            puzzle: new PuzzleView(this.contenido, this.victoryAnimation),
            wordle: new WordleView(
                () => new WordleScreen(
                    this.contenido.id,
                    (target, options) => this.victoryAnimation.play(target, options)
                ),
                this.heartAnimation,
                this.victoryAnimation
            )
        });
    },

    mostrarInicio() {
        this.router.goToHome();
    },

    mostrarPuzzle() {
        this.router.goToPuzzle();
    },

    mostrarWordle() {
        this.router.goToWordle();
    },

    reproducirVictoria(target, options) {
        this.victoryAnimation.play(target, options);
    },

    iniciar() {
        if (this.iniciada || !this.contenido) return;

        this.crearRouter();
        this.iniciada = true;
        this.mostrarInicio();
    }
};

window.app = app;

document.addEventListener("DOMContentLoaded", () => app.iniciar());
window.addEventListener("pageshow", () => app.iniciar());

class PuzzleView {
    constructor(contenedor, victoryAnimation) {
        this.contenedor = contenedor;
        this.victoryAnimation = victoryAnimation;
        this.imagenes = [
            "img/foto2.jpg",
            "img/foto3.jpg",
            "img/foto4.jpg",
            "img/foto5.jpg",
            "img/foto6.jpg",
            "img/foto7.jpg"
        ];
    }

    render() {
        this.victoryAnimation.stopAll();
        const statusView = new PuzzleStatusView();
        new PuzzleGame(
            this.contenedor.id,
            this.imagenes,
            statusView,
            (target, options) => this.victoryAnimation.play(target, options)
        );
    }

    destroy() {
        this.victoryAnimation.stopAll();
    }
}

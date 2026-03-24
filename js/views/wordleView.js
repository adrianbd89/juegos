class WordleView {
    constructor(wordleFactory, heartAnimation, victoryAnimation) {
        this.wordleFactory = wordleFactory;
        this.heartAnimation = heartAnimation;
        this.victoryAnimation = victoryAnimation;
        this.wordle = null;
    }

    render() {
        this.heartAnimation.stop();
        this.victoryAnimation.stopAll();

        if (!this.wordle) {
            this.wordle = this.wordleFactory();
        }

        this.wordle.clear();
    }

    destroy() {
        this.heartAnimation.stop();
        this.victoryAnimation.stopAll();
        if (this.wordle && typeof this.wordle.limpiarTema === "function") {
            this.wordle.limpiarTema();
        }
    }
}

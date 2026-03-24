class PuzzleStatusView {
    constructor(elementId = "mensaje-puzzle") {
        this.elementId = elementId;
    }

    clear() {
        this.setMessage("");
    }

    showVictory() {
        this.setMessage("Lo has conseguido");
    }

    setMessage(message) {
        const element = document.getElementById(this.elementId);
        if (element) {
            element.textContent = message;
        }
    }
}

class WordleStatusView {
    constructor(elementId = "mensaje-wordle") {
        this.elementId = elementId;
    }

    clear() {
        this.setMessage("");
    }

    showVictory() {
        this.setMessage("Lo adivinaste 💖");
    }

    showDefeat(palabraSecreta) {
        this.setMessage(`La palabra era: ${palabraSecreta}`);
    }

    setMessage(message) {
        const element = document.getElementById(this.elementId);
        if (element) {
            element.textContent = message;
        }
    }
}

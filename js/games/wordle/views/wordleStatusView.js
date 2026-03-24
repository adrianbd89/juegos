class WordleStatusView {
    constructor(elementId = "mensaje-wordle") {
        this.elementId = elementId;
    }

    clear() {
        this.setMessage("");
    }

    showVictory(definicion) {
        const detalle = definicion ? ` <span class="mensaje-wordle-definicion">${definicion}</span>` : "";
        this.setMessage(`Lo adivinaste &#x1F496;${detalle}`);
    }

    showDefeat(palabraSecreta, definicion) {
        const detalle = definicion ? ` <span class="mensaje-wordle-definicion">${definicion}</span>` : "";
        this.setMessage(`La palabra era: <strong>${palabraSecreta}</strong>.${detalle}`);
    }

    setMessage(message) {
        const element = document.getElementById(this.elementId);
        if (element) {
            element.innerHTML = message;
        }
    }
}

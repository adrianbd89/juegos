// Creamos la "app" global para acceder desde el HTML
const app = {
    contenido: document.getElementById("contenido"),

    mostrarInicio() {
        this.contenido.innerHTML = `
            <h2>Bienvenida ❤️</h2>
            <p>He hecho esto para ti porque te quiero muchísimo.</p>
        `;
    },

    mostrarPuzzle() {
        // Creamos nueva instancia de Puzzle
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
        if (!this.mainWordle) {
            this.mainWordle = new MainWordle("contenido"); // Solo se crea la primera vez la instancia
        } else {
            this.mainWordle.clear(); // Si ya existía, reiniciamos el juego
        }
    }

};

// Mostrar inicio al cargar la página
window.onload = () => app.mostrarInicio();

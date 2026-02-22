class PalabraDia {

    static palabras = [
        "AMOR", "GUAPA", "PANCHO", "ROMANO", "MONTE", "STALIN",
        "DIOSA", "LUCES", "ARGENTO", "DULCE", "FELIZ", "DURU",
        "UNIONES", "NIGGER", "ALMA", "CIELO", "SUEÑO", "PERDON",
        "RAYOS", "HOLOCUENTO", "PROBETA", "JUDIO", "JUDIO", "NEGRO",
        "MIMOS", "JULIA", "QUIMICA", "JUDIADA", "BOMBA", "CIELO"
    ];

    static palabraSecreta;

    static seleccionarPalabra() {
        const dia = new Date().getDate();
        const indice = (dia - 1) % this.palabras.length;
        this.palabraSecreta = this.palabras[indice].toUpperCase();
        console.log("Palabra de hoy:", this.palabraSecreta);
    }

    static getPalabraDelDia() {
        if (!this.palabraSecreta) {
            this.seleccionarPalabra();
        }
        return this.palabraSecreta;
    }
}


class HomeView {
    constructor(contenedor, heartAnimation, victoryAnimation) {
        this.contenedor = contenedor;
        this.heartAnimation = heartAnimation;
        this.victoryAnimation = victoryAnimation;
    }

    render() {
        this.stopEffects();

        this.contenedor.innerHTML = `
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

        try {
            this.heartAnimation.start();
        } catch (error) {
            console.error("No se pudo iniciar la animacion principal:", error);
        }
    }

    destroy() {
        this.stopEffects();
    }

    stopEffects() {
        this.heartAnimation.stop();
        this.victoryAnimation.stopAll();
    }
}

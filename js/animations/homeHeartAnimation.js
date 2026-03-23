class HomeHeartAnimation {
    constructor(canvasId) {
        this.canvasId = canvasId;
        this.canvas = null;
        this.context = null;
        this.animationFrame = null;
        this.resizeHandler = null;
        this.particles = [];
    }

    start() {
        this.stop();

        this.canvas = document.getElementById(this.canvasId);
        if (!this.canvas) return;

        this.context = this.canvas.getContext("2d");
        this.resizeHandler = () => {
            this.prepareCanvas();
            this.createParticles();
        };

        this.resizeHandler();
        window.addEventListener("resize", this.resizeHandler);
        this.animate();
    }

    stop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }

        if (this.resizeHandler) {
            window.removeEventListener("resize", this.resizeHandler);
            this.resizeHandler = null;
        }

        this.particles = [];
        this.canvas = null;
        this.context = null;
    }

    prepareCanvas() {
        const card = this.canvas.parentElement;
        const width = card.clientWidth;
        const height = Math.max(320, Math.min(460, Math.round(width * 0.9)));
        const ratio = window.devicePixelRatio || 1;

        this.canvas.width = width * ratio;
        this.canvas.height = height * ratio;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;

        this.context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    createParticles() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        const centerX = width / 2;
        const centerY = height / 2 - 4;
        const scale = Math.min(width, height) * 0.28;
        const total = Math.max(140, Math.floor(width * 0.42));

        this.particles = Array.from({ length: total }, (_, index) => {
            const t = (index / total) * Math.PI * 2;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y =
                13 * Math.cos(t) -
                5 * Math.cos(2 * t) -
                2 * Math.cos(3 * t) -
                Math.cos(4 * t);

            return {
                x: Math.random() * width,
                y: Math.random() * height,
                baseX: centerX + x * scale * 0.055,
                baseY: centerY - y * scale * 0.055,
                size: 1.8 + Math.random() * 3.2,
                alpha: 0.5 + Math.random() * 0.45,
                pulseOffset: Math.random() * Math.PI * 2,
                drift: 0.4 + Math.random() * 1.4
            };
        });
    }

    animate() {
        if (!this.canvas || !this.context) return;

        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        const context = this.context;
        const start = performance.now();

        const render = (now) => {
            if (!this.canvas || !document.getElementById(this.canvasId)) {
                this.stop();
                return;
            }

            const time = (now - start) * 0.001;
            context.clearRect(0, 0, width, height);

            for (const particle of this.particles) {
                const pulse = Math.sin(time * 2.2 + particle.pulseOffset);
                const orbitX = Math.cos(time * particle.drift + particle.pulseOffset) * 6;
                const orbitY = Math.sin(time * 1.7 + particle.pulseOffset) * 6;

                particle.x += (particle.baseX + orbitX - particle.x) * 0.08;
                particle.y += (particle.baseY + orbitY - particle.y) * 0.08;

                context.beginPath();
                context.fillStyle = `rgba(214, 58, 104, ${particle.alpha})`;
                context.shadowColor = "rgba(255, 118, 154, 0.35)";
                context.shadowBlur = 12;
                context.arc(
                    particle.x,
                    particle.y,
                    particle.size + pulse * 0.55,
                    0,
                    Math.PI * 2
                );
                context.fill();
            }

            context.shadowBlur = 0;
            this.animationFrame = requestAnimationFrame(render);
        };

        this.animationFrame = requestAnimationFrame(render);
    }
}

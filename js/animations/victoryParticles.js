class VictoryParticles {
    constructor() {
        this.activeAnimations = new Map();
    }

    play(target, options = {}) {
        const element = typeof target === "string" ? document.querySelector(target) : target;
        if (!element) return;

        this.stop(element);

        const surface = element.closest(".juego-superficie") || element.parentElement || element;
        const surfaceRect = surface.getBoundingClientRect();
        const targetRect = element.getBoundingClientRect();
        const ratio = window.devicePixelRatio || 1;

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const burstRadius = Math.max(targetRect.width, targetRect.height) * 0.6;
        const width = Math.max(1, Math.round(surfaceRect.width + burstRadius * 2));
        const height = Math.max(1, Math.round(surfaceRect.height + burstRadius * 2));
        const launchX = width / 2;
        const launchY = height / 2;
        const total = options.total ?? Math.max(56, Math.round(targetRect.width / 7));
        const duration = options.duration ?? 2200;
        const colors = options.colors ?? ["#ff5f9e", "#ff8fab", "#ffd166", "#ffffff"];

        canvas.className = "victory-canvas";
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.style.left = `${-Math.round(burstRadius)}px`;
        canvas.style.top = `${-Math.round(burstRadius)}px`;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);

        surface.appendChild(canvas);

        const particles = Array.from({ length: total }, () =>
            this.createParticle(launchX, launchY, burstRadius, colors)
        );

        const animation = {
            canvas,
            surface,
            frame: null
        };

        this.activeAnimations.set(element, animation);

        const start = performance.now();
        const render = (now) => {
            const current = this.activeAnimations.get(element);
            if (!current) return;

            const elapsed = now - start;
            context.clearRect(0, 0, width, height);

            for (const particle of particles) {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += particle.gravity;
                particle.rotation += particle.rotationSpeed;
                particle.life -= particle.fade;

                if (particle.life <= 0) {
                    continue;
                }

                context.save();
                context.translate(particle.x, particle.y);
                context.rotate(particle.rotation);
                context.globalAlpha = Math.max(0, particle.life);
                context.fillStyle = particle.color;
                context.shadowColor = particle.color;
                context.shadowBlur = 12;
                context.fillRect(
                    -particle.width / 2,
                    -particle.height / 2,
                    particle.width,
                    particle.height
                );
                context.restore();
            }

            if (elapsed < duration) {
                current.frame = requestAnimationFrame(render);
                return;
            }

            this.stop(element);
        };

        animation.frame = requestAnimationFrame(render);
    }

    stop(target) {
        const element = typeof target === "string" ? document.querySelector(target) : target;
        if (!element) return;

        const current = this.activeAnimations.get(element);
        if (!current) return;

        cancelAnimationFrame(current.frame);
        current.canvas.remove();
        this.activeAnimations.delete(element);
    }

    stopAll() {
        const elements = Array.from(this.activeAnimations.keys());
        elements.forEach((element) => this.stop(element));
    }

    createParticle(originX, originY, radius, colors) {
        const spawnAngle = Math.random() * Math.PI * 2;
        const spawnDistance = Math.random() * radius * 0.12;
        const x = originX + Math.cos(spawnAngle) * spawnDistance;
        const y = originY + Math.sin(spawnAngle) * spawnDistance;
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.8 + Math.random() * 4.4;

        return {
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            gravity: 0.015 + Math.random() * 0.02,
            width: 7 + Math.random() * 9,
            height: 5 + Math.random() * 7,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * Math.PI,
            rotationSpeed: (Math.random() - 0.5) * 0.32,
            life: 1,
            fade: 0.01 + Math.random() * 0.007
        };
    }
}

class ViewManager {
    constructor(contenedor) {
        this.contenedor = contenedor;
        this.currentView = null;
    }

    show(view) {
        if (this.currentView && typeof this.currentView.destroy === "function") {
            this.currentView.destroy();
        }

        this.currentView = view;
        this.currentView.render();
    }
}

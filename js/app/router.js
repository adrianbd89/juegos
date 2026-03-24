class AppRouter {
    constructor(viewManager, views) {
        this.viewManager = viewManager;
        this.views = views;
    }

    goToHome() {
        this.viewManager.show(this.views.home);
    }

    goToPuzzle() {
        this.viewManager.show(this.views.puzzle);
    }

    goToWordle() {
        this.viewManager.show(this.views.wordle);
    }
}

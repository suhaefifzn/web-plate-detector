import Parser from '../routes/parser';
import routes from '../routes/routes';
import Drawer from '../utils/drawer';

class App {
    constructor({ button, drawer, options }) {
        this._button = button;
        this._drawer = drawer;
        this._options = options;

        this._initialAppshell();
    }

    _initialAppshell() {
        Drawer.init({
            button: this._button,
            drawer: this._drawer,
            options: this._options,
        });
    }

    async renderPage() {
        const url = Parser.parseActiveUrlWithCombiner();
        const page = routes[url];
        this._options.container.innerHTML = await page.render();
        await page.afterRender();
    }
}

export default App;
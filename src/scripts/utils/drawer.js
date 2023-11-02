const Drawer = {
    init({ button, drawer, options }) {
        this._button = button;
        this._drawer = drawer;
        this._navLinks = options.navLinks;
        this._container = options.container;

        this._clickHamburgerButton();
        this._clickNavItemLinks();
        this._clickContainer();
    },

    _clickHamburgerButton() {
        this._button.addEventListener('click', (event) => {
            event.stopPropagation();
            this._drawer.classList.toggle('show-navbar-menu');
        });
    },

    _clickNavItemLinks() {
        this._navLinks.forEach((element) => {
            element.addEventListener('click', (event) => {
                this._closeDrawer(event);
            });
        });
    },

    _clickContainer() {
        this._container.addEventListener('click', (event) => {
            this._closeDrawer(event);
        });
    },

    _closeDrawer(event) {
        event.stopPropagation();
        this._drawer.classList.remove('show-navbar-menu');
    },
};

export default Drawer;
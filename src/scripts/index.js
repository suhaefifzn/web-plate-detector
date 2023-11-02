import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/responsive.css';
import '../scripts/components/navbar-element';
import App from './views/app';

const app = new App({
    button: document.querySelector('.btn-hamburger'),
    drawer: document.querySelector('.navbar-menu'),
    options: {
        container: document.querySelector('#container'),
        navLinks: document.querySelectorAll('.navbar-item-link')
    },
});

window.addEventListener('hashchange', () => {
    app.renderPage();
});

window.addEventListener('load', () => {
    app.renderPage();
});
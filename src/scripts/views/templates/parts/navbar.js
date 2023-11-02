const feather = require('feather-icons');

const navbar = () => {
    return `
        <nav class="navbar">
            <a href="#/" class="navbar__title">
                <span class="navbar__title-white">PLATOR</span>
            </a>
            <ul class="navbar-menu">
                <li class="navbar-item">
                    <a href="#/" class="navbar-item-link">
                        ${feather.icons.home.toSvg({ class: 'navbar__icons ' })}
                        <span>Home</span>
                    </a>
                </li>
                <li class="navbar-item">
                    <a href="#/about" class="navbar-item-link">
                        ${feather.icons.info.toSvg({ class: 'navbar__icons ' })}
                        <span>About</span>
                    </a>
                </li>
            </ul>
            <button class="btn-hamburger" type="button">
                ${feather.icons.menu.toSvg({ class: 'hamburger-icon' })}
            </button>
        </nav>
    `;
};

module.exports = navbar;
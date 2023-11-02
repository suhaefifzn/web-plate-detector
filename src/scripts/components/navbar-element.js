import TemplateCreator from '../views/templates/template-creator';

class NavbarElement extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = TemplateCreator.navbar();
    }
}

customElements.define('navbar-element', NavbarElement);
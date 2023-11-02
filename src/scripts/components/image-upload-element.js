import TemplateCreator from '../views/templates/template-creator';

class ImageUploadElement extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = TemplateCreator.imageUpload();
    }
}

customElements.define('image-upload-element', ImageUploadElement);

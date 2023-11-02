const feather = require('feather-icons');

const imageUpload = () => {
    return `
        <div class="image-upload-wrapper">
            <div class="image-upload__form">
                <div class="image-upload__preview">
                    <img id="imagePreview"/>
                </div>
                <input type="file" id="imageFile" accept="image/*"/>
                <label for="imageFile">
                    ${feather.icons.image.toSvg({ class: 'navbar__icons' })}
                    <span>Pilih Gambar</span>
                </label>
                <button class="btn-scan" type="button">
                    ${feather.icons.play.toSvg({ class: 'navbar__icons' })}
                    <span>Scan</span>
                </button>
            </div>
        </div>
    `;
};

module.exports = imageUpload;
import ImageUploadUtils from '../../utils/image-upload';
import Helper from '../../utils/helper';

const feather = require('feather-icons');

const Home = {
    async render() {
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
            <div class="table-wrapper"></div>
        `;
    },

    async afterRender() {
        // load cascade file yang ada difolder public
        // terjadi ketika telah terbundle.
        const cascadeFile = 'haarcascade_russian_plate_number.xml';
        Helper.loadCascadeFile({
            path: cascadeFile,
            url: cascadeFile,
        });

        ImageUploadUtils.inputElementChanges({
            inputElement: document.querySelector('#imageFile'),
            previewElement: document.querySelector('#imagePreview'),
            scanElement: document.querySelector('.btn-scan'),
            tableWrapper: document.querySelector('.table-wrapper'),
            cascadeFile
        });
    }
};

export default Home;
import ImageUploadUtils from "../../utils/image-upload";
import CarDetection from "../../utils/car-detection";
import Helper from "../../utils/helper";

const feather = require("feather-icons");

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
                        ${feather.icons.image.toSvg({ class: "navbar__icons" })}
                        <span>Pilih Gambar</span>
                    </label>
                    <button class="btn-scan" type="button">
                        ${feather.icons.play.toSvg({ class: "navbar__icons" })}
                        <span>Scan</span>
                    </button>
                    <button class="btn-car-detection" type="button">
                        ${feather.icons.video.toSvg({ class: "navbar__icons" })}
                        <span>Object Tracking (Realtime)</span>
                    </button>
                </div>
            </div>
            <div class="table-wrapper"></div>
        `;
  },

  async afterRender() {
    // load cascade file yang ada difolder public
    // terjadi ketika telah terbundle.

    // load plate number cascade
    const plateCascadeFile = "haarcascade_russian_plate_number.xml";
    Helper.loadCascadeFile({
      path: plateCascadeFile,
      url: plateCascadeFile,
    });

    ImageUploadUtils.inputElementChanges({
      inputElement: document.querySelector("#imageFile"),
      previewElement: document.querySelector("#imagePreview"),
      scanElement: document.querySelector(".btn-scan"),
      tableWrapper: document.querySelector(".table-wrapper"),
      cascadeFile: plateCascadeFile,
    });

    // deteksi objek bergerak - mobil
    CarDetection.init({
      buttonElement: document.querySelector(".btn-car-detection"),
      wrapperElement: document.querySelector(".table-wrapper"),
    });
  },
};

export default Home;

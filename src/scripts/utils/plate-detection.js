import Helper from './helper';

const cv = require('@techstark/opencv-js');
const Swal = require('sweetalert2');
const { createWorker } = require('tesseract.js');

const PlateDetection = {
    analysPlateNumber({ imagePreview, tableWrapper, cascadeFile }) {
        this._detectPlateNumber({ imagePreview, tableWrapper, cascadeFile });
    },

    async _performOCR({ canvasImg }) {
        const worker = await createWorker('eng');
        const { data: { text } } = await worker.recognize(canvasImg);
        await worker.terminate();

        return text;
    },

    async _detectPlateNumber({ imagePreview, tableWrapper, cascadeFile }) {
        tableWrapper.innerHTML = '';

        // untuk melihat hasil
        const canvas = document.createElement('canvas');
        const canvasId = 'imageOutput';
        canvas.getContext('2d');
        canvas.setAttribute('id', canvasId);
        tableWrapper.appendChild(canvas);

        // source image
        const img = cv.imread(imagePreview);

        // grayscale
        const gray = new cv.Mat();
        cv.cvtColor(img, gray, cv.COLOR_RGBA2GRAY, 0);

        // blur
        const bilateralFiltered = new cv.Mat();
        cv.bilateralFilter(gray, bilateralFiltered, 13, 15, 15)

        // edged
        const edged = new cv.Mat();
        cv.Canny(bilateralFiltered, edged, 30, 200);
        
        const msize = new cv.Size(0, 0);
        const nsize = new cv.Size(img.cols, img.rows);
        const plates = new cv.RectVector();
        const classifier = new cv.CascadeClassifier();

        let dst = new cv.Mat();

        Helper.loadCascadeFile({
            path: cascadeFile,
            url: cascadeFile,
            callback: () => {
                classifier.load(cascadeFile);
            },
        });

        classifier.detectMultiScale(gray, plates, 1.1, 3, 0, msize, nsize);

        let status = false;
        for (let i = 0; i < plates.size(); ++i) {
            const plateRect = plates.get(i);
            const point1 = new cv.Point(plateRect.x, plateRect.y);
            const point2 = new cv.Point(
                plateRect.x + plateRect.width, plateRect.y + plateRect.height
            );
            cv.rectangle(img, point1, point2, [255, 0, 0, 255]);

            const rect = new cv.Rect(
                plateRect.x + 10, plateRect.y + 14, plateRect.width - 15, plateRect.height - 23
            );
            dst = img.roi(rect);

            status = true;
        }

        // plate tidak terdeteksi
        if (!status) {
            return this._errorCannotReadImage({ tableWrapper });
        }

        // tampilkan ke canvas
        cv.imshow(canvasId, dst);
        
        // hapus dari memori
        img.delete();
        gray.delete();
        bilateralFiltered.delete();
        edged.delete();
        plates.delete();
        dst.delete();

        canvas.style.display = 'none';

        const licenseNumber = await this._performOCR({ canvasImg: canvas });

        if (licenseNumber.length > 0) {
            this._resultTable({
                tableWrapper,
                result: {
                    licenseNumber,
                },
            });
            tableWrapper.style.display = 'block';
        } else {
            // plat terdeteksi tapi tidak terbaca oleh tesseract
            return this._errorCannotReadImage({ tableWrapper });
        }
    },

    _resultTable({ tableWrapper, result }) {
        // bersihkan semua elemen yang ada dalam tableWrapper
        tableWrapper.innerHTML = '';

        // buat elemen table
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const trThead = document.createElement('tr');
        const tdTrThead = `
            <td>No.</td>
            <td>Plat Nomor</td>
        `;
        trThead.innerHTML = tdTrThead;
        thead.appendChild(trThead);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        const trTbody = `
            <tr>
                <td>1.</td>
                <td>${result.licenseNumber}</td>
            </tr>
        `;
        tbody.innerHTML += trTbody;

        table.appendChild(tbody);
        tableWrapper.appendChild(table);
        tableWrapper.style.display = 'block';
    },

    _errorCannotReadImage({ tableWrapper }) {
        tableWrapper.style.display = 'none';
        Swal.fire({
            text: `
                Mohon maaf, kami belum bisa membaca gambar yang Anda kirim dengan baik.
            `,
            icon: 'warning',
            toast: true,
            timer: 5000, // 5 detik
            timerProgressBar: true,
            position: 'top',
            showConfirmButton: false,
        });
    }
};

export default PlateDetection;
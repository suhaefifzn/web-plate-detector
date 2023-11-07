import Helper from './helper';

const cv = require('@techstark/opencv-js');

const PlateDetection = {
    analysPlateNumber({ imagePreview, tableWrapper, cascadeFile }) {
        this._detectPlateNumber({ imagePreview, tableWrapper, cascadeFile });

        // jika gambar berhasil di analisis, tampilkan hasil pada tabel
        // this._resultTable({ tableWrapper });
    },

    _detectPlateNumber({ imagePreview, tableWrapper, cascadeFile }) {
        tableWrapper.innerHTML = '';

        // ? untuk melihat progres hasil - sementara
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
        
        const msize = new cv.Size(0, 0);
        const nsize = new cv.Size(img.cols, img.rows);
        const plates = new cv.RectVector();
        const classifier = new cv.CascadeClassifier();

        Helper.loadCascadeFile({
            path: cascadeFile,
            url: cascadeFile,
            callback: () => {
                classifier.load(cascadeFile);
            },
        });

        classifier.detectMultiScale(gray, plates, 1.1, 3, 0, msize, nsize);

        for (let i = 0; i < plates.size(); ++i) {
            const plateRect = plates.get(i);
            const point1 = new cv.Point(plateRect.x, plateRect.y);
            const point2 = new cv.Point(plateRect.x + plateRect.width, plateRect.y + plateRect.height);
            cv.rectangle(img, point1, point2, [255, 0, 0, 255]);
          }

        cv.imshow(canvasId, img);
        
        img.delete();
        gray.delete();
        plates.delete();

        tableWrapper.style.display = 'block';
    },

    _resultTable({ tableWrapper }) {
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
                <td>D 3B45 EG</td>
            </tr>
            <tr>
                <td>2.</td>
                <td>B 5B65 EZ</td>
            </tr>
        `;
        tbody.innerHTML += trTbody;

        table.appendChild(tbody);
        tableWrapper.appendChild(table);
        tableWrapper.style.display = 'block';
    },
};

export default PlateDetection;
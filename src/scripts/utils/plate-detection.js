const cv = require('@techstark/opencv-js');

const PlateDetection = {
    analysPlateNumber({ imagePreview, tableWrapper }) {
        // jika gambar berhasil di analisis, tampilkan hasil pada tabel
        // this._resultTable({ tableWrapper });

        this._detectPlateNumber({ imagePreview, tableWrapper });

        // ? tes dulu
        // this._grayscaleImage({ imagePreview, tableWrapper });
    },

    _detectPlateNumber({ imagePreview, tableWrapper }) {
        tableWrapper.innerHTML = '';

        // ? untuk melihat progres hasil - sementara
        const canvas = document.createElement('canvas');
        const canvasId = 'imageOutput';
        canvas.getContext('2d');
        canvas.setAttribute('id', canvasId);
        tableWrapper.appendChild(canvas);

        const img = cv.imread(imagePreview);
        
        // grayscale
        const gray = new cv.Mat();
        cv.cvtColor(img, gray, cv.COLOR_RGBA2GRAY, 0);

        // beri gaussian blur
        const blurred = new cv.Mat();
        const ksizeBlurred = new cv.Size(5, 5);
        cv.GaussianBlur(gray, blurred, ksizeBlurred, 0);

        // beri threshold
        const threshold = new cv.Mat();
        cv.threshold(blurred, threshold, 127, 255, cv.THRESH_BINARY);

        // cari contour di gambar threshold
        const contours = new cv.MatVector();
        const hieararchy = new cv.Mat();
        cv.findContours(
            threshold, contours, hieararchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE
        );

        for (let i = 0; i < contours.size(); i++) {
            const contour = contours.get(i);

            if (cv.contourArea(contour) > 1000) {
                const boundingRect = cv.boundingRect(contour);
                const maxPoint = new cv.Point(boundingRect.x, boundingRect.y);
                const point = new cv.Point( 
                    boundingRect.x + boundingRect.width,
                    boundingRect.y + boundingRect.height
                );
                const color = new cv.Scalar(255, 0, 0, 255);

                cv.rectangle(
                    img, maxPoint, point, color, 1, cv.LINE_8, 0
                );

                const licensePlate = new cv.Mat();
                img.roi(boundingRect).copyTo(licensePlate);

                licensePlate.delete();
            }
        }

        // tampilkan gambar
        cv.imshow(canvasId, img);

        // hapus memori
        img.delete();
        gray.delete();
        blurred.delete();
        threshold.delete();
        contours.delete();
        hieararchy.delete();
        
        tableWrapper.style.display = 'block';
    },

    // ? Fungsi untuk test integrasi opencv.js
    _grayscaleImage({ imagePreview, tableWrapper }) {
        tableWrapper.innerHTML = '';

        const canvas = document.createElement('canvas');
        const canvasId = 'imageOutput';
        canvas.setAttribute('id', canvasId);
        canvas.getContext('2d');
        tableWrapper.appendChild(canvas);

        const img = imagePreview;
        const src = cv.imread(img);
        const dst = new cv.Mat();

        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
        cv.imshow(canvasId, dst);
        dst.delete();
        src.delete()

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
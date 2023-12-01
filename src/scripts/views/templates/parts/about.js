const about = () => {
    return `
        <div class="content">
            <article>
                <h1>About</h1>
                <p>Aplikasi web ini dibuat untuk memenuhi tugas matakuliah <b>Pengolahan Citra</b> semester 7. Dibuat oleh <b>Suhaefi Fauzian</b> dari mahasiswa prodi <b>Teknik Informatika STMIK Bandung</b>.</p>
                <p>Alat yang digunakan untuk mendeteksi dan membaca karakter plat nomor kendaraan pada aplikasi ini adalah library OpenCV.js dan Tesseract.js. Dibantu menggunakan haar cascade plat nomor kendaraan Rusia yang didapat dari GitHub.</p>
                <ul>
                    <li>
                        OpenCV.js, <a href="https://docs.opencv.org/4.8.0/d5/d10/tutorial_js_root.html" target="_blank" rel="nofollow">https://docs.opencv.org/4.8.0/d5/d10/tutorial_js_root.html</a>
                    </li>
                    <li>
                        Tesseract.js, <a href="https://tesseract.projectnaptha.com/" target="_blank" rel="nofollow">https://tesseract.projectnaptha.com/</a>
                    </li>
                </ul>
                <p>Aplikasi ini dikembangkan dengan menggunakan Runtime Environment Node.js versi 16.17.1 beserta library pendukung lainnya yang dapat dilihat pada file package.json di <a href="https://github.com/suhaefifzn/web-plate-detector/blob/main/package.json" target="_blank" rel="nofollow">https://github.com/suhaefifzn/web-plate-detector/blob/main/package.json</a>.</p>
                <h2>Hasil Pengujian Gambar</h2>
                <p>Dari 35 gambar yang ada dengan berbagai variasi seperti tingkat kejelasan plat nomor pada kendaraan, kejelesan gambar, hingga posisi kendaraan. Hasilnya, hanya 7 gambar yang posisi plat nomornya dapat terdeteksi dan dari 7 gambar tersebut hanya 5 gambar yang karakternya dapat terbaca menggunakan Tesseract.js.</p>
                <p>35 gambar tersebut dapat diakses pada link <a href="https://github.com/suhaefifzn/web-plate-detector/tree/main/images" target="_blank" rel="nofollow">https://github.com/suhaefifzn/web-plate-detector/tree/main/images</a>.</p>
                <h2>Kesimpulan</h2>
                <p>Berdasarkan pada hasil pengujian, akurasi untuk mendeteksi plat nomor kendaraan yang dimiliki pada aplikasi ini masihlah buruk. Kemudian aplikasi masih dapat dikembangkan dan diperbaiki untuk meningkatkan akurasi ataupun penambahan fitur lainnya seperti pendeteksian plat menggunakan kamera secara langsung.</p>
                <p>Source code pada tugas ini dapat dilihat dan diakses melalui <a href="https://github.com/suhaefifzn/web-plate-detector" target="_blank" rel="nofollow">GitHub Suhaefi Fauzian</a>.</p>
            </article>
        </div>
    `;
};

module.exports = about;
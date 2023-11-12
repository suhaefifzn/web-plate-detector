# License Plate Recognition
**Tugas Pengolahan Citra - Suhaefi Fauzian**.  
Aplikasi ini berbasis web dan dibuat menggunakan Node.js versi 16.17.1
### Tools
Library utama yang digunakan:
- @techstark/opencv-js
- tesseract.js
- webpack
### Catatan untuk Perbaikan
- Akurasi masih sangat buruk
- Hanya dapat mendeteksi bagian belakang
- Gambar harus sangat jelas dan objek (plat) harus lurus menghadap kamera
- Masih menggunakan haarcascade untuk plat Rusia. Haarcascade didapat dari pencarian di GitHub
### Cara Jalankan di Local
Pastikan perangkat telah terpasang Node.js versi 16.17.1, untuk memastikan Node.js yang telah terpasang bisa cek dengan cara buka cmd dan masukkan perintah:  

```
node --version
```  
Jangan lupa untuk unduh atau lakukan clone pada proyek ini ke perangkat milik Anda. Jika hasil unduh berupa file yang diarsipkan maka ekstrak terlebih dahulu. Buka proyek pada code editor yang Anda miliki. Jika menggunakan Visual Studio Code, Anda dapat langsung memasang setiap modul yang terdaftar di package.json dengan perintah di bawah ini melalui terminal code editor:  

```
npm i
```  
Apabila modul-modul telah terpasang, proyek bisa dijalankan dengan dua perintah. Perintah pertama untuk menjalankannya tahap pengembangan:  

```
npm run dev
```  
Perintah kedua untuk menjalankankannya pada tahap akhir. Dengan menggunakan perintah berikut Anda dapat melihat hasilnya pada folder dist yang muncul.  

```
npm run build-serve
```  
Jika proyek ini telah berada di perangkat, Anda bebas untuk melalukan apapun.
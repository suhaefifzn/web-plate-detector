import '../../components/image-upload-element';
import Swal from 'sweetalert2';

const Home = {
    async render() {
        return `<image-upload-element></image-upload-element>`;
    },

    async afterRender() {
        const imageFile = document.querySelector('#imageFile');
        const buttonScan = document.querySelector('.btn-scan');
        imageFile.addEventListener('change', (event) => {
            event.stopPropagation();
            if (event.target.files.length > 0) {
                const src = URL.createObjectURL(event.target.files[0]);
                const preview = document.querySelector('#imagePreview');
                preview.src = src;
                preview.style.display = 'block';

                // buttonScan.removeAttribute('disabled');
                buttonScan.style.cursor = 'pointer';
                buttonScan.addEventListener('click', (event) => {
                    event.stopPropagation();
                    console.log('Tombol Scan diklik!');
                })
            } 
        });

        // jika button scan diklik tapi gambar belum ada
        buttonScan.addEventListener('click', (event) => {
            event.stopPropagation();
            const imagePreview = document.querySelector('#imagePreview');
            
            if (!imagePreview.attributes.src) {
                Swal.fire({
                    icon: 'warning',
                    text: 'Silahkan pilih gambar terlebih dahulu!',
                    toast: true,
                    timer: 3000,
                    position: 'top',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        });
    }
};

export default Home;
import PlateDetection from './plate-detection';

const Swal = require('sweetalert2');

const ImageUpload = {
    inputElementChanges({
        inputElement, previewElement, scanElement, tableWrapper, cascadeFile,
    }) {
        inputElement.addEventListener('change', (event) => {
            event.stopPropagation();
            if (event.target.files.length > 0) {
                const src = URL.createObjectURL(event.target.files[0]);
                previewElement.src = src;
                previewElement.style.display = 'block';
                scanElement.style.cursor = 'pointer';
            }
        });
        return this._scanButtonClicked({
            scanElement, previewElement, tableWrapper, cascadeFile,
        });
    },

    _scanButtonClicked({ scanElement, previewElement, tableWrapper, cascadeFile }) {
        scanElement.addEventListener('click', (event) => {
            event.stopPropagation();
            if (!previewElement.attributes.src) {
                Swal.fire({
                    icon: 'warning',
                    text: 'Silahkan pilih gambar terlebih dahulu!',
                    toast: true,
                    timer: 3000,
                    position: 'top',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            } else {
                PlateDetection.analysPlateNumber({
                    imagePreview: previewElement,
                    tableWrapper: tableWrapper,
                    cascadeFile
                })
            }
        });
    },
};

export default ImageUpload;
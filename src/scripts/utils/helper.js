const cv = require('@techstark/opencv-js');

const fileLoadedStatus = {};

const Helper = {
    loadCascadeFile({ path, url, callback = null }) {
        if (fileLoadedStatus[path]) {
            console.log(`File ${path} telah dimuat.`);
            if (callback) {
                callback();
            }
            return;
        }

        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function(ev) {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    let data = new Uint8Array(request.response);
                    cv.FS_createDataFile('/', path, data, true, false, false);
                    fileLoadedStatus[path] = true;
                } else {
                    console.log('Failed to load ' + url + ' status: ' + request.status);
                }
            }
        };
        request.send();
    },
};

export default Helper;
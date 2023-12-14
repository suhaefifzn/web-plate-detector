import Utils from "./utils";

const cv = require("@techstark/opencv-js");

const CarDetection = {
  init({ buttonElement, wrapperElement }) {
    this._videoSrc = null;
    this._streaming = false;
    this._buttonElement = buttonElement;
    this._wrapperElement = wrapperElement;
    this._videoOutputIdName = "videoOutput";
    this._videoInputIdName = "videoInput";
    this._stopButtonIdName = "stopButton";
    this._FPS = 30;

    this._clickButton();
  },

  _clickButton() {
    this._buttonElement.addEventListener("click", () => {
      // this._lucasKanadeVideoAnalys(); // ! metode lucas-kanade masih error
      this._camshiftVideoAnalys();
    });
  },

  /**
   * ! Masih rror saat menjalankan fungsi calcOpticalFlowPyrLK()
   */
  _lucasKanadeVideoAnalys() {
    this._streaming = true;
    this._createVideoElement();

    // buka camera
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        document.getElementById(this._videoInputIdName).srcObject = stream;
        document.getElementById(this._videoInputIdName).play();

        const processVideo = () => {
          // opencv video capture
          const videoInput = document.getElementById(this._videoInputIdName);
          const cap = new cv.VideoCapture(videoInput);

          // parameters shitomasi
          const [maxCorners, qualityLevel, minDistance, blockSize] = [
            30, 0.3, 7, 7,
          ];

          // parameters for lucas-kanade optical flow
          const winSize = new cv.Size(15, 15);
          const maxLevel = 2;
          const criteria = new cv.TermCriteria(
            cv.TermCriteria_EPS | cv.TermCriteria_COUNT,
            10,
            0.03
          );

          // warna random
          let color = [];

          for (let i = 0; i < maxCorners; i++) {
            color.push(
              new cv.Scalar(
                parseInt(Math.random() * 255),
                parseInt(Math.random() * 255),
                parseInt(Math.random() * 255),
                255
              )
            );
          }

          // ambil frame pertama dan cari sudut didalamnya
          const oldFrame = new cv.Mat(
            videoInput.height,
            videoInput.width,
            cv.CV_8UC4
          );

          cap.read(oldFrame);

          const oldGray = new cv.Mat();

          cv.cvtColor(oldFrame, oldGray, cv.COLOR_RGB2GRAY);

          let pZero = new cv.Mat();
          const none = new cv.Mat();

          cv.goodFeaturesToTrack(
            oldGray,
            pZero,
            maxCorners,
            qualityLevel,
            minDistance,
            none,
            blockSize
          );

          // buat mask image untuk gambar target
          const zeroEle = new cv.Scalar(0, 0, 0, 255);
          const mask = new cv.Mat(
            oldFrame.rows,
            oldFrame.cols,
            oldFrame.type(),
            zeroEle
          );

          const frame = new cv.Mat(
            videoInput.height,
            videoInput.width,
            cv.CV_8UC4
          );

          const frameGray = new cv.Mat();
          const pOne = new cv.Mat();
          const st = new cv.Mat();
          const err = new cv.Mat();

          try {
            if (!this._streaming) {
              // clean and stop
              frame.delete();
              oldGray.delete();
              pZero.delete();
              err.delete();
              mask.delete();

              this._wrapperElement.innerHTML = "";
              this._wrapperElement.style.display = "none";

              return;
            }

            let begin = Date.now();

            // start processing
            cap.read(frame);
            cv.cvtColor(frame, frameGray, cv.COLOR_RGB2GRAY);

            // calculate optical flow
            // ! fungsi ini masih error: assertion failed 215 checkVector()
            // cv.calcOpticalFlowPyrLK(
            //   oldGray,
            //   frameGray,
            //   pZero,
            //   pOne,
            //   st,
            //   err,
            //   winSize,
            //   maxLevel,
            //   criteria
            // );

            // select good points
            let goodNew = [];
            let goodOld = [];

            for (let i = 0; i < st.rows; i++) {
              if (st.data[i] === 1) {
                goodNew.push(
                  new cv.Point(pOne.data32F[i * 2], pOne.data32F[i * 2 + 1])
                );
                goodOld.push(
                  new cv.Point(pZero.data32F[i * 2], pZero.data32F[i * 2 + 1])
                );
              }
            }

            // draw the tracks
            for (let i = 0; i < goodNew.length; i++) {
              cv.line(mask, goodNew[i], goodOld[i], color[i], 2);
              cv.circle(frame, goodNew[i], 5, color[i], -1);
            }

            cv.add(frame, mask, frame);
            cv.imshow(this._videoOutputIdName, frameGray);

            // now update the previous frame and previous points
            frameGray.copyTo(oldGray);
            pZero.delete();
            pZero = null;
            pZero = new cv.Mat(goodNew.length, 1, cv.CV_32FC2);

            for (let i = 0; i < goodNew.length; i++) {
              pZero.data32F[i * 2] = goodNew[i].x;
              pZero.data32F[i * 2 + 1] = goodNew[i].y;
            }

            // tombol stop diklik
            document
              .getElementById(this._stopButtonIdName)
              .addEventListener("click", () => {
                this._streaming = false;
              });

            // schedule the next one
            let delay = 1000 / this._FPS - (Date.now() - begin);
            setTimeout(processVideo, delay);
          } catch (error) {
            Utils.printError(error);
          }
        };

        // schedule the first one
        setTimeout(processVideo, 0);
      })
      .catch((error) => {
        console.error(error);
      });
  },

  _camshiftVideoAnalys() {
    this._streaming = true;
    this._createVideoElement();

    // buka camera
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        document.getElementById(this._videoInputIdName).srcObject = stream;
        document.getElementById(this._videoInputIdName).play();

        const processVideo = () => {
          // opencv video capture
          const videoInput = document.getElementById(this._videoInputIdName);
          const cap = new cv.VideoCapture(videoInput);

          // ambil frame pertama dari video
          const frame = new cv.Mat(
            videoInput.height,
            videoInput.width,
            cv.CV_8UC4
          );

          cap.read(frame);

          // hardcode lokasi awal window
          let trackWindow = new cv.Rect(130, 90, 70, 80);

          // siapkan ROI tracking
          const roi = frame.roi(trackWindow);
          const hsvRoi = new cv.Mat();

          cv.cvtColor(roi, hsvRoi, cv.COLOR_RGBA2RGB);
          cv.cvtColor(hsvRoi, hsvRoi, cv.COLOR_RGB2HSV);

          const mask = new cv.Mat();
          const lowScalar = new cv.Scalar(30, 30, 0);
          const highScalar = new cv.Scalar(180, 180, 180);
          const low = new cv.Mat(
            hsvRoi.rows,
            hsvRoi.cols,
            hsvRoi.type(),
            lowScalar
          );
          const high = new cv.Mat(
            hsvRoi.rows,
            hsvRoi.cols,
            hsvRoi.type(),
            highScalar
          );

          cv.inRange(hsvRoi, low, high, mask);

          const roiHist = new cv.Mat();
          const hsvRoiVec = new cv.MatVector();

          hsvRoiVec.push_back(hsvRoi);

          cv.calcHist(hsvRoiVec, [0], mask, roiHist, [180], [0, 180]);
          cv.normalize(roiHist, roiHist, 0, 255, cv.NORM_MINMAX);

          // hapus mat tidak akan digunakan lagi
          roi.delete();
          hsvRoi.delete();
          mask.delete();
          low.delete();
          high.delete();
          hsvRoiVec.delete();

          // setup kriteria terminasi
          const termCrit = new cv.TermCriteria(
            cv.TermCriteria_EPS | cv.TermCriteria_COUNT,
            10,
            1
          );

          const hsv = new cv.Mat(
            videoInput.height,
            videoInput.width,
            cv.CV_8UC3
          );
          const hsvVec = new cv.MatVector();

          hsvVec.push_back(hsv);

          const dst = new cv.Mat();
          let trackBox = null;

          try {
            if (!this._streaming) {
              frame.delete();
              dst.delete();
              hsvVec.delete();
              roiHist.delete();
              hsv.delete();

              this._wrapperElement.innerHTML = "";
              this._wrapperElement.style.display = "none";

              return;
            }

            let begin = Date.now();

            // start processing.
            cap.read(frame);
            cv.cvtColor(frame, hsv, cv.COLOR_RGBA2RGB);
            cv.cvtColor(hsv, hsv, cv.COLOR_RGB2HSV);
            cv.calcBackProject(hsvVec, [0], roiHist, dst, [0, 180], 1);

            // apply camshift to get the new location
            [trackBox, trackWindow] = cv.CamShift(dst, trackWindow, termCrit);

            // Draw it on image
            let pts = cv.rotatedRectPoints(trackBox);
            cv.line(frame, pts[0], pts[1], [255, 0, 0, 255], 3);
            cv.line(frame, pts[1], pts[2], [255, 0, 0, 255], 3);
            cv.line(frame, pts[2], pts[3], [255, 0, 0, 255], 3);
            cv.line(frame, pts[3], pts[0], [255, 0, 0, 255], 3);

            cv.imshow(this._videoOutputIdName, frame);

            // tombol stop diklik
            document
              .getElementById(this._stopButtonIdName)
              .addEventListener("click", () => {
                this._streaming = false;
              });

            // schedule the next one.
            let delay = 1000 / this._FPS - (Date.now() - begin);
            setTimeout(processVideo, delay);
          } catch (error) {
            Utils.printError(error);
          }
        };

        setTimeout(processVideo, 0);
      })
      .catch((error) => {
        Utils.printError(error);
      });
  },

  _createVideoElement() {
    // bersih-bersin
    const imagePreview = document.querySelector("#imagePreview");
    imagePreview.style.display = "none";
    this._wrapperElement.innerHTML = "";
    this._wrapperElement.style.padding = "0 0 20px 0";

    // tombol stop video
    const stopButtonWrapperElement = document.createElement("div");
    stopButtonWrapperElement.classList.add("btn-stop-wrapper");
    const stopButtonElement = document.createElement("button");
    stopButtonElement.type = "button";
    stopButtonElement.id = this._stopButtonIdName;
    stopButtonElement.classList.add("btn-stop");
    stopButtonElement.innerText = "STOP";
    stopButtonWrapperElement.appendChild(stopButtonElement);
    this._wrapperElement.appendChild(stopButtonWrapperElement);

    // Buat element untuk pembungkus video
    // input video
    const videoElement = document.createElement("video");
    videoElement.style.marginBottom = "20px";
    videoElement.id = this._videoInputIdName;
    videoElement.width = "320";
    videoElement.height = "240";

    // output video
    const videoElementOutput = document.createElement("canvas");
    videoElementOutput.id = this._videoOutputIdName;
    videoElementOutput.getContext("2d", { willReadFrequenly: true });
    videoElementOutput.willReadFrequenly = true;

    this._wrapperElement.appendChild(videoElement);
    this._wrapperElement.appendChild(videoElementOutput);
    this._wrapperElement.style.display = "block";
  },
};

export default CarDetection;

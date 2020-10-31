<template>
    <div v-if="scan" class="video-container">
        <button
            type="button"
            class="btn btn-secondary rounded-pill"
            v-on:click="resetScan"
        >
            Abort
        </button>
        <video id="video"></video>
    </div>
</template>

<style scoped>
.video-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    /* overflow: hidden; */
    z-index: 10000;
}

.video-container video {
    /* Make video to at least 100% wide and tall */
    min-width: 100%;
    min-height: 100%;

    /* Setting width & height to auto prevents the browser from stretching or squishing the video */
    width: auto;
    height: auto;

    /* Center the video */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.video-container button {
    position: absolute;
    top: 5vh;
    left: 5vw;
    z-index: 20000;
}
</style>

<script>
/**
 * Component to create a video container for scanning barcodes.
 */

import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
// import { BrowserMultiFormatReader } from "@zxing/library";

export default {
    name: "Scan",
    data() {
        return {
            codeReader: null,
            selectedDeviceId: 0,
            scan: false
        };
    },
    mounted: function() {
        this.initCamera();
    },
    methods: {
        // init the camera for scanning barcodes
        initCamera: function() {
            this.codeReader = new BrowserMultiFormatReader();
            console.log("ZXing code reader initialized");
            this.codeReader.listVideoInputDevices().then(videoInputDevices => {
                this.selectedDeviceId = videoInputDevices[0].deviceId;
            });
        },

        // start the scanning of the camera frames and search for barcodes
        startScan: function() {
            this.scan = true;

            this.codeReader.decodeFromVideoDevice(
                this.selectedDeviceId,
                "video",
                (result, err) => {
                    if (result) {
                        console.log(result);
                        const barcode = result.text;
                        /**
                         * Triggers when a barcode was scanned.
                         *
                         * @property {String} barcode scanned barcode string
                         */
                        this.$emit("scanned", barcode);
                        this.scan = false;
                        this.codeReader.reset();
                    }
                    if (err && !(err instanceof NotFoundException)) {
                        console.error(err);
                    }
                }
            );
            console.log(
                `Started continous decode from camera with id ${this.selectedDeviceId}`
            );
        },

        // reset the scanning overlay
        resetScan: function() {
            this.codeReader.reset();
            this.scan = false;
            console.log("Reset.");
        }
    }
};
</script>

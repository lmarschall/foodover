<template>
    <div v-if="scan" class="video-container">
        <button
            type="button"
            class="btn btn-secondary rounded-pill"
            @click="resetScan"
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

<script setup lang="ts">
/**
 * Component to create a video container for scanning barcodes.
 */
import { ref } from "vue";
import { onMounted } from "@vue/runtime-core";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

const scan = ref(false);
const emit = defineEmits(["scanned"]);
defineExpose({
    startScan,
});

const codeReader = new BrowserMultiFormatReader();
let selectedDeviceId = "";

onMounted(async () => {
    await initCamera();
});

async function initCamera() {
    console.log("ZXing code reader initialized");
    codeReader.listVideoInputDevices().then((videoInputDevices) => {
        selectedDeviceId = videoInputDevices[0].deviceId;
    });
}

// start the scanning of the camera frames and search for barcodes
async function startScan() {
    scan.value = true;

    codeReader.decodeFromVideoDevice(
        selectedDeviceId,
        "video",
        (result: any, err: any) => {
            if (result) {
                console.log(result);
                const barcode = result.text;
                /**
                 * Triggers when a barcode was scanned.
                 *
                 * @property {String} barcode scanned barcode string
                 */
                emit("scanned", barcode);
                scan.value = false;
                codeReader.reset();
            }
            if (err && !(err instanceof NotFoundException)) {
                console.error(err);
            }
        }
    );
    console.log(
        `Started continous decode from camera with id ${selectedDeviceId}`
    );
}

// reset the scanning overlay
async function resetScan() {
    codeReader.reset();
    scan.value = false;
    console.log("Reset.");
}
</script>

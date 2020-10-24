<template>     
    <div v-if="scan" id="scanframe" class="video-container">
        <button type="button" class="btn btn-secondary rounded-pill" v-on:click="resetScan">Abort</button>
        <video id="video"></video>
    </div>
</template>

<style scoped>
.video-container
{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 10000;
}

.video-container video
{
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
    transform: translate(-50%,-50%);
}

.video-container button
{
    position: absolute;
    top: 5vh;
    left: 5vw;
    z-index: 20000;
}
</style>

<script>
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'
export default {
    name: 'scanframe',
    props: {
        scan: Boolean
    },
    data () {
        return {
            codeReader: null,
            selectedDeviceId: 0
        }
    },
    mounted: function () {
        this.initCamera()
    },
    methods:
    {
        initCamera: function () {
            // this.codeReader = new ZXing.BrowserMultiFormatReader()
            this.codeReader = new BrowserMultiFormatReader()
            // selectedDeviceId = videoInputDevices[0].deviceId
            console.log('ZXing code reader initialized')
            this.codeReader.listVideoInputDevices()
                .then((videoInputDevices) => {
                // const sourceSelect = document.getElementById('sourceSelect')
                this.selectedDeviceId = videoInputDevices[0].deviceId
                // if (videoInputDevices.length >= 1) {
                //     videoInputDevices.forEach((element) => {
                //     const sourceOption = document.createElement('option')
                //     sourceOption.text = element.label
                //     sourceOption.value = element.deviceId
                //     sourceSelect.appendChild(sourceOption)
                // })
            })
        },

        startScan: function () {
            this.scan = true

            this.codeReader.decodeFromVideoDevice(this.selectedDeviceId, 'video', (result, err) => {
                if (result) {
                    console.log(result)
                    this.$emit('scanned', result.text)
                    this.scan = false
                    this.codeReader.reset()
                }
                // if (err && !(err instanceof ZXing.NotFoundException)) {
                if (err && !(err instanceof NotFoundException)) {
                    console.error(err)
                    document.getElementById('result').textContent = err
                }
            })
            console.log(`Started continous decode from camera with id ${this.selectedDeviceId}`)
        },

        resetScan: function () {
            this.codeReader.reset()
            this.scan = false
            console.log('Reset.')
        }
    }
}
</script>
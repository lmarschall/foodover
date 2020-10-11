var app = new Vue({
    el: '#scanframe',
    delimiters: ['${','}'],
    data:
    {
        codeReader: null,
        scan: false,
        selectedDeviceId: 0,
        code: '',
        ingridients: [],
        ingridients_string: '',
        codes: []
    },
    computed: {
        axiosParams() {
            const params = new URLSearchParams();
            params.append('code', this.code);
            return params;
        },

        findIngridientsParams() {
            const params = new URLSearchParams();
            params.append('apiKey', )
            params.append('ingridients', this.ingridients_string);
            return params;
        },
    },
    mounted: function () {
        this.initCamera();
    },
    methods:
    {
        initCamera: function()
        {
            this.codeReader = new ZXing.BrowserMultiFormatReader()
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

        startScan: function()
        {
            this.scan = true

            this.codeReader.decodeFromVideoDevice(this.selectedDeviceId, 'video', (result, err) => {
                if (result) {
                  console.log(result)
                  this.code = result.text
                  this.scan = false
                  this.getProduct()
                  document.getElementById('result').textContent = result.text
                  this.codeReader.reset()
                }
                if (err && !(err instanceof ZXing.NotFoundException)) {
                  console.error(err)
                  document.getElementById('result').textContent = err
                }
              })
            console.log(`Started continous decode from camera with id ${this.selectedDeviceId}`)
        },

        resetScan: function()
        {
            this.codeReader.reset()
            document.getElementById('result').textContent = '';
            console.log('Reset.')
        },

        saveScan: function()
        {
            console.log("save scan!")
        },

        getProduct: function()
        {
            console.log(this.code)

            axios.get('/api/product', {
                params: this.axiosParams
                })
                .then((response) => {

                    console.log(response.data)
                    // this.reservation_list = response.data;
                    // this.ready = true;
                    // this.setupMarkers(this.schnors);
                })
                // .catch((err) => {
                    // this.loading = false;
                    // console.log(err);
                    // })
        },

        findRecipes: function()
        {
            console.log(this.ingriedents_string)
            
            axios.get('api/recipes', {
                params: this.axiosParams
                })
                .then((response) => {

                    console.log(response.data)
                    // this.reservation_list = response.data;
                    // this.ready = true;
                    // this.setupMarkers(this.schnors);
                })
                // .catch((err) => {
                    // this.loading = false;
                    // console.log(err);
                    // })
        }
    }
});
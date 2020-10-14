var search = new Vue({
    el: '#searchframe',
    delimiters: ['${','}'],
    data:
    {
        codeReader: null,
        code: '',
        scan: false,
        selectedDeviceId: 0,
        ingredients: ['apples', 'flour', 'sugar'],
        recipes: []
    },
    computed: {
        productParams() {
            const params = new URLSearchParams();
            params.append('code', this.code);
            return params;
        },

        ingredientsParams() {
            // create ingredients string from list
            // string format: apples,+flour,+sugar
            string = ''
            for (i = 0; i < this.ingredients.length; i++)
            {
                if(i==0)
                {
                    string += this.ingredients[i]
                } else {
                    string += ',+' + this.ingredients[i]
                }
            }
            const params = new URLSearchParams();
            params.append('ingredients', string);
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
                  this.findProduct()
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
            this.scan = false
            console.log('Reset.')
        },

        addIngredient: function(name)
        {
            this.ingredients.push(name)
        },

        dropIngredient: function(index)
        {
            this.ingredients.splice(index, 1)
        },

        validateInput: function(e)
        {
            if (e.keyCode === 13)
            {
                console.log('Enter was pressed');
                this.addIngredient(document.getElementById('input_ingredient').value)
                document.getElementById('input_ingredient').value = ''
            }
        },

        findProduct: function()
        {
            console.log(this.code)

            axios.get('/api/product', {
                params: this.productParams
                })
                .then((response) => {

                    console.log(response.data)

                    if(response.data != '')
                    {
                        this.addIngredient(response.data)
                    } else {
                        console.log("No Product found!")
                    }
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
            this.recipes = []

            axios.get('api/recipes', {
                params: this.ingredientsParams
                })
                .then((response) => {

                    this.recipes = response.data
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
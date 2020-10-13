var search = new Vue({
    el: '#scanframe',
    delimiters: ['${','}'],
    data:
    {
        codeReader: null,
        scan: false,
        selectedDeviceId: 0,
        code: '',
        ingredients: ['apples', 'flour', 'sugar'],
        codes: [],
        recipes: [],
        actual_recipe_id: 0
    },
    computed: {
        axiosParams() {
            const params = new URLSearchParams();
            params.append('code', this.code);
            return params;
        },

        findIngredientsParams() {
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

        addIngredient: function()
        {
            this.ingredients.push(document.getElementById('input_ingredient').value)
            document.getElementById('input_ingredient').value = ''
        },

        setActualRecipe: function(id)
        {
            console.log(id)
            this.actual_recipe_id = id
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
            this.recipes = []

            axios.get('api/recipes', {
                params: this.findIngredientsParams
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
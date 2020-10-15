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
        recipes: [],
        db: null
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
                    string += this.ingredients[i].name
                } else {
                    string += ',+' + this.ingredients[i].name
                }
            }
            const params = new URLSearchParams();
            params.append('ingredients', string);
            return params;
        },
    },
    mounted: function () {
        this.initCamera();
        this.loadData();
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
            const self = this

            // this.ingredients.push(name)
            this.db.ingredients.add({name: name}).then(function (index) {
                self.db.ingredients.get(index, function (ingredient) {
                    self.ingredients.push(ingredient)
                })
            })

        },

        dropIngredient: function(index)
        {
            const ingredient = this.ingredients[index]
            this.ingredients.splice(index, 1)
            this.db.ingredients.delete(ingredient.id)
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
        },

        loadData: function()
        {
            this.db = new Dexie("foodover_database");
            this.db.version(1).stores({
                ingredients: '++id, name'
            });

            const self = this;

            this.db.ingredients.toArray().then(function (ingredients) {

                self.ingredients = ingredients
            });
            // //
            // // Put some data into it
            // //
            // db.friends.put({name: "Nicolas", shoeSize: 8}).then (function()
            // {
            //     //
            //     // Then when data is stored, read from it
            //     //
            //         return db.friends.get('Nicolas');
            // }).then(function (friend) {
            //     //
            //     // Display the result
            //     //
            //     alert ("Nicolas has shoe size " + friend.shoeSize);
            // }).catch(function(error) {
            //     //
            //     // Finally don't forget to catch any error
            //     // that could have happened anywhere in the
            //     // code blocks above.
            //     //
            //     alert ("Ooops: " + error);
            // });
        }
    }
});
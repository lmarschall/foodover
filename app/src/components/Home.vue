<template>

    <div id="searchframe">

        <Bar v-bind:page="0" />

        <div v-if="scan" class="video-container">
            <button type="button" class="btn btn-secondary rounded-pill" v-on:click="resetScan">Abort</button>
            <video id="video"></video>
        </div>

        <!-- Input Modal -->
        <div class="modal fade" id="inputModal" tabindex="-1" aria-labelledby="inputModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="inputModalLabel">Input</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item input-item" v-for="(ingredient, index) in ingredients" v-bind:key="ingredient">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control-plaintext" v-bind:value="ingredient.name" style="border-width:0px; border:none;" readonly/>
                                <div class="input-group-append">
                                    <button type="button" class="close" v-on:click="dropIngredient(index)">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="input-group mb-3">
                                <input type="text" id="input_ingredient" v-on:keyup="validateInput" class="form-control" style="border-width:0px; border:none;" placeholder="what's left?">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-primary rounded" v-on:click="startScan">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-upc-scan" fill="#7FBD32" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="findRecipes" data-dismiss="modal">Search for
                        recipes</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="accordion sticky-top" id="accordionExample">
            <div class="card">
                <div class="card-header" id="headingOne">
                    <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <h2>Search</h2>
                        </button>
                    </h2>
                </div>
    
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body d-flex flex-wrap">
                    <span class="badge badge-pill badge-secondary" v-for="ingredient in ingredients" v-bind:key="ingredient"><h6>{{ingredient.name}}</h6></span>
                    <span class="badge badge-pill badge-primary" data-toggle="modal" data-target="#inputModal">
                        <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                        </svg>
                    </span>
                </div>
            </div>
        </div>

        <div class="row row-cols-1 row-cols-md-2">
            <div class="col mb-4" v-for="recipe in recipes" v-bind:key="recipe">
                <div class="card">
                    <img v-bind:src="recipe.image" class="card-img-top" alt="...">
                    <!-- <div class="card-img-overlay">
                    <P>LIKE</P>
                    </div> -->
                    <div class="card-body">
                    <h5 class="card-title">
                        <router-link v-bind:to="{ name: 'recipe', params: {id: recipe.id} }" class="stretched-link">{{recipe.title}}</router-link>
                    </h5>
                    <p class="card-text">{{recipe.usedIngredientCount}} of {{ingredients.length}} ingredients used</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="bar-placeholder"></div>
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

    li.list-group-item.input-item {
        padding-bottom: 0;
    }

    button.btn.btn-outline-primary.rounded {
        padding-bottom: 0.5em;
    }

    a.stretched-link {
        color: #213409;
    }

    .col.md-4 {
        margin: 2rem;
    }

    .row.row-cols-1.row-cols-md-2 {
        margin: 0;
        margin-top: 2rem;
        max-width: 100vw;
    }

    .bar-placeholder {
        height: 20vh;
    }

    .card {
        border-radius: 2rem;
    }

    img.card-img-top {
        border-radius: 2rem 2rem 0 0;
    }
</style>

<script>
    import Bar from './Bar'
    import axios from 'axios'
    // import Dexie from 'dexie'
    
    import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
    // import ZXing from '@zxing/library'

    export default {
        name: 'searchframe',
        components: {
            Bar
        },
        data () {
            return {
                codeReader: null,
                code: '',
                scan: false,
                selectedDeviceId: 0,
                ingredients: ['apples', 'flour', 'sugar'],
                recipes: []
            }
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
                var string = ''
                for (var i = 0; i < this.ingredients.length; i++)
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
            }
        },
        mounted: function () {
            this.initCamera();
            this.loadData();
        },
        methods:
        {
            initCamera: function()
            {
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
                    // if (err && !(err instanceof ZXing.NotFoundException)) {
                    if (err && !(err instanceof NotFoundException)) {
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
                document.db.ingredients.add({name: name}).then(function (index) {
                    document.db.ingredients.get(index, function (ingredient) {
                        self.ingredients.push(ingredient)
                    })
                })

            },

            dropIngredient: function(index)
            {
                const ingredient = this.ingredients[index]
                this.ingredients.splice(index, 1)
                document.db.ingredients.delete(ingredient.id)
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

                        document.db.recipes.clear()

                        var drops = []

                        for (var i=0;i<this.recipes.length;i++) {
                            drops.push({recipe: JSON.stringify(this.recipes[i])})
                        }

                        document.db.recipes.bulkAdd(drops)

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
                // this.db = new Dexie("foodover_database");
                // this.db.version(1).stores({
                //     ingredients: '++id, name',
                //     recipes: '++id, recipe'
                //     // search: '++id, recipes, ingredients',
                //     // recipes: '++id, recipe'
                // });

                const self = this;

                console.log("Load Data");
                console.log(document.db);

                document.db.ingredients.toArray().then(function (ingredients) {

                    self.ingredients = ingredients
                });

                document.db.recipes.toArray().then(function (recipes) {

                    for (var i=0; i<recipes.length;i++)
                    {
                        self.recipes.push(JSON.parse(recipes[i].recipe))
                    }
                });
            }
        }
    }
</script>
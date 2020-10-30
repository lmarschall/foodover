<template>
    <div v-if="file_ready">
        <Scan v-on:scanned="findProduct" ref="scan" />

        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div class="input-group mb-3">
                    <input
                        type="text"
                        id="input_ingredient"
                        v-on:keyup="validateInput"
                        class="form-control"
                        style="border-width:0px; border:none;"
                        placeholder="what's left?"
                    />
                    <div class="input-group-append">
                        <button
                            class="btn btn-outline-primary rounded scan-button"
                            v-on:click="scanClicked"
                        >
                            <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 16 16"
                                class="bi bi-upc-scan"
                                fill="#7FBD32"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"
                                />
                                <path
                                    d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </li>
            <li class="list-group-item input-item">  
                <div class="d-flex flex-wrap">
                    <div
                        v-for="(ingredient, index) in ingredients"
                        v-bind:key="ingredient"
                        class="card ingredients-card"
                    >
                        <img
                            :src="getIngredientImage(ingredient)"
                            class="img-fluid"
                            alt="Responsive image"
                        />
                        <div class="card-body ingredients-body">
                            {{ingredient}}
                        </div>
                        <div class="card-footer ingredients-footer">
                            <button
                                type="button"
                                class="close"
                                v-on:click="dropIngredient(index)"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.card.ingredients-card {
    width: 70px;
    margin: auto 5px;
    margin-bottom: 5px;
}
.card-footer.ingredients-footer {
    position: absolute;
    padding: 0 0 0 0;
    right: 0;
}
.card-body.ingredients-body {
    padding: 0 0 0 0;
    margin: 0 auto;
}
button.btn.btn-outline-primary.rounded.scan-button {
    padding-bottom: 10px;
}
</style>

<script>
/**
 * Component to handle the input of ingredients.
 */

import axios from "axios";

import Scan from "./Scan";

export default {
    name: "Input",
    props: {
        // ingredients input of user
        ingredients: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            all_ingredients: "",
            file_ready: false
        }
    },
    components: {
        Scan
    },
    mounted: function() {
        this.readFile();
    },
    methods: {

        readFile() {
            const self = this;

            axios
                .get("/top-1k-ingredients.csv")
                .then(response => {

                    var rawString = response.data;
                    var splittedLines = rawString.split('\n');
                    var resultArray = [];

                    for(var i=0;i<splittedLines.length;i++)
                    {
                        var line = splittedLines[i].split(';')[0]
                        resultArray.push(line);
                    }

                    self.all_ingredients = resultArray;
                    self.file_ready = true;
                });
        },

        // assemble path for ingredient image with ingredient name
        getIngredientImage(name) {
            const found = this.all_ingredients.find(element => element === name);
            var path = `https://spoonacular.com/cdn/ingredients_100x100/placeholder.jpg`;

            // check if ingredient was found
            if(found.length)
            {
                // assemble path
                path = `https://spoonacular.com/cdn/ingredients_100x100/${found}.jpg`;
            }

            return path;
        },

        // add ingredient to search params
        addIngredient: function(name) {
            this.ingredients.push(name);
        },

        // drop ingredient from search params
        dropIngredient: function(index) {
            this.ingredients.splice(index, 1);
        },

        // trigger scanning of barcode
        scanClicked: function() {
            this.$refs.scan.startScan();
        },

        // check if return was clicked and get the entered ingredients string
        validateInput: function(e) {
            if (e.keyCode === 13) {
                this.addIngredient(
                    document.getElementById("input_ingredient").value
                );
                document.getElementById("input_ingredient").value = "";
            }
        },

        // trigger search for recipes with chosen ingredients
        searchRecipes: function() {
            /**
             * Triggers to look for recipes with the current ingredients selection
             */
            this.$emit("searchRecipes");
        },

        // check for product with barcode api on returned barcode from scanner
        findProduct: function(code) {
            this.code = code;

            axios
                .get("/api/product", {
                    params: this.productParams
                })
                .then(response => {
                    if (response.data !== "") {
                        this.addIngredient(response.data);
                    } else {
                        console.log("No Product found!");
                    }
                    // this.reservation_list = response.data;
                    // this.ready = true;
                    // this.setupMarkers(this.schnors);
                });
            // .catch((err) => {
            // this.loading = false;
            // console.log(err);
            // })
        }
    }
}
</script>

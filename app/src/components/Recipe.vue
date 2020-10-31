<template>
    <div class="row" v-if="ready">
        <div
            v-if="split"
            class="col-md-4 d-none d-md-block"
            style="overflow: auto;"
        >
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <LikeShareSave
                        v-bind:aggregateLikes="recipe.aggregateLikes"
                        v-bind:saved="saved"
                        v-on:saved="saveRecipe"
                    />
                </li>
                <li class="list-group-item">
                    <Times
                        v-bind:readyInMinutes="recipe.readyInMinutes"
                        v-bind:preparationMinutes="recipe.preparationMinutes"
                        v-bind:cookingMinutes="recipe.cookingMinutes"
                    />
                </li>
                <li class="list-group-item">
                    <Ingredients
                        v-bind:ingredients="recipe.extendedIngredients"
                    />
                </li>
                <li class="list-group-item">
                    <Nutritions v-bind:nutritions="nutritions" />
                </li>
            </ul>
        </div>

        <div
            v-if="split"
            class="col-md-8 d-none d-md-block"
            style="overflow: auto;"
        >
            <div class="image-item-split">
                <img
                    :src="recipe.image"
                    class="img-fluid"
                    alt="Responsive image"
                />
            </div>
            <div class="image-placeholder"></div>
            <ul class="list-group list-group-flush">
                <li
                    class="list-group-item image-item"
                    v-bind:style="{
                        backgroundImage: 'url(' + recipe.image + ')'
                    }"
                >
                    <!-- <img :src="recipe.image" class="img-fluid" alt="Responsive image"> -->
                </li>
                <li class="list-group-item" v-html="recipe.summary"></li>
                <li class="list-group-item" v-html="recipe.instructions"></li>
            </ul>
        </div>

        <div v-if="split === false" class="col d-lg-none">
            <div class="image-item">
                <img
                    :src="recipe.image"
                    class="img-fluid"
                    alt="Responsive image"
                />
            </div>
            <div class="image-placeholder"></div>
            <div class="card">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex">
                        <div class="w-100">
                            <h2>{{ recipe.title }}</h2>
                        </div>
                        <div class="flex-shrink-1">
                            <router-link
                                v-bind:to="{ name: 'search' }"
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </router-link>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <LikeShareSave
                            v-bind:aggregateLikes="recipe.aggregateLikes"
                            v-bind:saved="saved"
                            v-on:saved="saveRecipe"
                        />
                    </li>
                    <li class="list-group-item" v-html="recipe.summary"></li>
                    <li class="list-group-item">
                        <Times
                            v-bind:readyInMinutes="recipe.readyInMinutes"
                            v-bind:preparationMinutes="
                                recipe.preparationMinutes
                            "
                            v-bind:cookingMinutes="recipe.cookingMinutes"
                        />
                    </li>
                    <li class="list-group-item">
                        <Ingredients
                            v-bind:ingredients="recipe.extendedIngredients"
                        />
                    </li>
                    <li class="list-group-item">
                        <Nutritions v-bind:nutritions="nutritions" />
                    </li>
                    <li
                        v-if="recipe.analyzedInstructions.length > 0"
                        class="list-group-item"
                    >
                        <Instructions
                            v-bind:instructions="recipe.analyzedInstructions[0]"
                        />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
img.img-fluid {
    min-width: 100%;
    min-height: 100%;
}

.image-item {
    height: 60vh;
    position: fixed;
    z-index: -1;
    left: 0;
    top: 0;
}

.image-item-split {
    height: 60vh;
    position: fixed;
    z-index: -1;
    left: 33vw;
    top: 0;
}

.image-placeholder {
    height: 55vh;
}

.card {
    border-radius: 2rem 2rem 0 0;
}

ul.list-group.list-group-flush {
    border-radius: 2rem 2rem 0 0;
}

li.list-group-item.d-flex {
    border-radius: 2rem 2rem 0 0;
}

div#recipeframe {
    overflow: hidden;
}
</style>

<script>
/**
 * Component to display the selected recipe.
 */

import axios from "axios";

import Ingredients from "./partials/Ingredients";
import LikeShareSave from "./partials/LikeShareSave";
import Nutritions from "./partials/Nutritions";
import Times from "./partials/Times";
import Instructions from "./partials/Instructions";

export default {
    name: "Recipe",
    components: {
        Ingredients,
        LikeShareSave,
        Nutritions,
        Times,
        Instructions
    },
    data() {
        return {
            recipe: null,
            saved: false,
            nutritions: null,
            ready: false
        };
    },
    computed: {
        // show splitted view on bigger screens
        split() {
            var bool = false;
            if (this.$mq === "large" || this.$mq === "extra") {
                bool = true;
            }
            return bool;
        },

        // computed params of the recipe api call
        recipeParams() {
            const params = new URLSearchParams();
            params.append("id", this.$route.params.id);
            return params;
        },

        // computed params of the nutritions api call
        nutritionsParams() {
            const params = new URLSearchParams();
            params.append("id", this.$route.params.id);
            return params;
        }
    },
    mounted: function() {
        this.getRecipe();
        this.getNutritions();
    },
    methods: {
        // get the selected recipe by the provided recipe id
        getRecipe: function() {
            const self = this;

            axios
                .get("/api/recipe", {
                    params: this.recipeParams
                })
                .then(response => {
                    self.recipe = response.data;

                    // check if recipe is in favorites
                    document.db.favorites.toArray().then(function(favorites) {
                        console.log(favorites);

                        for (var i = 0; i < favorites.length; i++) {
                            if (favorites[i].id === self.recipe.id) {
                                self.saved = true;
                            }
                        }
                    });
                });
            // .catch((err) => {
            // this.loading = false;
            // console.log(err);
            // })
        },

        // save the recipe to the users favorites
        saveRecipe: function() {
            document.db.favorites.add(this.recipe);
            this.saved = true;
        },

        // get the nutritions of the selected recipe
        getNutritions: function() {
            axios
                .get("/api/nutritions", {
                    params: this.nutritionsParams
                })
                .then(response => {
                    this.nutritions = response.data;
                    this.ready = true;
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
};
</script>

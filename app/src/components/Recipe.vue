<template>
    <div id="recipeframe">
        <!-- <div class="d-flex" v-if="ready">
            <router-link v-bind:to="{ name: 'home' }" class="btn btn-primary-outline">
                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-caret-left-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                </svg>
            </router-link> -->
        <!-- <h3 class="align-self-center">{{recipe.title}}</h3> -->
        <!-- </div> -->

        <div class="row" v-if="ready">
            <div class="col-md-4 d-none d-md-block" style="overflow: auto;">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <LikeShareSave
                            v-bind:aggregateLikes="recipe.aggregateLikes"
                        />
                    </li>
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
                </ul>
            </div>

            <div class="col-md-8 d-none d-md-block" style="overflow: auto;">
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
                    <li
                        class="list-group-item"
                        v-html="recipe.instructions"
                    ></li>
                </ul>
            </div>

            <div class="col d-md-none">
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
                                    v-bind:to="{ name: 'home' }"
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
                            />
                        </li>
                        <li
                            class="list-group-item"
                            v-html="recipe.summary"
                        ></li>
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
                        <li class="list-group-item">
                            <Instructions
                                v-bind:instructions="
                                    recipe.analyzedInstructions[0]
                                "
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- <script src='/js/recipe.js' type='text/javascript'></script> -->
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
import Ingredients from "./partials/Ingredients";
import LikeShareSave from "./partials/LikeShareSave";
import Nutritions from "./partials/Nutritions";
import Times from "./partials/Times";
import Instructions from "./partials/Instructions";

import axios from "axios";

export default {
    name: "recipeframe",
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
            nutritions: null,
            ready: false
        };
    },
    computed: {
        recipeParams() {
            const params = new URLSearchParams();
            params.append("id", this.$route.params.id);
            return params;
        },

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
        getRecipe: function() {
            axios
                .get("/api/recipe", {
                    params: this.recipeParams
                })
                .then(response => {
                    this.recipe = response.data;
                    this.ready = true;
                    console.log(response.data);
                    // this.reservation_list = response.data;
                    // this.ready = true;
                    // this.setupMarkers(this.schnors);
                });
            // .catch((err) => {
            // this.loading = false;
            // console.log(err);
            // })
        },

        getNutritions: function() {
            axios
                .get("/api/nutritions", {
                    params: this.nutritionsParams
                })
                .then(response => {
                    this.nutritions = response.data;
                    console.log(response.data);
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

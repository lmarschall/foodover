<template>
    <div>
        <Bar v-bind:page="0" />

        <Input
            v-on:searchRecipes="findRecipes"
            v-on:ingredientAdded="addIngredient"
            v-on:ingredientDropped="dropIngredient"
            v-bind:ingredients="ingredients"
        />

        <Filters />

        <Sort />

        <div class="accordion sticky-top" id="accordionExample">
            <div class="card">
                <div class="card-header" id="headingOne">
                    <h2 class="mb-0">
                        <button
                            class="btn btn-link btn-block text-left"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            <h2>Search</h2>
                        </button>
                    </h2>
                </div>
            </div>

            <div
                id="collapseOne"
                class="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
            >
                <div class="card-body d-flex flex-wrap">
                    <span
                        class="badge badge-pill badge-secondary"
                        v-for="ingredient in ingredients"
                        v-bind:key="ingredient"
                        ><h6>{{ ingredient.name }}</h6></span
                    >
                    <span
                        class="badge badge-pill badge-primary"
                        data-toggle="modal"
                        data-target="#inputModal"
                    >
                        <svg
                            width="2em"
                            height="2em"
                            viewBox="0 0 16 16"
                            class="bi bi-three-dots"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                            />
                        </svg>
                        Input
                    </span>
                    <div class="w-100" />
                    <span
                        class="badge badge-pill badge-primary"
                        data-toggle="modal"
                        data-target="#filtersModal"
                    >
                        <svg
                            width="2em"
                            height="2em"
                            viewBox="0 0 16 16"
                            class="bi bi-filter"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                            />
                        </svg>
                        Filter
                    </span>
                    <div class="w-100" />
                    <span
                        class="badge badge-pill badge-primary"
                        data-toggle="modal"
                        data-target="#sortModal"
                    >
                        <svg
                            width="2em"
                            height="2em"
                            viewBox="0 0 16 16"
                            class="bi bi-sort-down"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M3 2a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-1 0v-10A.5.5 0 0 1 3 2z"
                            />
                            <path
                                fill-rule="evenodd"
                                d="M5.354 10.146a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L3 11.793l1.646-1.647a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 9a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
                            />
                        </svg>
                        Sort
                    </span>
                </div>
            </div>
        </div>

        <Recipes v-bind:recipes="recipes" v-bind:ingredients="ingredients" />

        <Placeholder />
    </div>
</template>

<style scoped>
li.list-group-item.input-item {
    padding-bottom: 0;
}

button.btn.btn-outline-primary.rounded {
    padding-bottom: 0.5em;
}
</style>

<script>
import Bar from "./partials/Bar";
import Recipes from "./partials/Recipes";
import Input from "./partials/Input";
import Filters from "./partials/Filters";
import Sort from "./partials/Sort";
import Placeholder from "./partials/Placeholder";

import axios from "axios";

export default {
    name: "Search",
    components: {
        Bar,
        Recipes,
        Filters,
        Input,
        Sort,
        Placeholder
    },
    data() {
        return {
            ingredients: ["apples", "flour", "sugar"],
            recipes: [],
            search_params: {
                sort: "max-used-ingredients",
                direction: "asc",
                offset: 0
            },
            intolerances: [],
            diet: ""
        };
    },
    computed: {
        productParams() {
            const params = new URLSearchParams();
            params.append("code", this.code);
            return params;
        },

        ingredientsParams() {
            // create ingredients string from list
            // string format: apples,+flour,+sugar
            var ingredientsString = "";
            for (var i = 0; i < this.ingredients.length; i++) {
                if (i === 0) {
                    ingredientsString += this.ingredients[i].name;
                } else {
                    ingredientsString += ",+" + this.ingredients[i].name;
                }
            }
            const params = new URLSearchParams();
            params.append("ingredients", ingredientsString);
            params.append("intolerances", ""); // "Egg,+Gluten"
            params.append("diet", ""); // "Vegan"
            params.append("sort", this.search_params.sort);
            params.append("direction", this.search_params.direction);
            params.append("offset", this.search_params.offset);
            console.log(params);
            return params;
        }
    },
    mounted: function() {
        this.loadData();
    },
    methods: {
        addIngredient: function(name) {
            const self = this;

            // this.ingredients.push(name)
            document.db.ingredients.add({ name: name }).then(function(index) {
                document.db.ingredients.get(index, function(ingredient) {
                    self.ingredients.push(ingredient);
                });
            });
        },

        dropIngredient: function(index) {
            const ingredient = this.ingredients[index];
            this.ingredients.splice(index, 1);
            document.db.ingredients.delete(ingredient.id);
        },

        findRecipes: function() {
            this.recipes = [];

            axios
                .get("api/recipes", {
                    params: this.ingredientsParams
                })
                .then(response => {
                    this.recipes = response.data.results;
                    console.log(response.data);

                    document.db.recipes.clear();

                    var drops = [];

                    for (var i = 0; i < this.recipes.length; i++) {
                        drops.push({ recipe: JSON.stringify(this.recipes[i]) });
                    }

                    document.db.recipes.bulkAdd(drops);
                });
            // .catch((err) => {
            // this.loading = false;
            // console.log(err);
            // })
        },

        loadData: function() {
            const self = this;

            console.log("Load Data");
            console.log(document.db);

            document.db.ingredients.toArray().then(function(ingredients) {
                self.ingredients = ingredients;
            });

            document.db.recipes.toArray().then(function(recipes) {
                for (var i = 0; i < recipes.length; i++) {
                    self.recipes.push(JSON.parse(recipes[i].recipe));
                }
            });

            document.db.intolerances.toArray().then(function(intolerances) {
                for (var i = 0; i < intolerances.length; i++) {
                    self.intolerances.push(intolerances[i].intolerance);
                }
            });
        }
    }
};
</script>

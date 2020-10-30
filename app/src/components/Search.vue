<template>
    <div class="row">
        <Bar v-bind:page="1" />

        <!-- Left Sidebar -->
        <div
            v-if="$mq === 'lg' || $mq === 'xl'"
            class="col-lg-4 d-none d-lg-block"
            style="overflow: auto;"
        >
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <a
                        class="nav-link active"
                        id="home-tab"
                        data-toggle="tab"
                        href="#home"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                        >Input</a
                    >
                </li>
                <li class="nav-item" role="presentation">
                    <a
                        class="nav-link"
                        id="profile-tab"
                        data-toggle="tab"
                        href="#profile"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                        >Filters</a
                    >
                </li>
                <li class="nav-item" role="presentation">
                    <a
                        class="nav-link"
                        id="contact-tab"
                        data-toggle="tab"
                        href="#contact"
                        role="tab"
                        aria-controls="contact"
                        aria-selected="false"
                        >Sort</a
                    >
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div
                    class="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                >
                    <Input
                        v-on:searchRecipes="findRecipes"
                        v-bind:ingredients="search_params.ingredients"
                    />
                </div>
                <div
                    class="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                >
                    <Filters
                        v-bind:intolerances="search_params.intolerances"
                        v-bind:diet="search_params.diet"
                    />
                </div>
                <div
                    class="tab-pane fade"
                    id="contact"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                >
                    <Sort v-bind:actual_sort="search_params.sort" />
                </div>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                >
                    Close
                </button>
                <button
                    type="button"
                    class="btn btn-primary"
                    v-on:click="findRecipes"
                    data-dismiss="modal"
                >
                    Search for recipes
                </button>
            </div>
            <Placeholder />
        </div>
        <!-- Mainframe  -->
        <div
            v-if="$mq === 'lg' || $mq === 'xl'"
            class="col-lg-8 d-none d-lg-block"
            style="overflow: auto;"
        >
            <Recipes v-bind:recipes="recipes" v-bind:display="'COLUMN'" />
            <Placeholder />
        </div>

        <!-- Small Frame -->
        <div v-if="$mq === 'sm' || $mq === 'md'" class="col d-lg-none">
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

                <!-- Spans -->
                <div
                    id="collapseOne"
                    class="collapse show"
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                >
                    <div class="card-body d-flex flex-wrap">
                        <span
                            class="badge badge-pill badge-secondary"
                            v-for="ingredient in search_params.ingredients"
                            v-bind:key="ingredient"
                            ><h6>{{ ingredient }}</h6></span
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

            <!-- Input Modal -->
            <div
                class="modal fade"
                id="inputModal"
                tabindex="-1"
                aria-labelledby="inputModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="inputModalLabel">
                                Input
                            </h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <Input
                                v-on:searchRecipes="findRecipes"
                                v-bind:ingredients="search_params.ingredients"
                            />
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                class="btn btn-primary"
                                v-on:click="findRecipes"
                                data-dismiss="modal"
                            >
                                Search for recipes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filter Modal -->
            <div
                class="modal fade"
                id="filtersModal"
                tabindex="-1"
                aria-labelledby="filtersModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="filtersModalLabel">
                                Filters
                            </h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" style="overflow: auto">
                            <Filters
                                v-bind:intolerances="search_params.intolerances"
                                v-bind:diet="search_params.diet"
                            />
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <!-- <button
                                type="button"
                                class="btn btn-primary"
                                v-on:click="searchRecipes"
                                data-dismiss="modal"
                            >
                                Search for recipes
                            </button> -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sort Modal -->
            <div
                class="modal fade"
                id="sortModal"
                tabindex="-1"
                aria-labelledby="sortModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="sortModalLabel">
                                Sort
                            </h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" style="overflow: auto">
                            <Sort v-bind:actual_sort="search_params.sort" />
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <!-- <button
                            type="button"
                            class="btn btn-primary"
                            v-on:click="searchRecipes"
                            data-dismiss="modal"
                        >
                            Search for recipes
                        </button> -->
                        </div>
                    </div>
                </div>
            </div>

            <Recipes v-bind:recipes="recipes" v-bind:display="'COLUMN'" />

            <Placeholder />
        </div>
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
/**
 * Component to display the search results.
 */

import axios from "axios";

import Bar from "./partials/Bar";
import Placeholder from "./partials/Placeholder";
import Recipes from "./partials/Recipes";
import Input from "./partials/Input";
import Filters from "./partials/Filters";
import Sort from "./partials/Sort";

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
            recipes: [],
            search_params: {
                ingredients: [],
                intolerances: [],
                diet: "",
                sort: "",
                direction: "",
                offset: "0"
            }
        };
    },
    computed: {
        // computed params for the ingredients api call
        ingredientsParams() {
            // create ingredients string from list
            // string format: apples,+flour,+sugar
            var ingredientsString = "";
            for (var i = 0; i < this.search_params.ingredients.length; i++) {
                if (i === 0) {
                    ingredientsString += this.search_params.ingredients[i];
                } else {
                    ingredientsString +=
                        ",+" + this.search_params.ingredients[i];
                }
            }
            const params = new URLSearchParams();
            params.append("ingredients", ingredientsString);
            params.append("intolerances", this.search_params.intolerances); // "Egg,+Gluten"
            params.append("diet", this.search_params.diet); // "Vegan"
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
        // save the actual search params
        saveSearch: function() {
            console.log("Save Search");
            var newSearch = {
                ingredients: this.search_params.ingredients,
                intolerances: this.search_params.intolerances,
                diet: this.search_params.diet,
                sort: this.search_params.sort,
                direction: this.search_params.direction,
                offset: this.search_params.offset,
                // recipes: JSON.stringify(this.recipes)
                recipes: this.recipes
            };

            document.db.searches.add(newSearch);
        },

        // find the recipes by the selected ingredients params
        findRecipes: function() {
            this.recipes = [];
            console.log("find Recipes clicked!");

            axios
                .get("api/recipes", {
                    params: this.ingredientsParams
                })
                .then(response => {
                    console.log(response.data);
                    this.recipes = response.data;
                    this.saveSearch();
                });
            // .catch((err) => {
            // this.loading = false;
            // console.log(err);
            // })
        },

        // load the last search in the component
        loadData: function() {
            const self = this;

            console.log("Load Data");
            console.log(document.db);

            // get the last search
            // get the params of the last search and provide them

            document.db.searches.toArray().then(function(searches) {
                if (searches.length > 0) {
                    const lastSearch = searches[searches.length - 1];
                    self.search_params.ingredients = lastSearch.ingredients;
                    self.search_params.intolerances = lastSearch.intolerances;
                    self.search_params.diet = lastSearch.diet;
                    self.search_params.sort = lastSearch.sort;
                    self.search_params.direction = lastSearch.direction;
                    self.search_params.offset = lastSearch.offset;
                    self.recipes = lastSearch.recipes;
                }
            });
        }
    }
};
</script>

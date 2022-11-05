<template>
    <div class="row">
        <Bar :page="1" />

        <!-- Left Sidebar -->
        <div v-if="split" class="col-md-4 d-none d-md-block">
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
                    <Input @searchRecipes="findRecipes" />
                </div>
                <div
                    class="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                >
                    <Filters />
                </div>
                <div
                    class="tab-pane fade"
                    id="contact"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                >
                    <Sort />
                </div>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-primary"
                    @click="findRecipes"
                    data-dismiss="modal"
                >
                    Search for recipes
                </button>
            </div>
            <Placeholder />
        </div>
        <!-- Mainframe  -->
        <div
            v-if="split"
            class="col-md-8 d-none d-md-block"
            style="overflow: auto"
        >
            <Recipes :recipes="recipes" :display="'COLUMN'" />
            <Placeholder />
        </div>

        <!-- Small Frame -->
        <div v-if="split === false" class="col d-lg-none">
            <div class="accordion sticky-top" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                            <button
                                class="btn btn-block text-left"
                                type="button"
                                @click="opened = !opened"
                                data-toggle="collapse"
                                data-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                            >
                                <h2>
                                    <svg
                                        v-if="opened"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 16 16"
                                        class="bi bi-caret-down-fill"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                                        />
                                    </svg>
                                    <svg
                                        v-else
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 16 16"
                                        class="bi bi-caret-right-fill"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
                                        />
                                    </svg>
                                    Search
                                </h2>
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
                    <div class="card-body d-flex flex-wrap span-card">
                        <span
                            class="badge badge-pill badge-secondary"
                            v-for="ingredient in ingredients"
                            :key="ingredient"
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
                        <!-- <span
                            class="badge badge-pill badge-primary disabled"
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
                            class="badge badge-pill badge-primary disabled"
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
                        </span> -->
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
                            <Input @searchRecipes="findRecipes" />
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
                                @click="findRecipes"
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
                            <Filters />
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
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
                            <Sort />
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Recipes
                :recipes="recipes"
                :display="'COLUMN'"
                :observer="observer"
            />

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

div#accordionExample {
    background-color: white;
}

.row {
    max-width: 100vw;
    margin: 0 auto;
}

h2 {
    color: #213409;
}
</style>

<script setup lang="ts">
/**
 * Component to display the search results.
 */

import SpoonacularService from "./../services/spoonacular";

import Bar from "./../components/Bar.vue";
import Placeholder from "./../components/Placeholder.vue";
import Recipes from "./../components/Recipes.vue";
import Input from "./../components/Input.vue";
import Filters from "./../components/Filters.vue";
import Sort from "./../components/Sort.vue";
import { onUnmounted, ref } from "vue";
import { useIngredientsStore } from "./../stores/ingredients";
import { useSearchesStore } from "./../stores/searches";
import { Collapse } from "bootstrap";

const ingredientStore = useIngredientsStore();
const searchesStore = useSearchesStore();
const opened = ref(true);
const split = ref(false);
const recipes = ref([]);
const offset = ref(0);

const observer = new IntersectionObserver(onElementObserved, {
    root: document.body,
    threshold: 1.0
});

loadData();

// computed params for the ingredients api call
function ingredientsParams() {
    // create ingredients string from list
    // string format: apples,+flour,+sugar
    const ingredientsString = ingredientStore.getIngredientsString();

    const params = new URLSearchParams();
    params.append("ingredients", ingredientsString);
    // params.append("intolerances", this.search_params.intolerances); // "Egg,+Gluten"
    // params.append("diet", this.search_params.diet); // "Vegan"
    // params.append("sort", this.search_params.sort);
    // params.append("direction", this.search_params.direction);
    // params.append("offset", offset.value);
    params.append("sort", "min-missing-ingredients");
    params.append("sortDirection", "asc");
    params.append("offset", "0");
    return params;
}

// save the actual search params
function saveSearch() {
    const newSearch = {
        ingredients: ingredientStore.getIngredients(),
        // intolerances: this.$store.state.search_params.intolerances,
        // diet: this.$store.state.search_params.diet,
        // sort: this.$store.state.search_params.sort,
        // direction: this.$store.state.search_params.direction,
        // offset: this.$store.state.search_params.offset,
        // recipes: JSON.stringify(this.recipes)
        recipes: recipes.value,
    };

    searchesStore.addSearch(newSearch);
}

// find the recipes by the selected ingredients params
// function findRecipes(continueSearch = false) {
function findRecipes() {
    // if (!continueSearch) {
    //     recipes.value = [];
    // }

    const ingredients = ingredientStore.getIngredientsString();

    SpoonacularService.searchByIngredients(
        ingredients,
        "min-missing-ingredients"
    ).then((response: any) => {
        console.log(response);
        recipes.value = response.results;
        saveSearch();
    });
    // TODO handle errors
}

function ingredients() {
    return ingredientStore.getIngredients();
}

// load the last search in the component
function loadData() {
    recipes.value = searchesStore.getLastSearchRecipes();
}

onUnmounted(async () => {
    observer.disconnect();
});

function onElementObserved(entries) {
    entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) {
            return;
        }

        // this.observer.unobserve(target);

        setTimeout(() => {
            const i = parseInt(target.getAttribute("index"));
            // console.log(i);
            const collapseElement = new Collapse(document.getElementById("collapseOne") as HTMLElement);

            // show search collapse on top
            if (i === 0) {
                // $("#collapseOne").collapse("show");
                collapseElement.collapse("show");
                opened.value = true;
            }

            // close search collapse on scroll
            if (i >= 1) {
                // $("#collapseOne").hide
                collapseElement.collapse("hide");
                opened.value = false;
            }

            // get new recipes if end of search page is reached
            if (i >= recipes.value.length - 1) {
                console.log("end reached");
                offset.value = i + 1;
                // this.findRecipes(true);
            }
        }, 1000);
    });
}
</script>

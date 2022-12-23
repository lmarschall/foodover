<template>
    <div class="container" style="padding-top: 1rem; height: 100vh">
        <Bar :page="1" />

        <!-- Search Frame -->
        <div
            class="card-body span-card rounded-pill sticky-top"
            data-toggle="modal"
            data-target="#inputModal"
            id="accordionExample"
        >
            <!-- Spans -->
            <div class="d-flex flex-wrap">
                <span
                    class="badge badge-pill badge-secondary"
                    v-for="ingredient in ingredients()"
                    :key="ingredient"
                    ><h6>{{ ingredient }}</h6></span
                >
                <span class="badge badge-pill badge-primary">
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
                </span>
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
                        <h5 class="modal-title" id="inputModalLabel">Input</h5>
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

        <Recipes :recipes="recipes" :display="'COLUMN'" :observer="observer" />

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

div#accordionExample {
    background-color: white;
    /* padding-top: 1rem; */
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
import { useRecommendsStore } from "../stores/recommends";

import $ from "jquery";

const ingredientStore = useIngredientsStore();
const searchesStore = useSearchesStore();
const recommendsStore = useRecommendsStore();

const opened = ref(true);
const recipes = ref([]);
const offset = ref(0);

const observer = new IntersectionObserver(onElementObserved, {
    root: document.body,
    threshold: 1.0,
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
    // reset recommends on new search
    recommendsStore.resetRecommends();
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

function onElementObserved(elements: IntersectionObserverEntry[]) {
    elements.forEach((element: IntersectionObserverEntry) => {
        if (!element.isIntersecting) {
            return;
        }

        // observer.unobserve(target);

        setTimeout(() => {
            const i = parseInt(element.target.getAttribute("index") as string);
            // const collapseElement = new Collapse(
            //     document.getElementById("collapseOne") as HTMLElement
            // );

            // show search collapse on top
            if (i === 0) {
                $("#collapseOne").collapse("show");
                // collapseElement.collapse("show");
                opened.value = true;
            }

            // close search collapse on scroll
            if (i >= 1) {
                $("#collapseOne").collapse("hide");
                // collapseElement.collapse("hide");
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

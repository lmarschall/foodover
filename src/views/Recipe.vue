<template>
    <div class="row" v-if="ready === 2">
        <div class="image-item">
            <img :src="recipe.image" class="img-fluid" alt="Responsive image" />
        </div>
        <div class="image-placeholder"></div>
        <div class="card">
            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex">
                    <div class="w-100">
                        <h2>{{ recipe.title }}</h2>
                    </div>
                    <div class="flex-shrink-1">
                        <a
                            @click="$router.back()"
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </a>
                    </div>
                </li>
                <li class="list-group-item">
                    <LikeShareSave
                        :aggregate-likes="recipe.aggregateLikes"
                        :saved="saved"
                        @saved="saveRecipe"
                    />
                </li>
                <li class="list-group-item" v-html="recipe.summary"></li>
                <li class="list-group-item">
                    <Times
                        :ready-in-minutes="recipe.readyInMinutes"
                        :preparation-minutes="recipe.preparationMinutes"
                        :cooking-minutes="recipe.cookingMinutes"
                    />
                </li>
                <li class="list-group-item">
                    <Ingredients :ingredients="recipe.extendedIngredients" />
                </li>
                <li class="list-group-item">
                    <Nutritions :nutritions="nutritions" />
                </li>
                <li
                    v-if="recipe.analyzedInstructions.length > 0"
                    class="list-group-item"
                >
                    <Instructions
                        :instructions="recipe.analyzedInstructions[0]"
                    />
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
img.img-fluid {
    min-width: 100vw;
    min-height: 100%;
}

.image-item {
    height: 60vh;
    position: fixed;
    z-index: 0;
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

.row {
    max-width: 100vw;
    margin: 0 auto;
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

<script setup lang="ts">
/**
 * Component to display the selected recipe.
 */

import { ref } from "vue";
import { useRoute } from "vue-router";

import { useFavoritesStore } from "./../stores/favorites";

import SpoonacularService from "./../services/spoonacular";

import Ingredients from "./../components/Ingredients.vue";
import LikeShareSave from "./../components/LikeShareSave.vue";
import Nutritions from "./../components/Nutritions.vue";
import Times from "./../components/Times.vue";
import Instructions from "./../components/Instructions.vue";

const route = useRoute();
const id = route.params.id as string;
const favoritesStore = useFavoritesStore();

const ready = ref(0);
const saved = ref(false);
const recipe = ref();
const nutritions = ref();

// get the selected recipe by the provided recipe id
SpoonacularService.getRecipe(id)
    .then((response: any) => {
        recipe.value = response;
        recipe.value.image = `https://spoonacular.com/recipeImages/${recipe.value.id}-480x360.jpg`;

        // check if recipe is in favorites
        if (favoritesStore.checkFavorite(recipe.value)) {
            saved.value = true;
        }

        ready.value = ready.value + 1;
    })
    .catch((err: any) => {
        console.log(err);
    });

// get the nutritions of the selected recipe
SpoonacularService.getNutritions(id)
    .then((response: any) => {
        nutritions.value = response;
        ready.value = ready.value + 1;
    })
    .catch((err: any) => {
        console.log(err);
    });

// save the recipe to the users favorites
function saveRecipe() {
    favoritesStore.addFavorite(recipe.value);
    saved.value = true;
}
</script>

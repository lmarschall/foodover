<template>
    <div style="height: 100vh;">
        <Bar :page="0" />

        <h2 v-if="random">For your inspiration</h2>
        <h2 v-else-if="!random">Inspired by your last searches</h2>
        <Recipes :recipes="recommends" :display="'ROW'" :observer="observer" />
        <h2>Your favorites</h2>
        <Recipes :recipes="favorites" :display="'ROW'" :observer="observer" />

        <Placeholder />
    </div>
</template>

<style scoped>
h2 {
    padding: 1rem 2rem 0 2rem;
}
</style>

<script setup lang="ts">
/**
 * Component to display recommended or random recipes and the user favorites.
 */

import { onMounted, onUnmounted } from "@vue/runtime-core";
import { ref } from "vue";

import { useFavoritesStore } from "./../stores/favorites";
import { useSearchesStore } from "./../stores/searches";
import { useRecommendsStore } from "./../stores/recommends";
import { useRandomsStore } from "./../stores/randoms";

import SpoonacularService from "./../services/spoonacular";

import Bar from "./../components/Bar.vue";
import Placeholder from "./../components/Placeholder.vue";
import Recipes from "./../components/Recipes.vue";

document.title = "Home - Foodover";

const favoritesStore = useFavoritesStore();
const searchesStore = useSearchesStore();
const recommendsStore = useRecommendsStore();
const randomsStore = useRandomsStore();

const random = ref(true);
const recommends = ref([] as any[]);
const favorites = ref([] as any[]);

const observer = new IntersectionObserver(onElementObserved, {
    root: document.body,
    threshold: 0.0,
});

onMounted(async () => {
    await getRecommends();
    await getFavorites();
});

onUnmounted(async () => {
    observer.disconnect();
});

function onElementObserved(elements: IntersectionObserverEntry[]) {
    elements.forEach((element: IntersectionObserverEntry) => {
        if (!element.isIntersecting) {
            return;
        }

        observer.unobserve(element.target);

        setTimeout(() => {
            const i = element.target.getAttribute("image");
            if (element.target.firstChild) {
                (element.target.firstChild as any).src = i;
            }
        }, 100);
    });
}

// get recommended or random recipes for the user
async function getRecommends() {
    const savedSearches = searchesStore.getSearches();
    const savedRecommends = recommendsStore.getRecommends();
    const savedRandoms = randomsStore.getRandoms();

    if (savedSearches.length > 0) {
        random.value = false;
        const lastSearch = savedSearches[savedSearches.length - 1];
        const lastRecipe = lastSearch.recipes[0];

        if (savedRecommends.length > 0) {
            recommends.value = savedRecommends;
        } else {
            recommends.value = await SpoonacularService.getRecommends(
                lastRecipe.id
            );
            recommendsStore.setRecommends(recommends.value);
        }
    } else {
        if (savedRandoms.length > 0) {
            recommends.value = savedRandoms;
        } else {
            recommends.value = await SpoonacularService.getRandoms();
            randomsStore.setRandoms(recommends.value);
        }
    }

    // populate the results with images
    for (let i = 0; i < recommends.value.length; i++) {
        recommends.value[
            i
        ].image = `https://spoonacular.com/recipeImages/${recommends.value[i].id}-480x360.jpg`;
    }
}

// get the users favorite recipes
async function getFavorites() {
    favorites.value = favoritesStore.getFavorites();
}
</script>

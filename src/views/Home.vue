<template>
    <div>
        <Bar :page="0" />

        <h2 v-if="random">For your inspiration</h2>
        <h2 v-else-if="!random">Inspired by your last searches</h2>
        <Recipes :recipes="recommends" :display="'ROW'" />
        <h2>Your favorites</h2>
        <Recipes :recipes="favorites" :display="'ROW'" />

        <Placeholder />
    </div>
</template>

<style scoped>
h2 {
    margin: 1rem 2rem 0 2rem;
}
</style>

<script setup lang="ts">
/**
 * Component to display recommended or random recipes and the user favorites.
 */

import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";

import { useFavoritesStore } from "./../stores/favorites";
import { useSearchesStore } from "./../stores/searches";

import SpoonacularService from "./../services/spoonacular";

import Bar from "./../components/Bar.vue";
import Placeholder from "./../components/Placeholder.vue";
import Recipes from "./../components/Recipes.vue";

document.title = "Home - Foodover";

const favoritesStore = useFavoritesStore();
const searchesStore = useSearchesStore();
const random = ref(true);
const recommends = ref([] as any[]);
const favorites = ref([] as any[]);

// const observer = new IntersectionObserver(onElementObserved, {
// root: $el
// threshold: 1.0,
// });

onMounted(async () => {
    // await getRecommends();
    await getFavorites();
});
// onCrea() {
//     this.observer = new IntersectionObserver(onElementObserved, {
//         root: this.$el
//         // threshold: 1.0,
//     });
// },
// beforeDestroy() {
//     this.observer.disconnect();
// },
// function onElementObserved(entries) {
//     entries.forEach(({ target, isIntersecting }) => {
//         if (!isIntersecting) {
//             return;
//         }

//         this.observer.unobserve(target);

//         setTimeout(() => {
//             const i = target.getAttribute("image");
//             target.firstChild.src = i;
//         }, 100);
//     });
// }

// get recommended or random recipes for the user
async function getRecommends() {
    const searches = searchesStore.getSearches();

    if (searches.length > 0) {
        const lastSearch = searches[searches.length - 1];
        const lastRecipe = lastSearch.recipes[0];

        recommends.value = await SpoonacularService.getRecommends(
            lastRecipe.id
        );
    } else {
        recommends.value = await SpoonacularService.getRandoms();
    }

    // populate the results with images
    //             for (var i = 0; i < self.recommends.length; i++) {
    //                 self.recommends[
    //                     i
    //                 ].image = `https://spoonacular.com/recipeImages/${self.recommends[i].id}-480x360.jpg`;
    //             }
}

// get the users favorite recipes
async function getFavorites() {
    favorites.value = favoritesStore.getFavorites();
    console.log(favorites.value);
}
</script>

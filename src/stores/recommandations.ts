import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useRecipesStore = defineStore("recipes", () => {
    const recipes = useStorage("recipes", [] as any[]);

    // function checkFavorite(recipe: any) {
    //     favorites.value.forEach((favorite: any) => {
    //         if (favorite.id == recipe.id) {
    //             return true;
    //         }
    //     });
    //     return false;
    // }

    // function addFavorite(recipe: any) {
    //     favorites.value.push(recipe);
    // }

    // function getFavorites() {
    //     return favorites.value;
    // }

    // return { checkFavorite, addFavorite, getFavorites };
});
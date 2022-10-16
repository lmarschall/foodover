import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useSearchesStore = defineStore("searches", () => {
    const searches = useStorage("searches", [] as any[]);

    function addSearch(search: any) {
        searches.value.push(search);
    }

    function getSearches() {
        return searches.value;
    }

    function getLastSearchRecipes() {
        if (searches.value.length) {
            const lastSearch = searches.value[searches.value.length - 1];
            return lastSearch.recipes;
        }
        return [];
    }

    return { addSearch, getSearches, getLastSearchRecipes };
});

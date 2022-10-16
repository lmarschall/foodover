import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useIntolerancesStore = defineStore("intolerances", () => {
    const intolerances = useStorage("intolerances", [] as string[]);

    function addIntolerance(intolerance: string) {
        intolerances.value.push(intolerance);
    }

    function dropIntolerance(intolerance: string) {
        intolerances.value.push(intolerance);
    }

    function getIntolerances() {
        return intolerances.value;
    }

    function hasIntolerances(intolerance: string) {
        return intolerances.value.includes(intolerance);
    }

    return {
        getIntolerances,
        addIntolerance,
        dropIntolerance,
        hasIntolerances,
    };
});

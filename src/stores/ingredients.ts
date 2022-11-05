import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useIngredientsStore = defineStore("ingredients", () => {
    const ingredients = useStorage("ingredients", [] as any[]);

    function getIngredientsString() {
        let ingredientsString = "";
        for (var i = 0; i < ingredients.value.length; i++) {
            if (i === 0) {
                ingredientsString += ingredients.value[i];
            } else {
                ingredientsString += "," + ingredients.value[i];
            }
        }
        return ingredientsString;
    }

    function addIngredient(ingredient: any) {
        ingredients.value.push(ingredient);
    }

    function dropIngredient(ingredient: any) {
        ingredients.value = ingredients.value.filter(
            (item) => item !== ingredient
        );
    }

    function getIngredients() {
        return ingredients.value;
    }

    return {
        getIngredients,
        addIngredient,
        dropIngredient,
        getIngredientsString,
    };
});

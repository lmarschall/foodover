<template>
    <div v-if="file_ready">
        <Scan @scanned="findProduct" ref="scan" />

        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div class="input-group mb-3">
                    <input
                        type="text"
                        id="input_ingredient"
                        @keyup="validateInput"
                        class="form-control"
                        style="border-width: 0px; border: none"
                        placeholder="what's left?"
                    />
                    <div class="input-group-append">
                        <button
                            class="btn btn-outline-primary rounded scan-button"
                            @click="scanClicked"
                        >
                            <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 16 16"
                                class="bi bi-upc-scan"
                                fill="#7FBD32"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"
                                />
                                <path
                                    d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </li>
            <li class="list-group-item input-item">
                <div class="d-flex flex-wrap">
                    <div
                        v-for="ingredient in ingredients"
                        :key="ingredient"
                        class="card ingredients-card"
                    >
                        <img
                            :src="getIngredientImage(ingredient)"
                            class="img-fluid"
                            alt="Responsive image"
                        />
                        <div class="card-body ingredients-body">
                            {{ ingredient }}
                        </div>
                        <div class="card-footer ingredients-footer">
                            <button
                                type="button"
                                class="close"
                                @click="dropIngredient(ingredient)"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.card.ingredients-card {
    width: 70px;
    margin: auto 5px;
    margin-bottom: 5px;
}
.card-footer.ingredients-footer {
    position: absolute;
    padding: 0 0 0 0;
    right: 0;
}
.card-body.ingredients-body {
    padding: 0 0 0 0;
    margin: 0 auto;
}
button.btn.btn-outline-primary.rounded.scan-button {
    padding-bottom: 10px;
}
</style>

<script setup lang="ts">
/**
 * Component to handle the input of ingredients.
 */

import axios from "axios";
import { ref } from "vue";

import SpoonacularService from "./../services/spoonacular";

import { useIngredientsStore } from "./../stores/ingredients";

import Scan from "./Scan.vue";

const scan = ref(Scan);
const ingredientsStore = useIngredientsStore();
const file_ready = ref(false);
const all_ingredients = ref([] as any[]);
const ingredients = ref(ingredientsStore.getIngredients());

const emit = defineEmits(["searchRecipes"]);

readFile();

function readFile() {
    axios.get("/top-1k-ingredients.csv").then((response) => {
        const rawString = response.data;
        const splittedLines = rawString.split("\n");
        const resultArray = [];

        for (let i = 0; i < splittedLines.length; i++) {
            const line = splittedLines[i].split(";")[0];
            resultArray.push(line);
        }

        all_ingredients.value = resultArray;
        file_ready.value = true;
    });
}

function getIngredientImage(name: string) {
    const found = all_ingredients.value.find((element) => element === name);
    let path = `https://spoonacular.com/cdn/ingredients_100x100/placeholder.jpg`;

    // check if ingredient was found
    if (found) {
        // assemble path
        path = `https://spoonacular.com/cdn/ingredients_100x100/${found}.jpg`;
    }

    return path;
}

// add ingredient to search params
function addIngredient(name: string) {
    ingredientsStore.addIngredient(name);
    ingredients.value = ingredientsStore.getIngredients();
}

// drop ingredient from search params
function dropIngredient(name: string) {
    ingredientsStore.dropIngredient(name);
    ingredients.value = ingredientsStore.getIngredients();
}

// trigger scanning of barcode
function scanClicked() {
    scan.value.startScan();
}

// check if return was clicked and get the entered ingredients string
function validateInput(e: any) {
    if (e.keyCode === 13) {
        const input_element = document.getElementById(
            "input_ingredient"
        ) as HTMLInputElement;
        addIngredient(input_element.value);
        input_element.value = "";
    }
}

// trigger search for recipes with chosen ingredients
function searchRecipes() {
    /**
     * Triggers to look for recipes with the current ingredients selection
     */
    emit("searchRecipes");
}

// check for product with barcode api on returned barcode from scanner
function findProduct(code: any) {
    SpoonacularService.findProductWithCode(code).then((response: any) => {
        if (response.data !== "") {
            addIngredient(response.data);
        } else {
            console.log("No Product found!");
        }
        // this.reservation_list = response.data;
        // this.ready = true;
        // this.setupMarkers(this.schnors);
    });
    // .catch((err) => {
    // this.loading = false;
    // console.log(err);
    // }
}
</script>

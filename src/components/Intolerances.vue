<template>
    <div class="d-flex flex-wrap">
        <div
            v-for="intolerance in all_intolerances"
            :key="intolerance"
            class="card intolerance-card"
            :class="{
                checked: intolerancesStore.hasIntolerances(intolerance),
            }"
        >
            <!-- <inline-svg :src="require('@/assets/egg.svg')"/> -->
            <svg
                viewBox="0 0 16 16"
                class="bi bi-egg"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    d="M8 15a5 5 0 0 0 5-5c0-1.956-.69-4.286-1.742-6.12-.524-.913-1.112-1.658-1.704-2.164C8.956 1.206 8.428 1 8 1c-.428 0-.956.206-1.554.716-.592.506-1.18 1.251-1.704 2.164C3.69 5.714 3 8.044 3 10a5 5 0 0 0 5 5zm0 1a6 6 0 0 0 6-6c0-4.314-3-10-6-10S2 5.686 2 10a6 6 0 0 0 6 6z"
                />
            </svg>

            <a
                v-if="intolerancesStore.hasIntolerances(intolerance)"
                @click="intolerancesStore.dropIntolerance(intolerance)"
                class="stretched-link"
                >{{ intolerance }}
            </a>
            <a
                v-else
                @click="intolerancesStore.addIntolerance(intolerance)"
                class="stretched-link"
                >{{ intolerance }}
            </a>
        </div>
    </div>
</template>

<style scoped>
.card.intolerance-card {
    width: 70px;
    margin: auto 5px;
    margin-bottom: 5px;
}
a.stretched-link {
    margin: auto;
    color: #213409;
}
.card.intolerance-card.checked {
    border: 5px solid black;
}
</style>

<script setup lang="ts">
/**
 * Component to display the intolerances of food.
 */

import { useIntolerancesStore } from "./../stores/intolerances";

const intolerancesStore = useIntolerancesStore();

const all_intolerances = [
    "Dairy",
    "Egg",
    "Gluten",
    "Grain",
    "Peanut",
    "Seafood",
    "Sesame",
    "Shellfish",
    "Soy",
    "Sulfite",
    "Tree Nut",
];
</script>

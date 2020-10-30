<template>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">
            <h4>Intolerances</h4>
            <Intolerances v-bind:personal_intolerances="intolerances" />
        </li>
        <li class="list-group-item">
            <h4>Diets</h4>
            <Diets v-bind:personal_diet="diet" />
        </li>
    </ul>
</template>

<style scoped></style>

<script>
/**
 * Component to display the filters of the search.
 */

import Intolerances from "./Intolerances";
import Diets from "./Diets";

export default {
    name: "Filters",
    props: {
        // intolerances to filter the search results
        intolerances: {
            type: Array,
            required: true
        },
        // current user diet to filter the search results
        diet: {
            type: String,
            required: true,
            default: ""
        }
    },
    components: {
        Intolerances,
        Diets
    }
};
</script>

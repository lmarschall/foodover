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
// import axios from "axios";
import Intolerances from "./Intolerances";
import Diets from "./Diets";

export default {
    name: "Filters",
    props: {
        intolerances: Array,
        diet: String
    },
    components: {
        Intolerances,
        Diets
    }
};
</script>

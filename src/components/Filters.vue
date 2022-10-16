<template>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">
            <h4>Intolerances</h4>
            <Intolerances />
        </li>
        <li class="list-group-item">
            <h4>Diets</h4>
            <Diets />
        </li>
    </ul>
</template>

<style scoped></style>

<script setup lang="ts">
/**
 * Component to display the filters of the search.
 */

import Intolerances from "./Intolerances.vue";
import Diets from "./Diets.vue";
</script>

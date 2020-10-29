<template>
    <ul class="list-group list-group-flush">
        <li v-for="sort in all_sorts" v-bind:key="sort" class="list-group-item">
            <div class="input-group flex-nowrap">
                <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                </div>
                <input
                    type="text"
                    class="form-control"
                    v-bind:value="sort"
                    aria-label="Amount (to the nearest dollar)"
                    disabled
                />
                <div class="input-group-append">
                    <span class="input-group-text">X</span>
                </div>
            </div>
        </li>
    </ul>
</template>

<style scoped></style>

<script>
// import axios from "axios";
// import Intolerances from "./Intolerances";
// import Diets from "./Diets";

export default {
    name: "Sort",
    props: {
        actual_sort: String
    },
    data() {
        return {
            all_sorts: [
                "popularity",
                "max-used-ingredients",
                "min-missing-ingredients",
                "time"
            ]
        };
    }
    // components: {
    //     Intolerances,
    //     Diets
    // }
};
</script>

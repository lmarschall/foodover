<template>
    <!-- Input Modal -->
    <div
        class="modal fade"
        id="sortModal"
        tabindex="-1"
        aria-labelledby="sortModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="sortModalLabel">
                        Sort
                    </h5>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="overflow: auto">
                    <ul class="list-group list-group-flush">
                        <li
                            v-for="sort in all_sorts"
                            v-bind:key="sort"
                            class="list-group-item"
                        >
                            <div class="input-group flex-nowrap">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">$</span>
                                </div>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-bind:value="sort"
                                    aria-label="Amount (to the nearest dollar)"
                                />
                                <div class="input-group-append">
                                    <span class="input-group-text">X</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                    >
                        Close
                    </button>
                    <!-- <button
                    type="button"
                    class="btn btn-primary"
                    v-on:click="searchRecipes"
                    data-dismiss="modal"
                >
                    Search for recipes
                </button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>

<script>
// import axios from "axios";
// import Intolerances from "./Intolerances";
// import Diets from "./Diets";

export default {
    name: "Sort",
    data() {
        return {
            all_sorts: [
                "popularity",
                "max-used-ingredients",
                "min-missing-ingredients",
                "time"
            ],
            sort: ""
        };
    }
    // components: {
    //     Intolerances,
    //     Diets
    // }
};
</script>

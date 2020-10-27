<template>
    <!-- Input Modal -->
    <div
        class="modal fade"
        id="filtersModal"
        tabindex="-1"
        aria-labelledby="filtersModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="filtersModalLabel">
                        Filters
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
                        <li class="list-group-item">
                            <h4>Intolerances</h4>
                            <Intolerances />
                        </li>
                        <li class="list-group-item">
                            <h4>Diets</h4>
                            <Diets />
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
import Intolerances from "./Intolerances";
import Diets from "./Diets";

export default {
    name: "Filters",
    components: {
        Intolerances,
        Diets
    }
    // methods: {

    // }
};
</script>

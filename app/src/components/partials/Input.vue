<template>
    <div>
        <Scan v-on:scanned="findProduct" ref="scan" />

        <!-- Input Modal -->
        <div
            class="modal fade"
            id="inputModal"
            tabindex="-1"
            aria-labelledby="inputModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="inputModalLabel">Input</h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <ul class="list-group list-group-flush">
                            <li
                                class="list-group-item input-item"
                                v-for="(ingredient, index) in ingredients"
                                v-bind:key="ingredient"
                            >
                                <div class="input-group mb-3">
                                    <input
                                        type="text"
                                        class="form-control-plaintext"
                                        v-bind:value="ingredient.name"
                                        style="border-width:0px; border:none;"
                                        readonly
                                    />
                                    <div class="input-group-append">
                                        <button
                                            type="button"
                                            class="close"
                                            v-on:click="deleteClicked(index)"
                                        >
                                            <span aria-hidden="true"
                                                >&times;</span
                                            >
                                        </button>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="input-group mb-3">
                                    <input
                                        type="text"
                                        id="input_ingredient"
                                        v-on:keyup="validateInput"
                                        class="form-control"
                                        style="border-width:0px; border:none;"
                                        placeholder="what's left?"
                                    />
                                    <div class="input-group-append">
                                        <button
                                            class="btn btn-outline-primary rounded"
                                            v-on:click="scanClicked"
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
                        <button
                            type="button"
                            class="btn btn-primary"
                            v-on:click="searchRecipes"
                            data-dismiss="modal"
                        >
                            Search for recipes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>

<script>
import axios from "axios";

import Scan from "./Scan";

export default {
    name: "Input",
    props: {
        ingredients: Array
    },
    components: {
        Scan
    },
    methods: {
        scanClicked: function() {
            this.$refs.scan.startScan();
        },

        validateInput: function(e) {
            if (e.keyCode === 13) {
                console.log("Enter was pressed");
                this.$emit(
                    "ingredientAdded",
                    document.getElementById("input_ingredient").value
                );
                document.getElementById("input_ingredient").value = "";
            }
        },

        deleteClicked: function(index) {
            this.$emit("ingredientDropped", index);
        },

        searchRecipes: function() {
            this.$emit("searchRecipes");
        },

        findProduct: function(code) {
            console.log(code);
            this.code = code;

            axios
                .get("/api/product", {
                    params: this.productParams
                })
                .then(response => {
                    console.log(response.data);

                    if (response.data !== "") {
                        this.$emit("ingredientAdded", response.data);
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
            // })
        }
    }
};
</script>
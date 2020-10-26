<template>
    <div id="filtersframe">
    </div>
</template>

<style scoped></style>

<script>
import axios from "axios";

export default {
    name: "Filters",
    el: "filtersframe",
    props: {
        intolerances: Array,
        diet: String
    },
    data() {
        return {
            all_intolerances: [
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
                "Tree Nut"
            ]
        };
    },
    // components: {
    //     Scan
    // },
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

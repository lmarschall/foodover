<template>
    <div>
        <Bar v-bind:page="0" />

        <h2 v-if="random">For your inpspiration</h2>
        <h2 v-else-if="!random">Inpired by your last searches</h2>
        <Recipes v-bind:recipes="recommends" v-bind:display="'ROW'" />
        <h2>Your favorites</h2>
        <Recipes v-bind:recipes="favorites" v-bind:display="'ROW'" />

        <Placeholder />
    </div>
</template>

<style scoped>
h2 {
    margin: 1rem 2rem 0 2rem;
}
</style>

<script>
/**
 * Component to display recommended or random recipes and the user favorites.
 */

import axios from "axios";

import Bar from "./partials/Bar";
import Placeholder from "./partials/Placeholder";
import Recipes from "./partials/Recipes";

export default {
    name: "Home",
    components: {
        Bar,
        Placeholder,
        Recipes
    },
    mounted: function() {
        this.getRecommends();
        this.getFavorites();
    },
    data() {
        return {
            random: true,
            last_recipe_id: 0,
            recommends: [],
            favorites: []
        };
    },
    computed: {
        // computed params for the ingredients api call
        recommendsParams() {
            const params = new URLSearchParams();
            params.append("id", this.last_recipe_id);
            return params;
        }
    },
    methods: {
        // get recommended or random recipes for the user
        getRecommends: function() {
            const self = this;
            document.db.searches.toArray().then(function(searches) {
                // get exisiting last searches
                if (searches.length > 0) {
                    const lastSearch = searches[searches.length - 1];
                    const lastRecipe = lastSearch.recipes[0];
                    self.last_recipe_id = lastRecipe.id;

                    axios
                        .get("api/recommends", {
                            params: self.recommendsParams
                        })
                        .then(response => {
                            self.random = false;
                            self.recommends = response.data;

                            // populate the results with images
                            for (var i = 0; i < self.recommends.length; i++) {
                                self.recommends[
                                    i
                                ].image = `https://spoonacular.com/recipeImages/${self.recommends[i].id}-556x370.jpg`;
                            }
                        });
                    // .catch((err) => {
                    // this.loading = false;
                    // console.log(err);
                    // })
                    // if theres none get some random recipes
                } else {
                    axios
                        .get("api/randoms", {
                            // params: this.recommendsParams(lastRecipe.id)
                        })
                        .then(response => {
                            self.random = true;
                            self.recommends = response.data.recipes;
                        });
                    // .catch((err) => {
                    // this.loading = false;
                    // console.log(err);
                    // })
                }
            });
        },

        // get the users favorite recipes
        getFavorites: function() {
            const self = this;
            document.db.favorites.toArray().then(function(favorites) {
                self.favorites = favorites;
            });
        }
    }
};
</script>

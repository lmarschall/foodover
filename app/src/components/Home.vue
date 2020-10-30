<template>
    <div>
        <Bar v-bind:page="0" />

        <p v-if="random">RANDOM RECOMMENDS</p>
        <p v-else-if="!random">LAST SEARCH RECOMMENDS</p>
        <Recipes v-bind:recipes="recommends" v-bind:display="'ROW'" />
        <p>FAVORITES</p>
        <Recipes v-bind:recipes="favorites" v-bind:display="'ROW'"/>

        <Placeholder />
    </div>
</template>

<script>
import axios from "axios";

import Bar from "./partials/Bar";
import Placeholder from "./partials/Placeholder";
import Recipes from "./partials/Recipes"

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
        getRecommends: function() {
            const self = this;
            document.db.searches.toArray().then(function(searches) {
                console.log(searches)
                // get exisiting last searches
                if(searches.length > 0)
                {
                    const lastSearch = searches[searches.length-1];
                    const lastRecipe = lastSearch.recipes[0];
                    self.last_recipe_id = lastRecipe.id;

                    axios
                    .get("api/recommends", {
                        params: self.recommendsParams
                    })
                    .then(response => {
                        self.random = false;
                        console.log(response.data);
                        self.recommends = response.data;
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
                        console.log(response.data.recipes);
                        self.recommends = response.data.recipes;
                    });
                    // .catch((err) => {
                    // this.loading = false;
                    // console.log(err);
                    // })
                }
            });
        },

        getFavorites: function() {
            const self = this;
            document.db.favorites.toArray().then(function(favorites) {
                self.favorites = favorites;
            });
        }
    }
};
</script>

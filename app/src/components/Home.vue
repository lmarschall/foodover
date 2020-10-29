<template>
    <div>
        <Bar v-bind:page="0" />

        <p v-if="random">RANDOM RECOMMENDS</p>
        <p v-else-if="!random">LAST SEARCH RECOMMENDS</p>
        <p v-for="recommend in recommends" v-bind:key="recommend">{{recommend}}</p>

        <p>FAVORITES</p>
        <p v-for="favorite in favorites" v-bind:key="favorite">{{favorite}}</p>

        <Placeholder />
    </div>
</template>

<script>
import axios from "axios";

import Bar from "./partials/Bar";
import Placeholder from "./partials/Placeholder";

export default {
    name: "Profile",
    components: {
        Bar,
        Placeholder
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
                        console.log(response.data);
                        self.recommends = response.data;
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

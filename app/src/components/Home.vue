<template>
    <div>
        <Bar v-bind:page="0" />

        <h2 v-if="random">For your inspiration</h2>
        <h2 v-else-if="!random">Inspired by your last searches</h2>
        <Recipes
            v-bind:recipes="recommends"
            v-bind:display="'ROW'"
            v-bind:observer="observer"
        />
        <h2>Your favorites</h2>
        <Recipes
            v-bind:recipes="favorites"
            v-bind:display="'ROW'"
            v-bind:observer="observer"
        />

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
    mounted: async function() {
        this.getRecommends();
        this.getFavorites();
    },
    data() {
        return {
            random: true,
            last_recipe_id: 0,
            recommends: [],
            favorites: [],
            observer: null
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
    created() {
        this.observer = new IntersectionObserver(this.onElementObserved, {
            root: this.$el
            // threshold: 1.0,
        });
    },
    beforeDestroy() {
        this.observer.disconnect();
    },
    methods: {
        onElementObserved(entries) {
            entries.forEach(({ target, isIntersecting }) => {
                if (!isIntersecting) {
                    return;
                }

                this.observer.unobserve(target);

                setTimeout(() => {
                    const i = target.getAttribute("image");
                    target.firstChild.src = i;
                }, 100);
            });
        },

        // get recommended or random recipes for the user
        getRecommends: function() {
            const self = this;
            document.db.searches.toArray().then(function(searches) {
                // get exisiting last searches
                if (searches.length > 0) {
                    const lastSearch = searches[searches.length - 1];
                    const lastRecipe = lastSearch.recipes[0];
                    self.last_recipe_id = lastRecipe.id;

                    // axios.get(${process.env.VUE_APP_APIURL || 'http://localhost:8000'}/api/recommends`, {
                    axios.get("https://foodover.herokuapp.com/api/recommends", {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        params: self.recommendsParams
                    })
                    .then(response => {
                        self.random = false;
                        self.recommends = response.data;

                        // populate the results with images
                        for (var i = 0; i < self.recommends.length; i++) {
                            self.recommends[
                                i
                            ].image = `https://spoonacular.com/recipeImages/${self.recommends[i].id}-480x360.jpg`;
                        }
                    });
                    // .catch((err) => {
                    // this.loading = false;
                    // console.log(err);
                    // })
                    // if theres none get some random recipes
                } else {
                    // axios.get(`${process.env.VUE_APP_APIURL || 'http://localhost:8000'}/api/randoms`, {
                    axios.get("https://foodover.herokuapp.com/api/randoms", {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
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

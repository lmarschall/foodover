import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        search_params: {
            ingredients: [],
            intolerances: [],
            diet: "",
            sort: "",
            direction: "",
            offset: "0"
        }
    },
    mutations: {
        preload_last(state, lastSearch) {
            state.search_params.ingredients = lastSearch.ingredients;
            state.search_params.intolerances = lastSearch.intolerances;
            state.search_params.diet = lastSearch.diet;
            state.search_params.sort = lastSearch.sort;
            state.search_params.direction = lastSearch.direction;
            state.search_params.offset = lastSearch.offset;
            state.recipes = lastSearch.recipes;
        },

        add_ingredient(state, name) {
            state.search_params.ingredients.push(name);
        },

        drop_ingredient(state, name) {
            state.search_params.ingredients = state.search_params.ingredients.filter(
                i => i !== name
            );
        },

        add_intolerance(state, name) {
            state.search_params.intolerances.push(name);
        },

        drop_intolerance(state, name) {
            state.search_params.intolerances = state.search_params.intolerances.filter(
                i => i !== name
            );
        },

        set_diet(state, diet) {
            state.search_params.diet = diet;
        }
    }
});

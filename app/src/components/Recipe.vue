<template>

    <div class="card" id="recipeframe">
    <div class="card-header d-flex" v-if="ready">
        <a href="/search" class="btn btn-primary-outline">
        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-caret-left-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
        </svg>
        </a>
        <h3 class="align-self-center">${recipe.title}</h3>
    </div>
    
    <div class="row" v-if="ready">
        <div class="col-md-6 d-none d-md-block" style="overflow: auto; height: 90vh;">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <LikeShareSave />
            </li>
            <li class="list-group-item">
                <Times />
            </li>
            <li class="list-group-item">
                <Nutritions />
            </li>
            <li class="list-group-item">
                <Ingredients />
            </li>
        </ul>
        </div>
    
        <div class="col-md-6 d-none d-md-block" style="overflow: auto; height: 90vh;">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
            <img :src="recipe.image" class="img-fluid" alt="Responsive image">
            </li>
            <li class="list-group-item" v-html="recipe.summary"></li>
            <li class="list-group-item" v-html="recipe.instructions"></li>
        </ul>
        </div>
    
        <div class="col d-md-none">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
            <img :src="recipe.image" class="img-fluid" alt="Responsive image">
            </li>
            <li class="list-group-item">
                <LikeShareSave />
            </li>
            <li class="list-group-item" v-html="recipe.summary"></li>
            <li class="list-group-item">
                <Times />
            </li>
            <li class="list-group-item">
                <Nutritions />
            </li>
            <li class="list-group-item">
                <Ingredients />
            </li>
            <li class="list-group-item" v-html="recipe.instructions"></li>
        </ul>
        </div>
    </div>
    </div>

    <!-- <script src='/js/recipe.js' type='text/javascript'></script> -->
</template>

<style scoped>
</style>

<script>
    import Ingredients from './Ingredients'
    import LikeShareSave from './LikeShareSave'
    import Nutritions from './Nutritions'
    import Times from './Times'

    export default {
        name: 'App',
        components: {
            Ingredients,
            LikeShareSave,
            Nutritions,
            Times
        }
    }
</script>

var recipe = new Vue({
    el: '#recipeframe',
    delimiters: ['${','}'],
    data:
    {
        recipe: null,
        nutritions: null,
        ready: false
    },
    computed: {
        recipeParams() {
            const params = new URLSearchParams();
            params.append('id', document.getElementById('recipe_id').innerHTML);
            return params;
        },

        nutritionsParams() {
            const params = new URLSearchParams();
            params.append('id', document.getElementById('recipe_id').innerHTML);
            return params;
        }
    },
    mounted: function () {
        this.getRecipe();
        this.getNutritions();
    },
    methods:
    {
        getRecipe: function()
        {
            axios.get('/api/recipe', {
                params: this.recipeParams
                })
                .then((response) => {
                    this.recipe = response.data
                    this.ready = true
                    console.log(response.data)
                    // this.reservation_list = response.data;
                    // this.ready = true;
                    // this.setupMarkers(this.schnors);
                })
                // .catch((err) => {
                    // this.loading = false;
                    // console.log(err);
                    // })
        },

        getNutritions: function()
        {
            axios.get('/api/nutritions', {
                params: this.nutritionsParams
                })
                .then((response) => {
                    this.nutritions = response.data
                    console.log(response.data)
                    // this.reservation_list = response.data;
                    // this.ready = true;
                    // this.setupMarkers(this.schnors);
                })
                // .catch((err) => {
                    // this.loading = false;
                    // console.log(err);
                    // })
        }
    }
});
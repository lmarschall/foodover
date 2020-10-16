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
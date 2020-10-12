var recipe = new Vue({
    el: '#recipeframe',
    delimiters: ['${','}'],
    data:
    {
        recipe: null,
        ready: false
    },
    computed: {
        recipeParams() {
            const params = new URLSearchParams();
            params.append('id', 47950);
            return params;
        }
    },
    mounted: function () {
        this.getRecipe();
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
        }
    }
});
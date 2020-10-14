var bar = new Vue({
    el: '#barframe',
    delimiters: ['${','}'],
    data:
    {
        page: 0
    },
    computed: {
        recipeParams() {
            const params = new URLSearchParams();
            params.append('id', document.getElementById('recipe_id').innerHTML);
            return params;
        }
    },
    mounted: function () {
        // this.setPage();
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
<template>

    <div id="searchframe">

        <Bar v-bind:page="0" />

        <Input v-on:searchRecipes="findRecipes" v-on:ingredientAdded="addIngredient" v-on:ingredientDropped="dropIngredient" v-bind:ingredients="ingredients"/>

        <div class="accordion sticky-top" id="accordionExample">
            <div class="card">
                <div class="card-header" id="headingOne">
                    <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <h2>Search</h2>
                        </button>
                    </h2>
                </div>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body d-flex flex-wrap">
                    <span class="badge badge-pill badge-secondary" v-for="ingredient in ingredients" v-bind:key="ingredient"><h6>{{ingredient.name}}</h6></span>
                    <span class="badge badge-pill badge-primary" data-toggle="modal" data-target="#inputModal">
                        <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                        </svg>
                    </span>
                </div>
            </div>
        </div>

        <Recipes v-bind:recipes="recipes"/>

        <Placeholder />

    </div>
</template>

<style scoped>

li.list-group-item.input-item {
  padding-bottom: 0;
}

button.btn.btn-outline-primary.rounded {
  padding-bottom: 0.5em;
}

a.stretched-link {
  color: #213409;
}
</style>

<script>
import Bar from './partials/Bar'
import Recipes from './partials/Recipes'
import Input from './partials/Input'
import Placeholder from './partials/Placeholder'

import axios from 'axios'

export default {
    name: 'searchframe',
    components: {
        Bar,
        Recipes,
        Input,
        Placeholder
    },
    data () {
        return {
            ingredients: ['apples', 'flour', 'sugar'],
            recipes: []
        }
    },
    computed: {
        productParams () {
            const params = new URLSearchParams()
            params.append('code', this.code)
            return params
        },

        ingredientsParams () {
            // create ingredients string from list
            // string format: apples,+flour,+sugar
            var string = ''
            for (var i = 0; i < this.ingredients.length; i++) {
                if (i === 0) {
                string += this.ingredients[i].name
                } else {
                string += ',+' + this.ingredients[i].name
                }
            }
            const params = new URLSearchParams()
            params.append('ingredients', string)
            return params
        }   
    },
    mounted: function () {
        this.loadData()
    },
    methods: {

        addIngredient: function (name) {
            const self = this

            // this.ingredients.push(name)
            document.db.ingredients.add({ name: name }).then(function (index) {
                document.db.ingredients.get(index, function (ingredient) {
                self.ingredients.push(ingredient)
                })
            })
        },

        dropIngredient: function (index) {
            const ingredient = this.ingredients[index]
            this.ingredients.splice(index, 1)
            document.db.ingredients.delete(ingredient.id)
        },

        findRecipes: function () {
            
            this.recipes = []

            axios.get('api/recipes', {
                params: this.ingredientsParams
            })
            .then((response) => {

            this.recipes = response.data
            console.log(response.data)

            document.db.recipes.clear()

            var drops = []

            for (var i = 0; i < this.recipes.length; i++) {
                drops.push({ recipe: JSON.stringify(this.recipes[i]) })
            }

            document.db.recipes.bulkAdd(drops)
        })
      // .catch((err) => {
      // this.loading = false;
      // console.log(err);
      // })
    },

    loadData: function () {

        const self = this

        console.log('Load Data')
        console.log(document.db)

        document.db.ingredients.toArray().then(function (ingredients) {
            self.ingredients = ingredients
        })

        document.db.recipes.toArray().then(function (recipes) {
            for (var i = 0; i < recipes.length; i++) {
            self.recipes.push(JSON.parse(recipes[i].recipe))
            }
        })
    }
  }
}
</script>

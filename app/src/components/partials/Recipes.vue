<template>
    <div>
        <div
            v-if="display == 'ROW'"
            class="d-flex flex-nowrap"
            style="overflow:auto"
        >
            <div
                class="card row-card"
                v-for="row_recipe in recipes"
                v-bind:key="row_recipe.id"
            >
                <img v-bind:src="row_recipe.image" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">
                        <router-link
                            v-bind:to="{
                                name: 'recipe',
                                params: { id: row_recipe.id }
                            }"
                            class="stretched-link"
                            >{{ row_recipe.title }}</router-link
                        >
                    </h5>
                    <p class="card-text">
                        <!-- {{ recipe.usedIngredientCount }} of -->
                        <!-- {{ ingredients.length }} ingredients used -->
                    </p>
                </div>
            </div>
        </div>
        <div v-else-if="display == 'COLUMN'" class="d-flex flex-column">
            <div
                class="card column-card"
                v-for="column_recipe in recipes"
                v-bind:key="column_recipe.id"
            >
                <img v-bind:src="column_recipe.image" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">
                        <router-link
                            v-bind:to="{
                                name: 'recipe',
                                params: { id: column_recipe.id }
                            }"
                            class="stretched-link"
                            >{{ column_recipe.title }}</router-link
                        >
                    </h5>
                    <p class="card-text">
                        <!-- {{ recipe.usedIngredientCount }} of -->
                        <!-- {{ ingredients.length }} ingredients used -->
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    border-radius: 2rem;
}

.card.row-card {
    min-width: 250px;
    max-width: 250px;
    margin: 1rem;
}

.card.column-card {
    margin: 20px;
}

img.card-img-top {
    border-radius: 2rem 2rem 0 0;
    min-height: 250px;
}

a.stretched-link {
    color: #213409;
}
</style>

<script>
/**
 * Component to display the recipes of the search result.
 */

export default {
    name: "Recipes",
    props: {
        // the array of recipes to be displayed
        recipes: {
            type: Array,
            required: true
        },
        // flag for displaying the recipes in a row or column
        display: {
            type: String,
            required: true,
            default: "ROW"
        }
    }
};
</script>

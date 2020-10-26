<template>
    <div id="recipeframe" class="row row-cols-1 row-cols-md-2">
        <div class="col mb-4" v-for="recipe in recipes" v-bind:key="recipe">
            <div class="card">
                <img v-bind:src="recipe.image" class="card-img-top" alt="..." />
                <!-- <div class="card-img-overlay">
                <P>LIKE</P>
                </div> -->
                <div class="card-body">
                    <h5 class="card-title">
                        <router-link
                            v-bind:to="{
                                name: 'recipe',
                                params: { id: recipe.id }
                            }"
                            class="stretched-link"
                            >{{ recipe.title }}</router-link
                        >
                    </h5>
                    <p class="card-text">
                        {{ recipe.usedIngredientCount }} of
                        {{ ingredients.length }} ingredients used
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.col.md-4 {
    margin: 2rem;
}

.row.row-cols-1.row-cols-md-2 {
    margin: 0;
    margin-top: 2rem;
    max-width: 100vw;
}
.card {
    border-radius: 2rem;
}

img.card-img-top {
    border-radius: 2rem 2rem 0 0;
}

a.stretched-link {
    color: #213409;
}
</style>

<script>
export default {
    name: "Recipes",
    el: "recipesframe",
    props: {
        recipes: Array,
        ingredients: Array
    }
};
</script>

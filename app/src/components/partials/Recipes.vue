<template>
    <div>
        <div v-if="display == 'ROW'" class="d-flex flex-nowrap" style="overflow:auto">
            <div class="card row-card" v-for="recipe in recipes" v-bind:key="recipe">
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
                        <!-- {{ recipe.usedIngredientCount }} of -->
                        <!-- {{ ingredients.length }} ingredients used -->
                    </p>
                </div>
            </div>
        </div>
        <div v-else-if="display == 'COLUMN'" class="d-flex flex-column">
            <div class="card column-card" v-for="recipe in recipes" v-bind:key="recipe">
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
    min-width: 500px;
    margin: 20px;
}

.card.column-card {
    margin: 20px;
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
    props: {
        recipes: Array,
        display: String
        // ingredients: Array
    }
};
</script>

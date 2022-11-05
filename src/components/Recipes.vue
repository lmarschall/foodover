<template>
    <div>
        <div
            v-if="display == 'ROW'"
            class="d-flex flex-nowrap"
            style="overflow: auto"
        >
            <div
                class="card row-card"
                v-for="row_recipe in recipes"
                :key="row_recipe.id"
                :image="row_recipe.image"
            >
                <img
                    src="./../assets/recipe_placeholder.jpg"
                    class="card-img-top"
                    :alt="row_recipe.title"
                    width="480"
                    height="360"
                />
                <div class="card-body">
                    <h5 class="card-title">
                        <router-link
                            :to="{
                                name: 'recipe',
                                params: { id: row_recipe.id },
                            }"
                            class="stretched-link"
                            >{{ row_recipe.title }}</router-link
                        >
                    </h5>
                </div>
            </div>
        </div>
        <div v-else-if="display == 'COLUMN'" class="d-flex flex-wrap">
            <div
                class="card column-card"
                v-for="(column_recipe, index) in recipes"
                :key="column_recipe.id"
                :index="index"
            >
                <div class="recipe-likes">
                    <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-suit-heart"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8 6.236l.894-1.789c.222-.443.607-1.08 1.152-1.595C10.582 2.345 11.224 2 12 2c1.676 0 3 1.326 3 2.92 0 1.211-.554 2.066-1.868 3.37-.337.334-.721.695-1.146 1.093C10.878 10.423 9.5 11.717 8 13.447c-1.5-1.73-2.878-3.024-3.986-4.064-.425-.398-.81-.76-1.146-1.093C1.554 6.986 1 6.131 1 4.92 1 3.326 2.324 2 4 2c.776 0 1.418.345 1.954.852.545.515.93 1.152 1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"
                        />
                    </svg>
                    {{ column_recipe.likes }}
                </div>
                <img
                    :src="column_recipe.image"
                    class="card-img-top"
                    :alt="column_recipe.title"
                    width="480"
                    height="360"
                />
                <div class="card-body">
                    <p v-if="ingredients" class="card-text">
                        {{ column_recipe.usedIngredientCount }} of
                        {{ ingredients.length }} ingredients used
                    </p>
                    <h5 class="card-title">
                        <router-link
                            :to="{
                                name: 'recipe',
                                params: { id: column_recipe.id },
                            }"
                            class="stretched-link"
                            >{{ column_recipe.title }}</router-link
                        >
                    </h5>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    border-radius: 2rem;
}

.card-body {
    text-align: center;
}

.card.row-card {
    min-width: 250px;
    max-width: 250px;
    margin: 1rem;
}

.card.column-card {
    margin: 10px auto;
    max-width: 250px;
}

img.card-img-top {
    border-radius: 2rem 2rem 0 0;
    object-fit: cover;
    width: 100%;
    max-height: 300px;
}

a.stretched-link {
    color: #213409;
}

.recipe-likes {
    position: absolute;
    top: 0;
    left: 0;
    background-color: white;
    padding: 1rem;
    border-radius: 2rem 0;
}
</style>

<script setup lang="ts">
import { onUpdated } from "vue";

/**
 * Component to display the recipes of the search result.
 */
const props = defineProps({
    recipes: { type: Array as () => any[], required: true },
    display: { type: String, required: true, default: "ROW" },
    // cookingMinutes: { type: Number, required: true, default: 0 },
    // ingredients of recipe
    ingredients: {
        type: Array,
        required: false,
    },
    observer: {
        type: IntersectionObserver,
        required: false,
    },
});

onUpdated(() => {
    const columnElements = document.getElementsByClassName("column-card");
    const rowElements = document.getElementsByClassName("row-card");

    for (let i = 0; i < columnElements.length; i++) {
        props.observer?.observe(columnElements[i]);
    }

    for (let i = 0; i < rowElements.length; i++) {
        props.observer?.observe(rowElements[i]);
    }
});
</script>

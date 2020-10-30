<template>
    <div class="d-flex flex-row">
        <div class="flex-fill text-center">
            {{ readyInMinutes }}<br />Completion
        </div>
        <div class="flex-fill text-center">
            {{ preparationMinutes }}<br />Preperation
        </div>
        <div class="flex-fill text-center">
            {{ cookingMinutes }}<br />Cooking
        </div>
    </div>
</template>

<script>
/**
 * Component to display Completion, Preperation and Cooking Times of the recipe.
 */

export default {
    name: "Times",
    props: {
        // minutes for recipe to be ready
        readyInMinutes: {
            type: Number,
            required: true,
            default: 0
        },
        // minutes to prepare the recipe
        preparationMinutes: {
            type: Number,
            required: true,
            default: 0
        },
        // minutes for cooking
        cookingMinutes: {
            type: Number,
            required: true,
            default: 0
        }
    }
};
</script>

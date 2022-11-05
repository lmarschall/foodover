<template>
    <div class="d-flex flex-row">
        <div class="flex-fill text-center">
            {{ nutritions.calories }}<br />Calories
        </div>
        <div class="flex-fill text-center">
            {{ nutritions.carbs }}<br />Carbs
        </div>
        <div class="flex-fill text-center">{{ nutritions.fat }}<br />Fat</div>
        <div class="flex-fill text-center">
            {{ nutritions.protein }}<br />Protein
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * Component to display nutritions of the recipe.
 */

defineProps({
    // nutritions of the recipe
    nutritions: {
        type: Object,
        required: true,
        default: null,
    },
});
</script>

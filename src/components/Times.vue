<template>
    <div class="d-flex flex-row">
        <div class="flex-fill text-center">
            {{ (readyInMinutes < 0) ? readyInMinutes + 1 : readyInMinutes }}<br />Completion
        </div>
        <div class="flex-fill text-center">
            {{ (preparationMinutes < 0) ? preparationMinutes + 1 : preparationMinutes}}<br />Preperation
        </div>
        <div class="flex-fill text-center">
            {{ (cookingMinutes < 0) ? cookingMinutes + 1 : cookingMinutes}}<br />Cooking
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * Component to display a navigation bar at the bottom.
 */
defineProps({
    readyInMinutes: { type: Number, required: true, default: 0 },
    preparationMinutes: { type: Number, required: true, default: 0 },
    cookingMinutes: { type: Number, required: true, default: 0 },
});
</script>

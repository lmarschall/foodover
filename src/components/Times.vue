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

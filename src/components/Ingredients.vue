<template>
    <div>
        <h4>Ingredients</h4>
        <div class="d-flex flex-row">
            <p class="w-100">Portions</p>
            <button
                type="button"
                class="btn flex-shrink-1"
                @click="decreasePortions"
            >
                -
            </button>
            <button type="button" class="btn flex-shrink-1" disabled>
                {{ portions }}
            </button>
            <button
                type="button"
                class="btn flex-shrink-1"
                @click="increasePortions"
            >
                +
            </button>
        </div>

        <table class="table table-borderless">
            <tbody>
                <tr v-for="ingredient in ingredients" :key="ingredient">
                    <td>
                        {{
                            (
                                ingredient.measures.metric.amount * portions
                            ).toFixed(0)
                        }}
                        {{ ingredient.measures.metric.unitShort }}
                    </td>
                    <td>{{ ingredient.name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
/**
 * Component to display ingredients of the recipe.
 */

import { ref } from "vue";

const portions = ref(2);

defineProps({
    // ingredients of the recipe
    ingredients: {
        type: Array as () => any[],
        required: true,
    },
});

function increasePortions() {
    if (portions.value < 9) {
        portions.value = portions.value + 1;
    }
}

function decreasePortions() {
    if (portions.value > 1) {
        portions.value = portions.value - 1;
    }
}
</script>

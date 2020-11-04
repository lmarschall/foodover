<template>
    <div>
        <h4>Ingredients</h4>
        <div class="d-flex flex-row">
            <p class="w-100">Portions</p>
            <button
                type="button"
                class="btn flex-shrink-1"
                v-on:click="decreasePortions"
            >
                -
            </button>
            <button type="button" class="btn flex-shrink-1" disabled>
                {{ portions }}
            </button>
            <button
                type="button"
                class="btn flex-shrink-1"
                v-on:click="increasePortions"
            >
                +
            </button>
        </div>

        <table class="table table-borderless">
            <tbody>
                <tr v-for="ingredient in ingredients" v-bind:key="ingredient">
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

<script>
/**
 * Component to display ingredients of the recipe.
 */

export default {
    name: "Ingredients",
    props: {
        // ingredients of the recipe
        ingredients: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            portions: 2
        };
    },
    methods: {
        increasePortions: function() {
            if (this.portions < 9) {
                this.portions = this.portions + 1;
            }
        },

        decreasePortions: function() {
            if (this.portions > 1) {
                this.portions = this.portions - 1;
            }
        }
    }
};
</script>

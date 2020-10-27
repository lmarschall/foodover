<template>
    <div>
        <h4>Ingredients</h4>
        <div class="d-flex flex-row">
            <p class="w-100">Portions</p>
            <button
                type="button"
                class="btn flex-shrink-1"
                v-on:click="portions--"
            >
                -
            </button>
            <button type="button" class="btn flex-shrink-1" disabled>
                {{ portions }}
            </button>
            <button
                type="button"
                class="btn flex-shrink-1"
                v-on:click="portions++"
            >
                +
            </button>
        </div>

        <table class="table table-borderless">
            <tbody>
                <tr v-for="ingredient in ingredients" v-bind:key="ingredient">
                    <td>
                        {{ ingredient.measures.metric.amount * portions }}
                        {{ ingredient.measures.metric.unitShort }}
                    </td>
                    <td>{{ ingredient.name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "Ingredients",
    props: {
        ingredients: Array
    },
    data() {
        return {
            portions: 2
        };
    }
};
</script>

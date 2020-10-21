<template>
    <div id="ingredientsframe">
        <h3>Ingredients</h3>
        <p> X Portions</p>
        <table class="table table-borderless">
            <tbody>
                <tr v-for="ingredient in ingredients" v-bind:key="ingredient">
                    <td>{{ingredient.measures.metric.amount}} {{ingredient.measures.metric.unitShort}}</td>
                    <td>{{ingredient.name}}</td>
                </tr>
            </tbody>
        </table>
    </div>  
</template>

<script>

    export default {
        name: 'ingredientsframe',
        props: {
            ingredients: Array
        }
    }

</script>
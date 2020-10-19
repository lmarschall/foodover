<template>
    <div id="ingredientsframe">
        <p v-for="ingredient in ingredients" v-bind:key="ingredient">{{ingredient.name}}</p>
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
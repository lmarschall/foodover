<template>
    <div id="ingredientsframe">
        <p v-for="ingredient in recipe.extendedIngredients" v-bind:key="ingredient">${ingredient.name}</p>
    </div>  
</template>
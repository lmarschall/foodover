<template>
    <div id="timesframe" class="d-flex flex-row">
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
export default {
    name: "Times",
    el: "timesframe",
    props: {
        // minutes for recipe to be ready
        readyInMinutes: Number,
        // minutes to prepare the recipe
        preparationMinutes: Number,
        // minutes for cooking
        cookingMinutes: Number
    }
};
</script>

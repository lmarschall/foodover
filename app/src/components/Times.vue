<template>
    <div id="timesframe" class="d-flex flex-row">
        <div class="flex-fill">
            <div class="row">{{readyInMinutes}}</div>
            <div class="row">Completion</div>
        </div>
        <div class="flex-fill">
            <div class="row">{{preparationMinutes}}</div>
            <div class="row">Preparation</div>
        </div>
        <div class="flex-fill">
            <div class="row">{{cookingMinutes}}</div>
            <div class="row">Cooking</div>   
        </div>
    </div>
</template>

<script>

    export default {
        name: 'timesframe',
        props: {
            readyInMinutes: Number,
            preparationMinutes: Number,
            cookingMinutes: Number
        }
    }

</script>
<template>
    <div id="profileframe">

        <Bar v-bind:page="1" />
    </div>
</template>
 
<script>
    import Bar from './Bar'

    export default {
        name: 'profileframe',
        components: {
            Bar
        }
    }
</script>
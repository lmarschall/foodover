<template>
    <div id="profileframe">

        <Bar v-bind:page="1" />
        <Intolerances/>


    </div>
</template>
 
<script>
    import Bar from './Bar'
    import Intolerances from './Intolerances'

    export default {
        name: 'profileframe',
        components: {
            Bar,
            Intolerances
        },
        data () {
            return {
            }
        },
        mounted: function () {
            this.loadData();
        },
        methods:
        {   
            loadData: function()
            {   

            },

            updateIntolerances: function()
            {
                
            }
        }
    }
</script>
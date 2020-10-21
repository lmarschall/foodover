<template>
    <div id="intolerancesframe">
        <h4>Intolerances</h4>
        <table class="table table-borderless">
            <tbody>
                <tr v-for="(intolerance, index) in all_intolerances"  v-bind:key="intolerance">
                    <td>{{intolerance}}</td>
                    <td v-if="personal_intolerances.includes(intolerance)"><input type="checkbox" v-on:click="deleteIntolerance(index)" checked></td>
                    <td v-else><input type="checkbox" v-on:click="addIntolerance(intolerance)"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'intolerancesframe',
        data () {
            return {
                all_intolerances: ['Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut'],
                personal_intolerances: []
            }
        },
        mounted: function () {
            this.loadIntolerances();
        },
        methods:
        {   
            loadIntolerances: function()
            {   
                const self = this;

                document.db.intolerances.toArray().then(function (intolerances) {

                    self.personal_intolerances = intolerances
                });
            },

            addIntolerance: function(name)
            {
                document.db.intolerances.add({intolerance: name}).then(function (index) {
                    document.db.intolerances.get(index, function (intolerance) {
                        self.personal_intolerances.push(intolerance)
                    })
                })
            },

            deleteIntolerance: function(index)
            {
                const intolerance = this.personal_intolerances[index]
                this.this.personal_intolerances.splice(index, 1)
                document.db.intolerances.delete(intolerance)
            }
        }
    }

</script>
<template>
    <div id="intolerancesframe">
        <h4>Intolerances</h4>
        <table class="table table-borderless">
            <tbody>
                <tr
                    v-for="(intolerance, index) in all_intolerances"
                    v-bind:key="intolerance"
                >
                    <td>{{ intolerance }}</td>
                    <td v-if="personal_intolerances.includes(intolerance)">
                        <input
                            type="checkbox"
                            v-on:click="deleteIntolerance(index)"
                            checked
                        />
                    </td>
                    <td v-else>
                        <input
                            type="checkbox"
                            v-on:click="addIntolerance(intolerance)"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "intolerancesframe",
    data() {
        return {
            all_intolerances: [
                "Dairy",
                "Egg",
                "Gluten",
                "Grain",
                "Peanut",
                "Seafood",
                "Sesame",
                "Shellfish",
                "Soy",
                "Sulfite",
                "Tree Nut"
            ],
            personal_intolerances: []
        };
    },
    mounted: function() {
        this.loadIntolerances();
    },
    methods: {
        loadIntolerances: function() {
            const self = this;

            self.personal_intolerances = [];

            document.db.intolerances.toArray().then(function(intolerances) {
                for (var i = 0; i < intolerances.length; i++) {
                    self.personal_intolerances.push(
                        intolerances[i].intolerance
                    );
                }
            });
        },

        addIntolerance: function(name) {
            const self = this;

            document.db.intolerances
                .add({ intolerance: name })
                .then(function(index) {
                    document.db.intolerances.get(index, function(intolerance) {
                        self.personal_intolerances.push(
                            intolerance.intolerance
                        );
                    });
                });
        },

        deleteIntolerance: function(index) {
            const intolerance = this.all_intolerances[index];
            const pos = this.personal_intolerances.findIndex(
                search => search === intolerance
            );

            this.personal_intolerances.splice(pos, 1);

            document.db.intolerances
                .where({ intolerance: intolerance })
                .first(intolerance => {
                    document.db.intolerances.delete(intolerance.id);
                });
        }
    }
};
</script>

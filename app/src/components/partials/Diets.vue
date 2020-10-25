<template>
    <div class="card" id="dietsframe">
        <div class="card-header" id="headingTwo">
            <h2 class="mb-0">
                <button
                    class="btn btn-link btn-block text-left"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                >
                    Diets
                </button>
            </h2>
        </div>

        <div
            id="collapseTwo"
            class="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionExample"
        >
            <div class="card-body">
                <table class="table table-borderless">
                    <tbody>
                        <tr
                            v-for="(diet, index) in all_diets"
                            v-bind:key="diet"
                        >
                            <td>{{ diet }}</td>
                            <td>
                                <input
                                    type="radio"
                                    v-on:click="selectDiet(index)"
                                    :checked="personal_diet === diet"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "dietsframe",
    data() {
        return {
            all_diets: [
                "Gluten Free",
                "Ketogenic",
                "Vegetarian",
                "Lacto-Vegetarian",
                "Ovo-Vegetarian",
                "Vegan",
                "Pescetarian",
                "Paleo",
                "Primal",
                "Whole30"
            ],
            personal_diet: ""
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

        selectDiet: function(index) {
            this.personal_diet = this.all_diets[index];
        }
    }
};
</script>

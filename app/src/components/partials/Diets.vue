<template>
    <div id="dietsframe"></div>
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

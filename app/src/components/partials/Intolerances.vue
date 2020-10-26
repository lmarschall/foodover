<template>
    <div class="d-flex flex-wrap" id="intolerancesframe">
        <div 
            v-for="(intolerance, index) in all_intolerances"
            v-bind:key="intolerance"
            class="card intolerance-card"
            v-bind:class="{ checked: personal_intolerances.includes(intolerance)}"
        >
            <svg viewBox="0 0 16 16" class="bi bi-egg" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 15a5 5 0 0 0 5-5c0-1.956-.69-4.286-1.742-6.12-.524-.913-1.112-1.658-1.704-2.164C8.956 1.206 8.428 1 8 1c-.428 0-.956.206-1.554.716-.592.506-1.18 1.251-1.704 2.164C3.69 5.714 3 8.044 3 10a5 5 0 0 0 5 5zm0 1a6 6 0 0 0 6-6c0-4.314-3-10-6-10S2 5.686 2 10a6 6 0 0 0 6 6z"/>
            </svg>
            <a
                v-if="personal_intolerances.includes(intolerance)"
                v-on:click="deleteIntolerance(index)"
                class="stretched-link">{{ intolerance }}
            </a>
            <a
                v-else
                v-on:click="addIntolerance(intolerance)"
                class="stretched-link">{{ intolerance }}
            </a>
        </div>
    </div>
</template>

<style scoped>
.card.intolerance-card {
    width: 70px;
    margin: auto 5px;
    margin-bottom: 5px;
}
a.stretched-link {
    margin: auto;
    color: #213409;
}
.card.intolerance-card.checked {
    border: 5px solid black;
}
</style>

<script>
export default {
    name: "Intolerances",
    el: "intolerancesframe",
    data() {
        return {
            personal_intolerances: [],
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
            ]
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

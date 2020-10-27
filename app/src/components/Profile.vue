<template>
    <div>
        <Bar v-bind:page="1" />
        <input type="button" v-on:click="login" />
        <div class="accordion sticky-top" id="accordionProfile">
            <div class="card">
                <div class="card-header" id="headingIntolerances">
                    <h2 class="mb-0">
                        <button
                            class="btn btn-link btn-block text-left"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseIntolerances"
                            aria-expanded="true"
                            aria-controls="collapseIntolerances"
                        >
                            Intolerances
                        </button>
                    </h2>
                </div>

                <div
                    id="collapseIntolerances"
                    class="collapse show"
                    aria-labelledby="headingIntolerances"
                    data-parent="#accordionProfile"
                >
                    <div class="card-body">
                        <Intolerances />
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingDiets">
                    <h2 class="mb-0">
                        <button
                            class="btn btn-link btn-block text-left"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseDiets"
                            aria-expanded="false"
                            aria-controls="collapseDiets"
                        >
                            Diets
                        </button>
                    </h2>
                </div>

                <div
                    id="collapseDiets"
                    class="collapse"
                    aria-labelledby="headingDiets"
                    data-parent="#accordionProfile"
                >
                    <div class="card-body">
                        <Diets />
                    </div>
                </div>
            </div>
        </div>
        <Placeholder />
    </div>
</template>

<script>
import Bar from "./partials/Bar";
import Placeholder from "./partials/Placeholder";
import Intolerances from "./partials/Intolerances";
import Diets from "./partials/Diets";

export default {
    name: "Profile",
    components: {
        Bar,
        Placeholder,
        Intolerances,
        Diets
    },
    data() {
        return {};
    }
};
</script>

<template>
    <div>
        <div v-for="step in instructions.steps" v-bind:key="step">
            <h5 class="instructions-header">Step {{ step.number }}</h5>
            <div class="d-flex flex-wrap">
                <span class="badge badge-pill badge-secondary">
                    <svg
                        width="2em"
                        height="2em"
                        viewBox="0 0 16 16"
                        class="bi bi-basket"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"
                        />
                    </svg>
                </span>
                <span
                    class="badge badge-pill badge-secondary"
                    v-for="ingredient in step.ingredients"
                    v-bind:key="ingredient"
                >
                    <h6>{{ ingredient.name }}</h6>
                </span>
            </div>
            <div class="d-flex flex-wrap">
                <span class="badge badge-pill badge-secondary">
                    <svg
                        width="2em"
                        height="2em"
                        viewBox="0 0 16 16"
                        class="bi bi-tools"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M0 1l1-1 3.081 2.2a1 1 0 0 1 .419.815v.07a1 1 0 0 0 .293.708L10.5 9.5l.914-.305a1 1 0 0 1 1.023.242l3.356 3.356a1 1 0 0 1 0 1.414l-1.586 1.586a1 1 0 0 1-1.414 0l-3.356-3.356a1 1 0 0 1-.242-1.023L9.5 10.5 3.793 4.793a1 1 0 0 0-.707-.293h-.071a1 1 0 0 1-.814-.419L0 1zm11.354 9.646a.5.5 0 0 0-.708.708l3 3a.5.5 0 0 0 .708-.708l-3-3z"
                        />
                        <path
                            fill-rule="evenodd"
                            d="M15.898 2.223a3.003 3.003 0 0 1-3.679 3.674L5.878 12.15a3 3 0 1 1-2.027-2.027l6.252-6.341A3 3 0 0 1 13.778.1l-2.142 2.142L12 4l1.757.364 2.141-2.141zm-13.37 9.019L3.001 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"
                        />
                    </svg>
                </span>
                <span
                    class="badge badge-pill badge-secondary"
                    v-for="equipment in step.equipment"
                    v-bind:key="equipment"
                >
                    <h6>{{ equipment.name }}</h6>
                </span>
            </div>
            <p class="instructions-text">{{ step.step }}</p>
            <hr />
        </div>
    </div>
</template>

<style scoped>
p.instructions-text {
    margin-top: 1rem;
}

h5.instructions-header {
    margin-bottom: 1rem;
}
</style>

<script>
export default {
    name: "Instructions",
    props: {
        instructions: Object
    }
};
</script>

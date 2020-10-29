<template>
    <div>
        <Bar v-bind:page="0" />
        <Placeholder />
    </div>
</template>

<script>
import Bar from "./partials/Bar";
import Placeholder from "./partials/Placeholder";

export default {
    name: "Profile",
    components: {
        Bar,
        Placeholder
    },
    data() {
        return {};
    }
};
</script>

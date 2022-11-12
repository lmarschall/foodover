<template>
    <div class="card shadow p-3 mb-5 bg-white rounded-pill fixed-bottom">
        <ul class="nav nav-fill nav-pills">
            <li class="nav-item">
                <router-link
                    :to="{ name: 'home' }"
                    class="nav-link rounded-pill"
                    :class="{ active: page == 0 }"
                    >Home</router-link
                >
            </li>
            <li class="nav-item">
                <router-link
                    :to="{ name: 'search' }"
                    class="nav-link rounded-pill"
                    :class="{ active: page == 1 }"
                    >Search</router-link
                >
            </li>
        </ul>
    </div>
</template>

<style scoped>
.card.shadow.p-3.mb-5.bg-white.rounded-pill.fixed-bottom {
    /* height: 10vh; */
    width: 90vw;
    left: 5vw;
    bottom: 0vh;
    /* z-index: 2000; */
}

a.nav-link.rounded-pill {
    color: #213409;
}

a.nav-link.rounded-pill.active {
    background-color: #7fbd32;
}
</style>

<script setup lang="ts">
/**
 * Component to display a navigation bar at the bottom.
 */
defineProps({
    page: { type: Number, required: true, default: 0 },
});
</script>

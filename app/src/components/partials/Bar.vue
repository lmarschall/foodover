<template>
    <div class="card shadow p-3 mb-5 bg-white rounded-pill fixed-bottom">
        <ul class="nav nav-fill nav-pills">
            <li class="nav-item">
                <router-link
                    v-bind:to="{ name: 'home' }"
                    class="nav-link rounded-pill"
                    v-bind:class="{ active: page == 0 }"
                    >Home</router-link
                >
            </li>
            <li class="nav-item">
                <router-link
                    v-bind:to="{ name: 'search' }"
                    class="nav-link rounded-pill"
                    v-bind:class="{ active: page == 1 }"
                    >Search</router-link
                >
                <!-- <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                        <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                    </svg> -->
            </li>
        </ul>
    </div>
</template>

<script>
/**
 * Component to display a navigation bar at the bottom.
 */

export default {
    name: "Bar",
    props: {
        // selection of the current displayed page
        page: {
            type: Number,
            required: true,
            default: 0
        }
    }
};
</script>

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

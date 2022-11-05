<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts"></script>

<style>
#app {
    /* theme-colors */
    --color-light-green: #a7ff83;
    --color-green: #17b978;
    --color-dark-green: #086972;
    --color-blue: #071a52;

    background-color: #eef8e3;
    margin: 0;
    height: 100%;
    color: #213409;
}

span.badge.badge-pill.badge-primary {
    background-color: #7fbd32;
    margin: 0.2rem;
}

span.badge.badge-pill.badge-secondary {
    background-color: #213409;
    padding-bottom: 0;
    margin: 0.2rem;
}

button.btn.btn-primary {
    background-color: #7fbd32;
    border-color: #7fbd32;
}

button.btn.btn-secondary {
    background-color: #213409;
    border-color: #213409;
}

button.btn.btn-outline-primary.rounded {
    border-color: #7fbd32;
}
</style>

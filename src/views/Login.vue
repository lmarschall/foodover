<template>
    <div>
        <div class="d-flex justify-content-start">
            <button type="button" class="btn btn-primary" @click="start">
                START
            </button>
        </div>
    </div>
</template>

<style scoped></style>

<script setup lang="ts">
/**
 * Component to validate user and login.
 */

import { useRouter } from "vue-router";

const router = useRouter();

async function start() {
    router.push("/");
}
</script>

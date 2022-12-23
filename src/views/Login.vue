<template>
    <div class="container">
        <div class="d-flex align-items-center justify-content-center">
            <div class="card text-center border-0">
                <div class="card-body">
                    <div class="col-12">
                        <h3>
                            <img
                                src="./../assets/fingerprint.svg"
                                class="img-fluid"
                                alt="..."
                            />
                            User Verification
                        </h3>
                        <br />
                        <p>
                            We are using
                            <span class="bold">Cloudflare Turnstile</span> to
                            verify our users.
                        </p>
                        <br />
                        <div id="turnstileDiv"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
span.bold {
    font-weight: bold;
}
.d-flex {
    height: 100vh;
}
.col-12 {
    margin-top: 5rem;
}
img.img-fluid {
    width: 64px;
}
</style>

<script setup lang="ts">
/**
 * Component to validate user and login.
 */

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useTokenStore } from "./../stores/token";
// import 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

const importWindow = window as any;
const turnstile = importWindow.turnstile;

const tokenStore = useTokenStore();

const router = useRouter();

onMounted(() => {
    turnstile.render("#turnstileDiv", {
        sitekey: "1x00000000000000000000AA",
        callback: function (token: string) {
            console.log(`Challenge Success ${token}`);
            tokenStore.setToken(token);
            router.push("/");
        },
    });
});
</script>

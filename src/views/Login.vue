<template>
    <div class="container">
        <!-- <vue-hcaptcha
            ref="invisibleHcaptcha"
            sitekey="10000000-ffff-ffff-ffff-000000000001"
            size="invisible"
            @error="onError"
            @verify="onVerify"
        ></vue-hcaptcha> -->
        <vue-hcaptcha
            ref="invisibleHcaptcha"
            sitekey="b7479110-7676-44ae-a0db-fc96540d3c1f"
            size="invisible"
            @error="onError"
            @verify="onVerify"
        ></vue-hcaptcha>
        <div class="d-flex justify-content-center">
            <div class="card text-center border-0">
                <div class="card-body">
                    <div class="col-12">
                        <h3>
                            <img
                                src="./../assets/fingerprint.svg"
                                class="img-fluid"
                                alt="..."
                            />
                            hCaptcha
                        </h3>
                        <p>We are using hCaptcha to verify our users.</p>
                    </div>

                    <div class="col-12">
                        <button
                            class="btn btn-primary"
                            type="submit"
                            @click="onSubmit()"
                            :disabled="loading"
                        >
                            <span
                                v-if="loading"
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTokenStore } from "./../stores/token";
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";

const tokenStore = useTokenStore();
const invisibleHcaptcha = ref(null);

const router = useRouter();
const loading = ref(false);

function onSubmit() {
    loading.value = true;

    if (invisibleHcaptcha.value) {
        (invisibleHcaptcha.value as any).execute();
    }
}

function onError(error: string) {
    console.log(error);
}

function onVerify(token: string, eKey: string) {
    console.log("User verified");
    tokenStore.setToken(token);
    router.push("/");
}
</script>

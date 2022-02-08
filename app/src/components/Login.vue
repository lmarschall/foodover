<template>
    <div>
        <input v-model="userName" placeholder="User Name">
        <button
            type="button"
            class="btn btn-primary"
            v-on:click="requestRegister"
        >
            Register
        </button>
        <button
            type="button"
            class="btn btn-primary"
            v-on:click="requestLogin"
        >
            Login
        </button>
        <button
            type="button"
            class="btn btn-primary"
            v-on:click="requestToken"
        >
            TESTTOKEN
        </button>
    </div>
</template>

<style scoped></style>

<script>
/**
 * Component to display the diets of the search.
 */
import axios from "axios";
// import { browserSupportsWebauthn, startRegistration, startAuthentication } from '@simplewebauthn/browser';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';


export default {
    name: "Login",
    data() {
        return {
            userName: ''
        };
    },
    computed: {},
    methods: {

        async requestRegister() {
            const self = this;

            axios.post(`${self.$apiUrl}/webauthn/request-register`, {
                headers: {
                    'content-type': 'Application/Json'
                },
                userInfo: { name: this.userName }
            })
            .then(response => {
                self.register(response.data);
            });
        },

        async register(challengeOptions) {

            const credentials = await startRegistration(challengeOptions);

            axios.post(`${self.$apiUrl}/webauthn/register`, {
                headers: {
                    'content-type': 'Application/Json'
                },
                challengeResponse: { credentials: credentials, challenge: challengeOptions.challenge }
            })
            .then(response => {
                console.log(response.data);
            });
        },

        async requestLogin() {
            const self = this;

            axios.post(`${self.$apiUrl}/webauthn/login`, {
                headers: {
                    'content-type': 'Application/Json'
                },
                userInfo: { name: this.userName }
            })
            .then(response => {
                self.login(response.data);
            });
        },

        async login(challengeOptions) {

            const self = this;
            const credentials = await startAuthentication(challengeOptions);

            axios.post(`${self.$apiUrl}/webauthn/login-challenge`, {
                headers: {
                    'content-type': 'Application/Json'
                },
                challengeResponse: { credentials: credentials, challenge: challengeOptions.challenge }
            })
            .then(response => {

                if(response.data.verified) {
                    console.log("login verified, save token");
                    localStorage.setItem('token', response.data.jwt);
                    self.returnHome();
                }
            });
        },

        async requestToken() {
            const self = this;
            // axios.get(`${process.env.VUE_APP_APIURL || 'http://localhost:8000'}/webauthn/test-token`)
            axios.get(`${self.$apiUrl}/test-token`)
            .then(response => {
                console.log(response.data.jwt);
                localStorage.setItem('token', response.data.jwt);
                self.returnHome();
            });
        },

        returnHome() {
            this.$router.push('/');
        }
    }
};
</script>

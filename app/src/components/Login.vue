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
// import router from "../router";
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
            console.log("request register");
            const self = this;

            axios.post('https://foodover.herokuapp.com/webauthn/request-register', {
                headers: {
                    'content-type': 'Application/Json'
                },
                // body: JSON.stringify({ id: 'uuid', email: 'test@test' })
                userInfo: { id: new Uint8Array(16), email: this.userName }
            })
            .then(response => {
                console.log(response.data);
                self.register(response.data);
            });
        },

        async register(challenge) {

            console.log("solve register challenge");

            const credentials = await startRegistration(challenge);
            // const credentials = await solveRegistrationChallenge(challenge);
            console.log(credentials);

            console.log("register challenge solved");

            axios.post('https://foodover.herokuapp.com/webauthn/register', {
                headers: {
                    'content-type': 'Application/Json'
                },
                // body: JSON.stringify(credentials)
                credentials: JSON.stringify(credentials)
            })
            .then(response => {
                console.log(response.data);
                // self.solveRegisterChallenge(response.data);
            });
        },

        async requestLogin() {
            console.log('request login');
            const self = this;

            axios.post('https://foodover.herokuapp.com/webauthn/login', {
                headers: {
                    'content-type': 'Application/Json'
                },
                // body: JSON.stringify({ id: 'uuid', email: 'test@test' })
                userInfo: { email: this.userName }
                // userInfo: { id: 'uuid', email: 'test@test' }
            })
            .then(response => {
                console.log(response.data);
                self.login(response.data);
            });
        },

        async login(challenge) {

            const self = this;

            console.log("login")
            const credentials = await startAuthentication(challenge);
            console.log(credentials);

            axios.post('https://foodover.herokuapp.com/webauthn/login-challenge', {
                headers: {
                    'content-type': 'Application/Json'
                },
                // body: JSON.stringify({ id: 'uuid', email: 'test@test' })
                // userInfo: { email: 'test@test' }
                credentials: JSON.stringify(credentials)
                // userInfo: { id: 'uuid', email: 'test@test' }
            })
            .then(response => {
                console.log(response.data);
                console.log(response.data.verified)
                console.log(typeof response.data.verified)
                // self.login(response.data);
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
            axios.get("https://foodover.herokuapp.com/webauthn/test-token")
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

<template>
    <div>
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
// import { solveRegistrationChallenge, solveLoginChallenge } from '@webauthn/client';

export default {
    name: "Login",
    data() {
        return {};
    },
    computed: {},
    methods: {

        requestRegister() {
            console.log("request register");
            const self = this;

            axios.post('https://foodover.herokuapp.com/webauthn/request-register', {
                headers: {
                    'content-type': 'Application/Json'
                },
                // body: JSON.stringify({ id: 'uuid', email: 'test@test' })
                userInfo: { id: 'uuid', email: 'test@test' }
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

            // const { loggedIn } = await fetch(
            //     'http://localhost:8000/webauthn/register', 
            //     {
            //         method: 'POST',
            //         headers: {
            //             'content-type': 'Application/Json'
            //         },
            //         body: JSON.stringify(credentials)
            //     }
            // ).then(response => response.json());

            // if (loggedIn) {
            //     console.log('registration successful');
            //     return;
            // }
            // console.log('registration failed');
        },

        requestLogin() {
            console.log('request login');
            const self = this;

            axios.post('https://foodover.herokuapp.com/webauthn/login', {
                headers: {
                    'content-type': 'Application/Json'
                },
                // body: JSON.stringify({ id: 'uuid', email: 'test@test' })
                userInfo: { email: 'test@test' }
                // userInfo: { id: 'uuid', email: 'test@test' }
            })
            .then(response => {
                console.log(response.data);
                self.login(response.data);
            });
            // const challenge = await fetch('http://localhost:8000/webauthn/login', {
            //     method: 'POST',
            //     headers: {
            //         'content-type': 'Application/Json'
            //     },
            //     body: JSON.stringify({ email: 'test@test' })
            // })
            // .then(response => response.json());
        },

        async login(challenge) {

            console.log("login")
            const credentials = await solveLoginChallenge(challenge);
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
                // self.login(response.data);
            });

        }

            // const credentials = await solveLoginChallenge(challenge);
            // const { loggedIn } = await fetch(
            //     'http://localhost:8000/webauthn/login-challenge', 
            //     {
            //         method: 'POST',
            //         headers: {
            //             'content-type': 'Application/Json'
            //         },
            //         body: JSON.stringify(credentials)
            //     }
            // ).then(response => response.json());

            // if (loggedIn) {
            //     console.log('You are logged in');
            //     return;
            // }
            // console.log('Invalid credential');
        // } 
    }
};
</script>

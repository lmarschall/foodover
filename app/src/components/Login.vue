<template>
    <div>
        <button
            type="button"
            class="btn btn-primary"
            v-on:click="requestRegister"
        >
            Register
        </button>
        <!-- <button
            type="button"
            class="btn btn-primary"
            v-on:click="login"
        >
            Login
        </button> -->
    </div>
</template>

<style scoped></style>

<script>
/**
 * Component to display the diets of the search.
 */
import axios from "axios";
// import { solveRegistrationChallenge, solveLoginChallenge } from '@webauthn/client';
import { solveRegistrationChallenge } from '@webauthn/client';

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
                console.log(response);
                self.solveRegisterChallenge(response.data);
            });
        }, 
        async solveRegisterChallenge(challenge) {

            console.log("solve register challenge");

            const credentials = await solveRegistrationChallenge(challenge);
            console.log(credentials);

            axios.post('https://foodover.herokuapp.com/webauthn/request-register', {
                headers: {
                    'content-type': 'Application/Json'
                },
                // body: JSON.stringify(credentials)
                credentials: credentials
            })
            .then(response => {
                console.log(response);
                // self.solveRegisterChallenge(response.data);
            });
        }

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

        login() {
            console.log('login');
            // const challenge = await fetch('http://localhost:8000/webauthn/login', {
            //     method: 'POST',
            //     headers: {
            //         'content-type': 'Application/Json'
            //     },
            //     body: JSON.stringify({ email: 'test@test' })
            // })
            // .then(response => response.json());

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

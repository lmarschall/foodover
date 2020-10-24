<template>
    <div id="profileframe">

        <Bar v-bind:page="1" />
        <input type="button" v-on:click="login">
        <Intolerances/>

    </div>
</template>

<script>
import Bar from './partials/Bar'
import Intolerances from './partials/Intolerances'

export default {
    name: 'profileframe',
    components: {
        Bar,
        Intolerances
    },
    data () {
        return {
        }
    },
    mounted: function () {
        this.loadData()
    },
    methods:
    {
        loadData: function () {

        },

        login: async function () {
            // var userIdBuffer
            // var challengeBuffer

            // const create_options = {
            //   publicKey: {
            //     rp: { name: 'example.com' },
            //     user: {
            //       name: 'john.appleseed@example.com',
            //       id: userIdBuffer,
            //       displayName: 'John Appleseed'
            //     },
            //     pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
            //     challenge: challengeBuffer,
            //     authenticatorSelection: { authenticatorAttachment: 'platform' }
            //   }
            // }

            // const publicKeyCredential = await navigator.credentials.create(create_options)

            // console.log(publicKeyCredential)

            // const get_options = {
            //     publicKey: {
            //         challenge: challengeBuffer,
            //         allowCredentials: [
            //             { type: "public-key", id: credentialIdBuffer1, transports: ["internal"] },
            //             // ... more Credential IDs can be supplied.
            //         ]
            //     }
            // };

            // const publicKeyCredential = await navigator.credentials.get(get_options);
        }
    }
}
</script>

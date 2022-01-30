require('dotenv').config();

const express = require('express');
const webauthn = express.Router();

console.log('server is starting webauthn services')

const userRepository = require('./userRepository');

const {
    // Registration
    generateRegistrationOptions,
    verifyRegistrationResponse,
    // Authentication
    generateAuthenticationOptions,
    verifyAuthenticationResponse,
} = require('@simplewebauthn/server');
    

const rpId = "localhost"
let expectedOrigin = ''
let currenUserEmail = ''

webauthn.post('/request-register', (req, res) => {
    const { id, email } = req.body.userInfo;

    console.log("generate register challenge");

    currenUserEmail = email

    const opts = {
        rpName: 'SimpleWebAuthn Example',
        rpId,
        userID: id,
        userName: email,
        timeout: 60000,
        attestationType: 'direct',
        /**
         * Passing in a user's list of already-registered authenticator IDs here prevents users from
         * registering the same device multiple times. The authenticator will simply throw an error in
         * the browser if it's asked to perform registration when one of these ID's already resides
         * on it.
         */
        // excludeCredentials: devices.map(dev => ({
        //   id: dev.credentialID,
        //   type: 'public-key',
        //   transports: dev.transports,
        // })),
        /**
         * The optional authenticatorSelection property allows for specifying more constraints around
         * the types of authenticators that users to can use for registration
         */
        authenticatorSelection: {
          userVerification: 'preferred',
          requireResidentKey: false,
        },
        supportedAlgorithmIDs: [-7, -257]
    };

    const options = generateRegistrationOptions(opts);

    userRepository.create({
        id,
        email,
        challenge: options.challenge,
    })

    res.send(options);
});

webauthn.post('/register', (req, res) => {
    
    const body = req.body;

    const user = userRepository.findByEmail(currenUserEmail);

    if (!user) {
        return res.sendStatus(400);
    }

    const expectedChallenge = user.challenge;

    let verification;
    try {
        const opts = {
        credential: body,
        expectedChallenge: `${expectedChallenge}`,
        expectedOrigin,
        expectedRPID: rpId,
        };
        verification = await verifyRegistrationResponse(opts);
    } catch (error) {
        const _error = error;
        console.error(_error);
        return res.status(400).send({ error: _error.message });
    }

    const { verified, registrationInfo } = verification;

    console.log("registration result");
    console.log(verified);
    console.log(registrationInfo);
    // const { verified } = verification;

    // if (verified && registrationInfo) {
    //     const { credentialPublicKey, credentialID, counter } = registrationInfo;

    //     const existingDevice = user.devices.find(device => device.credentialID === credentialID);

    //     if (!existingDevice) {
    //     /**
    //      * Add the returned device to the user's list of devices
    //      */
    //     const newDevice = {
    //         credentialPublicKey,
    //         credentialID,
    //         counter,
    //         transports: body.transports,
    //     };
    //     user.devices.push(newDevice);
    //     }
    // }

    res.send({ verified });
});

webauthn.post('/login', (req, res) => {

    const { email } = req.body.userInfo;

    console.log("generate login challenge");

    const user = userRepository.findByEmail(email);

    if (!user) {
        return res.sendStatus(400);
    }

    const opts = {
        timeout: 60000,
        allowCredentials: user.devices.map(dev => ({
        id: dev.credentialID,
        type: 'public-key',
        transports: dev.transports ?? ['usb', 'ble', 'nfc', 'internal'],
        })),
        /**
         * This optional value controls whether or not the authenticator needs be able to uniquely
         * identify the user interacting with it (via built-in PIN pad, fingerprint scanner, etc...)
         */
        userVerification: 'preferred',
        rpId,
    };

    const options = generateAuthenticationOptions(opts);

    userRepository.updateUserChallenge(user, options.challenge);

    res.send(options);
});

webauthn.post('/login-challenge', (req, res) => {
    const { challenge, keyId } = parseLoginRequest(req.body.credentials);
    if (!challenge) {
        return res.sendStatus(400);
    }
    const user = userRepository.findByChallenge(challenge);

    if (!user || !user.key || user.key.credID !== keyId) {
        return res.sendStatus(400);
    }

    const loggedIn = verifyAuthenticatorAssertion(req.body, user.key);

    return res.send({ loggedIn });
});

module.exports = webauthn
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

// const string = '{"rawId":"QL628gaAbtiDBzSLb4QYCm7p5TQ=","response":{"attestationObject":"o2NmbXRlYXBwbGVnYXR0U3RtdKFjeDVjglkCRzCCAkMwggHJoAMCAQICBgF+rUCPqDAKBggqhkjOPQQDAjBIMRwwGgYDVQQDDBNBcHBsZSBXZWJBdXRobiBDQSAxMRMwEQYDVQQKDApBcHBsZSBJbmMuMRMwEQYDVQQIDApDYWxpZm9ybmlhMB4XDTIyMDEyOTIzMDk1NloXDTIyMDIwMTIzMDk1NlowgZExSTBHBgNVBAMMQGMzYmY5ZmRlYjQ3ZWIyOTg4OTdkMDI2MTM3NTg3NWY0NTI2YTQwMmQ3Y2YzODZjODNmNzk5MzZiNWM3ZjdiOTIxGjAYBgNVBAsMEUFBQSBDZXJ0aWZpY2F0aW9uMRMwEQYDVQQKDApBcHBsZSBJbmMuMRMwEQYDVQQIDApDYWxpZm9ybmlhMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEZuOR8If0dGP2uxb3OaIHVFPG6t6phr523JnjW8m0+s+baXmDQidjgynZXqiOwQSHSxlchsEP8zqMPjKMgVJdiKNVMFMwDAYDVR0TAQH/BAIwADAOBgNVHQ8BAf8EBAMCBPAwMwYJKoZIhvdjZAgCBCYwJKEiBCBeeHWjYfvs5KrpdF7Z7LxNCHwzS9T+zCYJdBPL1MlQnjAKBggqhkjOPQQDAgNoADBlAjAPTaH+MGBYtS+ekSLeVUjiD8syjIiffkKAX9uz8NYIewwvNob91JItWi4BHK8h2r4CMQCXzZfdzLAoLaO8TlxBrWmydHZak5P/sd5uGB4NXOw4p9HWLxL85/Rjtnr1wV01SfxZAjgwggI0MIIBuqADAgECAhBWJVOVx6f7QOviKNgmCFO2MAoGCCqGSM49BAMDMEsxHzAdBgNVBAMMFkFwcGxlIFdlYkF1dGhuIFJvb3QgQ0ExEzARBgNVBAoMCkFwcGxlIEluYy4xEzARBgNVBAgMCkNhbGlmb3JuaWEwHhcNMjAwMzE4MTgzODAxWhcNMzAwMzEzMDAwMDAwWjBIMRwwGgYDVQQDDBNBcHBsZSBXZWJBdXRobiBDQSAxMRMwEQYDVQQKDApBcHBsZSBJbmMuMRMwEQYDVQQIDApDYWxpZm9ybmlhMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEgy6HLyYUkYECJbn1/Na7Y3i19V8/ywRbxzWZNHX9VJBE35v+GSEXZcaaHdoFCzjUUINAGkNPsk0RLVbD4c+/y5iR/sBpYIG++Wy8d8iN3a9Gpa7h3VFbWvqrk76cCyaRo2YwZDASBgNVHRMBAf8ECDAGAQH/AgEAMB8GA1UdIwQYMBaAFCbXZNnFeMJaZ9Gn3msS0Btj8cbXMB0GA1UdDgQWBBTrroLE/6GsW1HUzyRhBQC+Y713iDAOBgNVHQ8BAf8EBAMCAQYwCgYIKoZIzj0EAwMDaAAwZQIxAN2LGjSBpfrZ27TnZXuEHhRMJ7dbh2pBhsKxR1dQM3In7+VURX72SJUMYy5cSD5wwQIwLIpgRNwgH8/lm8NNKTDBSHhR2WDtanXx60rKvjjNJbiX0MgFvvDH94sHpXHG6A4HaGF1dGhEYXRhWJirs5EEhHT6Yq3aicmhjQoT/0Kqd8+tYnn0T3cQX05dpEUAAAAA8kqOcNDT+CwpNzJSPMTeWgAUQL628gaAbtiDBzSLb4QYCm7p5TSlAQIDJiABIVggZuOR8If0dGP2uxb3OaIHVFPG6t6phr523JnjW8m0+s8iWCCbaXmDQidjgynZXqiOwQSHSxlchsEP8zqMPjKMgVJdiA==","clientDataJSON":"eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiZlFDOXZzVkpnM0Q5UHV2bmc5Wm5IOTcwcmMybmltdnlvUmxJdnlNdmhhbyIsIm9yaWdpbiI6Imh0dHBzOi8vZm9vZG92ZXIuYXBwIn0="},"getClientExtensionResults":{},"id":"QL628gaAbtiDBzSLb4QYCm7p5TQ","type":"public-key"}'
// // const string = {"rawId":"QL628gaAbtiDBzSLb4QYCm7p5TQ=","response":{"attestationObject":"o2NmbXRlYXBwbGVnYXR0U3RtdKFjeDVjglkCRzCCAkMwggHJoAMCAQICBgF+rUCPqDAKBggqhkjOPQQDAjBIMRwwGgYDVQQDDBNBcHBsZSBXZWJBdXRobiBDQSAxMRMwEQYDVQQKDApBcHBsZSBJbmMuMRMwEQYDVQQIDApDYWxpZm9ybmlhMB4XDTIyMDEyOTIzMDk1NloXDTIyMDIwMTIzMDk1NlowgZExSTBHBgNVBAMMQGMzYmY5ZmRlYjQ3ZWIyOTg4OTdkMDI2MTM3NTg3NWY0NTI2YTQwMmQ3Y2YzODZjODNmNzk5MzZiNWM3ZjdiOTIxGjAYBgNVBAsMEUFBQSBDZXJ0aWZpY2F0aW9uMRMwEQYDVQQKDApBcHBsZSBJbmMuMRMwEQYDVQQIDApDYWxpZm9ybmlhMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEZuOR8If0dGP2uxb3OaIHVFPG6t6phr523JnjW8m0+s+baXmDQidjgynZXqiOwQSHSxlchsEP8zqMPjKMgVJdiKNVMFMwDAYDVR0TAQH/BAIwADAOBgNVHQ8BAf8EBAMCBPAwMwYJKoZIhvdjZAgCBCYwJKEiBCBeeHWjYfvs5KrpdF7Z7LxNCHwzS9T+zCYJdBPL1MlQnjAKBggqhkjOPQQDAgNoADBlAjAPTaH+MGBYtS+ekSLeVUjiD8syjIiffkKAX9uz8NYIewwvNob91JItWi4BHK8h2r4CMQCXzZfdzLAoLaO8TlxBrWmydHZak5P/sd5uGB4NXOw4p9HWLxL85/Rjtnr1wV01SfxZAjgwggI0MIIBuqADAgECAhBWJVOVx6f7QOviKNgmCFO2MAoGCCqGSM49BAMDMEsxHzAdBgNVBAMMFkFwcGxlIFdlYkF1dGhuIFJvb3QgQ0ExEzARBgNVBAoMCkFwcGxlIEluYy4xEzARBgNVBAgMCkNhbGlmb3JuaWEwHhcNMjAwMzE4MTgzODAxWhcNMzAwMzEzMDAwMDAwWjBIMRwwGgYDVQQDDBNBcHBsZSBXZWJBdXRobiBDQSAxMRMwEQYDVQQKDApBcHBsZSBJbmMuMRMwEQYDVQQIDApDYWxpZm9ybmlhMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEgy6HLyYUkYECJbn1/Na7Y3i19V8/ywRbxzWZNHX9VJBE35v+GSEXZcaaHdoFCzjUUINAGkNPsk0RLVbD4c+/y5iR/sBpYIG++Wy8d8iN3a9Gpa7h3VFbWvqrk76cCyaRo2YwZDASBgNVHRMBAf8ECDAGAQH/AgEAMB8GA1UdIwQYMBaAFCbXZNnFeMJaZ9Gn3msS0Btj8cbXMB0GA1UdDgQWBBTrroLE/6GsW1HUzyRhBQC+Y713iDAOBgNVHQ8BAf8EBAMCAQYwCgYIKoZIzj0EAwMDaAAwZQIxAN2LGjSBpfrZ27TnZXuEHhRMJ7dbh2pBhsKxR1dQM3In7+VURX72SJUMYy5cSD5wwQIwLIpgRNwgH8/lm8NNKTDBSHhR2WDtanXx60rKvjjNJbiX0MgFvvDH94sHpXHG6A4HaGF1dGhEYXRhWJirs5EEhHT6Yq3aicmhjQoT/0Kqd8+tYnn0T3cQX05dpEUAAAAA8kqOcNDT+CwpNzJSPMTeWgAUQL628gaAbtiDBzSLb4QYCm7p5TSlAQIDJiABIVggZuOR8If0dGP2uxb3OaIHVFPG6t6phr523JnjW8m0+s8iWCCbaXmDQidjgynZXqiOwQSHSxlchsEP8zqMPjKMgVJdiA==","clientDataJSON":"eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiZlFDOXZzVkpnM0Q5UHV2bmc5Wm5IOTcwcmMybmltdnlvUmxJdnlNdmhhbyIsIm9yaWdpbiI6Imh0dHBzOi8vZm9vZG92ZXIuYXBwIn0="},"getClientExtensionResults":{},"id":"QL628gaAbtiDBzSLb4QYCm7p5TQ","type":"public-key"}
// const credential = JSON.parse(string)
// credential.id = credential.rawId

// const challenge = 'aKSvg2_gx7lZgBREnl4pw1chl8jtLK_J1NrTxk4LNic'
// const challenge = 'fQC9vsVJg3D9Puvng9ZnH970rc2nimvyoRlIvyMvhao'


const rpId = "localhost"
let expectedOrigin = 'https://foodover.app'
let currenUserEmail = ''

// const opts = {
//     credential: credential,
//     expectedChallenge: `${challenge}`,
//     expectedOrigin,
//     expectedRPID: '',
//     };
// verification = verifyRegistrationResponse(opts);

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
        // authenticatorSelection: {
        //   userVerification: 'preferred',
        //   requireResidentKey: false,
        // },
        supportedAlgorithmIDs: [-7, -257]
    };

    const options = generateRegistrationOptions(opts);

    // if user already exists
    if(userRepository.findByEmail(currenUserEmail)) {
        console.log("update user challenge")
        
        const user = userRepository.findByEmail(email);
        user.challenge = options.challenge
    } else {
        console.log("create new user")
        userRepository.create({
            id,
            email,
            challenge: options.challenge,
        })
    }

    res.send(options);
});

webauthn.post('/register', async (req, res) => {
    
    const credential = JSON.parse(req.body.credentials);
    credential.id = credential.rawId

    const user = userRepository.findByEmail(currenUserEmail);

    if (!user) {
        return res.sendStatus(400);
    }

    const expectedChallenge = user.challenge;

    console.log(expectedChallenge);

    let verification;
    try {
        const opts = {
        credential: credential,
        expectedChallenge: `${expectedChallenge}`,
        expectedOrigin,
        // expectedRPID: rpId,
        expectedRPID: '',
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
        // transports: dev.transports ?? ['usb', 'ble', 'nfc', 'internal'],
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
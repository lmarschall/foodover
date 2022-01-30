require('dotenv').config();

const express = require('express');
const webauthn = express.Router();


console.log('server is starting webauthn services')

const userRepository = require('./userRepository');
const {
    generateRegistrationChallenge,
    parseRegisterRequest,
    generateLoginChallenge,
    parseLoginRequest,
    verifyAuthenticatorAssertion,
} = require('@webauthn/server');

const credentials_string = {"rawId":"eChSb9s2JWZCBQsEY/DGOZK/bDI=","response":{"attestationObject":"o2NmbXRlYXBwbGVnYXR0U3RtdKFjeDVjglkCRzCCAkMwggHJoAMCAQICBgF+q/hTFTAKBggqhkjOPQQDAjBIMRwwGgYDVQQDDBNBcHBsZSBXZWJBdXRobiBDQSAxMRMwEQYDVQQKDApBcHBsZSBJbmMuMRMwEQYDVQQIDApDYWxpZm9ybmlhMB4XDTIyMDEyOTE3MTEyNVoXDTIyMDIwMTE3MTEyNVowgZExSTBHBgNVBAMMQDU5YWNiMzhiNTIwNTliNjUzYzg4ZTI4OTA3OTE3YTJlZGNlMzJkMmU4ODM2ZGIzY2I0Nzk4OWZjMWVmZTYyYzMxGjAYBgNVBAsMEUFBQSBDZXJ0aWZpY2F0aW9uMRMwEQYDVQQKDApBcHBsZSBJbmMuMRMwEQYDVQQIDApDYWxpZm9ybmlhMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEM5Hgqcnt16ptFMXOFaGSEAR/Mn7amDMwTMYzUmG4MSkB6n3tgi2rhcsOAO6/jNr2hFDyBt/1PMv78y6iBgTIKaNVMFMwDAYDVR0TAQH/BAIwADAOBgNVHQ8BAf8EBAMCBPAwMwYJKoZIhvdjZAgCBCYwJKEiBCC9NchGgvTmZ7BVTS2yZ4B3VWuo63mu1dpgAP4dK7IstTAKBggqhkjOPQQDAgNoADBlAjAUyqqzFSfu+Fbr7h/2UDexKLGrvLJGGkT3l3JguBIgT1SANdI0VGNtYRU9A/LL2XoCMQCn8gJPydSJ2Wgle01nHRb+hthPtyf9WLUIb/ohoGvTojoDPNj1WLwaxi9nJZ1DSiRZAjgwggI0MIIBuqADAgECAhBWJVOVx6f7QOviKNgmCFO2MAoGCCqGSM49BAMDMEsxHzAdBgNVBAMMFkFwcGxlIFdlYkF1dGhuIFJvb3QgQ0ExEzARBgNVBAoMCkFwcGxlIEluYy4xEzARBgNVBAgMCkNhbGlmb3JuaWEwHhcNMjAwMzE4MTgzODAxWhcNMzAwMzEzMDAwMDAwWjBIMRwwGgYDVQQDDBNBcHBsZSBXZWJBdXRobiBDQSAxMRMwEQYDVQQKDApBcHBsZSBJbmMuMRMwEQYDVQQIDApDYWxpZm9ybmlhMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEgy6HLyYUkYECJbn1/Na7Y3i19V8/ywRbxzWZNHX9VJBE35v+GSEXZcaaHdoFCzjUUINAGkNPsk0RLVbD4c+/y5iR/sBpYIG++Wy8d8iN3a9Gpa7h3VFbWvqrk76cCyaRo2YwZDASBgNVHRMBAf8ECDAGAQH/AgEAMB8GA1UdIwQYMBaAFCbXZNnFeMJaZ9Gn3msS0Btj8cbXMB0GA1UdDgQWBBTrroLE/6GsW1HUzyRhBQC+Y713iDAOBgNVHQ8BAf8EBAMCAQYwCgYIKoZIzj0EAwMDaAAwZQIxAN2LGjSBpfrZ27TnZXuEHhRMJ7dbh2pBhsKxR1dQM3In7+VURX72SJUMYy5cSD5wwQIwLIpgRNwgH8/lm8NNKTDBSHhR2WDtanXx60rKvjjNJbiX0MgFvvDH94sHpXHG6A4HaGF1dGhEYXRhWJirs5EEhHT6Yq3aicmhjQoT/0Kqd8+tYnn0T3cQX05dpEUAAAAA8kqOcNDT+CwpNzJSPMTeWgAUeChSb9s2JWZCBQsEY/DGOZK/bDKlAQIDJiABIVggM5Hgqcnt16ptFMXOFaGSEAR/Mn7amDMwTMYzUmG4MSkiWCAB6n3tgi2rhcsOAO6/jNr2hFDyBt/1PMv78y6iBgTIKQ==","clientDataJSON":"eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiMGFsMmVLMi1PRHNwMW0xTWxRZ0FSN1dFUmJwOVpUdEQyWHBwaTNXaVNYcyIsIm9yaWdpbiI6Imh0dHBzOi8vZm9vZG92ZXIuYXBwIn0="},"getClientExtensionResults":{},"id":"eChSb9s2JWZCBQsEY_DGOZK_bDI","type":"public-key"}
console.log(parseRegisterRequest(credentials_string));

webauthn.post('/request-register', (req, res) => {
    const { id, email } = req.body.userInfo;

    console.log("generate register challenge");

    const challengeResponse = generateRegistrationChallenge({
        relyingParty: { name: 'ACME' },
        user: { id, name: email }
    });

    userRepository.create({
        id,
        email,
        challenge: challengeResponse.challenge,
    })

    res.send(challengeResponse);
});

webauthn.post('/register', (req, res) => {
    const { key, challenge } = parseRegisterRequest(req.body.credentials);

    console.log(parseRegisterRequest(credentials_string));
    console.log(req.body.credentials);

    console.log("register user")
    console.log(key)
    console.log(challenge)

    const user = userRepository.findByChallenge(challenge);

    if (!user) {
        return res.sendStatus(400);
    }

    userRepository.addKeyToUser(user, key);

    console.log("user successfully registered");

    return res.send({ loggedIn: true });
});

webauthn.post('/login', (req, res) => {
    const { email } = req.body.userInfo;

    console.log("generate login challenge");

    const user = userRepository.findByEmail(email);

    if (!user) {
        return res.sendStatus(400);
    }

    const assertionChallenge = generateLoginChallenge(user.key);

    userRepository.updateUserChallenge(user, assertionChallenge.challenge);

    res.send(assertionChallenge);
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
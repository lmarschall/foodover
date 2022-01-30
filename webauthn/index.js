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

webauthn.post('/request-register', (req, res) => {
    const { id, email } = req.body.userInfo;

    console.log("generate challenge");

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

    const user = userRepository.findByChallenge(challenge);

    if (!user) {
        return res.sendStatus(400);
    }

    userRepository.addKeyToUser(user, key);

    return res.send({ loggedIn: true });
});

webauthn.post('/login', (req, res) => {
    const { email } = req.body;

    const user = userRepository.findByEmail(email);

    if (!user) {
        return res.sendStatus(400);
    }

    const assertionChallenge = generateLoginChallenge(user.key);

    userRepository.updateUserChallenge(user, assertionChallenge.challenge);

    res.send(assertionChallenge);
});

webauthn.post('/login-challenge', (req, res) => {
    const { challenge, keyId } = parseLoginRequest(req.body);
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
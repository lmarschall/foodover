require('dotenv').config();

const express = require('express');
const base64url = require('base64url');
const jose = require('jose');
const { PrismaClient } = require('@prisma/client');
const webauthn = express.Router();

const debug = process.env.DEBUG || false;

console.log('server is starting webauthn services')

const userRepository = require('./userRepository');
const prisma = new PrismaClient()

let token_key_pairs = [];

const {
    // Registration
    generateRegistrationOptions,
    verifyRegistrationResponse,
    // Authentication
    generateAuthenticationOptions,
    verifyAuthenticationResponse,
} = require('@simplewebauthn/server');

const rpId = "foodover.app"
let expectedOrigin = 'https://foodover.app'
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
        // // Run inside `async` function
        // const post = await prisma.post.update({
        //     where: { id: 42 },
        //     data: { published: true },
        // })
    } else {
        console.log("create new user")
        // // Run inside `async` function
        // const user = await prisma.user.create({
        //     data: {
        //     name: 'Alice',
        //     email: 'alice@prisma.io',
        //     posts: {
        //         create: { title: 'Join us for Prisma Day 2021' },
        //     },
        //     },
        // })
        userRepository.create({
            id,
            email,
            challenge: options.challenge,
            devices: []
        })
    }

    res.send(options);
});

webauthn.post('/register', async (req, res) => {
    
    console.log("register body")
    console.log(req.body)
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
        expectedRPID: rpId,
        // expectedRPID: '',
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

    if (verified && registrationInfo) {
        const { credentialPublicKey, credentialID, counter } = registrationInfo;

        const existingDevice = user.devices.find(device => device.credentialID === credentialID);

        if (!existingDevice) {
            /**
             * Add the returned device to the user's list of devices
             */
            const newDevice = {
                credentialPublicKey,
                credentialID,
                counter,
                // transports: body.transports,
            };
            user.devices.push(newDevice);
        }
    }

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
            transports: dev.transports || ['usb', 'ble', 'nfc', 'internal'],
            // transports: 'internal'
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

webauthn.post('/login-challenge', async (req, res) => {

    const body = req.body;

    const credentials = JSON.parse(req.body.credentials);

    const user = userRepository.findByEmail(currenUserEmail);

    const expectedChallenge = user.challenge;

    let dbAuthenticator;
    const bodyCredIDBuffer = base64url.toBuffer(credentials.rawId);
    // "Query the DB" here for an authenticator matching `credentialID`
    for (const dev of user.devices) {
        if (dev.credentialID.equals(bodyCredIDBuffer)) {
        dbAuthenticator = dev;
        break;
        }
    }

    if (!dbAuthenticator) {
        throw new Error(`could not find authenticator matching ${body.id}`);
    }

    let verification;
    try {
        const opts = {
        credential: credentials,
        expectedChallenge: `${expectedChallenge}`,
        expectedOrigin,
        expectedRPID: rpId,
        // expectedRPID: '',
        authenticator: dbAuthenticator,
        };
        verification = verifyAuthenticationResponse(opts);
    } catch (error) {
        const _error = error;
        console.error(_error);
        return res.status(400).send({ error: _error.message });
    }

    const { verified, authenticationInfo } = verification;

    if (verified) {
        // Update the authenticator's counter in the DB to the newest count in the authentication
        dbAuthenticator.counter = authenticationInfo.newCounter;

        // create key pair for signing and verifying json web token
        const { publicKey, privateKey } = await jose.generateKeyPair('ES256')
        console.log(publicKey)
        console.log(privateKey)

        // TODO save public key for verification with user in database

        // create new json web token for api calls
        const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
            .setProtectedHeader({ alg: 'ES256' })
            .setIssuedAt()
            .setIssuer('urn:example:issuer')
            .setAudience('urn:example:audience')
            // .setExpirationTime('2h') // no exp time
            .sign(privateKey)

        // save token and key in memory for now
        const newTokenKeyPair = {
            token: jwt,
            key: publicKey
        }
        token_key_pairs.push(newTokenKeyPair);

        console.log(jwt)

        return res.send({verified, jwt})
    }

    res.send({ verified })
});

webauthn.get('/test-token', async (req, res) => {

    // create key pair for creating json web token
    const { publicKey, privateKey } = await jose.generateKeyPair('ES256')
    console.log(publicKey)
    console.log(privateKey)

    // TODO save public key for verification with user in database

    // create new json web token for api calls
    const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
        .setProtectedHeader({ alg: 'ES256' })
        .setIssuedAt()
        .setIssuer('urn:example:issuer')
        .setAudience('urn:example:audience')
        // .setExpirationTime('2h') // no exp time
        .sign(privateKey)


    // save token and key in memory for now
    const newTokenKeyPair = {
        token: jwt,
        key: publicKey
    }
    token_key_pairs.push(newTokenKeyPair);

    console.log(jwt)

    fake_jwt = "xyz"

    try {
        const { payload, protectedHeader } = await jose.jwtVerify(fake_jwt, publicKey, {
            issuer: 'urn:example:issuer',
            audience: 'urn:example:audience'
        })
        console.log(protectedHeader)
        console.log(payload)
    } catch(error) {
        console.log(error.code)
    }

    res.send({jwt})

});

webauthn.validateToken = async (req, res, next) => {

    console.log("validate token");

    console.log(req.headers);

    // if(debug) {
    //     return next();
    // }

    if (req.headers['authorization']) {
        try {
            const authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                // TODO search token and the public Key in storage
                const jwt = authorization[1]
                let publicKey = ''
                token_key_pairs.forEach(element => {
                    if(element.token == jwt) {
                        publicKey = element.key;
                    }
                });
                try {
                    const { payload, protectedHeader } = await jose.jwtVerify(jwt, publicKey, {
                        issuer: 'urn:example:issuer',
                        audience: 'urn:example:audience'
                    })
                    console.log(protectedHeader)
                    console.log(payload)
                } catch(error) {
                    console.log(error.code)
                    return res.status(401).send();
                }
                return next();
            }
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
};


module.exports = webauthn
require('dotenv').config();

const express = require('express');
const base64url = require('base64url');
const jose = require('jose');
const { PrismaClient } = require('@prisma/client');

const {
    // Registration
    generateRegistrationOptions,
    verifyRegistrationResponse,
    // Authentication
    generateAuthenticationOptions,
    verifyAuthenticationResponse,
} = require('@simplewebauthn/server');

const webauthn = express.Router();
const prisma = new PrismaClient();
const rpId = process.env.RPID || "foodover.app";
const rpName = "Foodover";
const expectedOrigin = `https://${rpId}`;

console.log('server is starting webauthn services')

// test();

async function test() {
    let name = 'Name'
    let counter = 0

    // search for user if name already exists, else generate new user
    const user = await prisma.user.upsert({
        where: {
            name: name,
        },
        update: {
        },
        create: {
            name: name
        }
    })

    // check if device is already registered with user, else create device registration for user
    await prisma.device.upsert({
        where: {
            credentialId: credentialId      
        },
        update: {
            userUId: user.uid,
            counter: counter
        },
        create: {
            userUId: user.uid,
            counter: counter
        }
    })
}

webauthn.post('/request-register', async (req, res) => {

    // get parameters from request
    const { name } = req.body.userInfo;

    // search for user if name already exists, else generate new user
    const user = await prisma.user.upsert({
        where: {
            name: name,
        },
        update: {
        },
        create: {
            name: name
        }
    })

    const opts = {
        rpName: rpName,
        rpId,
        userID: user.uid,
        userName: name,
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

    // update the user challenge
    await prisma.user.update({
        where: {
            uid: user.uid
        },
        data: {
            challenge: options.challenge,
        }
    })

    res.send(options);
});

webauthn.post('/register', async (req, res) => {
    
    // get the signed credentials and the expected challenge from request
    const { credentials, challenge } = req.body.challengeResponse;
    // credential.id = credential.rawId

    // find user with expected challenge
    // const user = userRepository.findByEmail(currenUserEmail);
    const user = await prisma.user.findUnique({
        where: {
            challenge: challenge,
        },
    })

    // user with challenge not found, return error
    if (!user) {
        return res.sendStatus(400);
    }

    let verification;
    try {
        const opts = {
            credential: credentials,
            expectedChallenge: `${user.challenge}`,
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

    if (verified && registrationInfo) {
        const { credentialPublicKey, credentialID, counter } = registrationInfo;

        // check if device is already registered with user, else create device registration for user
        await prisma.device.upsert({
            where: {
                credentialId: credentialID      
            },
            update: {
                userUId: user.uid,
                counter: counter
            },
            create: {
                userUId: user.uid,
                credentialPublicKey: credentialPublicKey,
                credentialId: credentialID,
                counter: counter
            }
        })
    }

    res.send({ verified });
});

webauthn.post('/login', async (req, res) => {

    const { name } = req.body.userInfo;

    // search for user if name already exists, else generate new user
    const user = await prisma.user.findUnique({
        where: {
            name: name,
        }
    })

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

    // update the user challenge
    await prisma.user.update({
        where: {
            uid: user.uid
        },
        data: {
            challenge: options.challenge,
        }
    })

    res.send(options);
});

webauthn.post('/login-challenge', async (req, res) => {

    const body = req.body;

    const { credentials, challenge } = req.body.challengeResponse;

    // search for user by challenge
    const user = await prisma.user.findUnique({
        where: {
            challenge: challenge,
        }
    })

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
        expectedChallenge: `${user.challenge}`,
        expectedOrigin,
        expectedRPID: rpId,
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
                        audience: 'urn:example:audience',
                        algorithms: ['ES256']
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
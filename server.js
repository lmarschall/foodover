require('dotenv').config();

const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./api');
const webauthn = require('./webauthn');

const port = process.env.PORT || 80;
const medcastUrlRegExp = /(http(s)?:\/\/)(.foodover.app)|(localhost)/;
const corsOptions = {
    origin: medcastUrlRegExp
};

console.log('server is starting on port ' + port)

app = express();

app.use(cors(corsOptions));
app.use(cors());
app.use(compression()); //COMPRESSION
app.use(bodyParser.json());
app.use('/api', api);
app.use('/webauthn', webauthn);

app.listen(port);
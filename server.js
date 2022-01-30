require('dotenv').config();

const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./api');
const webauthn = require('./webauthn');
// const history = require('connect-history-api-fallback');

const port = process.env.PORT || 80;
console.log('server is starting on port ' + port)

app = express();

app.use(cors());
app.use(compression()); //COMPRESSION
app.use(bodyParser.json());
// app.use(history());
// using nodejs only as api endpoint for now on
// app.use(express.static(path.join(__dirname, "/app/dist")));
app.use('/api', api);
app.use('/webauthn', webauthn);

app.listen(port);
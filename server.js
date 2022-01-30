const express = require('express');
const compression = require('compression');
const api = require('./api');
require('dotenv').config();

const port = process.env.PORT || 80;

const history = require('connect-history-api-fallback');

var cors = require('cors');
app = express();

app.use(cors());
app.use(compression()); //COMPRESSION
app.use(history());
// using nodejs only as api endpoint for now on
// app.use(express.static(path.join(__dirname, "/app/dist")));
app.use('/api', api);

app.listen(port);
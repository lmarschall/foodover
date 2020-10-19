const express = require('express');
const path = require('path');
const axios = require('axios');
const compression = require('compression');
const api = require('./api');

const port = process.env.PORT || 80;

const history = require('connect-history-api-fallback');

app = express();

app.use(history());
app.use(express.static(path.join(__dirname, "/app/dist")));
app.use('/api', api);
app.use(compression()); //COMPRESSION

app.listen(port);
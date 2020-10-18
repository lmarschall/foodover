const express = require('express');
const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
    res.send("Hello World!");
})

const port = process.env.PORT || 3000;

server.listen(port, () => console.log("Server started!"));
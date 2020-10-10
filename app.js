const express = require('express');
const app = express();
var path = require('path');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));
// app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// app.get('/', (req,res) => {
//   res.send("Hello");
// });

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
  });

app.listen(process.env.port || 3000);
console.log('Web Server is listening at port '+ (process.env.port || 3000));
const express = require('express');
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "static")));

app.get('/', (req,res) => {
  res.send("Hello");
});

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
  });

app.listen(process.env.port || 3000);
console.log('Web Server is listening at port '+ (process.env.port || 3000));
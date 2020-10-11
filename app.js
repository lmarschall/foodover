const express = require('express');
const axios = require('axios');
const app = express();
var path = require('path');

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, "static")));
// app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// app.get('/', (req,res) => {
//   res.send("Hello");
// });

app.get("/", (req, res) => {
  // res.render("index", { title: "Home" });
  res.sendFile(path.join(__dirname+'/views/index.html'))
});

app.get("/api/recipes", (req, res) => {
  const params = new URLSearchParams();
  params.append('apiKey', process.env.apikey)
  params.append('ingredients', 'apples,+flour,+sugar')
  params.append('number', '2')

  axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
    params: params
    })
    .then((response) => {

        console.log(response.data)
        // this.reservation_list = response.data;
        // this.ready = true;
        // this.setupMarkers(this.schnors);
    })
    .catch((err) => {
        this.loading = false;
        console.log(err);
        })

  res.send(req.query.code)
});

app.get("/api/product", (req, res) => {
  res.send(req.query.code)
});

app.listen(process.env.port || 3000);
console.log('Web Server is listening at port '+ (process.env.port || 3000));
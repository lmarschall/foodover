const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const fs = require('fs')
const https = require('https')

// check if process.env.PORT exists => heroku
if(process.env.PORT)
{
  const httpPort = process.env.PORT

  app.listen(httpPort, function () {
    console.log(`Listening on port ${httpPort}!`)
  })

// else local
} else {
  const httpPort = process.env.PORT || 3000
  const httpsPort = 443
  const key = fs.readFileSync('../localkey.key');
  const cert = fs.readFileSync('../localcert.crt');

  const server = https.createServer({key: key, cert: cert }, app);

  app.use((req, res, next) => {
    if (!req.secure) {
      return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
  })

  app.listen(httpPort, function () {
    console.log(`Listening on port ${httpPort}!`)
  })
  
  server.listen(httpsPort, function () {
    console.log(`Listening on port ${httpsPort}!`)
  })
}

// app.use(compression()); COMPRESSION



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

app.get("/recipe", (req, res) => {
  // res.render("index", { title: "Home" });
  res.sendFile(path.join(__dirname+'/views/recipe.html'))
});

async function findRecipesbyIngredients (res, ingredients) {
  const params = new URLSearchParams();
  params.append('apiKey', process.env.apikey)
  params.append('ingredients', ingredients)
  params.append('number', '2')
  try {
    const result = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {params: params})
    console.log(result.data)
    res.send(result.data)
  } catch (err) {
      console.error(err);
      return []
  }
}

app.get("/api/recipes", (req, res) => {
  console.log(req.query.ingredients)
  findRecipesbyIngredients(res, req.query.ingredients)
  // res.send(recipes)
});

app.get("/api/product", (req, res) => {
  res.send(req.query.code)
});
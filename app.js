const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs')
const https = require('https')

const app = express();

// check if process.env.PORT exists => heroku
if(process.env.PORT)
{
  const httpPort = process.env.PORT

  app.listen(httpPort, function () {
    console.log(`Listening on port ${httpPort}!`)
  })

// else local
} else {
  const httpPort = 3000
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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.render("index.html", { title: "Home" });
});

app.get("/recipe", (req, res) => {
  res.render("recipe.html", { recipe_id: req.query.id });
});

async function findRecipesbyIngredients (ingredients) {
  const params = new URLSearchParams();
  params.append('apiKey', process.env.apikey)
  params.append('ingredients', ingredients)
  params.append('number', '2')

  try {
    const result = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {params: params})
    return result.data
  } catch (err) {
      console.error(err);
      return []
  }
}

app.get("/api/recipes", async (req, res) => {
  console.log(req.query.ingredients)
  const recipes = await findRecipesbyIngredients(req.query.ingredients)
  res.send(recipes)
});

async function findRecipebyId (id) {
  const params = new URLSearchParams();
  params.append('apiKey', process.env.apikey)

  try {
    const result = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {params: params})
    return result.data
  } catch (err) {
      console.error(err);
      return []
  }
}

app.get("/api/recipe", async (req, res) => {
  console.log(req.query.id)
  const recipe = await findRecipebyId(req.query.id)
  res.send(recipe)
});

app.get("/api/product", (req, res) => {
  res.send(req.query.code)
});
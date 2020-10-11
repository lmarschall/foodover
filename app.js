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

app.listen(process.env.PORT || 3000);
console.log('Web Server is listening at port '+ (process.env.PORT || 3000));